define(["peace/declare"], function (declare) {
	
	return declare("tests.declare._Test", null, {
		
		constructor: function () {
			console.debug("123");
		},
		
		before: function () {
			console.debug("before");
		}
	});
});
