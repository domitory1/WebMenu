from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

API_TOKEN = '6658531652:AAEn5TRw5p4yHulphWYttyNfr2bQecvDNvU'

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

inline_btn = InlineKeyboardButton("Меню", web_app=WebAppInfo(url='https://domitory1.github.io/index.html'), callback_data = 'menu')
inline_kb = InlineKeyboardMarkup().add(inline_btn)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
   await message.answer("Привет")
   await message.answer("Выберите интересующий раздел", reply_markup=inline_kb)

@dp.callback_query_handler(lambda c: c.data == 'menu')
async def open_menu(callback_query: types.CallbackQuery):
   await bot.answer_callback_query(callback_query.id)
   await bot.send_message(callback_query.from_user.id, "Нажата кнопка «Меню»")

if __name__ == '__main__':
   executor.start_polling(dp, skip_updates=True)