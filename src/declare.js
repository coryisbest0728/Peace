define(function () {
	// module:
	//		peace/declare
	
	var op = Object.prototype,
		opts = op.toString(),
		xtor = new Function;
	
	function err (msg, cls) {
		throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
	}
	
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
	
	function simpleConstructor(bases) {
		return function () {
			for (var i = 0, j = bases.length; i < j; ++i) {
				var f = bases[i],
					m = f._meta;
				f = m ? m.ctor : f;
				if (f) {
					f.apply(this, arguments);
				}
			}
		};
	}
	
	return function declare(/*String?*/className, /*Function|Function[]*/superclass, /*JsonObject？*/props) {
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
			
			bases.push(superclass);
		}
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
