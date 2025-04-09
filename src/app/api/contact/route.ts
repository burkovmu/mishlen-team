import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Формируем текст сообщения
    const text = `
Новая заявка с сайта:
Имя: ${name}
Email: ${email}
Сообщение: ${message}
    `;

    // Отправляем сообщение в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: text,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Ошибка при отправке сообщения в Telegram');
    }

    return NextResponse.json({ message: 'Сообщение отправлено успешно' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке сообщения' },
      { status: 500 }
    );
  }
} 