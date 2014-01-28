define(["peace/declare", "tests/declare/A"], function (declare, A) {
	
	return declare(A, {
		
		name: "B",
		
		constructor: function () {
			console.log("B.constructor");
		},
		
		before: function () {
			this._super(arguments);
			console.log("beforeMain");
		},
		
		print: function (arg1, arg2) {
			console.debug("print:", arg1, arg2);
		}
	});
});
