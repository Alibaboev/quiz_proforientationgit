// /integrations/email.ts
import 'server-only';

import sgMail from '@sendgrid/mail';

// --- Типы для входящих данных ---
interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

// --- Инициализация клиента SendGrid ---
// Ключ API безопасно берется из переменных окружения
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// --- Основная функция для отправки email ---
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  // Адрес отправителя должен быть верифицирован в вашем аккаунте SendGrid
  const fromAddress = 'noreply@medstudy.cz';

  const msg = {
    to: to,
    from: fromAddress,
    subject: subject,
    html: html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email successfully sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    // В реальном приложении здесь можно добавить более детальное логирование ошибки
    // if (error.response) {
    //   console.error(error.response.body)
    // }
    return false;
  }
}
