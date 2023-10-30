// Слайдер
var slider = new Flickity('.slider',{
	freeScroll: true,
	contain: true,
	prevNextButtons: false,
	pageDots: false,
});

const slides = document.querySelectorAll('.categoryName');
slides.forEach((slide, index) => {
  slide.addEventListener('click', () => {
    slides.forEach((slide) => {
      slide.classList.remove('is-nav-selected');
    });
    slide.classList.add('is-nav-selected');
    slider.select(index);
  });
});

const categoryCells = document.querySelectorAll('[id^="categoryCell_"]');
window.addEventListener('scroll', () => {
  categoryCells.forEach((cell) => {
    const cellTop = cell.getBoundingClientRect().top;
    if (window.innerHeight / 2 >= Math.abs(cellTop)) {
      const cellIndex = Array.from(categoryCells).indexOf(cell);
      slides.forEach((slide) => {
        slide.classList.remove('is-nav-selected');
      });
      slides[cellIndex].classList.add('is-nav-selected');
      slider.select(cellIndex);
    }
  });
});

// Плавный переход по якорям
function smoothScroll(target) {
	const targetElement = document.querySelector(target);
	const startPosition = window.scrollY;
	const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
	const distance = targetPosition - startPosition;
	const duration = 200; // Длительность анимации в миллисекундах
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