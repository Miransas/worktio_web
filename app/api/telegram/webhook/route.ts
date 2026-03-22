import { NextResponse } from "next/server";

const FLOW_ID = "f576ac07-fd36-4c7c-a71c-837e4e2874c1";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Telegram webhook:", JSON.stringify(body));

    const message = body.message || body.channel_post;
    if (!message) return NextResponse.json({ ok: true });

    const text = message.text || message.caption || "";
    const photo = message.photo?.[message.photo.length - 1];
    const video = message.video;
    const fileId = photo?.file_id || video?.file_id || null;
    const contentType = video ? "video" : photo ? "image" : "text";

    // Worktio flow engine tetikle
    const baseUrl = process.env.NEXTAUTH_URL || "https://worktio-web.vercel.app";
    
    const flowRes = await fetch(`${baseUrl}/api/flows/${FLOW_ID}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: {
          text,
          fileId,
          contentType,
          messageId: message.message_id,
          chatId: message.chat.id,
          from: message.from?.username || "unknown",
        }
      }),
    });

    const result = await flowRes.json();
    console.log("Flow result:", result);

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



// URL: https://api.telegram.org/bot{{TELEGRAM_BOT_TOKEN}}/sendMessage
// Method: POST
// Body: {
//   "chat_id": "@worktio",
//   "text": "{{ai_output}}",
//   "parse_mode": "HTML"
// }