import asyncio
import logging
import sys
import time

from aiogram import Bot, Dispatcher, Router, F
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.utils.markdown import hbold

import Button.button as button

API_TOKEN = "6658531652:AAEn5TRw5p4yHulphWYttyNfr2bQecvDNvU"

dp = Dispatcher()
router = Router()

@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
   await message.answer("Добрый день! 😊")
   time.sleep(2)
   # !Заменить имя бота
   await message.answer("Меня зовут WebAppTestBot.\n Я был создан командой 12XT для того, "
                        "чтобы вы могли сделать удаленный заказ в студенческой столовой Меридиан.")
   time.sleep(2)
   await message.answer("Перед тем, как вы сделаете ваш первый заказ, поделитесь, пожалуйста, своим номером телефона. 😌\n\n"
                        "Он нужен для того, чтобы вы смогли получить свой заказ.", reply_markup=button.reply_number_phone)

@router.message.contact()
async def contact_handler(message: Message):
    await message.answer("Работает")

async def main() -> None:
   bot = Bot(API_TOKEN, parse_mode=ParseMode.HTML)
   await dp.start_polling(bot)

if __name__ == "__main__":
   logging.basicConfig(level=logging.INFO, stream=sys.stdout)
   asyncio.run(main())