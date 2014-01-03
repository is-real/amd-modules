define(
	[],
	function() {

		var obj	= {};

		obj.randomFromTo = function (from, to) {
			return Math.floor(Math.random() * (to - from + 1) + from);
		};

		obj.lerp = function (ratio, start, end) {
			return start + (end - start) * ratio;
		};

		obj.norm = function (val, min, max) {
			return (val - min) / (max - min);
		};

		obj.map = function (val, min1, max1, min2, max2) {
			return obj.lerp( obj.norm(val, min1, max1), min2, max2 );
		};

		obj.clamp = function (val, min, max) {
			return val < min? min : (val > max? max : val);
		};

		return obj;
	}
);

