new Swiper('.menu-slider', {
	freeMode:true,
	autoWidth: true,
	slidesPerView: 'auto',
	centeredSlides: true,
	centeredSlidesBounds: true,
	on: {
		click:function(){
			if (!this.isBeginnig && !this.isEnd){
				this.slideTo(this.clickedIndex);
			}
		}
	}
});