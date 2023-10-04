$(function() {
	$("#myList").swipe({
	  swipeLeft: function() {
		 $(this).scrollLeft($(this).scrollLeft() + 200);
	  },
	  swipeRight: function() {
		 $(this).scrollLeft($(this).scrollLeft() - 200);
	  },
	  threshold: 0
	});
 });