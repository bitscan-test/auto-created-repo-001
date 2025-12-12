var baseW = 1366;	//基準となるブレークポイント
var breakPointSPPC = 750;	//基準となるブレークポイント
var iOSviewportW = 0;
var ua = navigator.userAgent.toLowerCase();
var isiOS = (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1) || (ua.indexOf("ipad") > -1);
if(isiOS){
	iOSviewportW = document.documentElement.clientWidth;
}

function updateMetaViewport(){
	var viewportContent;
	var w = window.outerWidth;
	if(isiOS){
		w = iOSviewportW;
	}
	if(breakPointSPPC < w && w < baseW){
		viewportContent = "width="+baseW+",user-scalable=no,shrink-to-fit=yes";
	}else{
		viewportContent = "width=device-width,user-scalable=no,shrink-to-fit=yes";
	}
	document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
}
//イベントハンドラ登録
window.addEventListener("resize", updateMetaViewport, false);
window.addEventListener("orientationchange", updateMetaViewport, false);
//初回イベント強制発動
var ev = document.createEvent("UIEvent");
ev.initEvent("resize", true, true)
window.dispatchEvent(ev);



(function($) {
	// Tab
	var newsTab = new $.PATTERN.tab({
		tabArea: $('.news'),
		tabSwitch: '.news__ttl li',
		tabCnt: '.news__cnt__tab',
		activeClass: 'active'
	})
	if(newsTab.active) {
		newsTab.init();
	};
	$.PATTERN.clickDrop({
		set: [{
			parent: $('.menu_mobile__main_menu .menu li'),
			elClick: '.btn',
			elTarget: '.drop_menu'
		}]
	})

	// menu
	$('.header__btn_menu').on('click', function() {
		$(this).toggleClass('active');
		$('.menu_mobile').toggleClass('active');
		$('.wrapper').toggleClass('menu_mobile__active');
	});
	// $('.menu_mobile__main_menu .drop_menu a').on('click', function(e) {
	// 	e.preventDefault();
	// 	$('.header__btn_menu').removeClass('active');
	// 	$('.menu_mobile').removeClass('active');
	// 	$('.wrapper').removeClass('menu_mobile__active');
	// });
	var originY = 0;
	$('.wrapper').on('touchstart', function(e) {
		if ($(window).innerWidth() < 640 && $('.wrapper').hasClass('menu_mobile__active')) {
			originY = e.touches[0].clientY;
		}
	})
	$('.wrapper').on('touchmove', function(e) {
		if ($(window).innerWidth() < 640 && $('.wrapper').hasClass('menu_mobile__active')) {
			e.preventDefault();
			$('.menu_mobile').scrollTop($('.menu_mobile').scrollTop() + originY - e.touches[0].clientY);
			originY = e.touches[0].clientY;
		}
	});
	$.PATTERN.smoothScroll({
		pageTop: $('#pnavi'),
		// posAdd: -60
	});
	// animation
	$(window).on('load', function(){
		var animation = $('.animation');
		if(animation.length) {
			animation.each(function(index){
				var anima = new $.PATTERN.inViewObserver({
					selector: $(this),
					inviewCondition: function(self_percent,window_percent,inview_px){
						return self_percent >= 0.5 || window_percent.top > 0.3
					}
				});
				if (anima.active){
					anima.on('in_view',function(){
						anima.selector.addClass('show');
						anima.destroy();
					});
					anima.init();
				}
			})
		}
	})
	// Match Media
	var model;
	var mql = window.matchMedia('(max-width: 750px)');
	function moveElement(e) {
		if (e.matches) {
			model = 'sp';
			$('.footer').find('.footer__left').append($('.footer').find('.table__schedule'));
			$('.footer').find('.footer__right').prepend($('.footer').find('.footer__contact'))
		} else {
			model = 'pc';
			$('.footer').find('.footer__left').append($('.footer').find('.footer__contact'));
			$('.footer').find('.footer__right').prepend($('.footer').find('.table__schedule'))
		}
	}
	moveElement(mql);
	mql.addListener(moveElement);
	$(window).on('load scroll resize', function() {
		var winScrollTop = $(window).scrollTop(),
		posFooter = $('.footer').offset().top,
		ratio = $(window).width() > 1366 && $(window).width() < 751 ? 1 : $('#wrapper').width()/$(window).width();
		if (winScrollTop > 300 && ((winScrollTop + $(window).height()*ratio - 120) < posFooter)) {
			$('#pnavi').addClass('fixed');
		} else {
			$('#pnavi').removeClass('fixed');
		}
	});
	$('.header__nav .menu li, .footer__fnavi li').find('a').each(function() {
		var path =new $.PATTERN.uriObj($(this).attr('href'));
		var pathlocation = new $.PATTERN.uriObj(location.pathname);
		if(path.trimPath === pathlocation.trimPath && $(this).attr('href') !== '#') {
			$(this).parent().addClass('active')
		}
	})
		// タップ時のクリックイベント送信
	$('.js-tap').on('click', function(){
		if($(this).hasClass('is-tel')){
			// telタップ
			gtag('event','tel-tap',{'event_category': 'click','event_label': 'label'});
		}else if ($(this).hasClass('is-web')) {
			// 予約タップ
			gtag('event','yoyaku-tap',{'event_category': 'click1','event_label': 'label'});
		} else if ($(this).hasClass('is-line')) {
			// lineタップ
			gtag('event','line-tap',{'event_category': 'click2','event_label': 'label'});
		}
	});

	// ifarme レスポンシブ対応
	var $iframe = $('.m-blog_body iframe');
	$iframe.each(function() {
		var $self = $(this);
		var src = $self.attr('src');
		let cls;
		if (src.indexOf('google.com') !== -1) {
			cls = 'googlemap';
		} else if (src.indexOf('youtube.com') !== -1) {
			cls = 'youtube';
		}
		$self.wrap('<div class="' + cls + '"></div>');
	});

	if($('.js-smartpaginator').length){
		// 記事ページページャー
		$('.js-smartpaginator').smartpaginator({
			totalrecords: $('.m-blog_article article').length,
			recordsperpage: 10,
			datacontainer: 'm-blog_article',
			dataelement: 'article',
		});
	}
})(jQuery);


var wow = new WOW(
	{
		boxClass:     'wow',
		animateClass: 'animated',
		offset:       0,
		mobile:       true,
		live:         true
	}
);
wow.init();
