let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

tg.MainButton.text = "Подтвердить номер";
tg.MainButton.show();
let phoneInput = document.querySelector('input');

const phoneMask = new IMask(phoneInput, {
  mask: "+{7} (000) 000-00-00"
});

document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(phoneInput);
  console.log(e.composedPath());
	if ( withinBoundaries ) {
    console.log("снятие фокуса")
		phoneInput.blur();
	} else{
    console.log("фокусирование");
    phoneInput.focus();
  }
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

tg.MainButton.onClick(function(){
  phoneInput.blur();
  if (phoneInput.classList == 'correctInput'){
    fetch("send_msg.php", {
      method: "POST",
      body: phoneMask.unmaskedValue
    })
    console.log("отправка сообщения")
  }else{
    phoneInput.classList.add('incorrectInput');
  }
});