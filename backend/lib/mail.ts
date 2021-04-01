import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeEmail(text: string): string {
  return `
  <div style="
  border: 1px solid black; 
  padding: 20px; 
  font-family: sans-serif; 
  line-height: 2; 
  font-size: 20px;">
    <h2>Hey!</h2>
    <p>${text}</p>
    <p>James</p>  
  </div>`;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const link = `${process.env.FRONTEND_URL}/reset?token=${resetToken}`;
  const info = (await transport.sendMail({
    to,
    from: 'james@james-nock.co.uk',
    subject: 'Your password reset token',
    html: makeEmail(`Your password reset token is here: 

    <a href="${link}">Click here to reset your password</a>

    If clicking the link above does not work, please copy and paste this link into a web browser: ${link}
  `),
  })) as MailResponse;

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
