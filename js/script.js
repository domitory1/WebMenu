var header = new Flickity('.slider',{
	contain: true,
	freeScroll: true,
	prevNextButtons: false,
	pageDots: false,
});

/*Центрирование слайда*/
var slides = document.querySelectorAll('.categoryName');
slides.forEach(function(slide, index){
	slide.addEventListener('click', function(){
		header.select(index);
		header.scrollToCell(index, true, true);
	});
});