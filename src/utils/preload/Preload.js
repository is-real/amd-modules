// ----
// Preload
// ----
// Simple batch image loader
// ----

define(
	[
		'signals'
	],
	function ( signals ) {

		// Private variables
		var _imgs		= [],
			_imgsTotal	= 0,
			_imgsLoaded	= 0,
			_loading	= false,
			_loaded		= false,
			_callback	= null,
			_percent	= 0;

		// Public variables
		var obj					= {};
			obj.loaded			= new signals.Signal();
			obj.failed			= new signals.Signal();
			obj.done			= new signals.Signal();
			obj.cancelled		= new signals.Signal();


		// Private methods

		function _start ( imgsToLoad, callback, fullPath ) {

			if ( _loading ) obj.cancelled.dispatch();

			_imgs		= ( fullPath )? imgsToLoad : _formatImagesPath( imgsToLoad );
			_imgsTotal	= _imgs.length;
			_imgsLoaded = 0;
			_loaded		= false;
			_percent	= 0;
			_callback	= callback || function () {};

			_preload();
		}

		function _formatImagesPath ( imgsToLoad ) {

			// Format the path of the images

			var images	= [],
				c		= 0;

			for ( var i = 0; i < imgsToLoad.length; i++ ) {

				var img			= imgsToLoad[i],
					imgSplit	= img.split("|");

				if ( imgSplit.length > 1 ) {

					// routes ( well known or custom )

					switch ( imgSplit[ 0 ] ) {

						case "css" :

							img = require.mmr.assetsPath + "css/css-img/"+imgSplit[1];
							break;

						case "images" :

							img	= require.mmr.assetsPath + "images/"+imgSplit[1];
							break;

						case "custom" :

							img = imgSplit[1];
							break;
					}
					images[c] = img;
					c++;

				} else {

					// jQuery path

					var $img = $( img );

					for ( var j = 0; j < $img.length; j++ ) {

						images[c] = $img[j].src;
						c++;
					}
				}
			}

			return images;
		}

		function _preload () {

			_loading = true;

			if ( _imgsTotal === 0 ) _preloadEnd();
			else {

				var callbackLoad	= function ( event ) { _preloadImageEnd( $( this )[ 0 ].src ); },
					callbackError	= function ( event ) { _preloadImageError( $( this )[ 0 ].src ); };

				for (var i = 0; i < _imgsTotal; i++) {

					$('<img />').
					load( callbackLoad ).
					error( callbackError ).
					attr( 'src', _imgs[ i ] );
				}
			}
		}

		function _preloadImageEnd ( url ) {

			_imgsLoaded++;
			_percent = ( (_imgsLoaded * 100) / _imgsTotal ) >> 0;

			obj.loaded.dispatch( url, _percent );

			if (_imgsLoaded == _imgsTotal) _preloadEnd();
		}

		function _preloadImageError ( url ) {

			// warn that an error has happened
			console.warn( 'preload error', url );
			obj.failed.dispatch( url );

			// beahave as loaded
			_preloadImageEnd( url );
		}

		function _preloadEnd () {

			_loading	= false;
			_loaded		= true;
			obj.done.dispatch( _percent );
			_callback();
		}

		// Public methods
		obj.start	= _start;

		return obj;

	}
);
