import { SendMailOptions, createTransport } from 'nodemailer';
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_FROM,
  MAIL_USER,
  MAIL_PASS,
} from './config/config';
import { Mail } from 'src/mail/entities/mail.entity';

export interface EmailArgs {
  mail: Mail;
  to: string[] | string;
  fields?: any;
}

export interface SMSResponse {
  count: string;
  response_code: number;
  response: string;
}

export interface StringFields {
  [key: string]: string;
}

export class Mailer {
  constructor(
    private readonly from = `Suvaye<${MAIL_FROM}>`,
    private readonly emailConfig = {
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    },
  ) {}

  async send({ to, mail }: EmailArgs): Promise<boolean> {
    const mailOptions: SendMailOptions = {
      from: this.from,
      to,
      subject: mail.subject,
      text: mail.text_content,
      html: mail.html_content,
    };

    const transporter = createTransport(this.emailConfig);

    try {
      return (await transporter.sendMail(mailOptions)) ? true : false;
    } catch (err) {
      console.log('Error sending email', err);
      return false;
    }
  }
}
