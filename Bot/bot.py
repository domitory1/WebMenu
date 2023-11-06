from aiogram import Bot, Dispatcher, executor, types
import time


API_TOKEN= "6658531652:AAEn5TRw5p4yHulphWYttyNfr2bQecvDNvU"
bot = Bot(API_TOKEN)
dp = Dispatcher(bot)


replyKeyboardMarkup = types.ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
buttonShareNumder = types.KeyboardButton("Поделиться номером", request_contact=True)
replyKeyboardMarkup.add(buttonShareNumder)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.answer("Бот запущен")
    time.sleep(1)
    await message.answer("Поделитесь номером", reply_markup=replyKeyboardMarkup)

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)