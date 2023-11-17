let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

tg.MainButton.text = "Отправить код";
tg.MainButton.show();
let passwordInput = document.querySelector('input');

document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(passwordInput);
  console.log(withinBoundaries);
	if (! withinBoundaries ) {
    console.log("снятие фокуса")
		passwordInput.blur();
	} else{
    console.log("фокусирование");
    passwordInput.focus();
  }
});

passwordInput.addEventListener("input", passwordInputHandler);

function passwordInputHandler(){
  if (passwordInput.Length == 6){
    passwordInput.classList.add('correctInput');
    passwordInput.classList.remove('incorrectInput');
  } else{
    passwordInput.classList.remove('correctInput');
  }
}

tg.MainButton.onClick(function(){
    passwordInput.blur();
    if (passwordInput.classList == 'correctInput'){
      console.log(phoneMask.unmaskedValue);
      fetch("send_msg.php", {
        method: "POST",
        body: phoneMask.unmaskedValue
      })
      console.log("отправка сообщения")
    }else{
        passwordInput.classList.add('incorrectInput');
    }
  });