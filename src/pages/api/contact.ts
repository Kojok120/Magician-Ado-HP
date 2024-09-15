import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type MailContent = {
  subject: string;
  text: string;
  html: string;
}

const getMailContent = (name: string, email: string, phone: string, message: string, language: 'en' | 'jp'): { admin: MailContent, user: MailContent } => {
  const adminContent = {
    en: {
      subject: `New inquiry from: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
      html: `
<h3>New inquiry</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<h4>Message:</h4>
<p>${message}</p>
      `
    },
    jp: {
      subject: `新しい問い合わせ: ${name}`,
      text: `
名前: ${name}
メール: ${email}
電話番号: ${phone}

メッセージ:
${message}
      `,
      html: `
<h3>新しい問い合わせ</h3>
<p><strong>名前:</strong> ${name}</p>
<p><strong>メール:</strong> ${email}</p>
<p><strong>電話番号:</strong> ${phone}</p>
<h4>メッセージ:</h4>
<p>${message}</p>
      `
    }
  }

  const userContent = {
    en: {
      subject: 'Thank you for your inquiry',
      text: `
Dear ${name},

Thank you for contacting us. We have received your inquiry with the following message:

${message}

We will get back to you soon.

Best regards,
Ado Valentine
      `,
      html: `
<h3>Dear ${name},</h3>
<p>Thank you for contacting us. We have received your inquiry with the following message:</p>
<p>${message}</p>
<p>We will get back to you soon.</p>
<p>Best regards,<br>Ado Valentine</p>
      `
    },
    jp: {
      subject: 'お問い合わせありがとうございます',
      text: `
${name} 様

お問い合わせいただき、ありがとうございます。
以下の内容で承りました：

メッセージ:
${message}

近日中に返信させていただきます。

よろしくお願いいたします。

Ado Valentine
      `,
      html: `
<h3>${name} 様</h3>
<p>お問い合わせいただき、ありがとうございます。</p>
<p>以下の内容で承りました：</p>
<h4>メッセージ:</h4>
<p>${message}</p>
<p>近日中に返信させていただきます。</p>
<p>よろしくお願いいたします。</p>
<p>Ado Valentine</p>
      `
    }
  }

  return {
    admin: adminContent[language],
    user: userContent[language]
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, phone, message, language } = req.body

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Boolean(process.env.SMTP_SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    try {
      const mailContent = getMailContent(name, email, phone, message, language as 'en' | 'jp')

      // 管理者へのメール
      const adminMailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // 認証済みのメールアドレスを使用
        replyTo: email, // 返信先を問い合わせ者のメールアドレスに設定
        to: process.env.CONTACT_EMAIL,
        ...mailContent.admin
      }

      // ユーザーへの確認メール
      const userMailOptions = {
        from: process.env.SMTP_USER, // 認証済みのメールアドレスを使用
        to: email,
        ...mailContent.user
      }

      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ])

      res.status(200).json({ success: true })
    } catch (error) {
      console.error('メール送信エラー:', error)
      res.status(500).json({ success: false, error: 'メールの送信に失敗しました' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}