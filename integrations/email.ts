/ /integrations/email.ts

import 'server-only';

import sgMail, { MailDataRequired } from '@sendgrid/mail';



// ---------- Types ----------

export type SendEmailParams = {

  to: string | string[];

  subject: string;

  html: string;

  text?: string;

  replyTo?: string;

  category?: string;                    // аналитика: "quiz", "onboarding" и т.п.

  asmGroupId?: number;                  // unsubscribe group id (если используешь)

  customArgs?: Record<string, string | number>; // трекинг leadId/quizId и т.д.

  sandbox?: boolean;                    // по умолчанию true вне production

};



// ---------- Env & init ----------

const API_KEY = process.env.SENDGRID_API_KEY;

if (!API_KEY) throw new Error('SENDGRID_API_KEY is not set');



sgMail.setApiKey(API_KEY);



// GDPR/Европа (если доступно в SDK — не падаем, если метода нет)

try { (sgMail as any).setDataResidency?.('eu'); } catch {}



const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@medstudy.cz';

const FROM_NAME  = process.env.EMAIL_FROM_NAME || 'Medstudy.cz | Quiz';

const DEFAULT_REPLY_TO = process.env.EMAIL_REPLY_TO || 'sales@medstudy.cz';



// ---------- Helpers ----------

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());



async function sendWithRetry(

  message: MailDataRequired,

  attempts = 3

): Promise<void> {

  for (let i = 1; i <= attempts; i++) {

    try {

      await sgMail.send(message);

      return;

    } catch (err: any) {

      const body = err?.response?.body;

      // логирование

      console.error(`[email] SendGrid attempt ${i} failed`, body || err);

      if (i === attempts) throw err;

      await new Promise(r => setTimeout(r, 300 * i * i)); // 0.3s, 1.2s, 2.7s

    }

  }

}



// ---------- Public API ----------

export async function sendEmail({

  to,

  subject,

  html,

  text,

  replyTo = DEFAULT_REPLY_TO,

  category = 'quiz',

  asmGroupId,

  customArgs,

  sandbox = process.env.NODE_ENV !== 'production',

}: SendEmailParams): Promise<boolean> {

  // Basic validation

  const recipients = Array.isArray(to) ? to : [to];

  if (!recipients.length || !recipients.every(isEmail)) {

    throw new Error('Invalid recipient email');

  }

  if (!subject || subject.length > 200) {

    throw new Error('Invalid subject');

  }



  const msg: MailDataRequired = {

    to: recipients,

    from: { email: FROM_EMAIL, name: FROM_NAME },

    replyTo,

    subject,

    html,

    ...(text ? { text } : {}),

    categories: [category],

    ...(asmGroupId ? { asm: { groupId: asmGroupId } } : {}),

    ...(customArgs ? { customArgs } : {}),

    mailSettings: {

      sandboxMode: { enable: Boolean(sandbox) }, // dev: не отправляем наружу

    },

    trackingSettings: {

      clickTracking: { enable: true, enableText: true },

      openTracking: { enable: true },

    },

    // Однокликовая отписка (создать страницу и добавить URL ниже)

    headers: {

      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',

      // 'List-Unsubscribe': '<https://medstudy.cz/unsubscribe>',

    },

  };



  try {

    await sendWithRetry(msg);

    return true;

  } catch {

    return false;

  }

}