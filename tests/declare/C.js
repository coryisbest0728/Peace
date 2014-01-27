define(["peace/declare", "tests/declare/B"], function (declare, B) {
	
	return declare(B, {
		
		constructor: function () {
			console.log("C.constructor");
		}
	});
});
