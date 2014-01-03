// ------------------
// Local Storage
// ------------------
//
// ------------------

define(
	[

	],
	function ( ) {

		var storage = function ( ) {

			this.enabled = ( !window.localStorage )? false : true;
		};

		storage.prototype.set = function ( key, value ) {

			if( ! this.enabled ) {
				return false;
			}

			switch ( typeof value ) {

				case 'string':
					window.localStorage.setItem( key, value );
					break;

				case 'object':
					window.localStorage.setItem( key, JSON.stringify( value ) );
					break;

				default:
					window.localStorage.setItem( key, value );
					break;
			}
		};

		storage.prototype.clear = function ( key ) {

			if( ! this.enabled ) {
				return false;
			}

			window.localStorage.removeItem( key );

			// console.log( 'localStorage clear', key, this.get( key ) );
		};

		storage.prototype.get = function ( key, noParse ) {

			if( ! this.enabled ) {
				return false;
			}

			var item = window.localStorage.getItem( key );

			if ( typeof item === undefined ) return false;
			if ( noParse ) return item;

			try {

				return JSON.parse( item );

			} catch ( err ) {

				return item;
			}
		};

		storage.prototype.add = function ( key, value ) {

			if( ! this.enabled ) {
				return false;
			}

			if ( !this.get( key ) ) {

				// Item doesn't exist yet, create it
				this.set( key, JSON.stringify( value ) );

			} else {

				try {

					var item = JSON.parse( this.get( key, true ) );
					item.push( value );
					this.set( key, item );

				} catch ( err ) {

					this.set( key, value );
				}

			}

			// console.log( 'localStorage add', window.localStorage.getItem( key ) );
		};

		return storage;
	}
);










