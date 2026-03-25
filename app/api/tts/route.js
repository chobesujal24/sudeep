import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Language-to-voice mapping using Microsoft Edge Neural voices
const VOICE_MAP = {
  'hi': 'hi-IN-SwaraNeural',       // Hindi
  'bn': 'bn-IN-TanishaaNeural',    // Bengali
  'gu': 'gu-IN-DhwaniNeural',      // Gujarati
  'ta': 'ta-IN-PallaviNeural',     // Tamil
  'te': 'te-IN-ShrutiNeural',      // Telugu
  'kn': 'kn-IN-SapnaNeural',       // Kannada
  'ml': 'ml-IN-SobhanaNeural',     // Malayalam
  'mr': 'mr-IN-AarohiNeural',      // Marathi
  'pa': 'pa-IN-GurpreetNeural',    // Punjabi
  'ar': 'ar-SA-ZariyahNeural',     // Arabic
  'zh': 'zh-CN-XiaoxiaoNeural',    // Chinese
  'ja': 'ja-JP-NanamiNeural',      // Japanese
  'ko': 'ko-KR-SunHiNeural',      // Korean
  'es': 'es-ES-ElviraNeural',      // Spanish
  'fr': 'fr-FR-DeniseNeural',      // French
  'de': 'de-DE-KatjaNeural',       // German
  'it': 'it-IT-ElsaNeural',        // Italian
  'pt': 'pt-BR-FranciscaNeural',   // Portuguese
  'ru': 'ru-RU-SvetlanaNeural',    // Russian
  'tr': 'tr-TR-EmelNeural',        // Turkish
  'th': 'th-TH-PremwadeeNeural',   // Thai
  'en': 'en-US-JennyNeural',       // English (default)
};

function detectLanguage(text) {
  const sample = text.substring(0, 200);
  if (/[\u0900-\u097F]/.test(sample)) return 'hi';
  if (/[\u0980-\u09FF]/.test(sample)) return 'bn';
  if (/[\u0A80-\u0AFF]/.test(sample)) return 'gu';
  if (/[\u0B80-\u0BFF]/.test(sample)) return 'ta';
  if (/[\u0C00-\u0C7F]/.test(sample)) return 'te';
  if (/[\u0C80-\u0CFF]/.test(sample)) return 'kn';
  if (/[\u0D00-\u0D7F]/.test(sample)) return 'ml';
  if (/[\u0A00-\u0A7F]/.test(sample)) return 'pa';
  if (/[\u0600-\u06FF]/.test(sample)) return 'ar';
  if (/[\u4E00-\u9FFF]/.test(sample)) return 'zh';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) return 'ja';
  if (/[\uAC00-\uD7AF]/.test(sample)) return 'ko';
  if (/[\u0E00-\u0E7F]/.test(sample)) return 'th';
  if (/[\u0400-\u04FF]/.test(sample)) return 'ru';
  return 'en';
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  return handleTTS(text);
}

export async function POST(req) {
  try {
    const { text } = await req.json();
    return handleTTS(text);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

async function handleTTS(text) {
  try {
    if (!text || text.length > 5000) {
      return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
    }

    const cleanText = text.replace(/[*#_`]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
    const lang = detectLanguage(cleanText);
    const voice = VOICE_MAP[lang] || VOICE_MAP['en'];

    const { Communicate } = await import('edge-tts-universal');
    const tts = new Communicate(cleanText, { voice: voice });
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of tts.stream()) {
            if (chunk.type === 'audio' && chunk.data) {
              controller.enqueue(new Uint8Array(chunk.data));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}


