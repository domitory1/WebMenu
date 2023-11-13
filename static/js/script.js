let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

tg.MainButton.text = "Подтвердить номер"
tg.MainButton.show()
let phoneInput = document.querySelector('input');

const phoneMask = new IMask(phoneInput, {
  mask: "+{7} (000) 000-00-00"
});

phoneInput.addEventListener("input", phoneInputHandler);

function phoneInputHandler(){
  if (phoneMask.masked.isComplete){
    phoneInput.classList.add('correctInput');
    phoneInput.classList.remove('incorrectInput');
  } else{
    phoneInput.classList.remove('correctInput');
  }
}

tg.MainButton.onClick("click", buttonHandler);

function buttonHandler(e) {
  console.log("вызов")
}
/*
button.addEventListener("click", buttonHandler);

function phoneInputHandler(){
  if (phoneMask.masked.isComplete){
    button.classList.add("button--active");
    phoneInput.classList.remove("wrong");
  } else{
    button.classList.remove("button--active");
  }
}

async function buttonHandler(e){
  e.preventDefault();
  if (button.classList == "button--active"){
    return await fetch("send_msg.php", {
      method: "POST",
      body: phoneMask.unmaskedValue
    })
  } else {
    phoneInput.classList.add("wrong")
  }
}
*/