import logging
import openai
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.middlewares.logging import LoggingMiddleware
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Command

TELEGRAM_BOT_TOKEN = "6683566440:AAEMyDYu0odglUTcPhUaGkLflWqNXJOge9w"
OPENAI_API_KEY = "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"
# Инициализация бота и диспетчераbot = Bot(token=TELEGRAM_BOT_TOKEN)
dp = Dispatcher(TELEGRAM_BOT_TOKEN)
dp.middleware.setup(LoggingMiddleware())

# Инициализация OpenAI APIopenai.api_key = OPENAI_API_KEY

# Обработчик команды /start@dp.message_handler(commands=['start'])
async def cmd_start(message: types.Message):
    await message.answer("Привет! Я бот, который использует ChatGPT 3.5 Turbo. Просто напиши мне что-то, и я постараюсь ответить!")

# Обработчик всех входящих текстовых сообщений@dp.message_handler(lambda message: True)
async def echo(message: types.Message):
    user_input = message.text

    # Используем OpenAI для получения ответа на вход пользователя    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Используем модель gpt-3.5-turbo        messages=[
            {"role": "system", "content": "You are a helpful assistant."},            {"role": "user", "content": user_input}
        ]
    )

    bot_response = response['choices'][0]['message']['content']

    # Отправляем ответ пользователя в телеграм    await message.answer(bot_response)

# Запуск ботаif __name__ == '__main__':
    from aiogram import executor

    executor.start_polling(dp, skip_updates=True)