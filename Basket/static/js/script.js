let tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Заказать";
tg.MainButton.show();
tg.BackButton.show();
tg.BackButton.onClick(function(){
    tg.BackButton.hide();
    window.history.back();
})