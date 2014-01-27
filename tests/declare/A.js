define(["peace/declare"], function (declare) {
	
	return declare(null, {
		
		constructor: function () {
			console.debug("A.constructor");
		},
		
		before: function () {
			console.debug("before");
		}
	});
});
