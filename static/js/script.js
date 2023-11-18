let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.hideProgress();

tg.MainButton.text = "Подтвердить номер";
tg.MainButton.show();
let phoneInput = document.querySelector('input');
/*let flag = true;*/

const phoneMask = new IMask(phoneInput, {
  mask: "+7 (000) 000-00-00"
});

document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(phoneInput);
	if (! withinBoundaries ) {
		phoneInput.blur();
	} else{
    phoneInput.focus();
    /*
    if (flag){
      phoneInput.value = '+7 (';
      flag = false;
    }
    */
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
    sessionStorage.setItem('number', phoneInput.value);
    window.location.href = 'Auntification/SendCode.html';
  } else{
    phoneInput.classList.add('incorrectInput');
  }
});

document.getElementById('form').addEventListener('keydown', function(e){
  console.log(e.code);
  if (e.code == 13) {
    this.submit();
  } 
})