let tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Заказать";
tg.MainButton.show();