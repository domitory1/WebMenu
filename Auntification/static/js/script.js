let tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Подтвердить номер";
tg.MainButton.show();

let flag = true;
document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(phoneInput);
	if (! withinBoundaries ) {
		phoneInput.blur();
	} else{
    phoneInput.focus();
    if (flag){
      phoneInput.value = '+7 (';
      flag = false;
    }
  }
});

let phoneInput = document.querySelector('input');

const phoneMask = new IMask(phoneInput, {
  mask: "{+7} (000) 000-00-00"
});

phoneInput.addEventListener('input', function(){
  if (phoneMask.masked.isComplete){
    phoneInput.classList.add('correctInput');
    phoneInput.classList.remove('incorrectInput');
    p.classList.remove("show");
  } else{
    phoneInput.classList.remove('correctInput');
  }
});

let p = document.querySelector('.p');

tg.MainButton.onClick(function(){
  phoneInput.blur();
  if (phoneInput.classList == 'correctInput'){
    fetch("send_msg.php", {
      method: "POST",
      body: phoneMask.unmaskedValue
    })
    sessionStorage.setItem('number', phoneInput.value);
    window.location.href = 'https://domitory1.github.io/checkCode/SendCode.html';
  } else{
    phoneInput.classList.add('incorrectInput');
    if (phoneInput.value == ""){
      p.html("Введите номер телефона");
      p.classList.add('show');
   } else{
    p.html("Номер телефона введен неправильно");
    p.classList.add('show');
   }
  }
});
