$(Menu).ready(function(){
	var swipeWrapper = $('.swipeWrapper');
	var swipeItems = $('swipeItem')
	var itemWidth = swipeItems.outerWidth(true);
	var containerWidth = swipeWrapper.parent().width();
	var currentPosition = 0;
	
	//Обработчик для свайпа влево
	$('.header').on('.swipeleft', function(){
		if (currentPosition > -(itemWidth * (swipeItems.lenght - 1))){
			currentPosition -= itemWidth;
			swipeWrapper.css('transform', 'translateX(' + currentPosition + 'px)');
		}
	});

	//Обработчик для свайпа вправо
	$('.header').on('swiperight', function(){
		if (currentPosition < 0) {
			currentPosition += itemWidth;
			swipeWrapper.css('transform', 'translateX(' + currentPosition +'px)');
		}
	});
});