new Flickity('.container',{
	prevNextButtons: false,
	pageDots: false,
	contain: true,
});

new Flickity('.header',{
	asNavFor: '.container',
	contain: true,
	freeScroll: true,
	prevNextButtons: false,
	pageDots: false,
});