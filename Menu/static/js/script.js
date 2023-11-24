tg = window.Telegram.WebApp;

tg.expand();
tg.enableClosingConfirmation();

let app = $('#webapp');

const Application = {
	getCatalog () {
		tg.MainButton.text = "Корзина";

		let dataAjax = {
			'route': 'iCart',
		};

		app.attr({
			'class': 'iCatalog',
			'data-back' : '',
			'data-btn': JSON.stringify(dataAjax),
		});

		let data = {
			guid: guid,
			chat_id: chat_id,
		};

		$.ajax({
			url: '/webapp/ajax/catalog',
			method: 'post',
			dataType: 'json',
			data: data,
			beforeSend: function() {
				app.html('<div class="preloader"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path d="M36 50A14 14 0 0 0 64 50A14 15.3 0 0 1 36 50" fill="#e15b64" stroke="none"><animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.65;360 50 50.65"></animateTransform></path></svg></div>');
			},
			success: function(data){
				app.html(data.html)

				text_main_btn = data.basketSum > 0 
						? 'Корзина '+data.basketSum.toFixed(2)+' '+data.currency
						: 'Корзина';
				tg.MainButton.text = text_main_btn;
				tg.MainButton.show(function() {});
				getNavICatalog();
				
				let _scroll = app.attr('data-scroll');
				$('html,body').stop().animate({ scrollTop: _scroll }, 1);
			},
			error: function(e) {
				console.log('error get iCatalog');
			}
		});

		function getNavICatalog(){
			var slider = new Flickity('.slider',{
				cellAlign: 'center',
				freeScroll: true,
				contain: true,
				dragThreshold: 10,
				prevNextButtons: false,
				pageDots: false,
			});
		}

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

		function addToCartICatalog(id_product, btnSpace) {
			let data = {
				chat_id: chat_id,
				id_product: id_product,
				guid: guid,
			};
			$.ajax({
				url: '/webapp/ajax/catalog-add-to-cart',
				method: 'post',
				dataType: 'json',
				data: data,
				success: function(data){
					console.log(data);
					btnSpace.html(data.html);
					tg.MainButton.text = 'Корзина '+data.basketSum.toFixed(2)+' '+data.currency;
					tg.MainButton.hideProgress(function() {});
				},
				error: function() {
					console.log('error addToCartICatalog');
				}
			});
		}

		function editCartICatalog(id_cart, quantity, btnSpace) {
			let data = {
				id_cart: id_cart,
				quantity: quantity,
			};
			$.ajax({
				url: '/webapp/ajax/catalog-edit-cart',
				method: 'post',
				dataType: 'json',
				data: data,
				success: function(data){
					console.log(data);
					tg.MainButton.hideProgress(function() {});
					if(data.html != null) {
						btnSpace.html(data.html);
					}
					tg.MainButton.text = data.basketSum ? 'Корзина '+data.basketSum.toFixed(2)+' '+data.currency : 'Корзина';
				},
				error: function() {
					console.log('error editCartICatalog')
				}
			});
		}
		
		$('body').on('click', '.listAddToCart', function(e) {
			e.stopImmediatePropagation();
			tg.HapticFeedback.selectionChanged(function() {});
			let card = $(this).parents('.cardProduct');
			let id_product = $(this).attr('data-id');
			let btnSpace = $(this).parents('.btn-space');
			card.addClass('incart');
			addToCartICatalog(id_product, btnSpace);
		});

		$('body').on('click', '.groupBtn .listControl', function(e) {
			e.stopImmediatePropagation();
			tg.HapticFeedback.selectionChanged(function() {});
			let btn = $(this);
			let card = $(this).parents('.cardProduct');
			let action = btn.attr('data-action');
			let btnSpace = btn.parents('.btn-space');
			let id_cart = btn.parents('.groupBtn').attr('data-cart');
			var value = btn.parents('.groupBtn').find('input').val();
			
			if(action == 'plus') {
				value = Number(value) + 1;
			}
			else {
				if(Number(value) > 0) {
					value = Number(value) - 1;
				}
			}
			if(value == 0) {
				card.removeClass('incart');
			}
			else {
				btn.parents('.groupBtn').find('input').val(value);
			}
			editCartICatalog(id_cart, value, btnSpace);
		});

		$("body").on('click', '[href*="#"]', function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			tg.HapticFeedback.selectionChanged(function() {});
			$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
			
		});
		
		$(window).scroll(function(){
			getCurrentICatalogNav();
		});
	}
}