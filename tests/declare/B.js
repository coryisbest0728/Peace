define(["peace/declare", "tests/declare/A"], function (declare, A) {
	
	return declare(A, {
		
		constructor: function () {
			console.debug("B.constructor");
		},
		
		before: function () {
			console.debug("beforeMain");
		},
		
		operate: function () {
			console.debug("operate");
		}
	});
});
