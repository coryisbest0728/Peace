define(["peace/declare", "tests/declare/B"], function (declare, B) {
	
	return declare(B, {
		
		name: "C",
		
		constructor: function () {
			console.log("C.constructor");
		},
		
		print: function (arg1) {
			this._super(arguments, [arg1, 65]);
		}
	});
});
