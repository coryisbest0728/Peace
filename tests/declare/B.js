define(["peace/declare", "tests/declare/A"], function (declare, A) {
	
	return declare(A, {
		
		constructor: function () {
			console.log("B.constructor");
		},
		
		before: function () {
			console.log("beforeMain");
		},
		
		operate: function () {
			console.log("operate");
		}
	});
});
