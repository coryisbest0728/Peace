define(function () {
	// module:
	//		peace/declare
	
	var op = Object.prototype,
		xtor = new Function;
	
	// err function as warning
	function err (msg, cls) {
		throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
	}
	
	// mixin source for the safe way.
	function safeMixin (target, source) {
		var key = "",
			t;
		for (key in source) {
			t = source[key];
			if ((t !== op[key] || !(key in op)) && key !== "constructor") { // skipped a constructor
				target[key] = t;
			}
		}
		return target;
	}
	
	// simple constructor for ctor.
	function simpleConstructor(bases) {
		return function () {
			for (var i = bases.length - 1; i >= 0; --i) {
				var f = bases[i],
					m = f._meta;
				f = m ? m.ctor : f;
				if (f) {
					f.apply(this, arguments);
				}
			}
		};
	}
	
	return function declare(/*String?*/className, /*Function*/superclass, /*JsonObject？*/props) {
		// summary:
		//		This declare just only can extends one superclass right now.
		// className: String?
		//		The declared class name, as String.
		// superclass: Function
		//		The superclass of declared class.
		// props: JsonObject?
		//		The class properities.
		//
		// example:
		//	|	var A = declare(null, {
		//	|		constructor: function () {
		//	|			console.log("A.constructor");
		//	|		}
		//	|	});
		//	|	var B = declare(A, {
		//	|		constructor: function () {
		//	|			console.log("B.constructor");
		//	|		}
		//	|	});
		//	|	new B()
		//	|	// prints:
		//	|	// A.constructor
		//	|	// B.constructor
		
		// crack parameters
		if(typeof className != "string"){
			props = superclass;
			superclass = className;
			className = "";
		}
		props = props || {};
		
		var proto = {},
			bases = [];
		bases.push(null);
		if (superclass) { // one single
			xtor.prototype = superclass.prototype;
			proto = new xtor();
			
			var sm = superclass.prototype.constructor._meta;
			if (sm) {
				bases = bases.concat(sm.bases);
			} else {
				bases.push(superclass);
			}
		}
		
		// mixin props to proto
		safeMixin(proto, props);
		
		// add constructors
		var t = props.constructor;
		if(t !== op.constructor){
			proto.constructor = t;
		}
		
		var ctor = bases[0] = simpleConstructor(bases);
		ctor._meta = {
			bases: bases,
			ctor: props.constructor
		};
		ctor.prototype = proto;
		proto.constructor = ctor;
		
		if (className) {
			proto.declaredClass = className;
		}
		return ctor;
	};
	
});
