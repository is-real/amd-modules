define(
	[
		'signals',
		'utils/browser/RAF'
	],
	function ( signals, RAF ) {

		// Private variables
		var _$window, _$body, _stoResize, _ticking;


		// Public variables
		var obj					= {};
			obj.window			= $( ".mmr" );
			obj.SCREEN_WIDTH	= obj.window.width();// window.innerWidth;
			obj.SCREEN_HEIGHT	= obj.window.height();//window.innerHeight;
			obj.SCROLL_TOP		= 0;
			obj.resized			= new signals.Signal();
			obj.resizedDelay	= new signals.Signal();
			obj.scrolled		= new signals.Signal();
			obj.scrolling		= false;




		// Private methods
		function init () {

			_$window		= $(window);
			_$body			= $('body');
			_stoResize		= 0;
			_ticking		= false;
			obj.SCROLL_TOP	= _$window.scrollTop();

			RAF.init();
			addEventListeners();
		}

		function addEventListeners() {

			_$window.on('resize', onWindowResize);
			_$window.on('orientationchange', onWindowResize);
			_$window.on('mousewheel', onMouseWheel);
			// _$window.on('scroll', onWindowScroll);
		}

		function onWindowResize (e) {

			obj.SCREEN_WIDTH    = obj.window.width();// window.innerWidth;
			obj.SCREEN_HEIGHT	= obj.window.height();//window.innerHeight;

			obj.resized.dispatch(obj.SCREEN_WIDTH, obj.SCREEN_HEIGHT);

			clearTimeout(_stoResize);
			_stoResize = setTimeout( function () {
				obj.resizedDelay.dispatch(obj.SCREEN_WIDTH, obj.SCREEN_HEIGHT);
			}, 250);
		}

		function onMouseWheel (e, delta) {

			if ( obj.scrolling ) {

				$('body').stop();
				obj.scrolling = false;
			}
		}

		function onWindowScroll (e) {

			obj.SCROLL_TOP = _$window.scrollTop();
			requestScrollTick();
		}

		function requestScrollTick ( ) {

			if (!_ticking) {

				requestAnimationFrame( updateScroll );
				_ticking = true;
			}
		}

		function updateScroll () {

			obj.scrolled.dispatch(obj.SCROLL_TOP);
			_ticking = false;
		}

		function scrollToElement ($element, speed) {

			scrollToPosition( $element.offset().top, speed );
		}

		function scrollToPosition (pos, speed, callback) {

			obj.scrolling = true;
			var scrollSpeed = (speed || speed === 0)? speed : 1000;
			$('html, body').stop().animate({ scrollTop: pos + 'px' }, scrollSpeed, 'easeInOutQuart', function () {
				obj.scrolling = false;
				if ( callback ) callback();
			});
		}

		function scrollToPositionHelper (pos, speed, tween, callback) {

			var scrollSpeed = (speed || speed === 0)? speed : 1000,
				tweenStyle	= (tween)? tween : 'easeInOutQuart',
				callbackEnd	= (callback)? callback : function () { };
			$('html, body').stop().animate({ scrollTop: pos + 'px' }, scrollSpeed, tweenStyle, callbackEnd);
		}

		function showScroll () {

			_$body.addClass('scroll');
		}

		function hideScroll () {

			_$body.removeClass('scroll');
		}

		function getScrollPosition () {

			return window.pageYOffset;
		}

		// Public methods
		obj.init					= init;
		obj.resize					= onWindowResize;
		obj.scrollToElement			= scrollToElement;
		obj.scrollToPosition		= scrollToPosition;
		obj.scrollToPositionHelper	= scrollToPositionHelper;
		obj.getScrollPosition		= getScrollPosition;
		obj.showScroll				= showScroll;
		obj.hideScroll				= hideScroll;

		init();

		return obj;
	}
);