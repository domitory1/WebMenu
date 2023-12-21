import asyncio
import logging
import sys
import time

from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message

import Buttons.buttons as buttons

API_TOKEN = "6658531652:AAEn5TRw5p4yHulphWYttyNfr2bQecvDNvU"

dp = Dispatcher()

message_texts_start = ["Добрый день! 😊", "Перед тем, как вы сделаете ваш первый заказ, поделитесь, пожалуйста, своим номером телефона. 😌\n\n"
                     "Он нужен для того, чтобы мы смогли добавить блюда именно в вашу корзину"]

@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
   for text in message_texts_start:
      time.sleep(1)
      if message_texts_start.index(text) != 1:
         await message.answer(text)
         print(message_texts_start.index(text))
      else:
         await message.answer(text, reply_murkup=buttons.application_number_phone)

@dp.message()
async def contact_handler(message: Message):
   if  message.contact is not None:
      print(message.contact.phone_number)
      await message.answer(reply_markup=types.ReplyKeyboardRemove())




async def main() -> None:
   bot = Bot(API_TOKEN, parse_mode=ParseMode.HTML)
   await dp.start_polling(bot)

if __name__ == "__main__":
   logging.basicConfig(level=logging.INFO, stream=sys.stdout)
   asyncio.run(main())