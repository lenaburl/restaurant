$(document).ready(function(){

	var indicatorWrap = $('#indicatorWrap'),
		indicator = $('#indicator'),
		body = $('body'),
		menuNav = $('#menuNav'),
		menuWrap = $('#menuWrap'),
		activeLink = $('.js-menu-link.is-active'),
		menuNavWidth = menuNav[0].scrollWidth;
	indicatorWrap.css('width', menuNavWidth);

	setIndicatorTransform(indicator, activeLink);

	$('.js-menu-link').on('click', function(e){
		e.preventDefault();
		$('.js-menu-link.is-active').removeClass('is-active');
		$(this).addClass('is-active');
		activeLink = $(this);
		if ($(window).width() > 1023) {
			setIndicatorTransform(indicator, activeLink);
		} else {
			body.removeClass('no-scroll');
			tlNav.clear();
			tlNav.to('#menuNav', 0.3, {y: '100%', ease: Power2.easeIn}, 0)
		    	 .set(['#menuNav', '.js-menu-link'], {clearProps: 'all'}, 0.3)
			     .addCallback(
		       		function(){
						menuWrap.removeClass('is-open');
			        },
			       	"-=0.3"
			      )
			     .addCallback(
		       		function(){
						menuWrap.hide();
		       			body.removeClass('no-scroll');
			        },
			       	"+=0"
			      );
		}
		scrollTo($(this).attr('href'), 500);
	});
	$('.js-card-text').each(function(){	
		cutTextInElement($(this), 51);
	});

	$(window).resize(function(){
		setHeaderHeight();
		setBgImage($('#contentHeader'));
		if ($(window).width() > 1023 && body.hasClass('no-scroll')) {
			body.removeClass('no-scroll');
		}

		if ($(window).width() > 1023) {
			$('#menuWrap').show();
		}
		setIndicatorTransform(indicator, activeLink);
	});
	setHeaderHeight();
	setBgImage($('#contentHeader'));

	var tlNav = new TimelineMax();

	$('#openNavBtn').on('click', function(e){
		e.preventDefault();
		tlNav.clear();
		tlNav.to('#menuNav', 0.3, {y: 0, ease: Power2.easeIn}, 0.1)
		     .set('.js-menu-link', {y: 15, opacity: 0}, 0)
		     .staggerTo('.js-menu-link', 0.15, {opacity: 1, y: 0, ease: Power2.easeIn}, 0.2, 0.2)
		     .addCallback(
	       		function(){
					menuWrap.addClass('is-open');
		        },
		       	0.3
		      )
		     .addCallback(
	       		function(){
					menuWrap.show();
	       			body.addClass('no-scroll');
		        },
		       	0
		      );
	});


	var tlModal = new TimelineMax();

	$('.js-open-modal').on('click', function(e){
		e.preventDefault();

	    tlModal.clear();

		tlModal.set('#pageBg', {'z-index': '3'}, 0)
			   .set('#pageWrap', {'webkitFilter': 'blur(0px)', 'filter': 'blur(0px)'}, 0)
			   .to('#pageWrap', 0.7, {'webkitFilter': 'blur(5px)', 'filter': 'blur(5px)', ease: Power2.easeIn}, 0)
			   .to('#pageBg', 0.7, {'background-color': 'rgba(0, 0, 0, 0.33)', ease: Power2.easeIn}, 0)
			   .addCallback(
		       		function(){
		       			$('#modal').show().addClass('is-visible no-scroll');
			        },
			       	0.2
			    );


		tlModal.to('#modalContent', 0.5, {y:0, ease: Power2.easeOut}, 0.2)
		       .to('#modalImg', 0.7, {y:0, opacity:1, ease: Power2.easeOut}, 0.5)
		       .to('#modalTitle', 0.5, {y:0, opacity:1, ease: Power2.easeOut}, 1)
		       .staggerTo('.js-card-content', 0.45, {y:0, opacity:1, ease: Power2.easeOut}, 0.2, 1.2)
		       .staggerTo('.js-card-nums', 0.4, {y:0, opacity:1, ease: Power2.easeOut}, 0.2, 1.5)
		       .to('#modalClose', 1, {opacity: 1, ease: Power2.easeOut}, 1.7)
		       .to('#modalAddToCart', 0.7, {y:0, ease: Power2.easeOut}, 0.7)
		       .to('#modalCountWrap', 0.7, {y:0, ease: Power2.easeOut}, 1)
		       .to('#modalCount', 0.7, {opacity:1, ease: Power2.easeOut}, 1.1)
		       .to('#modalPrice', 0.7, {opacity:1, y:0, ease: Power2.easeOut}, 1.4)
		       .to('#modalLink', 0.7, {opacity:1, y:0, ease: Power2.easeOut}, 1.5)
		       .addCallback(
		       		function(){
		       			$('#modal').show().removeClass('no-scroll');
						body.addClass('no-scroll');
						$('#pageWrap').css('padding-right',($('#modal')[0].offsetWidth - $('#modal')[0].clientWidth) + 'px');
			        },
			       	"+=0"
			    );
	});

	$('#modalClose').on('click', function(e){
		e.preventDefault();

	    tlModal.clear();

		tlModal.to('#modalContent', 0.5, {y:'100%', ease: Power2.easeOut}, 0)
			   .to('#pageWrap', 0.5, {'webkitFilter': 'blur(0)', 'filter': 'blur(0)', ease: Power2.easeIn}, 0)
			   .to('#pageBg', 0.5, {'background-color': 'rgba(0, 0, 0, 0)', ease: Power2.easeIn}, 0)
			   .set('#pageBg', {'z-index': '-1'}, 0.5)
			   .set(['#pageBg', '#pageWrap', '#modalContent', '#modalImg', '#modalTitle', '.js-card-content', '.js-card-nums', 
			   	'#modalClose', '#modalAddToCart', '#modalCountWrap', '#modalCount', '#modalPrice', '#modalLink'], {clearProps: 'all'}, 0.5)
			   .addCallback(
		       		function(){
		       			body.removeClass('no-scroll');
						$('#modal').hide().addClass('no-scroll');
						$('#pageWrap').css('padding-right', 0);
			        },
			       	0.5
			    )
			   .addCallback(
		       		function(){
		       			$('#modal').hide().removeClass('is-visible');
			        },
			       	"+=0"
			    );
	});

	$(document).keydown(function(event) {
        if (event.which == 27) {
            if ($('#modal').hasClass('is-visible')) {
                $('#modalClose').click();
            }
        }
    });

    $(document).on('scroll', function(){
		var scroll_top = $(document).scrollTop();
		$('.js-menu-link').each(function(){
			var hash = $(this).attr("href");
			var target = $(hash);
			if (target.offset().top <= scroll_top && target.offset().top + target.outerHeight() > scroll_top) {
				$('.js-menu-link.is-active').removeClass('is-active');
				$(this).addClass('is-active');
				activeLink = $(this);
				setIndicatorTransform(indicator, activeLink);
			}
		});
	});

	$('#menuWrap').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 10);
        e.preventDefault();
    });

    var tlMenu = new TimelineMax();

    $('#openHeaderMenu').on('click', function(){
    	var burger = $(this).find('.js-burger');
    	if (burger.hasClass('before-open') && burger.hasClass('is-open')) {
		    tlModal.clear();

		    tlModal.to('#headerMenu', 0.3, {y: '100%', ease: Power2.easeIn}, 0)
		    	   .set(['#headerMenu', '.js-header-nav-item'], {clearProps: 'all'}, 0.3)
				   .addCallback(
			       		function(){
			       			burger.removeClass('is-open');
				        },
				       	"+=0"
				    )
				   .addCallback(
			       		function(){
			       			burger.removeClass('before-open');
			       			body.removeClass('no-scroll');
				        },
				       	"+=0.3"
				    );
		    
    	} else {
		    tlModal.clear();
			$('#headerMenu').css('display', 'block');

			tlModal.set('.js-header-nav-item', {opacity: 0, y: 15}, 0)
				   .to('#headerMenu', 0.3, {y: 0, ease: Power2.easeIn}, 0.1)
				   .staggerTo('.js-header-nav-item', 0.15, {opacity: 1, y: 0, ease: Power2.easeIn}, 0.2, 0.2)
				   .addCallback(
			       		function(){
			       			burger.addClass('is-open');
				        },
				       	0.3
				    )
				   .addCallback(
			       		function(){
			       			burger.addClass('before-open');
			       			body.addClass('no-scroll');
				        },
				       	0
				    );
    	}
    });
});

function setHeaderHeight() {
	if ($(window).width() < 1024) {
		var height = $(window).height() - $('#header').height();
		$('#contentHeader').css('height', height + 'px');
	} else {
		$('#contentHeader').css('height', 'unset');
	}
}

function setIndicatorTransform(indicator, activeLink) {
	indicator.css('transform', 'translateX(' + (
		activeLink.innerWidth() / 2 + activeLink.position().left - indicator.innerWidth() / 2 - activeLink.children('sup').width() / 2
		) + 'px)');
}

function scrollTo(id, speed) {
	if ($(id).length != 0) {
		var offset = $(id).offset().top;
	    $('body, html').animate({scrollTop: offset}, speed);
	}
}

function cutTextInElement(elem, symbols) {
	if (elem.text().length > symbols) {
		elem.text(elem.text().substring(0,symbols) + '...');
	}
}

function setBgImage(elem) {
	if (elem.data('desktop-bg') && $(window).width() > 1023) {
		elem.css('background-image', 'url("' + elem.data('desktop-bg') + '")');
	} else if (elem.data('mobile-bg') && $(window).width() < 1024) {
		elem.css('background-image', 'url("' + elem.data('mobile-bg') + '")');
	}
}
