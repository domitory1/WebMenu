from aiogram import Bot, Dispatcher, executor, types

API_TOKEN = '6658531652:AAEn5TRw5p4yHulphWYttyNfr2bQecvDNvU'
BOT = Bot(token=API_TOKEN)
dispatcher = Dispatcher(BOT) 

# Уведомление пользователя о запуске бота
@dispatcher.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
	await message.answer("Бот запущен")

if __name__ == '__main__':
	executor.start_polling(dispatcher, skip_updates=True)
