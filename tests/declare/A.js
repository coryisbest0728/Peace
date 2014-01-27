define(["peace/declare"], function (declare) {
	
	return declare(null, {
		
		constructor: function () {
			console.log("A.constructor");
		},
		
		before: function () {
			console.log("before");
		}
	});
});
