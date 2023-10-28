let tg = window.Telegram.WebApp;

//Слайдер
var header = new Flickity('.slider',{
	freeScroll: true,
	contain: true,
	prevNextButtons: false,
	pageDots: false,
});

//Центрирование слайда и удаление и добавление класса 'is-nav-selected'
var slides = document.querySelectorAll('.categoryName');
slides.forEach(function(slide, index){
	slide.addEventListener('click', function(){
		slides.forEach(function(slide) {
			slide.classList.remove('is-nav-selected');
		 });
		slide.classList.add('is-nav-selected');
		
		header.select(index);
		header.scrollToCell(index, true, true); 
	});
});

//Плавный переход по якорям
function smoothScroll(target) {
	const targetElement = document.querySelector(target);
	const startPosition = window.scrollY;
	const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
	const distance = targetPosition - startPosition;
	const duration = 400; // Длительность анимации в миллисекундах
	let startTime = null;
 
	function animation(currentTime) {
	  if (startTime === null) {
		 startTime = currentTime;
	  }
	  const elapsedTime = currentTime - startTime;
	  const scrollY = ease(elapsedTime, startPosition, distance, duration);
	  window.scrollTo(0, scrollY);
	  if (elapsedTime < duration) {
		 requestAnimationFrame(animation);
	  }
	}
 
	function ease(t, b, c, d) {
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	}
 
	requestAnimationFrame(animation);
 }

var categoryCells = document.querySelectorAll('[id^="categoryCell"]');

window.addEventListener('scroll', function() {
  categoryCells.forEach(function(cell) {
    var cellTop = cell.getBoundingClientRect().top;
    if (window.scrollY >= cellTop) {
      console.log('Прокрутили к элементу с идентификатором ' + cell.id);
    }
  });
});