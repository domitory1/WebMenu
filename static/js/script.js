let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

tg.MainButton.text = "Подтвердить номер"
tg.MainButton.show();
let phoneInput = document.querySelector('input');

const phoneMask = new IMask(phoneInput, {
  mask: "+{7} (000) 000-00-00"
});

phoneInput.addEventListener("input", phoneInputHandler);

function phoneInputHandler(){
  if (phoneMask.masked.isComplete){
    tg.MainButton.show();
  } else{
    tg.MainButton.hide();
  }
}

document.getElementByld()