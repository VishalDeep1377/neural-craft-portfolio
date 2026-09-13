import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Replace with Resend / Nodemailer for production email delivery
    // Example Resend integration:
    // const { Resend } = await import('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'vishalyep1022@gmail.com',
    //   subject: `Portfolio Contact: ${name}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    // For now: log to server console (works locally, shows in Vercel logs)
    console.log('[Contact Form Submission]', {
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
