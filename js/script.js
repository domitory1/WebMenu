// Слайдер
var slider = new Flickity('.slider',{
	freeScroll: true,
	contain: true,
	prevNextButtons: false,
	pageDots: false,
});

// Центрирование слайда и удаление и добавление класса 'is-nav-selected' при тапе на якорь
var slides = document.querySelectorAll('.categoryName');
slides.forEach(function(slide, index){
	slide.addEventListener('click', function(){
		slides.forEach(function(slide) {
			slide.classList.remove('is-nav-selected');
		 });
		slide.classList.add('is-nav-selected');
		slider.select(index);
		//slider.scrollToCell(index, true, true); 
	});
});

// Центрирование слайда и удаление и добавление класса 'is-nav-selected' при скроле страницы
var categoryCells = document.querySelectorAll('[id^="categoryCell_"]');
window.addEventListener('scroll', function() {
	categoryCells.forEach(function(cell) {
		var cellTop = cell.getBoundingClientRect().top;
		if (window.innerHeight/2 >= Math.abs(cellTop)){
			var cellIndex = Array.from(categoryCells).indexOf(cell);
			slider.select(cellIndex);
			slides.forEach(function(slide) {
				slide.classList.remove('is-nav-selected');
			});
			slider.selectedElement.classList.add('is-nav-selected');
		}
	});
});

// Плавный переход по якорям
function smoothScroll(target) {
	const targetElement = document.querySelector(target);
	const startPosition = window.scrollY;
	const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
	const distance = targetPosition - startPosition;
	const duration = 500; // Длительность анимации в миллисекундах
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