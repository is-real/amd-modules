define(
	[],
	function() {

		var obj	= {};

		obj.isArray = function(a) {
			return Object.prototype.toString.apply(a) === '[object Array]';
		};

		obj.isValueInArray = function (arr, val) {
			for (var i = 0; i < arr.length; i++) if (val == arr[i]) return true;
			return false;
		};

		obj.shuffleArray = function (myArray) {
			// Fisher-Yates shuffle algorithm
			var i = myArray.length,
				j, tempi, tempj;
			if ( i === 0 ) return false;
			while ( --i ) {
				j			= Math.floor( Math.random() * ( i + 1 ) );
				tempi		= myArray[i];
				tempj		= myArray[j];
				myArray[i]	= tempj;
				myArray[j]	= tempi;
			}
		};

		obj.removeItemFromArray = function (arr, val) {
			var found = true;
			while (found) {
				found = false;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == val)  {
						arr.splice(i, 1);
						found = true;
						break;
					}
				}
			}
			return arr;
		};

		return obj;
	}
);

