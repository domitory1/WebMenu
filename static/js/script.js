tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

document.addEventListener('DOMContentLoaded', () => {

    const inputElement = document.querySelector('input')
    const maskOptions = {
      mask: '+{7} (000) 000-00-00'
    }
    IMask(inputElement, maskOptions)
})