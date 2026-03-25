// Force re-build of Chat API
import { NextResponse } from 'next/server';
import { getProductData } from '@/lib/getProductData';

const BASE_SYSTEM_PROMPT = `You are an AI assistant for Sudeep Engineers (LED lighting and solar infrastructure) in Waluj MIDC, Aurangabad.
Support: Professional, concise answers about products, quotes, and technical specs. 
Identify as Sudeep Engineers AI Assistant.

CRITICALLY IMPORTANT INSTRUCTION:
YOU MUST STRICTLY ONLY ANSWER QUESTIONS RELATED TO SUDEEP ENGINEERS, OUR PRODUCTS, SERVICES, INDUSTRIES, AND COMPANY. IF A USER ASKS ABOUT ANYTHING ELSE (general knowledge, coding, writing unrelated essays, politics, etc.), POLITELY DECLINE AND REDIRECT THEM TO OUR OFFERINGS. Do not provide code, general knowledge, or casual conversations unrelated to the business.

VISUAL CAPABILITIES:
You can see and analyze images provided by the user (site photos, drawings, lamp designs). Provide expert feedback based on visual evidence.

CRITICAL LINKS:
[Contact Us](/contact), [Product Catalog](/product), [About Us](/about), [Industries](/industries), [Certifications](/certifications).

Key Details:
- Location: Waluj MIDC, Aurangabad, Maharashtra
- MSME registered, GeM OEM Supplier
- Products: LED Street/Flood/Highbay, Solar Street Lights, High Mast Poles.
`;

const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60000;

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const currentTime = Date.now();
    const ipData = rateLimitMap.get(ip) || { count: 0, resetTime: currentTime + RATE_LIMIT_WINDOW_MS };
    if (currentTime > ipData.resetTime) { ipData.count = 0; ipData.resetTime = currentTime + RATE_LIMIT_WINDOW_MS; }
    ipData.count += 1;
    rateLimitMap.set(ip, ipData);
    if (ipData.count > RATE_LIMIT_MAX) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

    let messages = [];
    let fileBase64 = null;
    let fileName = "";
    let fileType = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      messages = JSON.parse(formData.get("messages") || "[]");
      const file = formData.get("file");
      
      if (file && file instanceof File) {
        if (file.size > 15 * 1024 * 1024) return NextResponse.json({ error: "15MB limit exceeded." }, { status: 400 });
        
        fileName = file.name;
        fileType = file.type;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (fileType.includes("pdf")) {
          try {
            // Lazy load pdf-parse only at runtime to avoid build-time static analysis issues
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            const pdf = require('pdf-parse');
            
            const data = await pdf(buffer);
            const text = (data.text || "").substring(0, 50000);
            if (messages.length > 0) {
              messages[messages.length - 1].content += `\n\n[USER UPLOADED PDF ("${fileName}") TEXT:]\n${text}`;
            }
          } catch (e) {
            console.error("PDF Runtime Parse error:", e);
          }
        } else if (fileType.includes("image")) {
          fileBase64 = buffer.toString('base64');
        } else {
          const text = buffer.toString('utf-8').substring(0, 50000);
          if (messages.length > 0) {
            messages[messages.length - 1].content += `\n\n[USER UPLOADED FILE ("${fileName}") TEXT:]\n${text}`;
          }
        }
      }
    } else {
      const body = await req.json();
      messages = body.messages;
    }

    if (!messages.length) return NextResponse.json({ error: 'Invalid message' }, { status: 400 });

    // Fetch products
    let productsText = "";
    try {
      const allProducts = await getProductData();
      if (allProducts && allProducts.length > 0) {
        productsText = "\n\nOUR COMPLETE PRODUCT CATALOG (Use this data to answer product questions accurately):\n" + 
          allProducts.map(p => `- ${p.name || p.title || 'Product'} (Category: ${p.category || 'N/A'}): ${p.shortDescription || p.description || ''} ${p.wattage ? 'Wattage: ' + p.wattage : ''}`).join('\n');
      }
    } catch (e) {
      console.error("Failed to fetch products for AI context", e);
    }

    const SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + productsText;

    // Format for NVIDIA Llama 3.2 Vision Model
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m, idx) => {
        const isLatest = idx === messages.length - 1;
        if (isLatest && fileBase64 && fileType.includes("image")) {
          return {
            role: m.role,
            content: [
              { type: "text", text: String(m.content) },
              { type: "image_url", image_url: { url: `data:${fileType};base64,${fileBase64}` } }
            ]
          };
        }
        return { role: m.role, content: String(m.content) };
      })
    ];

    const apiKey = process.env.NVIDIA_API_KEY || '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';

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: fileBase64 ? 'meta/llama-3.2-90b-vision-instruct' : 'meta/llama-3.1-70b-instruct',
        messages: formattedMessages,
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('NVIDIA Vision AI Error:', errorData);
      return NextResponse.json({ error: 'AI Error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error('Chat API Fatal Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
