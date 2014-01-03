define(
	[ ],
	function () {

		var Browser = {
				Version: function() {
					var version = 999; // we assume a sane browser
					if (navigator.appVersion.indexOf("MSIE") != -1)
					// bah, IE again, lets downgrade version number
					version = parseFloat(navigator.appVersion.split("MSIE")[1]);
					return version;
				}
			},
			obj = {};

		obj.isIE		= /*@cc_on!@*/false && Browser.Version() <= 9;

		// obj.isIE7		= /*@cc_on!@*/false && Browser.Version() < 8;
		// obj.isIE9		= /*@cc_on!@*/false && Browser.Version() == 9;
		// obj.isIE8		= obj.isIE && !obj.isIE7 && !obj.isIE9;

		obj.isIE7		= $( 'html' ).hasClass( 'is-ie7' );
		obj.isIE8		= $( 'html' ).hasClass( 'is-ie8' );
		obj.isIE9		= obj.isIE && !obj.isIE7 && !obj.isIE8;

		obj.isIOS		= (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad Simulator");
		obj.isIPAD		= (navigator.platform == "iPad" || navigator.platform == "iPad Simulator");
		obj.isIPHONE	= (navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "iPhone Simulator");
		obj.isFF		= navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		obj.isPhone		= navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/);
		obj.isDevice	= obj.isPhone || obj.isIPAD;
		obj.isFakePhone	= ( (window.location + "").indexOf( '?mobile' ) !== -1 ) || ( (window.location + "").indexOf( '&mobile' ) !== -1 );
		obj.isMobile	= obj.isPhone || obj.isFakePhone;

		obj.transformVendor = (function() {

			var property	= "Transform",
				prefixes	= ['Moz', 'ms', 'Webkit', 'O'],
				transform	= "";

			for (var i=0, j=prefixes.length; i < j; i++) {
				if (typeof document.body.style[prefixes[i]+property] !== 'undefined') {

					transform = prefixes[i] + "Transform";
				}
			}

			if	(transform === "") transform = "msTransform";

			return transform;
		})();

		obj.transformVendorHyph = (function() {
			return obj.transformVendor.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
		})();

		obj.hasInputPlaceholder = (function() {
			return 'placeholder' in document.createElement('input');
		})();

		return obj;
	}
);

