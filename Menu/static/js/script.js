tg = window.Telegram.WebApp;

tg.expand();
tg.enableClosingConfirmation();
tg.MainButton.text = "Корзина";
tg.MainButton.show();

var slider = new Flickity('.slider',{
	cellAlign: 'center',
	freeScroll: true,
	contain: true,
	dragThreshold: 10,
	prevNextButtons: false,
	pageDots: false,
});

function getCurrentICatalogNav() {
	$('.categoryElem').each(function(i, elem) {
		if(getActiveICatalogNav('#'+$(this).attr('id'))) {
			
			if(slider.selectedIndex != i) {
				let current = $(this).attr('id');
				delActiveICatalogNav();
				$('.slider a[href="#'+current+'"]').addClass('active');
				slider.select(i);
			}
		}
	});
}

function delActiveICatalogNav() {
	$('.slider a').each(function() {
		$(this).removeClass('active');
	})
}

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

$("body").on('click', '[href*="#"]', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	tg.HapticFeedback.selectionChanged(function() {});
	$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
	
});

$(window).scroll(function(){
	getCurrentICatalogNav();
});