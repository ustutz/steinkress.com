(function ($global) { "use strict";
class Lambda {
	static fold(it,f,first) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			first = f(x1,first);
		}
		return first;
	}
}
Lambda.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
	static __interfLoop(cc,cl) {
		while(true) {
			if(cc == null) {
				return false;
			}
			if(cc == cl) {
				return true;
			}
			let intf = cc.__interfaces__;
			if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
				let _g = 0;
				let _g1 = intf.length;
				while(_g < _g1) {
					let i = _g++;
					let i1 = intf[i];
					if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
						return true;
					}
				}
			}
			cc = cc.__super__;
		}
	}
	static __instanceof(o,cl) {
		if(cl == null) {
			return false;
		}
		switch(cl) {
		case Array:
			return ((o) instanceof Array);
		case Bool:
			return typeof(o) == "boolean";
		case Dynamic:
			return o != null;
		case Float:
			return typeof(o) == "number";
		case Int:
			if(typeof(o) == "number") {
				return ((o | 0) === o);
			} else {
				return false;
			}
			break;
		case String:
			return typeof(o) == "string";
		default:
			if(o != null) {
				if(typeof(cl) == "function") {
					if(js_Boot.__downcastCheck(o,cl)) {
						return true;
					}
				} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
					if(((o) instanceof cl)) {
						return true;
					}
				}
			} else {
				return false;
			}
			if(cl == Class ? o.__name__ != null : false) {
				return true;
			}
			if(cl == Enum ? o.__ename__ != null : false) {
				return true;
			}
			return false;
		}
	}
	static __downcastCheck(o,cl) {
		if(!((o) instanceof cl)) {
			if(cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static __cast(o,t) {
		if(o == null || js_Boot.__instanceof(o,t)) {
			return o;
		} else {
			throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __isNativeObj(o) {
		return js_Boot.__nativeClassName(o) != null;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = true;
class mailscript_MailscriptMain {
	static main() {
		let form = window.document.getElementById("contactForm");
		let submit = window.document.getElementById("submit-btn");
		let _this = ["name","email","subject"];
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = js_Boot.__cast(window.document.getElementById(_this[i]) , HTMLInputElement);
		}
		let fields = result;
		let _g2 = 0;
		while(_g2 < fields.length) {
			let field = fields[_g2];
			++_g2;
			field.addEventListener("blur",function(e) {
				let inputElement = js_Boot.__cast(e.target , HTMLInputElement);
				mailscript_MailscriptMain.markIfEmpty(inputElement);
			});
		}
		let messageField = js_Boot.__cast(window.document.getElementById("message") , HTMLTextAreaElement);
		let checkbox = js_Boot.__cast(window.document.getElementById("checkbox") , HTMLInputElement);
		checkbox.addEventListener("click",function(e) {
			if(checkbox.checked) {
				checkbox.classList.remove("checkbox-red");
			}
		});
		let closeModal = window.document.getElementById("close_modal");
		closeModal.addEventListener("click",function(e) {
			return $("#responseModal").modal("hide");
		});
		form.addEventListener("submit",function(e) {
			e.preventDefault();
			let isFieldEmpty = Lambda.fold(fields,function(field,error) {
				if(field.value == "") {
					return true;
				} else {
					return error;
				}
			},false);
			if(isFieldEmpty) {
				let _g = 0;
				while(_g < fields.length) {
					let field = fields[_g];
					++_g;
					mailscript_MailscriptMain.markIfEmpty(field);
				}
			}
			if(!checkbox.checked) {
				checkbox.classList.add("checkbox-red");
			}
			if(!isFieldEmpty && checkbox.checked) {
				let formData = new FormData(window.document.forms.contact);
				let submitText = submit.innerHTML;
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function(e) {
					if(xhr.readyState == 4) {
						submit.innerHTML = submitText;
						let headlineElement = window.document.getElementById("response_headline");
						let contentElement = window.document.getElementById("response_content");
						$("#responseModal").modal("show");
						if(xhr.status == 200 && xhr.response != "error") {
							headlineElement.innerHTML = headlineElement.dataset.success;
							contentElement.innerHTML = contentElement.dataset.success;
						} else {
							headlineElement.innerHTML = headlineElement.dataset.failure;
							contentElement.innerHTML = contentElement.dataset.failure;
						}
					}
				};
				xhr.open("POST","./sendit.php");
				xhr.send(formData);
				submit.innerHTML = "Sending...";
			}
		});
	}
	static markIfEmpty(inputElement) {
		if(inputElement.value == "") {
			inputElement.classList.add("form-error");
		} else {
			inputElement.classList.remove("form-error");
		}
	}
}
mailscript_MailscriptMain.__name__ = true;
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
{
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
	var Int = { };
	var Dynamic = { };
	var Float = Number;
	var Bool = Boolean;
	var Class = { };
	var Enum = { };
}
js_Boot.__toStr = ({ }).toString;
mailscript_MailscriptMain.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=mail-script.js.map