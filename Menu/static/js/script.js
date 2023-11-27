tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Корзина";
tg.MainButton.show();

var slider = new Flickity('.slider',{
	freeScroll: true,
	contain: true,
	cellAlign: 'center',
	dragThreshold: 10,
	prevNextButtons: false,
	pageDots: false,
});

function getActiveICatalogNav(target) {
	let w = $(window);
	let t = $(target);
	let wt = w.scrollTop();
	let wh = w.height()- tg.viewportHeight / 2;
	let eh = t.outerHeight();
	let et = t.offset().top;
	if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)){
		return true;
	} else {
		return false;
	}
}

$('body').on('click', '[href*="#"]', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
});

$(window).scroll(function(){
	$('.categoryElem').each(function(i) {
		if(getActiveICatalogNav('#'+$(this).attr('id'))) {
			if(slider.selectedIndex != i) {
				let current = $(this).attr('id');
				$('.slider a').each(function() {
					$(this).removeClass('active');
				})
				$('.slider a[href="#'+current+'"]').addClass('active');
				slider.select(i);
			}
		}
	});
});

document.querySelector('.buttonAddToBasket').addEventListener('click', function(){
	
	let data = {
		product_id: $(this).attr('data-id'),
		product_price: $(this).attr('data-price'),
	};

	$.ajax({
		url: '',
		type: 'post',
		data: data,
		success: function(response){
			tg.MainButton.text = "Корзина " + response.total;
			
		},
		error: function(){
			tg.showPopup({
				title: '🤔',
				message: "Возникла какая-то проблема. Уже работаем над ее решением"
			  });
		}
	});

	
});