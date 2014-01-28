define(function () {
	// module:
	//		peace/declare
	
	var op = Object.prototype,
		opts = op.toString,
		xtor = new Function;
	
	// err function as warning
	function err (msg, cls) {
		throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
	}
	
	// mixin source for the safe way.
	function safeMixin (target, source) {
		var name = "",
			t;
		for (name in source) {
			t = source[name];
			if ((t !== op[name] || !(name in op)) && name !== "constructor") { // skipped a constructor
				if(opts.call(t) == "[object Function]"){
					// non-trivial function method => attach its name
					t.nom = name;
				}
				target[name] = t;
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
	
	function _super(args, newArgs) {
		var caller = args.callee,
			meta = this.constructor._meta,
			bases = meta.bases;
		
		if (newArgs) {
			for (var i = 0, j = newArgs.length; i < j; ++i) {
				args[i] = newArgs[i];
			}
		}
		
		// cause of single inheritance
		var superclass = bases[1];
		if (superclass) {
			superclass.prototype[caller.nom].apply(this, args);
		}
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
			
			// the meta in this class.
			// I put it in the constructor.
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
		proto._super = _super;
		
		if (className) {
			proto.declaredClass = className;
		}
		return ctor;
	};
	
});
