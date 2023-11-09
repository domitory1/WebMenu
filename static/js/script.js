tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

let phoneInput = document.querySelector('input');
let button = document.querySelector('button');

const phoneMask = new IMask(phoneInput, {
  mask: "+{7} (000) 000-00-00"
});

phoneInput.addEventListener("input", phoneInputHandler);
button.addEventListener("click", buttonHandler);

function phoneInputHandler(){
  if (phoneMask.masked.isComplete){
    button.classList.add("button--active");
  } else{
    button.classList.remove("button--active");
  }
}


// !По необходимости изменить send_msg.php
async function buttonHandler(e){
  e.preventDefault();
  return await fetch("send_msg.php", {
    method: "POST",
    body: phoneMask.unmaskedValue
  })
}