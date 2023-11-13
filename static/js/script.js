let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

tg.MainButton.text = "Подтвердить номер"

let phoneInput = document.querySelector('input');

const phoneMask = new IMask(phoneInput, {
  mask: "+{7} (000) 000-00-00"
});

phoneInput.addEventListener("input", phoneInputHandler);

function phoneInputHandler(){
  if (phoneMask.masked.isComplete){
    tg.MainButton.enable();
  } else{
    tg.MainButton.disable();
  }
}



/*
async function buttonHandler(e){
  e.preventDefault();
  if (tg.MainButtonclassList == "button"){
    return await fetch("send_msg.php", {
      method: "POST",
      body: phoneMask.unmaskedValue
    })
  } else {
    phoneInput.classList.add("wrong")
  }
}*/
