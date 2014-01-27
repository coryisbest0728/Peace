define(["peace/declare", "tests/declare/_Test"], function (declare, _Test) {
	
	return declare("tests.declare.Main", _Test, {
		
		constructor: function () {
			console.debug("main: 123");
		},
		
		before: function () {
			console.debug("beforeMain");
		},
		
		operate: function () {
			console.debug("operate");
		}
	});
});
