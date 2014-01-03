// ----
// PreloadExtra
// ----
// Simple batch image loader that loads in the background
// Expects full path
// ----

define(
	[
		'signals'
	],
	function ( signals ) {

		var loader = function ( ) {

			this._imgs			= [];
			this._imgsTotal		= 0;
			this._imgsLoaded	= 0;
			this._loaded		= false;
			this._loading		= false;
			this._percent		= 0;
			this._callback		= null;

			this.loaded			= new signals.Signal();
			this.failed			= new signals.Signal();
			this.done			= new signals.Signal();
			this.cancelled		= new signals.Signal();
		};

		loader.prototype._setup = function ( imgsToLoad, callback ) {

			if ( this._loading ) this.cancelled.dispatch();

			this._imgs			= imgsToLoad;
			this._imgsTotal		= this._imgs.length;
			this._imgsLoaded	= 0;
			this._loaded		= false;
			this._loading		= true;
			this._percent		= 0;
			this._callback		= callback || function () {};
		};

		loader.prototype.preload = function ( imgsToLoad, callback ) {

			this._setup( imgsToLoad, callback );

			if ( this._imgsTotal === 0 ) this._preloadEnd();
			else {

				var self			= this,
					callbackLoad	= function ( event ) { self._preloadImageEnd( $( this )[ 0 ].src ); },
					callbackError	= function ( event ) { self._preloadImageError( $( this )[ 0 ].src ); };

				for (var i = 0; i < this._imgsTotal; i++) {

					$('<img />').
					load( callbackLoad ).
					error( callbackError ).
					attr( 'src', this._imgs[ i ] );
				}
			}
		};

		loader.prototype._preloadImageEnd = function ( url ) {

			this._imgsLoaded++;
			this._percent = ( (this._imgsLoaded * 100) / this._imgsTotal ) >> 0;

			this.loaded.dispatch( url, this._percent );

			if (this._imgsLoaded == this._imgsTotal) this._preloadEnd();
		};

		loader.prototype._preloadImageError = function ( url ) {

			// warn that an error has happened
			console.warn( 'preload error', url );
			this.failed.dispatch( url );

			// beahave as loaded
			this._preloadImageEnd( url );
		};

		loader.prototype._preloadEnd = function () {

			this._loading	= false;
			this._loaded	= true;
			this.done.dispatch( this._percent );
			this._callback();
		};

		return loader;

	}
);
