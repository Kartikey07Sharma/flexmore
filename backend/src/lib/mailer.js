import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function sendInquiryNotification(inquiry) {
  const t = getTransporter();
  if (!t) {
    console.log('[mailer] SMTP not configured — skipping notification email');
    return;
  }
  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  const html = `
    <h2>New Quote Inquiry</h2>
    <p><strong>Name:</strong> ${inquiry.name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Phone:</strong> ${inquiry.phone || '-'}</p>
    <p><strong>Company:</strong> ${inquiry.company || '-'}</p>
    <p><strong>Product:</strong> ${inquiry.product || '-'}</p>
    <p><strong>Quantity:</strong> ${inquiry.quantity || '-'}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap">${(inquiry.message || '').replace(/</g, '&lt;')}</pre>
  `;
  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || `Flexmore <${process.env.SMTP_USER}>`,
      to,
      subject: `New inquiry from ${inquiry.name}`,
      html,
    });
  } catch (e) {
    console.error('[mailer] failed to send notification:', e.message);
  }
}
