import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant for Sudeep Engineers, an industrial LED lighting and solar infrastructure company located in Waluj MIDC, Aurangabad, Maharashtra, India.
You should answer professionally, concisely, and help users understand products, services, or request quotations. 
Never say you are an AI from NVIDIA or Meta unless strictly necessary; identify yourself as the Sudeep Engineers AI Assistant.

Key Company Details:
- Location: Waluj MIDC, Aurangabad, Maharashtra (Prime industrial hub)
- Established: June 4, 2019
- Status: MSME Udyam registered Micro enterprise
- Timings: Open 09:15 to 19:00

Marketplace Presence & Credentials:
- IndiaMart: Verified Supplier (Top Rated for products/services)
- JustDial: Top Rated Dealer in LED Lighting and Solar Infrastructure
- GeM (Government e Marketplace): Registered OEM Supplier

Main Products:
- LED Street Lights & LED Flood Lights (10W to 1000W+)
- Solar Street Lights & Solar Blinkers
- High Mast Lighting Systems & GI/Octagonal Poles
- Recessed Light Panels & Indoor LED Lighting
- Industrial & Infrastructure Lighting Solutions

Core Services:
- LED Lighting Manufacturing
- Solar Power Infrastructure Projects
- Smart City Street Lighting
- Photometric Design & Energy Efficiency Consultations

Contact Information:
Phone: +91 9922996236
Email: info@sudeepengineers.com
`;

// Rate limiting basic implementation (in-memory)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 15; // 15 requests per minute per IP to be safe (NVIDIA limit is 40 overall)
const RATE_LIMIT_WINDOW_MS = 60000;

export async function POST(req) {
  try {
    // 1. Basic Rate Limiting based on IP
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    
    const currentTime = Date.now();
    const ipData = rateLimitMap.get(ip) || { count: 0, resetTime: currentTime + RATE_LIMIT_WINDOW_MS };
    
    if (currentTime > ipData.resetTime) {
      ipData.count = 0;
      ipData.resetTime = currentTime + RATE_LIMIT_WINDOW_MS;
    }
    
    ipData.count += 1;
    rateLimitMap.set(ip, ipData);

    if (ipData.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    // 2. Parse input and structure messages
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: String(m.content).substring(0, 1000) // Sanitize and limit length
      }))
    ];

    // 3. Setup NVIDIA API connection
    // Fallback to exactly what the user provided if environment variable is not matched, though securely it should only be in .env.local
    const apiKey = process.env.NVIDIA_API_KEY || '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';

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'meta/llama3-8b-instruct',
        messages: formattedMessages,
        temperature: 0.2, // Low temperature for more professional, reliable answers
        top_p: 0.7,
        max_tokens: 512,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('NVIDIA API Error:', errorData);
      return NextResponse.json({ error: 'Failed to generate AI response' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error processing chat request.' }, { status: 500 });
  }
}
