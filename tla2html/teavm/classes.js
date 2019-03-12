"use strict";
var main;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : 0;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    var arr = new ($rt_arraycls(cls))(data);
    if (sz > 0) {
        var i = 0;
        do  {
            data[i] = null;
            i = i + 1 | 0;
        }while (i < sz);
    }
    return arr;
}
function $rt_wrapArray(cls, data) {
    return new ($rt_arraycls(cls))(data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new ($rt_arraycls(cls))(new Array(sz));
}
function $rt_createLongArray(sz) {
    var data = new Array(sz);
    var arr = new ($rt_arraycls($rt_longcls()))(data);
    for (var i = 0;i < sz;i = i + 1 | 0) {
        data[i] = Long_ZERO;
    }
    return arr;
}
function $rt_createNumericArray(cls, nativeArray) {
    return new ($rt_arraycls(cls))(nativeArray);
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = function(data) {
            this.data = data;
            this.$id$ = 0;
        };
        arraycls.prototype = new ($rt_objcls())();
        arraycls.prototype.constructor = arraycls;
        arraycls.prototype.toString = function() {
            var str = "[";
            for (var i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        $rt_setCloneMethod(arraycls.prototype, function() {
            var dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (var i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new arraycls(dataCopy);
        });
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_objcls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
var $rt_stdoutBuffer = "";
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.info($rt_stdoutBuffer);
        }
        $rt_stdoutBuffer = "";
    } else {
        $rt_stdoutBuffer += String.fromCharCode(ch);
    }
};
var $rt_stderrBuffer = "";
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.error($rt_stderrBuffer);
        }
        $rt_stderrBuffer = "";
    } else {
        $rt_stderrBuffer += String.fromCharCode(ch);
    }
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
function $rt_doubleToLongBits(n) {
    $rt_numberConversionView.setFloat64(0, n, true);
    return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
}
function $rt_longBitsToDouble(n) {
    $rt_numberConversionView.setInt32(0, n.lo, true);
    $rt_numberConversionView.setInt32(4, n.hi, true);
    return $rt_numberConversionView.getFloat64(0, true);
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e.$javaException === 'object' ? e.$javaException : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err.$javaException;
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
Long.prototype.toString = function() {
    var result = [];
    var n = this;
    var positive = Long_isPositive(n);
    if (!positive) {
        n = Long_neg(n);
    }
    var radix = new Long(10, 0);
    do  {
        var divRem = Long_divRem(n, radix);
        result.push(String.fromCharCode(48 + divRem[1].lo));
        n = divRem[0];
    }while (n.lo !== 0 || n.hi !== 0);
    result = (result.reverse()).join('');
    return positive ? result : "-" + result;
};
Long.prototype.valueOf = function() {
    return Long_toNumber(this);
};
var Long_ZERO = new Long(0, 0);
var Long_MAX_NORMAL = 1 << 18;
function Long_fromInt(val) {
    return val >= 0 ? new Long(val, 0) : new Long(val,  -1);
}
function Long_fromNumber(val) {
    if (val >= 0) {
        return new Long(val | 0, val / 0x100000000 | 0);
    } else {
        return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
    }
}
function Long_toNumber(val) {
    var lo = val.lo;
    var hi = val.hi;
    if (lo < 0) {
        lo += 0x100000000;
    }
    return 0x100000000 * hi + lo;
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a / b | 0;
};
var $rt_umod = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a % b | 0;
};
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return jl_Thread_currentThread();
}
function $rt_setThread(t) {
    return jl_Thread_setCurrentThread(t);
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
var $java = Object.create(null);
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object_monitorEnterSync(var$1) {
    var var$2;
    if (var$1.$monitor === null)
        jl_Object_createMonitor(var$1);
    if (var$1.$monitor.$owner === null)
        var$1.$monitor.$owner = jl_Thread_currentThread();
    else if (var$1.$monitor.$owner !== jl_Thread_currentThread())
        $rt_throw(jl_IllegalStateException__init_($rt_s(0)));
    var$2 = var$1.$monitor;
    var$2.$count = var$2.$count + 1 | 0;
}
function jl_Object_monitorExitSync(var$1) {
    var var$2, var$3;
    if (!var$1.$isEmptyMonitor() && var$1.$monitor.$owner === jl_Thread_currentThread()) {
        var$2 = var$1.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (!var$3)
            var$1.$monitor.$owner = null;
        var$1.$isEmptyMonitor();
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_());
}
function jl_Object_monitorEnter(var$1) {
    jl_Object_monitorEnter0(var$1, 1);
}
function jl_Object_monitorEnter0(var$1, var$2) {
    var var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (var$1.$monitor === null)
            jl_Object_createMonitor(var$1);
        if (var$1.$monitor.$owner === null)
            var$1.$monitor.$owner = jl_Thread_currentThread();
        if (var$1.$monitor.$owner === jl_Thread_currentThread()) {
            var$3 = var$1.$monitor;
            var$3.$count = var$3.$count + var$2 | 0;
            return;
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait(var$1, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, var$2, var$3, $ptr);
}
function jl_Object_createMonitor(var$1) {
    var$1.$monitor = jl_Object$Monitor__init_();
}
function jl_Object_monitorEnterWait(var$1, var$2) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Object_monitorEnterWait0(var$1, var$2, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Object_monitorEnterWait0(var$1, var$2, var$3) {
    var $thread, var$5, $monitor;
    $thread = jl_Thread_currentThread();
    if (var$1.$monitor === null) {
        jl_Object_createMonitor(var$1);
        jl_Thread_setCurrentThread($thread);
        var$5 = var$1.$monitor;
        var$5.$count = var$5.$count + var$2 | 0;
        var$3.$complete(null);
        return;
    }
    if (var$1.$monitor.$owner === null) {
        var$1.$monitor.$owner = $thread;
        jl_Thread_setCurrentThread($thread);
        var$5 = var$1.$monitor;
        var$5.$count = var$5.$count + var$2 | 0;
        var$3.$complete(null);
        return;
    }
    $monitor = var$1.$monitor;
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = otp_Platform_createQueue$js_body$_30();
    otp_PlatformQueue_add$static($monitor.$enteringThreads, jl_Object$monitorEnterWait$lambda$_6_0__init_($thread, var$1, var$2, var$3));
}
function jl_Object_monitorExit(var$1) {
    jl_Object_monitorExit0(var$1, 1);
}
function jl_Object_monitorExit0(var$1, var$2) {
    var $monitor;
    if (!var$1.$isEmptyMonitor() && var$1.$monitor.$owner === jl_Thread_currentThread()) {
        $monitor = var$1.$monitor;
        $monitor.$count = $monitor.$count - var$2 | 0;
        if ($monitor.$count > 0)
            return;
        $monitor.$owner = null;
        if ($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads))
            otp_Platform_postpone(jl_Object$monitorExit$lambda$_8_0__init_(var$1));
        else
            var$1.$isEmptyMonitor();
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_());
}
function jl_Object_waitForOtherThreads(var$1) {
    var $monitor, $enteringThreads, $r;
    if (!var$1.$isEmptyMonitor() && var$1.$monitor.$owner === null) {
        $monitor = var$1.$monitor;
        if ($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads)) {
            $enteringThreads = $monitor.$enteringThreads;
            $r = otp_PlatformQueue_remove$static($enteringThreads);
            if ($enteringThreads === null)
                $monitor.$enteringThreads = null;
            $r.$run();
        }
        return;
    }
}
function jl_Object_isEmptyMonitor(var$0) {
    var $monitor, var$2;
    $monitor = var$0.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        b: {
            if ($monitor.$owner === null) {
                if ($monitor.$enteringThreads !== null) {
                    var$2 = $monitor.$enteringThreads;
                    if (!otp_PlatformQueue_isEmpty$static(var$2))
                        break b;
                }
                if ($monitor.$notifyListeners === null)
                    break a;
                var$2 = $monitor.$notifyListeners;
                if (otp_PlatformQueue_isEmpty$static(var$2))
                    break a;
            }
        }
        return 0;
    }
    jl_Object_deleteMonitor(var$0);
    return 1;
}
function jl_Object_deleteMonitor(var$0) {
    var$0.$monitor = null;
}
function jl_Object__init_0(var$0) {
    return;
}
function jl_Object_getClass(var$0) {
    return jl_Class_getClass(var$0.constructor);
}
function jl_Object_hashCode(var$0) {
    return var$0.$identity();
}
function jl_Object_equals(var$0, var$1) {
    return var$0 !== var$1 ? 0 : 1;
}
function jl_Object_toString(var$0) {
    return jl_StringBuilder__init_().$append(var$0.$getClass0().$getName()).$append($rt_s(1)).$append(jl_Integer_toHexString(var$0.$identity())).$toString();
}
function jl_Object_identity(var$0) {
    var $platformThis, var$2;
    $platformThis = var$0;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return var$0.$id$;
}
function jl_Object_clone(var$0) {
    var var$1, $result, var$3;
    if (!$rt_isInstance(var$0, jl_Cloneable)) {
        var$1 = var$0;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_());
    }
    $result = otp_Platform_clone(var$0);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
}
function jl_Object_lambda$monitorExit$2(var$1) {
    jl_Object_waitForOtherThreads(var$1);
}
function jl_Object_lambda$monitorEnterWait$0(var$1, var$2, var$3, var$4) {
    var var$5;
    jl_Thread_setCurrentThread(var$1);
    var$2.$monitor.$owner = var$1;
    var$5 = var$2.$monitor;
    var$5.$count = var$5.$count + var$3 | 0;
    var$4.$complete(null);
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_() {
    var var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
}
function jl_Throwable__init_1(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_2(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_3(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_4(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0(var$0) {
    var$0.$suppressionEnabled = 1;
    var$0.$writableStackTrace = 1;
    var$0.$fillInStackTrace();
}
function jl_Throwable__init_2(var$0, var$1) {
    var$0.$suppressionEnabled = 1;
    var$0.$writableStackTrace = 1;
    var$0.$fillInStackTrace();
    var$0.$message = var$1;
}
function jl_Throwable__init_4(var$0, var$1) {
    var$0.$suppressionEnabled = 1;
    var$0.$writableStackTrace = 1;
    var$0.$fillInStackTrace();
    var$0.$cause = var$1;
}
function jl_Throwable_fillInStackTrace(var$0) {
    return var$0;
}
function jl_Throwable_getMessage(var$0) {
    return var$0.$message;
}
function jl_Exception() {
    jl_Throwable.call(this);
}
function jl_Exception__init_() {
    var var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
}
function jl_Exception__init_1(var_0) {
    var var_1 = new jl_Exception();
    jl_Exception__init_2(var_1, var_0);
    return var_1;
}
function jl_Exception__init_0(var$0) {
    jl_Throwable__init_0(var$0);
}
function jl_Exception__init_2(var$0, var$1) {
    jl_Throwable__init_2(var$0, var$1);
}
function jl_RuntimeException() {
    jl_Exception.call(this);
}
function jl_RuntimeException__init_0() {
    var var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_1(var_0);
    return var_0;
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_2(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_1(var$0) {
    jl_Exception__init_0(var$0);
}
function jl_RuntimeException__init_2(var$0, var$1) {
    jl_Exception__init_2(var$0, var$1);
}
function jl_IndexOutOfBoundsException() {
    jl_RuntimeException.call(this);
}
function jl_IndexOutOfBoundsException__init_() {
    var var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_IndexOutOfBoundsException__init_1(var_0) {
    var var_1 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_2(var_1, var_0);
    return var_1;
}
function jl_IndexOutOfBoundsException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function jl_IndexOutOfBoundsException__init_2(var$0, var$1) {
    jl_RuntimeException__init_2(var$0, var$1);
}
function ji_Serializable() {
}
function jl_Number() {
    jl_Object.call(this);
}
function jl_Comparable() {
}
function jl_Float() {
    jl_Number.call(this);
}
var jl_Float_NaN = 0.0;
var jl_Float_TYPE = null;
function jl_Float_$callClinit() {
    jl_Float_$callClinit = $rt_eraseClinit(jl_Float);
    jl_Float__clinit_();
}
function jl_Float__clinit_() {
    jl_Float_NaN = NaN;
    jl_Float_TYPE = $rt_cls($rt_floatcls());
}
function otj_JSObject() {
}
function otjdx_Node() {
}
function otjdx_Node_delete$static(var$1) {
    if (var$1.parentNode !== null)
        var$1.parentNode.removeChild(var$1);
}
function otjdx_Document() {
}
function ju_Arrays() {
    jl_Object.call(this);
}
function ju_Arrays_copyOf(var$1, var$2) {
    var var$3, $result, $sz, $i;
    var$3 = var$1.data;
    $result = $rt_createCharArray(var$2);
    $sz = jl_Math_min(var$2, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_copyOf0(var$1, var$2) {
    var var$3, $result, $sz, $i;
    var$3 = var$1.data;
    $result = jlr_Array_newInstance(var$1.$getClass0().$getComponentType(), var$2);
    $sz = jl_Math_min(var$2, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_binarySearch(var$1, var$2) {
    return ju_Arrays_binarySearch0(var$1, 0, var$1.data.length, var$2);
}
function ju_Arrays_binarySearch0(var$1, var$2, var$3, var$4) {
    var $u, var$6, $i, $e;
    if (var$2 > var$3)
        $rt_throw(jl_IllegalArgumentException__init_());
    $u = var$3 - 1 | 0;
    while (true) {
        var$6 = var$1.data;
        $i = (var$2 + $u | 0) / 2 | 0;
        $e = var$6[$i];
        if ($e == var$4)
            break;
        if (var$4 >= $e) {
            var$2 = $i + 1 | 0;
            if (var$2 > $u)
                return  -$i - 2 | 0;
        } else {
            $u = $i - 1 | 0;
            if ($u < var$2)
                return  -$i - 1 | 0;
        }
    }
    return $i;
}
function ju_Arrays_asList(var$1) {
    return ju_Arrays$ArrayAsList__init_(var$1);
}
function jl_AutoCloseable() {
}
function ji_Closeable() {
}
function ji_Flushable() {
}
function ji_OutputStream() {
    jl_Object.call(this);
}
function ji_OutputStream__init_() {
    var var_0 = new ji_OutputStream();
    ji_OutputStream__init_0(var_0);
    return var_0;
}
function ji_OutputStream__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function ji_OutputStream_write(var$0, var$1, var$2, var$3) {
    var $i, var$5, var$6;
    $i = 0;
    while ($i < var$3) {
        var$5 = var$1.data;
        var$6 = var$2 + 1 | 0;
        var$0.$write(var$5[var$2]);
        $i = $i + 1 | 0;
        var$2 = var$6;
    }
}
function jl_ConsoleOutputStreamStdout() {
    ji_OutputStream.call(this);
}
function jl_ConsoleOutputStreamStdout__init_() {
    var var_0 = new jl_ConsoleOutputStreamStdout();
    jl_ConsoleOutputStreamStdout__init_0(var_0);
    return var_0;
}
function jl_ConsoleOutputStreamStdout__init_0(var$0) {
    ji_OutputStream__init_0(var$0);
}
function jl_ConsoleOutputStreamStdout_write(var$0, var$1) {
    $rt_putStdout(var$1);
}
function ju_Enumeration() {
}
function jl_System() {
    jl_Object.call(this);
}
var jl_System_outCache = null;
var jl_System_errCache = null;
function jl_System_out() {
    if (jl_System_outCache === null)
        jl_System_outCache = ji_PrintStream__init_(jl_ConsoleOutputStreamStdout__init_(), 0);
    return jl_System_outCache;
}
function jl_System_err() {
    if (jl_System_errCache === null)
        jl_System_errCache = ji_PrintStream__init_(jl_ConsoleOutputStreamStderr__init_(), 0);
    return jl_System_errCache;
}
function jl_System_arraycopy(var$1, var$2, var$3, var$4, var$5) {
    var var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if (var$1 !== null && var$3 !== null) {
        if (var$2 >= 0 && var$4 >= 0 && var$5 >= 0 && (var$2 + var$5 | 0) <= jlr_Array_getLength(var$1)) {
            var$6 = var$4 + var$5 | 0;
            if (var$6 <= jlr_Array_getLength(var$3)) {
                a: {
                    b: {
                        if (var$1 !== var$3) {
                            $srcType = var$1.$getClass0().$getComponentType();
                            $targetType = var$3.$getClass0().$getComponentType();
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!$srcType.$isPrimitive() && !$targetType.$isPrimitive()) {
                                    $srcArray = var$1;
                                    $i = 0;
                                    var$6 = var$2;
                                    while ($i < var$5) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!$targetType.$isInstance($elem)) {
                                            jl_System_doArrayCopy(var$1, var$2, var$3, var$4, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5);
                                    return;
                                }
                                if (!$srcType.$isPrimitive())
                                    break a;
                                if ($targetType.$isPrimitive())
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_0($rt_s(2)));
}
function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
    if (var$1 !== var$3 || var$4 < var$2) {
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[var$4++] = var$1.data[var$2++];
        }
    } else {
        var$2 = (var$2 + var$5) | 0;
        var$4 = (var$4 + var$5) | 0;
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[--var$4] = var$1.data[--var$2];
        }
    }
}
function jl_System_currentTimeMillis() {
    return Long_fromNumber(new Date().getTime());
}
function jnci_BufferedEncoder$Controller() {
    var a = this; jl_Object.call(a);
    a.$in = null;
    a.$out = null;
    a.$inPosition = 0;
    a.$outPosition = 0;
}
function jnci_BufferedEncoder$Controller__init_(var_0, var_1) {
    var var_2 = new jnci_BufferedEncoder$Controller();
    jnci_BufferedEncoder$Controller__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnci_BufferedEncoder$Controller__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$in = var$1;
    var$0.$out = var$2;
}
function jnci_BufferedEncoder$Controller_hasMoreInput(var$0) {
    return var$0.$in.$hasRemaining();
}
function jnci_BufferedEncoder$Controller_hasMoreOutput(var$0, var$1) {
    return var$0.$out.$remaining() < var$1 ? 0 : 1;
}
function jnci_BufferedEncoder$Controller_setInPosition(var$0, var$1) {
    var$0.$inPosition = var$1;
}
function jnci_BufferedEncoder$Controller_setOutPosition(var$0, var$1) {
    var$0.$outPosition = var$1;
}
function jl_Integer() {
    jl_Number.call(this);
}
var jl_Integer_TYPE = null;
function jl_Integer_$callClinit() {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
}
function jl_Integer_toString(var$1, var$2) {
    jl_Integer_$callClinit();
    if (!(var$2 >= 2 && var$2 <= 36))
        var$2 = 10;
    return jl_AbstractStringBuilder__init_(20).$append0(var$1, var$2).$toString();
}
function jl_Integer_toHexString(var$1) {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString(var$1, 4);
}
function jl_Integer_toString0(var$1) {
    jl_Integer_$callClinit();
    return jl_Integer_toString(var$1, 10);
}
function jl_Integer_numberOfLeadingZeros(var$1) {
    var $n;
    jl_Integer_$callClinit();
    if (!var$1)
        return 32;
    $n = 0;
    if (var$1 >>> 16) {
        var$1 = var$1 >>> 16;
        $n = 16;
    }
    if (var$1 >>> 8) {
        var$1 = var$1 >>> 8;
        $n = $n | 8;
    }
    if (var$1 >>> 4) {
        var$1 = var$1 >>> 4;
        $n = $n | 4;
    }
    if (var$1 >>> 2) {
        var$1 = var$1 >>> 2;
        $n = $n | 2;
    }
    if (var$1 >>> 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
function jl_CloneNotSupportedException() {
    jl_Exception.call(this);
}
function jl_CloneNotSupportedException__init_() {
    var var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_0(var_0);
    return var_0;
}
function jl_CloneNotSupportedException__init_0(var$0) {
    jl_Exception__init_0(var$0);
}
function jl_AbstractStringBuilder$Constants() {
    jl_Object.call(this);
}
var jl_AbstractStringBuilder$Constants_intPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null;
var jl_AbstractStringBuilder$Constants_floatAnalysisResult = null;
function jl_AbstractStringBuilder$Constants_$callClinit() {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
}
function jl_AbstractStringBuilder$Constants__clinit_() {
    var var$1, var$2, var$3, var$4;
    var$1 = $rt_createIntArray(10);
    var$2 = var$1.data;
    var$2[0] = 1;
    var$2[1] = 10;
    var$2[2] = 100;
    var$2[3] = 1000;
    var$2[4] = 10000;
    var$2[5] = 100000;
    var$2[6] = 1000000;
    var$2[7] = 10000000;
    var$2[8] = 100000000;
    var$2[9] = 1000000000;
    jl_AbstractStringBuilder$Constants_intPowersOfTen = var$1;
    var$3 = $rt_createLongArray(19);
    var$4 = var$3.data;
    var$4[0] = Long_fromInt(1);
    var$4[1] = Long_fromInt(10);
    var$4[2] = Long_fromInt(100);
    var$4[3] = Long_fromInt(1000);
    var$4[4] = Long_fromInt(10000);
    var$4[5] = Long_fromInt(100000);
    var$4[6] = Long_fromInt(1000000);
    var$4[7] = Long_fromInt(10000000);
    var$4[8] = Long_fromInt(100000000);
    var$4[9] = Long_fromInt(1000000000);
    var$4[10] = new Long(1410065408, 2);
    var$4[11] = new Long(1215752192, 23);
    var$4[12] = new Long(3567587328, 232);
    var$4[13] = new Long(1316134912, 2328);
    var$4[14] = new Long(276447232, 23283);
    var$4[15] = new Long(2764472320, 232830);
    var$4[16] = new Long(1874919424, 2328306);
    var$4[17] = new Long(1569325056, 23283064);
    var$4[18] = new Long(2808348672, 232830643);
    jl_AbstractStringBuilder$Constants_longPowersOfTen = var$3;
    var$3 = $rt_createLongArray(6);
    var$4 = var$3.data;
    var$4[0] = Long_fromInt(1);
    var$4[1] = Long_fromInt(10);
    var$4[2] = Long_fromInt(100);
    var$4[3] = Long_fromInt(10000);
    var$4[4] = Long_fromInt(100000000);
    var$4[5] = new Long(1874919424, 2328306);
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = var$3;
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_();
}
function jl_Iterable() {
}
function ju_Collection() {
}
function ju_AbstractCollection() {
    jl_Object.call(this);
}
function ju_AbstractCollection__init_() {
    var var_0 = new ju_AbstractCollection();
    ju_AbstractCollection__init_0(var_0);
    return var_0;
}
function ju_AbstractCollection__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function ju_AbstractCollection_isEmpty(var$0) {
    return var$0.$size() ? 0 : 1;
}
function ju_AbstractCollection_toArray(var$0, var$1) {
    var var$2, $i, var$4, $iter;
    var$2 = var$1.data;
    $i = var$0.$size();
    var$4 = var$2.length;
    if (var$4 < $i)
        var$1 = jlr_Array_newInstance(var$1.$getClass0().$getComponentType(), $i);
    else
        while ($i < var$4) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = var$0.$iterator();
    while ($iter.$hasNext()) {
        var$2 = var$1.data;
        var$4 = $i + 1 | 0;
        var$2[$i] = $iter.$next();
        $i = var$4;
    }
    return var$1;
}
function ju_List() {
}
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
function ju_AbstractList__init_() {
    var var_0 = new ju_AbstractList();
    ju_AbstractList__init_0(var_0);
    return var_0;
}
function ju_AbstractList__init_0(var$0) {
    ju_AbstractCollection__init_0(var$0);
}
function ju_AbstractList_iterator(var$0) {
    return ju_AbstractList$1__init_(var$0);
}
function ju_RandomAccess() {
}
function jl_Cloneable() {
}
function ju_Vector() {
    var a = this; ju_AbstractList.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$capacityIncrement = 0;
}
var ju_Vector_$assertionsDisabled = 0;
function ju_Vector_$callClinit() {
    ju_Vector_$callClinit = $rt_eraseClinit(ju_Vector);
    ju_Vector__clinit_();
}
function ju_Vector__init_(var_0) {
    var var_1 = new ju_Vector();
    ju_Vector__init_0(var_1, var_0);
    return var_1;
}
function ju_Vector__init_1(var_0, var_1) {
    var var_2 = new ju_Vector();
    ju_Vector__init_2(var_2, var_0, var_1);
    return var_2;
}
function ju_Vector__init_0(var$0, var$1) {
    ju_Vector_$callClinit();
    ju_Vector__init_2(var$0, var$1, 0);
}
function ju_Vector__init_2(var$0, var$1, var$2) {
    ju_Vector_$callClinit();
    ju_AbstractList__init_0(var$0);
    if (var$1 < 0)
        $rt_throw(jl_IllegalArgumentException__init_());
    var$0.$elementData = ju_Vector_newElementArray(var$0, var$1);
    var$0.$elementCount = 0;
    var$0.$capacityIncrement = var$2;
}
function ju_Vector_newElementArray(var$0, var$1) {
    return $rt_createArray(jl_Object, var$1);
}
function ju_Vector_addElement(var$0, var$1) {
    var var$2, var$3;
    jl_Object_monitorEnterSync(var$0);
    try {
        if (var$0.$elementCount == var$0.$elementData.data.length)
            ju_Vector_growByOne(var$0);
        var$2 = var$0.$elementData.data;
        var$3 = var$0.$elementCount;
        var$0.$elementCount = var$3 + 1 | 0;
        var$2[var$3] = var$1;
        var$0.$modCount = var$0.$modCount + 1 | 0;
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Vector_elementAt(var$0, var$1) {
    jl_Object_monitorEnterSync(var$0);
    try {
        if (var$1 >= var$0.$elementCount)
            $rt_throw(jl_ArrayIndexOutOfBoundsException__init_(var$1));
        return var$0.$elementData.data[var$1];
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Vector_growByOne(var$0) {
    var var$1, $newData;
    if (var$0.$capacityIncrement > 0)
        var$1 = var$0.$capacityIncrement;
    else {
        var$1 = var$0.$elementData.data.length;
        if (!var$1)
            var$1 = 1;
    }
    $newData = ju_Vector_newElementArray(var$0, var$0.$elementData.data.length + var$1 | 0);
    jl_System_arraycopy(var$0.$elementData, 0, $newData, 0, var$0.$elementCount);
    var$0.$elementData = $newData;
}
function ju_Vector_size(var$0) {
    jl_Object_monitorEnterSync(var$0);
    try {
        return var$0.$elementCount;
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Vector__clinit_() {
    ju_Vector_$assertionsDisabled = $rt_cls(ju_Vector).$desiredAssertionStatus() ? 0 : 1;
}
function otjde_EventTarget() {
}
function otjdh_HTMLDocument() {
}
function otjdh_HTMLDocument_current() {
    return window.document;
}
function jl_Character() {
    jl_Object.call(this);
    this.$value = 0;
}
var jl_Character_TYPE = null;
var jl_Character_characterCache = null;
function jl_Character_$callClinit() {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
}
function jl_Character__init_(var_0) {
    var var_1 = new jl_Character();
    jl_Character__init_0(var_1, var_0);
    return var_1;
}
function jl_Character__init_0(var$0, var$1) {
    jl_Character_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$value = var$1;
}
function jl_Character_valueOf(var$1) {
    var $result;
    jl_Character_$callClinit();
    if (var$1 >= jl_Character_characterCache.data.length)
        return jl_Character__init_(var$1);
    $result = jl_Character_characterCache.data[var$1];
    if ($result === null) {
        $result = jl_Character__init_(var$1);
        jl_Character_characterCache.data[var$1] = $result;
    }
    return $result;
}
function jl_Character_equals(var$0, var$1) {
    if (var$0 === var$1)
        return 1;
    return var$1 instanceof jl_Character && var$1.$value == var$0.$value ? 1 : 0;
}
function jl_Character_hashCode(var$0) {
    return var$0.$value;
}
function jl_Character_isHighSurrogate(var$1) {
    jl_Character_$callClinit();
    return (var$1 & 64512) != 55296 ? 0 : 1;
}
function jl_Character_isLowSurrogate(var$1) {
    jl_Character_$callClinit();
    return (var$1 & 64512) != 56320 ? 0 : 1;
}
function jl_Character_isSurrogate(var$1) {
    jl_Character_$callClinit();
    return !jl_Character_isHighSurrogate(var$1) && !jl_Character_isLowSurrogate(var$1) ? 0 : 1;
}
function jl_Character_toCodePoint(var$1, var$2) {
    jl_Character_$callClinit();
    return ((var$1 & 1023) << 10 | var$2 & 1023) + 65536 | 0;
}
function jl_Character_highSurrogate(var$1) {
    var var$2;
    jl_Character_$callClinit();
    var$2 = var$1 - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
}
function jl_Character_lowSurrogate(var$1) {
    jl_Character_$callClinit();
    return (56320 | var$1 & 1023) & 65535;
}
function jl_Character_forDigit(var$1, var$2) {
    jl_Character_$callClinit();
    if (var$2 >= 2 && var$2 <= 36 && var$1 < var$2)
        return var$1 < 10 ? (48 + var$1 | 0) & 65535 : ((97 + var$1 | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function t_TokenizeSpec() {
    jl_Object.call(this);
}
var t_TokenizeSpec_identHashTable = null;
var t_TokenizeSpec_usedBuiltinHashTable = null;
var t_TokenizeSpec_stringHashTable = null;
var t_TokenizeSpec_nullString = null;
var t_TokenizeSpec_hasPcal = 0;
var t_TokenizeSpec_isCSyntax = 0;
var t_TokenizeSpec_pcalStart = null;
var t_TokenizeSpec_pcalEnd = null;
var t_TokenizeSpec_inPcal = 0;
var t_TokenizeSpec_canBeLabel = 0;
var t_TokenizeSpec_pseudoCom = 0;
var t_TokenizeSpec_ORCom = 0;
var t_TokenizeSpec_vspec = null;
var t_TokenizeSpec_linev = null;
var t_TokenizeSpec_nextChar = 0;
var t_TokenizeSpec_token = null;
var t_TokenizeSpec_token1 = null;
var t_TokenizeSpec_token2 = null;
var t_TokenizeSpec_token3 = null;
var t_TokenizeSpec_col1 = 0;
var t_TokenizeSpec_col2 = 0;
var t_TokenizeSpec_col3 = 0;
var t_TokenizeSpec_cdepth = 0;
var t_TokenizeSpec_mdepth = 0;
var t_TokenizeSpec_col = 0;
var t_TokenizeSpec_ncol = 0;
var t_TokenizeSpec_reader = null;
var t_TokenizeSpec_state = 0;
function t_TokenizeSpec_$callClinit() {
    t_TokenizeSpec_$callClinit = $rt_eraseClinit(t_TokenizeSpec);
    t_TokenizeSpec__clinit_();
}
function t_TokenizeSpec_skipNextChar() {
    t_TokenizeSpec_$callClinit();
    t_TokenizeSpec_ncol = t_TokenizeSpec_reader.$getColumnNumber();
    t_TokenizeSpec_nextChar = t_TokenizeSpec_reader.$getNextChar();
}
function t_TokenizeSpec_addNextChar() {
    t_TokenizeSpec_$callClinit();
    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append1(t_TokenizeSpec_nextChar).$toString();
    t_TokenizeSpec_skipNextChar();
}
function t_TokenizeSpec_gotoStart() {
    t_TokenizeSpec_$callClinit();
    t_TokenizeSpec_state = 6;
    t_TokenizeSpec_col = t_TokenizeSpec_ncol;
}
function t_TokenizeSpec_TokenOut(var$1) {
    t_TokenizeSpec_$callClinit();
    if (!(t_TokenizeSpec_token.$equals($rt_s(3)) && var$1 != 3))
        t_TokenizeSpec_linev.$addElement(t_Token__init_(t_TokenizeSpec_token, t_TokenizeSpec_col, var$1));
    if (var$1 == 4)
        t_TokenizeSpec_identHashTable.$put(t_TokenizeSpec_token, t_TokenizeSpec_nullString);
    else if (var$1 == 3) {
        t_TokenizeSpec_stringHashTable.$put(t_TokenizeSpec_token, t_TokenizeSpec_nullString);
        t_TokenizeSpec_identHashTable.$put(t_TokenizeSpec_token, t_TokenizeSpec_nullString);
    } else if (var$1 == 1)
        t_TokenizeSpec_usedBuiltinHashTable.$put(t_TokenizeSpec_token, t_TokenizeSpec_nullString);
    t_TokenizeSpec_token = $rt_s(3);
    t_TokenizeSpec_canBeLabel = 0;
}
function t_TokenizeSpec_CommentTokenOut(var$1) {
    t_TokenizeSpec_$callClinit();
    t_TokenizeSpec_linev.$addElement(t_CommentToken__init_(t_TokenizeSpec_token, t_TokenizeSpec_col, var$1, t_TokenizeSpec_pseudoCom));
    t_TokenizeSpec_pseudoCom = 0;
    t_TokenizeSpec_token = $rt_s(3);
}
function t_TokenizeSpec_startNewLine() {
    t_TokenizeSpec_$callClinit();
    t_TokenizeSpec_vspec.$addElement(t_TokenizeSpec_linev);
    t_TokenizeSpec_linev = ju_Vector__init_1(30, 30);
    t_TokenizeSpec_col = 0;
}
function t_TokenizeSpec_SkipSpaceAndNewlines() {
    var $notDone;
    t_TokenizeSpec_$callClinit();
    $notDone = 1;
    while ($notDone) {
        while (t_Misc_IsSpace(t_TokenizeSpec_nextChar)) {
            t_TokenizeSpec_skipNextChar();
        }
        if (t_TokenizeSpec_nextChar != 10)
            $notDone = 0;
        else {
            t_TokenizeSpec_skipNextChar();
            t_TokenizeSpec_startNewLine();
        }
        t_TokenizeSpec_col = t_TokenizeSpec_ncol;
        t_TokenizeSpec_token = $rt_s(3);
    }
}
function t_TokenizeSpec_getNextTokenPosition() {
    t_TokenizeSpec_$callClinit();
    return t_Position__init_(t_TokenizeSpec_vspec.$size(), t_TokenizeSpec_linev.$size());
}
function t_TokenizeSpec_TokenizingError(var$1, var$2) {
    var var$3, var$4;
    t_TokenizeSpec_$callClinit();
    if (var$2) {
        t_TokenizeSpec_linev.$addElement(t_Token__init_(t_TokenizeSpec_token, t_TokenizeSpec_col, (-1)));
        t_TokenizeSpec_token = $rt_s(3);
        t_TokenizeSpec_gotoStart();
        return;
    }
    var$3 = jl_StringBuilder__init_().$append(var$1).$append($rt_s(4)).$append(t_TokenizeSpec_token).$append($rt_s(5));
    var$4 = t_TokenizeSpec_reader;
    var$3 = var$3.$append2(var$4.$getLineNumber() + 1 | 0).$append($rt_s(6)).$append2(t_TokenizeSpec_col + 1 | 0).$toString();
    t_Debug_ReportError(var$3);
}
function t_TokenizeSpec_vspecToArray() {
    var $aspec, $n, var$3, var$4, $m, var$6;
    t_TokenizeSpec_$callClinit();
    $aspec = $rt_createArray($rt_arraycls(t_Token), t_TokenizeSpec_vspec.$size());
    $n = 0;
    while ($n < t_TokenizeSpec_vspec.$size()) {
        var$3 = $aspec.data;
        var$4 = t_TokenizeSpec_vspec;
        var$3[$n] = $rt_createArray(t_Token, var$4.$elementAt($n).$size());
        $m = 0;
        while ($m < var$3[$n].data.length) {
            var$6 = var$3[$n].data;
            var$4 = t_TokenizeSpec_vspec;
            var$6[$m] = var$4.$elementAt($n).$elementAt($m);
            $m = $m + 1 | 0;
        }
        $n = $n + 1 | 0;
    }
    return $aspec;
}
function t_TokenizeSpec_Tokenize(var$1, var$2, var$3) {
    var $braceDepth, var$5, var$6, $cbl, $saved, $isAlgorithm;
    t_TokenizeSpec_$callClinit();
    a: {
        t_TokenizeSpec_vspec = ju_Vector__init_1(1000, 1000);
        t_TokenizeSpec_reader = var$1;
        t_TokenizeSpec_nextChar = t_TokenizeSpec_reader.$getNextChar();
        t_TokenizeSpec_hasPcal = 0;
        t_TokenizeSpec_isCSyntax = 0;
        t_TokenizeSpec_pcalStart = null;
        t_TokenizeSpec_pcalEnd = null;
        t_TokenizeSpec_inPcal = 0;
        t_TokenizeSpec_canBeLabel = 0;
        t_TokenizeSpec_pseudoCom = 0;
        t_TokenizeSpec_ORCom = 0;
        $braceDepth = 0;
        switch (var$2) {
            case 1:
                break;
            case 2:
                t_TokenizeSpec_state = 6;
                break a;
            case 3:
                t_TokenizeSpec_state = 6;
                t_TokenizeSpec_hasPcal = 1;
                t_TokenizeSpec_pcalStart = t_Position__init_(0, 0);
                t_TokenizeSpec_inPcal = 1;
                t_TokenizeSpec_canBeLabel = 1;
                t_TokenizeSpec_isCSyntax = 1;
                break a;
            case 4:
                t_TokenizeSpec_state = 6;
                t_TokenizeSpec_hasPcal = 1;
                t_TokenizeSpec_pcalStart = t_Position__init_(0, 0);
                t_TokenizeSpec_inPcal = 1;
                t_TokenizeSpec_canBeLabel = 1;
                break a;
            default:
                t_Debug_ReportBug($rt_s(7));
                break a;
        }
        t_TokenizeSpec_state = 1;
    }
    b: while (t_TokenizeSpec_state != 35) {
        switch (t_TokenizeSpec_state) {
            case 1:
                if (t_TokenizeSpec_nextChar == 45) {
                    t_TokenizeSpec_token1 = t_TokenizeSpec_token;
                    t_TokenizeSpec_col1 = t_TokenizeSpec_col;
                    t_TokenizeSpec_col = t_TokenizeSpec_ncol;
                    t_TokenizeSpec_token = $rt_s(8);
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 2;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 10) {
                    t_TokenizeSpec_TokenOut(8);
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_startNewLine();
                    continue b;
                }
                if (t_TokenizeSpec_nextChar != 9) {
                    t_TokenizeSpec_addNextChar();
                    continue b;
                }
                t_Debug_ReportError0($rt_s(9), var$3);
                t_TokenizeSpec_state = 35;
                continue b;
            case 2:
                t_Debug_Assert(t_TokenizeSpec_token.$length() > 3 ? 0 : 1);
                if (t_TokenizeSpec_nextChar != 45) {
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token1).$append(t_TokenizeSpec_token).$toString();
                    t_TokenizeSpec_col = t_TokenizeSpec_col1;
                    t_TokenizeSpec_state = 1;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                if (t_TokenizeSpec_token.$length() != 4)
                    continue b;
                t_TokenizeSpec_state = 3;
                continue b;
            case 3:
                if (t_TokenizeSpec_nextChar == 45) {
                    t_TokenizeSpec_addNextChar();
                    continue b;
                }
                t_TokenizeSpec_token2 = t_TokenizeSpec_token;
                t_TokenizeSpec_col2 = t_TokenizeSpec_col;
                t_TokenizeSpec_token = $rt_s(3);
                t_TokenizeSpec_col = t_TokenizeSpec_ncol;
                t_TokenizeSpec_state = 4;
                continue b;
            case 4:
                if (t_TokenizeSpec_nextChar == 32) {
                    t_TokenizeSpec_addNextChar();
                    continue b;
                }
                if (t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_token3 = t_TokenizeSpec_token;
                    t_TokenizeSpec_col3 = t_TokenizeSpec_ncol;
                    t_TokenizeSpec_token = $rt_s(3);
                    t_TokenizeSpec_state = 5;
                    continue b;
                }
                t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token1).$append(t_TokenizeSpec_token2).$toString();
                t_TokenizeSpec_col = t_TokenizeSpec_col1;
                t_TokenizeSpec_state = 1;
                continue b;
            case 5:
                if (t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                    continue b;
                }
                if (!t_TokenizeSpec_token.$equals($rt_s(10))) {
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token1).$append(t_TokenizeSpec_token2).$append(t_TokenizeSpec_token3).$toString();
                    t_TokenizeSpec_col = t_TokenizeSpec_col1;
                    t_TokenizeSpec_state = 1;
                    continue b;
                }
                t_TokenizeSpec_token = t_TokenizeSpec_token1;
                t_TokenizeSpec_col = t_TokenizeSpec_col1;
                t_TokenizeSpec_TokenOut(8);
                t_TokenizeSpec_token = t_TokenizeSpec_token2;
                t_TokenizeSpec_col = t_TokenizeSpec_col2;
                t_TokenizeSpec_TokenOut(6);
                t_TokenizeSpec_token = $rt_s(10);
                t_TokenizeSpec_col = t_TokenizeSpec_col3;
                t_TokenizeSpec_TokenOut(1);
                t_TokenizeSpec_token = $rt_s(3);
                t_TokenizeSpec_mdepth = 1;
                t_TokenizeSpec_gotoStart();
                continue b;
            case 6:
                if (t_Misc_IsSpace(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                if (t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 7;
                    continue b;
                }
                if (t_Misc_IsDigit(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 8;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 92) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 9;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 45) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 14;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 61) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 18;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 40) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 22;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 34) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 23;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 10) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_startNewLine();
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                if (!t_BuiltInSymbols_IsBuiltInPrefix(jl_StringBuilder__init_().$append($rt_s(3)).$append1(t_TokenizeSpec_nextChar).$toString(), t_TokenizeSpec_inPcal)) {
                    if (t_TokenizeSpec_nextChar != 9) {
                        t_TokenizeSpec_addNextChar();
                        t_TokenizeSpec_TokenizingError($rt_s(11), var$3);
                        continue b;
                    }
                    if (var$2 == 1) {
                        t_Debug_ReportError0($rt_s(12), var$3);
                        t_TokenizeSpec_skipNextChar();
                    }
                    t_TokenizeSpec_state = 35;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                if (t_TokenizeSpec_inPcal && var$2 == 1) {
                    if (t_TokenizeSpec_token.$equals($rt_s(13)) && t_TokenizeSpec_nextChar == 41) {
                        t_TokenizeSpec_pcalEnd = t_TokenizeSpec_getNextTokenPosition();
                        t_TokenizeSpec_inPcal = 0;
                        t_TokenizeSpec_token = $rt_s(3);
                        t_TokenizeSpec_gotoStart();
                        continue b;
                    }
                    if (!t_TokenizeSpec_isCSyntax) {
                        t_TokenizeSpec_state = 13;
                        continue b;
                    }
                    if (t_TokenizeSpec_token.$equals($rt_s(14))) {
                        t_TokenizeSpec_TokenOut(1);
                        t_TokenizeSpec_canBeLabel = 1;
                        $braceDepth = $braceDepth + 1 | 0;
                        t_TokenizeSpec_gotoStart();
                        continue b;
                    }
                    if (!t_TokenizeSpec_token.$equals($rt_s(15))) {
                        t_TokenizeSpec_state = 13;
                        continue b;
                    }
                    t_TokenizeSpec_TokenOut(1);
                    $braceDepth = $braceDepth + (-1) | 0;
                    if ($braceDepth) {
                        t_TokenizeSpec_gotoStart();
                        continue b;
                    }
                    t_TokenizeSpec_col = t_TokenizeSpec_ncol;
                    t_TokenizeSpec_inPcal = 0;
                    t_TokenizeSpec_cdepth = 1;
                    t_TokenizeSpec_pcalEnd = t_TokenizeSpec_getNextTokenPosition();
                    t_TokenizeSpec_pseudoCom = 1;
                    t_TokenizeSpec_state = 28;
                    continue b;
                }
                t_TokenizeSpec_state = 13;
                continue b;
            case 7:
                if (t_TokenizeSpec_token.$length() == 3) {
                    var$5 = t_TokenizeSpec_token;
                    var$6 = $rt_s(16);
                    if (!(!var$5.$equals(var$6) && !t_TokenizeSpec_token.$equals($rt_s(17)))) {
                        t_TokenizeSpec_TokenOut(1);
                        t_TokenizeSpec_gotoStart();
                        continue b;
                    }
                }
                if (!t_Misc_IsLetter(t_TokenizeSpec_nextChar) && !t_Misc_IsDigit(t_TokenizeSpec_nextChar)) {
                    if (!t_BuiltInSymbols_IsBuiltInSymbol(t_TokenizeSpec_token, t_TokenizeSpec_inPcal)) {
                        if (t_TokenizeSpec_inPcal && t_TokenizeSpec_canBeLabel) {
                            t_TokenizeSpec_token1 = t_TokenizeSpec_token;
                            t_TokenizeSpec_col1 = t_TokenizeSpec_col;
                            t_TokenizeSpec_state = 36;
                            continue b;
                        }
                        t_TokenizeSpec_TokenOut(4);
                        t_TokenizeSpec_gotoStart();
                        continue b;
                    }
                    if (t_TokenizeSpec_token.$equals($rt_s(10))) {
                        t_TokenizeSpec_mdepth = t_TokenizeSpec_mdepth + 1 | 0;
                        t_TokenizeSpec_TokenOut(1);
                        t_TokenizeSpec_gotoStart();
                        continue b;
                    }
                    if (t_TokenizeSpec_inPcal && t_TokenizeSpec_token.$equals($rt_s(18)) && !t_TokenizeSpec_isCSyntax && var$2 == 1) {
                        t_TokenizeSpec_TokenOut(1);
                        t_TokenizeSpec_col = t_TokenizeSpec_ncol;
                        t_TokenizeSpec_pcalEnd = t_TokenizeSpec_getNextTokenPosition();
                        t_TokenizeSpec_cdepth = 1;
                        t_TokenizeSpec_inPcal = 0;
                        t_TokenizeSpec_pseudoCom = 1;
                        t_TokenizeSpec_state = 28;
                        continue b;
                    }
                    $cbl = t_TokenizeSpec_inPcal && t_BuiltInSymbols_CanPrecedeLabel(t_TokenizeSpec_token) ? 1 : 0;
                    t_TokenizeSpec_TokenOut(1);
                    t_TokenizeSpec_canBeLabel = $cbl;
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                continue b;
            case 8:
                if (t_Misc_IsDigit(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 8;
                    continue b;
                }
                if (!t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_TokenOut(2);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 7;
                continue b;
            case 9:
                if (t_TokenizeSpec_nextChar != 98 && t_TokenizeSpec_nextChar != 66 && t_TokenizeSpec_nextChar != 111 && t_TokenizeSpec_nextChar != 79 && t_TokenizeSpec_nextChar != 104 && t_TokenizeSpec_nextChar != 72) {
                    if (t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                        t_TokenizeSpec_state = 12;
                        continue b;
                    }
                    if (t_TokenizeSpec_nextChar != 42) {
                        t_TokenizeSpec_state = 13;
                        continue b;
                    }
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_token = $rt_s(3);
                    t_TokenizeSpec_state = 25;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 11;
                continue b;
            case 10:
                if (t_Misc_IsDigit(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 10;
                    continue b;
                }
                if (!t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_TokenOut(2);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                if (t_TokenizeSpec_token.$charAt(0) != 92) {
                    t_TokenizeSpec_state = 7;
                    continue b;
                }
                t_TokenizeSpec_TokenizingError($rt_s(11), var$3);
                continue b;
            case 11:
                if (!t_Misc_IsDigit(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_state = 12;
                    continue b;
                }
                t_TokenizeSpec_state = 10;
                continue b;
            case 12:
                if (t_Misc_IsLetter(t_TokenizeSpec_nextChar) && t_TokenizeSpec_nextChar != 95) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 12;
                    continue b;
                }
                if (!t_BuiltInSymbols_IsBuiltInSymbol0(t_TokenizeSpec_token)) {
                    t_TokenizeSpec_TokenizingError($rt_s(19), var$3);
                    continue b;
                }
                t_TokenizeSpec_TokenOut(1);
                t_TokenizeSpec_gotoStart();
                continue b;
            case 13:
                if (t_BuiltInSymbols_IsBuiltInPrefix(jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append1(t_TokenizeSpec_nextChar).$toString(), t_TokenizeSpec_inPcal)) {
                    t_TokenizeSpec_addNextChar();
                    continue b;
                }
                if (!t_BuiltInSymbols_IsBuiltInSymbol(t_TokenizeSpec_token, t_TokenizeSpec_inPcal)) {
                    t_TokenizeSpec_reader.$backspace();
                    while (!t_BuiltInSymbols_IsBuiltInSymbol(t_TokenizeSpec_token, t_TokenizeSpec_inPcal)) {
                        t_TokenizeSpec_reader.$backspace();
                        if (!t_TokenizeSpec_token.$length())
                            t_TokenizeSpec_TokenizingError($rt_s(11), var$3);
                        t_TokenizeSpec_token = t_TokenizeSpec_token.$substring(0, t_TokenizeSpec_token.$length() - 1 | 0);
                    }
                    t_TokenizeSpec_skipNextChar();
                }
                $saved = t_BuiltInSymbols_CanPrecedeLabel(t_TokenizeSpec_token);
                t_TokenizeSpec_TokenOut(1);
                t_TokenizeSpec_canBeLabel = $saved;
                t_TokenizeSpec_gotoStart();
                continue b;
            case 14:
                if (t_TokenizeSpec_nextChar != 45) {
                    t_TokenizeSpec_state = 13;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 15;
                continue b;
            case 15:
                if (t_TokenizeSpec_nextChar != 45) {
                    t_TokenizeSpec_state = 13;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 16;
                continue b;
            case 16:
                if (t_TokenizeSpec_nextChar != 45) {
                    t_TokenizeSpec_TokenizingError($rt_s(11), var$3);
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 17;
                continue b;
            case 17:
                if (t_TokenizeSpec_nextChar != 45) {
                    t_TokenizeSpec_TokenOut(6);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 17;
                continue b;
            case 18:
                if (t_TokenizeSpec_nextChar != 61) {
                    t_TokenizeSpec_state = 13;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 19;
                continue b;
            case 19:
                if (t_TokenizeSpec_nextChar != 61) {
                    t_TokenizeSpec_state = 13;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 20;
                continue b;
            case 20:
                if (t_TokenizeSpec_nextChar != 61) {
                    t_TokenizeSpec_TokenizingError($rt_s(11), var$3);
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 21;
                continue b;
            case 21:
                if (t_TokenizeSpec_nextChar == 61) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 21;
                    continue b;
                }
                t_TokenizeSpec_mdepth = t_TokenizeSpec_mdepth - 1 | 0;
                t_TokenizeSpec_TokenOut(7);
                if (t_TokenizeSpec_mdepth <= 0 && var$2 != 2) {
                    if (!t_TokenizeSpec_mdepth) {
                        t_TokenizeSpec_state = 34;
                        continue b;
                    }
                    var$5 = jl_StringBuilder__init_().$append($rt_s(20));
                    var$6 = t_TokenizeSpec_reader;
                    var$5 = var$5.$append2(var$6.$getLineNumber() + 1 | 0).$toString();
                    t_Debug_ReportError0(var$5, var$3);
                    t_TokenizeSpec_skipNextChar();
                    continue b;
                }
                t_TokenizeSpec_gotoStart();
                continue b;
            case 22:
                if (t_TokenizeSpec_nextChar != 42) {
                    t_TokenizeSpec_token = $rt_s(21);
                    t_TokenizeSpec_state = 13;
                    continue b;
                }
                t_TokenizeSpec_skipNextChar();
                t_TokenizeSpec_cdepth = 1;
                t_TokenizeSpec_state = 28;
                continue b;
            case 23:
                if (t_TokenizeSpec_nextChar == 92) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 24;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 34) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_TokenOut(3);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                if (t_BuiltInSymbols_IsStringChar(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 23;
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                if (var$3)
                    continue b;
                t_TokenizeSpec_TokenizingError($rt_s(22), var$3);
                continue b;
            case 24:
                if (t_TokenizeSpec_nextChar != 34 && t_TokenizeSpec_nextChar != 92 && t_TokenizeSpec_nextChar != 116 && t_TokenizeSpec_nextChar != 110 && t_TokenizeSpec_nextChar != 102 && t_TokenizeSpec_nextChar != 114) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_TokenizingError($rt_s(23), var$3);
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_state = 23;
                continue b;
            case 25:
                if (t_TokenizeSpec_nextChar == 40) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 26;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 42 && t_TokenizeSpec_cdepth > 0) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 27;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar != 10 && t_TokenizeSpec_nextChar != 9) {
                    if (t_TokenizeSpec_cdepth)
                        t_TokenizeSpec_skipNextChar();
                    else
                        t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 25;
                    continue b;
                }
                t_TokenizeSpec_CommentTokenOut(2);
                t_TokenizeSpec_cdepth = 0;
                t_TokenizeSpec_gotoStart();
                continue b;
            case 26:
                if (t_TokenizeSpec_nextChar == 42) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_cdepth = t_TokenizeSpec_cdepth + 1 | 0;
                    t_TokenizeSpec_state = 25;
                    continue b;
                }
                if (!t_TokenizeSpec_cdepth)
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append($rt_s(21)).$toString();
                t_TokenizeSpec_state = 25;
                continue b;
            case 27:
                if (t_TokenizeSpec_nextChar != 41) {
                    if (!t_TokenizeSpec_cdepth)
                        t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append($rt_s(13)).$toString();
                    t_TokenizeSpec_state = 25;
                    continue b;
                }
                t_TokenizeSpec_skipNextChar();
                t_TokenizeSpec_cdepth = t_TokenizeSpec_cdepth - 1 | 0;
                t_Debug_Assert0(t_TokenizeSpec_cdepth < 0 ? 0 : 1, $rt_s(24));
                t_TokenizeSpec_state = 25;
                continue b;
            case 28:
                if (t_TokenizeSpec_nextChar == 42) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 29;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 40) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 30;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 10) {
                    t_TokenizeSpec_CommentTokenOut(3);
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_startNewLine();
                    t_TokenizeSpec_state = 31;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 9) {
                    t_Debug_ReportError0($rt_s(25), var$3);
                    t_TokenizeSpec_skipNextChar();
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 45 && t_TokenizeSpec_cdepth == 1 && var$2 == 1 && !t_TokenizeSpec_hasPcal) {
                    t_TokenizeSpec_token1 = t_TokenizeSpec_token;
                    t_TokenizeSpec_col1 = t_TokenizeSpec_col;
                    t_TokenizeSpec_token = $rt_s(3);
                    t_TokenizeSpec_col = t_TokenizeSpec_ncol;
                    t_TokenizeSpec_ORCom = 0;
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 38;
                    continue b;
                }
                if (t_TokenizeSpec_cdepth != 1) {
                    t_TokenizeSpec_skipNextChar();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                continue b;
            case 29:
                if (t_TokenizeSpec_nextChar == 41) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_cdepth = t_TokenizeSpec_cdepth - 1 | 0;
                    if (t_TokenizeSpec_cdepth) {
                        t_TokenizeSpec_state = 28;
                        continue b;
                    }
                    t_TokenizeSpec_CommentTokenOut(1);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                if (t_TokenizeSpec_cdepth == 1)
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append($rt_s(13)).$toString();
                t_TokenizeSpec_state = 28;
                continue b;
            case 30:
                if (t_TokenizeSpec_nextChar == 42) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_cdepth = t_TokenizeSpec_cdepth + 1 | 0;
                    t_TokenizeSpec_state = 28;
                    continue b;
                }
                if (t_TokenizeSpec_cdepth == 1)
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append($rt_s(21)).$toString();
                t_TokenizeSpec_state = 28;
                continue b;
            case 31:
                if (t_TokenizeSpec_nextChar == 42) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 33;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 40) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_state = 32;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 10) {
                    t_TokenizeSpec_CommentTokenOut(5);
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_startNewLine();
                    t_TokenizeSpec_state = 31;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 45 && t_TokenizeSpec_cdepth == 1 && var$2 == 1 && !t_TokenizeSpec_hasPcal) {
                    t_TokenizeSpec_token1 = t_TokenizeSpec_token;
                    t_TokenizeSpec_col1 = t_TokenizeSpec_col;
                    t_TokenizeSpec_token = $rt_s(3);
                    t_TokenizeSpec_col = t_TokenizeSpec_ncol;
                    t_TokenizeSpec_ORCom = 1;
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 38;
                    continue b;
                }
                if (t_TokenizeSpec_nextChar == 9) {
                    t_Debug_ReportError0($rt_s(26), var$3);
                    t_TokenizeSpec_state = 35;
                    continue b;
                }
                if (t_TokenizeSpec_cdepth != 1) {
                    t_TokenizeSpec_skipNextChar();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                continue b;
            case 32:
                if (t_TokenizeSpec_nextChar == 42) {
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_cdepth = t_TokenizeSpec_cdepth + 1 | 0;
                    t_TokenizeSpec_state = 31;
                    continue b;
                }
                if (t_TokenizeSpec_cdepth == 1)
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append($rt_s(21)).$toString();
                t_TokenizeSpec_state = 31;
                continue b;
            case 33:
                if (t_TokenizeSpec_nextChar != 41) {
                    if (t_TokenizeSpec_cdepth == 1)
                        t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token).$append($rt_s(13)).$toString();
                    t_TokenizeSpec_state = 31;
                    continue b;
                }
                t_TokenizeSpec_skipNextChar();
                t_TokenizeSpec_cdepth = t_TokenizeSpec_cdepth - 1 | 0;
                t_Debug_Assert(t_TokenizeSpec_cdepth < 0 ? 0 : 1);
                if (t_TokenizeSpec_cdepth) {
                    t_TokenizeSpec_state = 31;
                    continue b;
                }
                t_TokenizeSpec_CommentTokenOut(4);
                t_TokenizeSpec_gotoStart();
                continue b;
            case 34:
                if (t_TokenizeSpec_nextChar == 10) {
                    t_TokenizeSpec_TokenOut(9);
                    t_TokenizeSpec_skipNextChar();
                    t_TokenizeSpec_startNewLine();
                    continue b;
                }
                if (t_TokenizeSpec_nextChar != 9) {
                    t_TokenizeSpec_addNextChar();
                    continue b;
                }
                t_TokenizeSpec_TokenOut(9);
                t_TokenizeSpec_state = 35;
                continue b;
            case 35:
                break;
            case 36:
                while (t_Misc_IsSpace(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                }
                if (t_TokenizeSpec_nextChar != 58) {
                    t_TokenizeSpec_token = t_TokenizeSpec_token1;
                    t_TokenizeSpec_TokenOut(4);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                if (t_TokenizeSpec_nextChar != 61 && t_TokenizeSpec_nextChar != 58) {
                    t_TokenizeSpec_token1 = t_TokenizeSpec_token;
                    t_TokenizeSpec_state = 37;
                    continue b;
                }
                t_TokenizeSpec_reader.$backspace();
                t_TokenizeSpec_ncol = t_TokenizeSpec_ncol - 1 | 0;
                t_TokenizeSpec_nextChar = 58;
                t_TokenizeSpec_token = t_TokenizeSpec_token1;
                t_TokenizeSpec_TokenOut(4);
                t_TokenizeSpec_gotoStart();
                continue b;
            case 37:
                while (t_Misc_IsSpace(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                }
                if (t_TokenizeSpec_nextChar != 43 && t_TokenizeSpec_nextChar != 45) {
                    t_TokenizeSpec_token = t_TokenizeSpec_token1;
                    t_TokenizeSpec_TokenOut(13);
                    t_TokenizeSpec_gotoStart();
                    continue b;
                }
                t_TokenizeSpec_addNextChar();
                t_TokenizeSpec_TokenOut(13);
                t_TokenizeSpec_gotoStart();
                continue b;
            case 38:
                if (t_TokenizeSpec_nextChar == 45) {
                    t_TokenizeSpec_addNextChar();
                    t_TokenizeSpec_state = 39;
                    continue b;
                }
                t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token1).$append(t_TokenizeSpec_token).$toString();
                t_TokenizeSpec_col = t_TokenizeSpec_col1;
                t_TokenizeSpec_state = !t_TokenizeSpec_ORCom ? 28 : 31;
                continue b;
            case 39:
                while (t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                }
                $isAlgorithm = t_TokenizeSpec_token.$equals($rt_s(27));
                if (!$isAlgorithm && !t_TokenizeSpec_token.$equals($rt_s(28))) {
                    t_TokenizeSpec_token = jl_StringBuilder__init_().$append(t_TokenizeSpec_token1).$append(t_TokenizeSpec_token).$toString();
                    t_TokenizeSpec_col = t_TokenizeSpec_col1;
                    t_TokenizeSpec_state = 28;
                    continue b;
                }
                if (!t_Misc_isBlank(t_TokenizeSpec_token1)) {
                    t_TokenizeSpec_pseudoCom = 1;
                    t_TokenizeSpec_token2 = t_TokenizeSpec_token;
                    t_TokenizeSpec_col2 = t_TokenizeSpec_col;
                    t_TokenizeSpec_token = t_TokenizeSpec_token1;
                    t_TokenizeSpec_col = t_TokenizeSpec_col1;
                    t_TokenizeSpec_CommentTokenOut(!t_TokenizeSpec_ORCom ? 1 : 4);
                    t_TokenizeSpec_token = t_TokenizeSpec_token2;
                    t_TokenizeSpec_col = t_TokenizeSpec_col2;
                }
                t_TokenizeSpec_hasPcal = 1;
                t_TokenizeSpec_pcalStart = t_TokenizeSpec_getNextTokenPosition();
                t_TokenizeSpec_TokenOut(1);
                t_TokenizeSpec_SkipSpaceAndNewlines();
                if (!$isAlgorithm) {
                    t_TokenizeSpec_state = 40;
                    continue b;
                }
                t_TokenizeSpec_state = 41;
                continue b;
            case 40:
                while (t_Misc_IsLetter(t_TokenizeSpec_nextChar)) {
                    t_TokenizeSpec_addNextChar();
                }
                if (t_TokenizeSpec_token.$equals($rt_s(18))) {
                    t_TokenizeSpec_TokenOut(1);
                    t_TokenizeSpec_SkipSpaceAndNewlines();
                    t_TokenizeSpec_state = 41;
                    continue b;
                }
                t_TokenizeSpec_pcalEnd = t_TokenizeSpec_getNextTokenPosition();
                t_TokenizeSpec_pseudoCom = 1;
                t_TokenizeSpec_state = 28;
                continue b;
            case 41:
                while (!(!t_Misc_IsLetter(t_TokenizeSpec_nextChar) && !t_Misc_IsDigit(t_TokenizeSpec_nextChar))) {
                    t_TokenizeSpec_addNextChar();
                }
                if (!t_Misc_hasLetter(t_TokenizeSpec_token)) {
                    t_TokenizeSpec_pcalEnd = t_TokenizeSpec_getNextTokenPosition();
                    t_TokenizeSpec_pseudoCom = 1;
                    t_TokenizeSpec_state = 28;
                    continue b;
                }
                t_TokenizeSpec_TokenOut(4);
                t_TokenizeSpec_SkipSpaceAndNewlines();
                t_TokenizeSpec_isCSyntax = t_TokenizeSpec_nextChar != 123 ? 0 : 1;
                t_TokenizeSpec_cdepth = 0;
                t_TokenizeSpec_inPcal = 1;
                $braceDepth = 0;
                t_TokenizeSpec_gotoStart();
                continue b;
            default:
        }
        t_Debug_ReportBug($rt_s(29));
    }
    if (t_TokenizeSpec_hasPcal && t_TokenizeSpec_pcalEnd === null)
        t_TokenizeSpec_pcalEnd = t_Position__init_(2147483647, 0);
    return t_TokenizeSpec_vspecToArray();
}
function t_TokenizeSpec__clinit_() {
    t_TokenizeSpec_identHashTable = ju_Hashtable__init_(1000);
    t_TokenizeSpec_usedBuiltinHashTable = ju_Hashtable__init_(1000);
    t_TokenizeSpec_stringHashTable = ju_Hashtable__init_(100);
    t_TokenizeSpec_nullString = $rt_s(3);
    t_TokenizeSpec_vspec = null;
    t_TokenizeSpec_linev = ju_Vector__init_1(30, 30);
    t_TokenizeSpec_token = $rt_s(3);
    t_TokenizeSpec_token1 = $rt_s(3);
    t_TokenizeSpec_token2 = $rt_s(3);
    t_TokenizeSpec_token3 = $rt_s(3);
    t_TokenizeSpec_col1 = 0;
    t_TokenizeSpec_col2 = 0;
    t_TokenizeSpec_col3 = 0;
    t_TokenizeSpec_cdepth = 0;
    t_TokenizeSpec_mdepth = 0;
    t_TokenizeSpec_ncol = 0;
    t_TokenizeSpec_state = 0;
}
function ju_Map() {
}
function jl_Runnable() {
}
function jl_Thread() {
    var a = this; jl_Object.call(a);
    a.$id = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name = null;
    a.$alive = 0;
    a.$target = null;
}
var jl_Thread_mainThread = null;
var jl_Thread_currentThread0 = null;
var jl_Thread_nextId = Long_ZERO;
var jl_Thread_activeCount = 0;
function jl_Thread_$callClinit() {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
}
function jl_Thread__init_(var_0) {
    var var_1 = new jl_Thread();
    jl_Thread__init_0(var_1, var_0);
    return var_1;
}
function jl_Thread__init_1(var_0, var_1) {
    var var_2 = new jl_Thread();
    jl_Thread__init_2(var_2, var_0, var_1);
    return var_2;
}
function jl_Thread__init_0(var$0, var$1) {
    jl_Thread_$callClinit();
    jl_Thread__init_2(var$0, null, var$1);
}
function jl_Thread__init_2(var$0, var$1, var$2) {
    var var$3;
    jl_Thread_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$finishedLock = jl_Object__init_();
    var$0.$alive = 1;
    var$0.$name = var$2;
    var$0.$target = var$1;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = Long_add(var$3, Long_fromInt(1));
    var$0.$id = var$3;
}
function jl_Thread_setCurrentThread(var$1) {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== var$1)
        jl_Thread_currentThread0 = var$1;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
}
function jl_Thread_currentThread() {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
}
function jl_Thread__clinit_() {
    jl_Thread_mainThread = jl_Thread__init_($rt_s(30));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = Long_fromInt(1);
    jl_Thread_activeCount = 1;
}
function otp_PlatformRunnable() {
}
function jl_Object$monitorExit$lambda$_8_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
function jl_Object$monitorExit$lambda$_8_0__init_(var_0) {
    var var_1 = new jl_Object$monitorExit$lambda$_8_0();
    jl_Object$monitorExit$lambda$_8_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$monitorExit$lambda$_8_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_0 = var$1;
}
function jl_Object$monitorExit$lambda$_8_0_run(var$0) {
    jl_Object_lambda$monitorExit$2(var$0.$_0);
}
function t_Token() {
    var a = this; jl_Object.call(a);
    a.$string = null;
    a.$column = 0;
    a.$outcolumn = 0;
    a.$type = 0;
    a.$aboveAlign = null;
    a.$preSpace = 0.0;
    a.$subscript = 0;
    a.$belowAlign = null;
    a.$isAlignmentPoint = 0;
    a.$distFromMargin = 0.0;
}
function t_Token__init_(var_0, var_1, var_2) {
    var var_3 = new t_Token();
    t_Token__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function t_Token__init_1() {
    var var_0 = new t_Token();
    t_Token__init_2(var_0);
    return var_0;
}
function t_Token__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$outcolumn = (-1);
    var$0.$aboveAlign = t_Position__init_0();
    var$0.$preSpace = 0.0;
    var$0.$subscript = 0;
    var$0.$belowAlign = t_Position__init_0();
    var$0.$isAlignmentPoint = 0;
    var$0.$distFromMargin = 0.0;
    var$0.$string = var$1;
    var$0.$column = var$2;
    var$0.$type = var$3;
}
function t_Token__init_2(var$0) {
    jl_Object__init_0(var$0);
    var$0.$outcolumn = (-1);
    var$0.$aboveAlign = t_Position__init_0();
    var$0.$preSpace = 0.0;
    var$0.$subscript = 0;
    var$0.$belowAlign = t_Position__init_0();
    var$0.$isAlignmentPoint = 0;
    var$0.$distFromMargin = 0.0;
    var$0.$string = $rt_s(3);
    var$0.$column = 0;
    var$0.$type = 0;
}
function t_Token_getWidth(var$0) {
    if (var$0.$string === null)
        return 0;
    if (var$0.$type != 3)
        return var$0.$string.$length();
    return var$0.$string.$length() + 2 | 0;
}
function t_Token_FindPfStepTokens(var$1) {
    var $k, var$3, $input, var$5, $outputVec, var$7, $i, var$9, var$10, var$11, var$12, $numOfToks, $needsSpace, $str, var$16;
    $k = 0;
    while (true) {
        var$3 = var$1.data;
        if ($k >= var$3.length)
            break;
        $input = var$3[$k];
        var$5 = $input.data;
        $outputVec = new ju_Vector;
        var$7 = var$5.length;
        ju_Vector__init_0($outputVec, var$7);
        $i = 0;
        while ($i < var$7) {
            if ($i < (var$7 - 2 | 0)) {
                var$9 = var$5[$i].$string;
                var$10 = $rt_s(31);
                if (var$9.$equals(var$10) && var$5[$i + 1 | 0].$column == (var$5[$i].$column + 1 | 0) && var$5[$i + 1 | 0].$type == 2) {
                    var$9 = var$5[$i + 2 | 0].$string;
                    var$10 = $rt_s(32);
                    if (var$9.$equals(var$10)) {
                        var$11 = var$5[$i + 2 | 0].$column;
                        var$12 = var$5[$i + 1 | 0].$column;
                        var$9 = var$5[$i + 1 | 0];
                        if (var$11 == (var$12 + var$9.$getWidth() | 0)) {
                            $numOfToks = 3;
                            $needsSpace = 1;
                            $str = jl_StringBuilder__init_().$append($rt_s(31)).$append(var$5[$i + 1 | 0].$string).$append($rt_s(32)).$toString();
                            if ($i < (var$7 - 3 | 0) && var$5[$i + 3 | 0].$column == (var$5[$i + 2 | 0].$column + 1 | 0) && !(var$5[$i + 3 | 0].$type != 2 && var$5[$i + 3 | 0].$type != 4)) {
                                $str = jl_StringBuilder__init_().$append($str).$append(var$5[$i + 3 | 0].$string).$toString();
                                $numOfToks = 4;
                                if ($i < (var$7 - 4 | 0)) {
                                    var$16 = var$5[$i + 4 | 0].$column;
                                    var$11 = var$5[$i + 3 | 0].$column;
                                    var$9 = var$5[$i + 3 | 0];
                                    if (var$16 == (var$11 + var$9.$getWidth() | 0)) {
                                        var$9 = var$5[$i + 4 | 0].$string;
                                        var$10 = $rt_s(33);
                                        if (var$9.$equals(var$10)) {
                                            $str = jl_StringBuilder__init_().$append($str).$append($rt_s(33)).$toString();
                                            $numOfToks = 5;
                                        }
                                    }
                                }
                            }
                            a: {
                                if ($i < (var$7 - $numOfToks | 0)) {
                                    var$16 = $i + $numOfToks | 0;
                                    if (var$5[var$16].$type == 1) {
                                        var$9 = var$5[var$16].$string;
                                        var$11 = 1;
                                        if (t_BuiltInSymbols_GetBuiltInSymbol(var$9, var$11).$symbolType != 1) {
                                            var$9 = var$5[var$16].$string;
                                            var$16 = 1;
                                            if (t_BuiltInSymbols_GetBuiltInSymbol(var$9, var$16).$symbolType != 8)
                                                break a;
                                        }
                                        $needsSpace = 0;
                                    }
                                }
                            }
                            $outputVec.$addElement(t_Token$PfStepToken__init_($str, var$5[$i].$column, $needsSpace));
                            $i = $i + $numOfToks | 0;
                            continue;
                        }
                    }
                }
            }
            $outputVec.$addElement(var$5[$i]);
            $i = $i + 1 | 0;
        }
        if ($outputVec.$size() != var$7) {
            var$3[$k] = $rt_createArray(t_Token, $outputVec.$size());
            var$16 = 0;
            while (var$16 < $outputVec.$size()) {
                var$3[$k].data[var$16] = $outputVec.$elementAt(var$16);
                var$16 = var$16 + 1 | 0;
            }
        }
        $k = $k + 1 | 0;
    }
}
function t_Token_mostOfString(var$0) {
    var $typeName, $str, var$3, $result;
    a: {
        $typeName = $rt_s(3);
        switch (var$0.$type) {
            case 1:
                $typeName = $rt_s(34);
                break a;
            case 2:
                $typeName = $rt_s(35);
                break a;
            case 3:
                $typeName = $rt_s(36);
                break a;
            case 4:
                $typeName = $rt_s(37);
                break a;
            case 5:
                $typeName = $rt_s(38);
                break a;
            case 6:
                $typeName = $rt_s(39);
                break a;
            case 7:
                $typeName = $rt_s(40);
                break a;
            case 8:
                $typeName = $rt_s(41);
                break a;
            case 9:
                $typeName = $rt_s(42);
                break a;
            case 12:
                $typeName = $rt_s(43);
                break a;
            case 13:
                $typeName = $rt_s(44);
                break a;
            case 10:
            case 11:
                break;
            default:
        }
    }
    $str = jl_StringBuilder__init_().$append($rt_s(45)).$append(var$0.$string).$append($rt_s(45)).$toString();
    if (var$0.$string === null)
        $str = $rt_s(46);
    var$3 = jl_StringBuilder__init_().$append($rt_s(47)).$append($str).$append($rt_s(48)).$append($typeName).$append($rt_s(49)).$append2(var$0.$column).$append($rt_s(50));
    $result = var$3.$append2(var$0.$getWidth()).$toString();
    if (var$0.$outcolumn >= 0)
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(51)).$append2(var$0.$outcolumn).$toString();
    if (var$0.$aboveAlign.$line != (-1))
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(52)).$append(var$0.$aboveAlign.$toString()).$toString();
    if (var$0.$belowAlign.$line != (-1))
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(53)).$append(var$0.$belowAlign.$toString()).$toString();
    if (var$0.$preSpace !== 0.0)
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(54)).$append3(var$0.$preSpace).$toString();
    if (var$0.$isAlignmentPoint)
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(55)).$toString();
    if (var$0.$distFromMargin !== 0.0)
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(56)).$append3(var$0.$distFromMargin).$toString();
    if (var$0.$subscript)
        $result = jl_StringBuilder__init_().$append($result).$append($rt_s(57)).$toString();
    return $result;
}
function t_Token_toString(var$0) {
    return t_Misc_BreakLine(jl_StringBuilder__init_().$append(var$0.$mostOfString()).$append($rt_s(58)).$toString());
}
function t_Token$PfStepToken() {
    t_Token.call(this);
    this.$needsSpace = 0;
}
function t_Token$PfStepToken__init_(var_0, var_1, var_2) {
    var var_3 = new t_Token$PfStepToken();
    t_Token$PfStepToken__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function t_Token$PfStepToken__init_0(var$0, var$1, var$2, var$3) {
    t_Token__init_0(var$0, var$1, var$2, 12);
    var$0.$needsSpace = var$3;
}
function otp_PlatformQueue() {
    jl_Object.call(this);
}
function otp_PlatformQueue_wrap(var$1) {
    return var$1;
}
function otp_PlatformQueue_isEmpty$static(var$1) {
    return var$1.length ? 0 : 1;
}
function otp_PlatformQueue_add$static(var$1, var$2) {
    var var$3;
    var$3 = otp_PlatformQueue_wrap(var$2);
    var$1.push(var$3);
}
function otp_PlatformQueue_remove$static(var$1) {
    return var$1.shift();
}
function jl_CharSequence() {
}
function jl_Error() {
    jl_Throwable.call(this);
}
function jl_Error__init_() {
    var var_0 = new jl_Error();
    jl_Error__init_0(var_0);
    return var_0;
}
function jl_Error__init_1(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_2(var_1, var_0);
    return var_1;
}
function jl_Error__init_3(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_4(var_1, var_0);
    return var_1;
}
function jl_Error__init_0(var$0) {
    jl_Throwable__init_0(var$0);
}
function jl_Error__init_2(var$0, var$1) {
    jl_Throwable__init_2(var$0, var$1);
}
function jl_Error__init_4(var$0, var$1) {
    jl_Throwable__init_4(var$0, var$1);
}
function jl_LinkageError() {
    jl_Error.call(this);
}
function jl_LinkageError__init_(var_0) {
    var var_1 = new jl_LinkageError();
    jl_LinkageError__init_0(var_1, var_0);
    return var_1;
}
function jl_LinkageError__init_0(var$0, var$1) {
    jl_Error__init_2(var$0, var$1);
}
function jn_Buffer() {
    var a = this; jl_Object.call(a);
    a.$capacity = 0;
    a.$position = 0;
    a.$limit = 0;
    a.$mark = 0;
}
function jn_Buffer__init_(var_0) {
    var var_1 = new jn_Buffer();
    jn_Buffer__init_0(var_1, var_0);
    return var_1;
}
function jn_Buffer__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$mark = (-1);
    var$0.$capacity = var$1;
    var$0.$limit = var$1;
}
function jn_Buffer_position(var$0) {
    return var$0.$position;
}
function jn_Buffer_position0(var$0, var$1) {
    if (var$1 >= 0 && var$1 <= var$0.$limit) {
        var$0.$position = var$1;
        if (var$1 < var$0.$mark)
            var$0.$mark = 0;
        return var$0;
    }
    $rt_throw(jl_IllegalArgumentException__init_0(jl_StringBuilder__init_().$append($rt_s(59)).$append2(var$1).$append($rt_s(60)).$append2(var$0.$limit).$append($rt_s(58)).$toString()));
}
function jn_Buffer_clear(var$0) {
    var$0.$position = 0;
    var$0.$limit = var$0.$capacity;
    var$0.$mark = (-1);
    return var$0;
}
function jn_Buffer_remaining(var$0) {
    return var$0.$limit - var$0.$position | 0;
}
function jn_Buffer_hasRemaining(var$0) {
    return var$0.$position >= var$0.$limit ? 0 : 1;
}
function jl_Appendable() {
}
function jl_Readable() {
}
function jn_CharBuffer() {
    jn_Buffer.call(this);
}
function jn_CharBuffer__init_(var_0, var_1, var_2) {
    var var_3 = new jn_CharBuffer();
    jn_CharBuffer__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jn_CharBuffer__init_0(var$0, var$1, var$2, var$3) {
    jn_Buffer__init_0(var$0, var$1);
    var$0.$position = var$2;
    var$0.$limit = var$3;
}
function jn_CharBuffer_wrap(var$1, var$2, var$3) {
    return jn_CharBufferOverArray__init_(0, var$1.data.length, var$1, var$2, var$2 + var$3 | 0, 0);
}
function jn_CharBuffer_get(var$0, var$1, var$2, var$3) {
    var var$4, var$5, var$6, $pos, $i;
    if (var$2 >= 0) {
        var$4 = var$1.data;
        var$5 = var$4.length;
        if (var$2 < var$5) {
            var$6 = var$2 + var$3 | 0;
            if (var$6 > var$5)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(61)).$append2(var$6).$append($rt_s(62)).$append2(var$5).$toString()));
            if (var$0.$remaining() < var$3)
                $rt_throw(jn_BufferUnderflowException__init_());
            if (var$3 < 0)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(63)).$append2(var$3).$append($rt_s(64)).$toString()));
            $pos = var$0.$position;
            $i = 0;
            while ($i < var$3) {
                var$6 = var$2 + 1 | 0;
                var$5 = $pos + 1 | 0;
                var$4[var$2] = var$0.$getChar($pos);
                $i = $i + 1 | 0;
                var$2 = var$6;
                $pos = var$5;
            }
            var$0.$position = var$0.$position + var$3 | 0;
            return var$0;
        }
    }
    var$4 = var$1.data;
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(65)).$append2(var$2).$append($rt_s(60)).$append2(var$4.length).$append($rt_s(66)).$toString()));
}
function jn_CharBufferImpl() {
    jn_CharBuffer.call(this);
}
function jn_CharBufferImpl__init_(var_0, var_1, var_2) {
    var var_3 = new jn_CharBufferImpl();
    jn_CharBufferImpl__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jn_CharBufferImpl__init_0(var$0, var$1, var$2, var$3) {
    jn_CharBuffer__init_0(var$0, var$1, var$2, var$3);
}
function jn_CharBufferOverArray() {
    var a = this; jn_CharBufferImpl.call(a);
    a.$readOnly = 0;
    a.$start = 0;
    a.$array = null;
}
function jn_CharBufferOverArray__init_(var_0, var_1, var_2, var_3, var_4, var_5) {
    var var_6 = new jn_CharBufferOverArray();
    jn_CharBufferOverArray__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
}
function jn_CharBufferOverArray__init_0(var$0, var$1, var$2, var$3, var$4, var$5, var$6) {
    jn_CharBufferImpl__init_0(var$0, var$2, var$4, var$5);
    var$0.$start = var$1;
    var$0.$readOnly = var$6;
    var$0.$array = var$3;
}
function jn_CharBufferOverArray_getChar(var$0, var$1) {
    return var$0.$array.data[var$1 + var$0.$start | 0];
}
function otjde_LoadEventTarget() {
}
function t_Unicode() {
    jl_Object.call(this);
}
var t_Unicode_IMMEDIATE_REPLACE = null;
var t_Unicode_table = null;
var t_Unicode_u2a = null;
var t_Unicode_a2u = null;
var t_Unicode_cu2a = null;
function t_Unicode_$callClinit() {
    t_Unicode_$callClinit = $rt_eraseClinit(t_Unicode);
    t_Unicode__clinit_();
}
function t_Unicode_u2a0(var$1) {
    t_Unicode_$callClinit();
    return t_Unicode_u2a.$get(var$1);
}
function t_Unicode_cu2a0(var$1) {
    t_Unicode_$callClinit();
    return t_Unicode_cu2a.$get(jl_Character_valueOf(var$1));
}
function t_Unicode_a2u0(var$1) {
    t_Unicode_$callClinit();
    return t_Unicode_a2u.$get(var$1);
}
function t_Unicode_a2uc(var$1) {
    var $res;
    t_Unicode_$callClinit();
    $res = t_Unicode_a2u.$get(var$1);
    if ($res !== null && !t_Unicode_u2a.$get($res).$equals(var$1))
        $res = null;
    return $res;
}
function t_Unicode_convertToUnicode(var$1) {
    var $out, $r, $i, $c;
    t_Unicode_$callClinit();
    if (var$1 === null)
        return null;
    $out = jl_StringBuilder__init_();
    $r = t_Unicode$1__init_($out);
    $i = 0;
    while ($i < var$1.$length()) {
        $c = var$1.$charAt($i);
        $r.$addChar($c);
        $i = $i + 1 | 0;
    }
    $r.$flush();
    return $out.$toString();
}
function t_Unicode_convertToASCII(var$1) {
    var $out, $i, $c, $u;
    t_Unicode_$callClinit();
    if (var$1 === null)
        return null;
    $out = jl_StringBuilder__init_();
    $i = 0;
    while ($i < var$1.$length()) {
        $c = var$1.$charAt($i);
        $u = t_Unicode_cu2a0($c);
        if ($u === null)
            $out.$append1($c);
        else
            $out.$append($u);
        $i = $i + 1 | 0;
    }
    return $out.$toString();
}
function t_Unicode_convert(var$1, var$2) {
    t_Unicode_$callClinit();
    return !var$1 ? t_Unicode_convertToASCII(var$2) : t_Unicode_convertToUnicode(var$2);
}
function t_Unicode__clinit_() {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, $row, $u, $i;
    var$1 = new ju_HashSet;
    var$2 = $rt_createArray(jl_String, 9);
    var$3 = var$2.data;
    var$3[0] = $rt_s(67);
    var$3[1] = $rt_s(68);
    var$3[2] = $rt_s(69);
    var$3[3] = $rt_s(70);
    var$3[4] = $rt_s(71);
    var$3[5] = $rt_s(72);
    var$3[6] = $rt_s(73);
    var$3[7] = $rt_s(74);
    var$3[8] = $rt_s(75);
    ju_HashSet__init_(var$1, ju_Arrays_asList(var$2));
    t_Unicode_IMMEDIATE_REPLACE = var$1;
    var$2 = $rt_createArray($rt_arraycls(jl_String), 71);
    var$4 = var$2.data;
    var$5 = 0;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(76);
    var$6[1] = $rt_s(77);
    var$4[var$5] = var$3;
    var$5 = 1;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(78);
    var$6[1] = $rt_s(75);
    var$4[var$5] = var$3;
    var$5 = 2;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(79);
    var$6[1] = $rt_s(74);
    var$4[var$5] = var$3;
    var$5 = 3;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(80);
    var$6[1] = $rt_s(73);
    var$4[var$5] = var$3;
    var$5 = 4;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(81);
    var$6[1] = $rt_s(71);
    var$4[var$5] = var$3;
    var$5 = 5;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(82);
    var$6[1] = $rt_s(72);
    var$4[var$5] = var$3;
    var$5 = 6;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(83);
    var$6[1] = $rt_s(84);
    var$4[var$5] = var$3;
    var$5 = 7;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(85);
    var$6[1] = $rt_s(86);
    var$4[var$5] = var$3;
    var$5 = 8;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(87);
    var$6[1] = $rt_s(69);
    var$4[var$5] = var$3;
    var$5 = 9;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(88);
    var$6[1] = $rt_s(70);
    var$4[var$5] = var$3;
    var$5 = 10;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(89);
    var$6[1] = $rt_s(90);
    var$4[var$5] = var$3;
    var$5 = 11;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(91);
    var$6[1] = $rt_s(92);
    var$4[var$5] = var$3;
    var$5 = 12;
    var$6 = $rt_createArray(jl_String, 2);
    var$3 = var$6.data;
    var$3[0] = $rt_s(93);
    var$3[1] = $rt_s(94);
    var$4[var$5] = var$6;
    var$5 = 13;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(95);
    var$6[1] = $rt_s(96);
    var$4[var$5] = var$3;
    var$5 = 14;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(97);
    var$6[1] = $rt_s(98);
    var$6[2] = $rt_s(99);
    var$4[var$5] = var$3;
    var$5 = 15;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(100);
    var$6[1] = $rt_s(101);
    var$6[2] = $rt_s(102);
    var$4[var$5] = var$3;
    var$5 = 16;
    var$3 = $rt_createArray(jl_String, 4);
    var$6 = var$3.data;
    var$6[0] = $rt_s(103);
    var$6[1] = $rt_s(104);
    var$6[2] = $rt_s(105);
    var$6[3] = $rt_s(106);
    var$4[var$5] = var$3;
    var$5 = 17;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(107);
    var$6[1] = $rt_s(68);
    var$6[2] = $rt_s(108);
    var$4[var$5] = var$3;
    var$5 = 18;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(109);
    var$6[1] = $rt_s(67);
    var$6[2] = $rt_s(110);
    var$4[var$5] = var$3;
    var$5 = 19;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(111);
    var$6[1] = $rt_s(112);
    var$4[var$5] = var$3;
    var$5 = 20;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(113);
    var$6[1] = $rt_s(114);
    var$6[2] = $rt_s(115);
    var$4[var$5] = var$3;
    var$5 = 21;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(116);
    var$6[1] = $rt_s(117);
    var$6[2] = $rt_s(118);
    var$4[var$5] = var$3;
    var$5 = 22;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(119);
    var$6[1] = $rt_s(120);
    var$4[var$5] = var$3;
    var$5 = 23;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(121);
    var$6[1] = $rt_s(122);
    var$4[var$5] = var$3;
    var$5 = 24;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(123);
    var$6[1] = $rt_s(124);
    var$4[var$5] = var$3;
    var$5 = 25;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(125);
    var$6[1] = $rt_s(126);
    var$4[var$5] = var$3;
    var$5 = 26;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(127);
    var$6[1] = $rt_s(128);
    var$4[var$5] = var$3;
    var$5 = 27;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(129);
    var$6[1] = $rt_s(130);
    var$4[var$5] = var$3;
    var$5 = 28;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(131);
    var$6[1] = $rt_s(132);
    var$6[2] = $rt_s(133);
    var$4[var$5] = var$3;
    var$5 = 29;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(134);
    var$6[1] = $rt_s(135);
    var$6[2] = $rt_s(136);
    var$4[var$5] = var$3;
    var$5 = 30;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(137);
    var$6[1] = $rt_s(138);
    var$4[var$5] = var$3;
    var$5 = 31;
    var$3 = $rt_createArray(jl_String, 4);
    var$6 = var$3.data;
    var$6[0] = $rt_s(139);
    var$6[1] = $rt_s(140);
    var$6[2] = $rt_s(141);
    var$6[3] = $rt_s(142);
    var$4[var$5] = var$3;
    var$5 = 32;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(143);
    var$6[1] = $rt_s(144);
    var$6[2] = $rt_s(145);
    var$4[var$5] = var$3;
    var$5 = 33;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(146);
    var$6[1] = $rt_s(147);
    var$4[var$5] = var$3;
    var$5 = 34;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(148);
    var$6[1] = $rt_s(149);
    var$4[var$5] = var$3;
    var$5 = 35;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(150);
    var$6[1] = $rt_s(150);
    var$6[2] = $rt_s(151);
    var$4[var$5] = var$3;
    var$5 = 36;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(152);
    var$6[1] = $rt_s(153);
    var$6[2] = $rt_s(154);
    var$4[var$5] = var$3;
    var$5 = 37;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(155);
    var$6[1] = $rt_s(156);
    var$4[var$5] = var$3;
    var$5 = 38;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(157);
    var$6[1] = $rt_s(158);
    var$4[var$5] = var$3;
    var$5 = 39;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(159);
    var$6[1] = $rt_s(160);
    var$6[2] = $rt_s(161);
    var$4[var$5] = var$3;
    var$5 = 40;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(162);
    var$6[1] = $rt_s(163);
    var$6[2] = $rt_s(164);
    var$4[var$5] = var$3;
    var$5 = 41;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(165);
    var$6[1] = $rt_s(166);
    var$6[2] = $rt_s(167);
    var$4[var$5] = var$3;
    var$5 = 42;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(168);
    var$6[1] = $rt_s(169);
    var$6[2] = $rt_s(170);
    var$4[var$5] = var$3;
    var$5 = 43;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(171);
    var$6[1] = $rt_s(172);
    var$6[2] = $rt_s(173);
    var$4[var$5] = var$3;
    var$5 = 44;
    var$3 = $rt_createArray(jl_String, 3);
    var$6 = var$3.data;
    var$6[0] = $rt_s(174);
    var$6[1] = $rt_s(175);
    var$6[2] = $rt_s(176);
    var$4[var$5] = var$3;
    var$5 = 45;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(177);
    var$6[1] = $rt_s(178);
    var$4[var$5] = var$3;
    var$5 = 46;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(179);
    var$6[1] = $rt_s(180);
    var$4[var$5] = var$3;
    var$5 = 47;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(181);
    var$6[1] = $rt_s(182);
    var$4[var$5] = var$3;
    var$5 = 48;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(183);
    var$6[1] = $rt_s(184);
    var$4[var$5] = var$3;
    var$5 = 49;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(185);
    var$6[1] = $rt_s(186);
    var$4[var$5] = var$3;
    var$5 = 50;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(187);
    var$6[1] = $rt_s(188);
    var$4[var$5] = var$3;
    var$5 = 51;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(189);
    var$6[1] = $rt_s(190);
    var$4[var$5] = var$3;
    var$5 = 52;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(191);
    var$6[1] = $rt_s(192);
    var$4[var$5] = var$3;
    var$5 = 53;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(193);
    var$6[1] = $rt_s(194);
    var$4[var$5] = var$3;
    var$5 = 54;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(195);
    var$6[1] = $rt_s(196);
    var$4[var$5] = var$3;
    var$5 = 55;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(197);
    var$6[1] = $rt_s(198);
    var$4[var$5] = var$3;
    var$5 = 56;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(199);
    var$6[1] = $rt_s(200);
    var$4[var$5] = var$3;
    var$5 = 57;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(201);
    var$6[1] = $rt_s(202);
    var$4[var$5] = var$3;
    var$5 = 58;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(203);
    var$6[1] = $rt_s(204);
    var$4[var$5] = var$3;
    var$5 = 59;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(205);
    var$6[1] = $rt_s(206);
    var$4[var$5] = var$3;
    var$5 = 60;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(207);
    var$6[1] = $rt_s(208);
    var$4[var$5] = var$3;
    var$5 = 61;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(209);
    var$6[1] = $rt_s(210);
    var$4[var$5] = var$3;
    var$5 = 62;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(211);
    var$6[1] = $rt_s(212);
    var$4[var$5] = var$3;
    var$5 = 63;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(213);
    var$6[1] = $rt_s(214);
    var$4[var$5] = var$3;
    var$5 = 64;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(215);
    var$6[1] = $rt_s(216);
    var$4[var$5] = var$3;
    var$5 = 65;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(217);
    var$6[1] = $rt_s(218);
    var$4[var$5] = var$3;
    var$5 = 66;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(219);
    var$6[1] = $rt_s(220);
    var$4[var$5] = var$3;
    var$5 = 67;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(221);
    var$6[1] = $rt_s(222);
    var$4[var$5] = var$3;
    var$5 = 68;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(223);
    var$6[1] = $rt_s(224);
    var$4[var$5] = var$3;
    var$5 = 69;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(225);
    var$6[1] = $rt_s(226);
    var$4[var$5] = var$3;
    var$5 = 70;
    var$3 = $rt_createArray(jl_String, 2);
    var$6 = var$3.data;
    var$6[0] = $rt_s(227);
    var$6[1] = $rt_s(228);
    var$4[var$5] = var$3;
    t_Unicode_table = var$2;
    t_Unicode_u2a = ju_HashMap__init_();
    t_Unicode_a2u = ju_HashMap__init_();
    t_Unicode_cu2a = ju_HashMap__init_();
    var$2 = t_Unicode_table.data;
    var$5 = var$2.length;
    var$7 = 0;
    while (var$7 < var$5) {
        $row = var$2[var$7];
        var$3 = $row.data;
        $u = var$3[0];
        t_Unicode_u2a.$put($u, var$3[1]);
        if ($u.$length() == 1)
            t_Unicode_cu2a.$put(jl_Character_valueOf($u.$charAt(0)), var$3[1]);
        $i = 1;
        while ($i < var$3.length) {
            t_Unicode_a2u.$put(var$3[$i], $u);
            $i = $i + 1 | 0;
        }
        var$7 = var$7 + 1 | 0;
    }
}
function ju_Set() {
}
function jl_StringIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0(var$0) {
    jl_IndexOutOfBoundsException__init_0(var$0);
}
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out0 = null;
}
function ji_FilterOutputStream__init_(var_0) {
    var var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_FilterOutputStream__init_0(var$0, var$1) {
    ji_OutputStream__init_0(var$0);
    var$0.$out0 = var$1;
}
function ji_Reader() {
    jl_Object.call(this);
    this.$lock = null;
}
function ji_Reader__init_() {
    var var_0 = new ji_Reader();
    ji_Reader__init_0(var_0);
    return var_0;
}
function ji_Reader__init_1(var_0) {
    var var_1 = new ji_Reader();
    ji_Reader__init_2(var_1, var_0);
    return var_1;
}
function ji_Reader__init_0(var$0) {
    ji_Reader__init_2(var$0, jl_Object__init_());
}
function ji_Reader__init_2(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$lock = var$1;
}
function ju_MapEntry$Type() {
}
function ju_Hashtable$keys$lambda$_19_0() {
    jl_Object.call(this);
}
function ju_Hashtable$keys$lambda$_19_0__init_() {
    var var_0 = new ju_Hashtable$keys$lambda$_19_0();
    ju_Hashtable$keys$lambda$_19_0__init_0(var_0);
    return var_0;
}
function ju_Hashtable$keys$lambda$_19_0__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function ju_Hashtable$keys$lambda$_19_0_get(var$0, var$1) {
    return ju_Hashtable_lambda$keys$1(var$1);
}
function t_Position() {
    var a = this; jl_Object.call(a);
    a.$line = 0;
    a.$item = 0;
}
function t_Position__init_0() {
    var var_0 = new t_Position();
    t_Position__init_1(var_0);
    return var_0;
}
function t_Position__init_(var_0, var_1) {
    var var_2 = new t_Position();
    t_Position__init_2(var_2, var_0, var_1);
    return var_2;
}
function t_Position__init_1(var$0) {
    jl_Object__init_0(var$0);
    var$0.$line = (-1);
    var$0.$item = 0;
}
function t_Position__init_2(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$line = (-1);
    var$0.$item = 0;
    var$0.$line = var$1;
    var$0.$item = var$2;
}
function t_Position_toToken(var$0, var$1) {
    var var$2;
    var$2 = var$1.data;
    t_Debug_Assert0(var$0.$line < var$2.length && var$0.$line >= 0 && var$0.$item < var$2[var$0.$line].data.length ? 1 : 0, $rt_s(229));
    return var$2[var$0.$line].data[var$0.$item];
}
function t_Position_equals(var$0, var$1) {
    return var$0.$line == var$1.$line && var$0.$item == var$1.$item ? 1 : 0;
}
function t_Position_toString(var$0) {
    if (var$0.$line == (-1))
        return $rt_s(230);
    return jl_StringBuilder__init_().$append($rt_s(21)).$append2(var$0.$line).$append($rt_s(231)).$append2(var$0.$item).$append($rt_s(66)).$toString();
}
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name0 = null;
}
var jn_ByteOrder_BIG_ENDIAN = null;
var jn_ByteOrder_LITTLE_ENDIAN = null;
function jn_ByteOrder_$callClinit() {
    jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
    jn_ByteOrder__clinit_();
}
function jn_ByteOrder__init_(var_0) {
    var var_1 = new jn_ByteOrder();
    jn_ByteOrder__init_0(var_1, var_0);
    return var_1;
}
function jn_ByteOrder__init_0(var$0, var$1) {
    jn_ByteOrder_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$name0 = var$1;
}
function jn_ByteOrder__clinit_() {
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(232));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(233));
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
function jl_AbstractStringBuilder__init_0() {
    var var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_1(var_0);
    return var_0;
}
function jl_AbstractStringBuilder__init_(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_3(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_4(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_5(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_6(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_1(var$0) {
    jl_AbstractStringBuilder__init_2(var$0, 16);
}
function jl_AbstractStringBuilder__init_2(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$buffer = $rt_createCharArray(var$1);
}
function jl_AbstractStringBuilder__init_4(var$0, var$1) {
    jl_AbstractStringBuilder__init_6(var$0, var$1);
}
function jl_AbstractStringBuilder__init_6(var$0, var$1) {
    var $i;
    jl_Object__init_0(var$0);
    var$0.$buffer = $rt_createCharArray(var$1.$length());
    $i = 0;
    while ($i < var$0.$buffer.data.length) {
        var$0.$buffer.data[$i] = var$1.$charAt($i);
        $i = $i + 1 | 0;
    }
    var$0.$length0 = var$1.$length();
}
function jl_AbstractStringBuilder_append(var$0, var$1) {
    return var$0.$insert(var$0.$length0, var$1);
}
function jl_AbstractStringBuilder_insert(var$0, var$1, var$2) {
    var $i, var$4, var$5;
    if (var$1 >= 0 && var$1 <= var$0.$length0) {
        if (var$2 === null)
            var$2 = $rt_s(46);
        else if (var$2.$isEmpty())
            return var$0;
        var$0.$ensureCapacity(var$0.$length0 + var$2.$length() | 0);
        $i = var$0.$length0 - 1 | 0;
        while ($i >= var$1) {
            var$0.$buffer.data[$i + var$2.$length() | 0] = var$0.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        var$0.$length0 = var$0.$length0 + var$2.$length() | 0;
        $i = 0;
        while ($i < var$2.$length()) {
            var$4 = var$0.$buffer.data;
            var$5 = var$1 + 1 | 0;
            var$4[var$1] = var$2.$charAt($i);
            $i = $i + 1 | 0;
            var$1 = var$5;
        }
        return var$0;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_append0(var$0, var$1) {
    return var$0.$append0(var$1, 10);
}
function jl_AbstractStringBuilder_append1(var$0, var$1, var$2) {
    return var$0.$insert0(var$0.$length0, var$1, var$2);
}
function jl_AbstractStringBuilder_insert0(var$0, var$1, var$2, var$3) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if (var$2 < 0) {
        $positive = 0;
        var$2 =  -var$2;
    }
    if (var$2 < var$3) {
        if ($positive)
            jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 1 | 0);
        else {
            jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 2 | 0);
            var$5 = var$0.$buffer.data;
            var$6 = var$1 + 1 | 0;
            var$5[var$1] = 45;
            var$1 = var$6;
        }
        var$0.$buffer.data[var$1] = jl_Character_forDigit(var$2, var$3);
    } else {
        $pos = 1;
        $sz = 1;
        $posLimit = 2147483647 / var$3 | 0;
        a: {
            while (true) {
                var$10 = $rt_imul($pos, var$3);
                if (var$10 > var$2) {
                    var$10 = $pos;
                    break a;
                }
                $sz = $sz + 1 | 0;
                if (var$10 > $posLimit)
                    break;
                $pos = var$10;
            }
        }
        if (!$positive)
            $sz = $sz + 1 | 0;
        jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + $sz | 0);
        if ($positive)
            var$11 = var$1;
        else {
            var$5 = var$0.$buffer.data;
            var$11 = var$1 + 1 | 0;
            var$5[var$1] = 45;
        }
        while (var$10 > 0) {
            var$5 = var$0.$buffer.data;
            var$6 = var$11 + 1 | 0;
            var$5[var$11] = jl_Character_forDigit(var$2 / var$10 | 0, var$3);
            var$2 = var$2 % var$10 | 0;
            var$10 = var$10 / var$3 | 0;
            var$11 = var$6;
        }
    }
    return var$0;
}
function jl_AbstractStringBuilder_append2(var$0, var$1) {
    return var$0.$insert1(var$0.$length0, var$1);
}
function jl_AbstractStringBuilder_insert1(var$0, var$1, var$2) {
    var var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $pos, $i, $intDigit;
    if (var$2 === 0.0) {
        jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 3 | 0);
        var$3 = var$0.$buffer.data;
        var$4 = var$1 + 1 | 0;
        var$3[var$1] = 48;
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 46;
        var$0.$buffer.data[var$5] = 48;
        return var$0;
    }
    if (var$2 === 0.0) {
        jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 4 | 0);
        var$3 = var$0.$buffer.data;
        var$4 = var$1 + 1 | 0;
        var$3[var$1] = 45;
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 48;
        var$3 = var$0.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 46;
        var$0.$buffer.data[var$4] = 48;
        return var$0;
    }
    if (isNaN(var$2) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 3 | 0);
        var$3 = var$0.$buffer.data;
        var$4 = var$1 + 1 | 0;
        var$3[var$1] = 78;
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 97;
        var$0.$buffer.data[var$5] = 78;
        return var$0;
    }
    if (!isFinite(var$2) ? 1 : 0) {
        if (var$2 > 0.0) {
            jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 8 | 0);
            var$4 = var$1;
        } else {
            jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 9 | 0);
            var$3 = var$0.$buffer.data;
            var$4 = var$1 + 1 | 0;
            var$3[var$1] = 45;
        }
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 73;
        var$3 = var$0.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 110;
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 102;
        var$3 = var$0.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 105;
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 110;
        var$3 = var$0.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 105;
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 116;
        var$0.$buffer.data[var$5] = 121;
        return var$0;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_floatAnalysisResult;
    otcit_FloatAnalyzer_analyze(var$2, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative) {
        $negative = 1;
        $sz = 2;
    }
    $digits = 9;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else if ($exp < 0) {
            $mantissa = $mantissa / jl_AbstractStringBuilder$Constants_intPowersOfTen.data[ -$exp] | 0;
            $digits = $digits - $exp | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$4 = $sz + $digits | 0;
    jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + var$4 | 0);
    if (!$negative)
        var$4 = var$1;
    else {
        var$3 = var$0.$buffer.data;
        var$4 = var$1 + 1 | 0;
        var$3[var$1] = 45;
    }
    $pos = 100000000;
    $i = 0;
    while ($i < $digits) {
        if ($pos <= 0)
            $intDigit = 0;
        else {
            $intDigit = $mantissa / $pos | 0;
            $mantissa = $mantissa % $pos | 0;
        }
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$4 = var$5;
        else {
            var$3 = var$0.$buffer.data;
            var$4 = var$5 + 1 | 0;
            var$3[var$5] = 46;
        }
        $pos = $pos / 10 | 0;
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$3 = var$0.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 69;
        if ($exp >= 0)
            var$4 = var$5;
        else {
            $exp =  -$exp;
            var$3 = var$0.$buffer.data;
            var$4 = var$5 + 1 | 0;
            var$3[var$5] = 45;
        }
        if ($exp < 10)
            var$5 = var$4;
        else {
            var$3 = var$0.$buffer.data;
            var$5 = var$4 + 1 | 0;
            var$3[var$4] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        var$0.$buffer.data[var$5] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return var$0;
}
function jl_AbstractStringBuilder_trailingDecimalZeros(var$1) {
    var $result, $zeros;
    if (!(var$1 % 1000000000 | 0))
        return 9;
    $result = 0;
    $zeros = 1;
    if (!(var$1 % 100000000 | 0)) {
        $result = 8;
        $zeros = 100000000;
    }
    if (!(var$1 % ($zeros * 10000 | 0) | 0)) {
        $result = $result | 4;
        $zeros = $zeros * 10000 | 0;
    }
    if (!(var$1 % ($zeros * 100 | 0) | 0)) {
        $result = $result | 2;
        $zeros = $zeros * 100 | 0;
    }
    if (!(var$1 % ($zeros * 10 | 0) | 0))
        $result = $result | 1;
    return $result;
}
function jl_AbstractStringBuilder_append3(var$0, var$1) {
    return var$0.$insert2(var$0.$length0, var$1);
}
function jl_AbstractStringBuilder_insert2(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$1 + 1 | 0);
    var$0.$buffer.data[var$1] = var$2;
    return var$0;
}
function jl_AbstractStringBuilder_append4(var$0, var$1) {
    return var$0.$insert3(var$0.$length0, var$1);
}
function jl_AbstractStringBuilder_insert3(var$0, var$1, var$2) {
    return var$0.$insert(var$1, var$2 === null ? $rt_s(46) : var$2.$toString());
}
function jl_AbstractStringBuilder_ensureCapacity(var$0, var$1) {
    var $newLength, var$3, var$4;
    if (var$0.$buffer.data.length >= var$1)
        return;
    if (var$0.$buffer.data.length >= 1073741823)
        $newLength = 2147483647;
    else {
        var$3 = var$0.$buffer.data.length * 2 | 0;
        var$4 = 5;
        $newLength = jl_Math_max(var$1, jl_Math_max(var$3, var$4));
    }
    var$0.$buffer = ju_Arrays_copyOf(var$0.$buffer, $newLength);
}
function jl_AbstractStringBuilder_toString(var$0) {
    return jl_String__init_0(var$0.$buffer, 0, var$0.$length0);
}
function jl_AbstractStringBuilder_length(var$0) {
    return var$0.$length0;
}
function jl_AbstractStringBuilder_charAt(var$0, var$1) {
    if (var$1 >= 0 && var$1 < var$0.$length0)
        return var$0.$buffer.data[var$1];
    $rt_throw(jl_IndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_append5(var$0, var$1, var$2, var$3) {
    return var$0.$insert4(var$0.$length0, var$1, var$2, var$3);
}
function jl_AbstractStringBuilder_insert4(var$0, var$1, var$2, var$3, var$4) {
    var var$5, var$6;
    if (var$3 <= var$4 && var$4 <= var$2.$length() && var$3 >= 0) {
        jl_AbstractStringBuilder_insertSpace(var$0, var$1, (var$1 + var$4 | 0) - var$3 | 0);
        while (var$3 < var$4) {
            var$5 = var$0.$buffer.data;
            var$6 = var$1 + 1 | 0;
            var$5[var$1] = var$2.$charAt(var$3);
            var$3 = var$3 + 1 | 0;
            var$1 = var$6;
        }
        return var$0;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_append6(var$0, var$1) {
    return var$0.$append4(var$1, 0, var$1.$length());
}
function jl_AbstractStringBuilder_getChars(var$0, var$1, var$2, var$3, var$4) {
    var var$5, var$6, var$7, var$8;
    if (var$1 > var$2)
        $rt_throw(jl_IndexOutOfBoundsException__init_1($rt_s(234)));
    while (var$1 < var$2) {
        var$5 = var$3.data;
        var$6 = var$4 + 1 | 0;
        var$7 = var$0.$buffer.data;
        var$8 = var$1 + 1 | 0;
        var$5[var$4] = var$7[var$1];
        var$4 = var$6;
        var$1 = var$8;
    }
}
function jl_AbstractStringBuilder_setLength(var$0, var$1) {
    var$0.$length0 = var$1;
}
function jl_AbstractStringBuilder_delete(var$0, var$1, var$2) {
    var var$3, $sz, $i, var$6, var$7, var$8;
    var$3 = $rt_compare(var$1, var$2);
    if (var$3 <= 0 && var$1 <= var$0.$length0) {
        if (!var$3)
            return var$0;
        $sz = var$0.$length0 - var$2 | 0;
        var$0.$length0 = var$0.$length0 - (var$2 - var$1 | 0) | 0;
        $i = 0;
        while ($i < $sz) {
            var$6 = var$0.$buffer.data;
            var$3 = var$1 + 1 | 0;
            var$7 = var$0.$buffer.data;
            var$8 = var$2 + 1 | 0;
            var$6[var$1] = var$7[var$2];
            $i = $i + 1 | 0;
            var$1 = var$3;
            var$2 = var$8;
        }
        return var$0;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_insertSpace(var$0, var$1, var$2) {
    var $sz, $i;
    $sz = var$0.$length0 - var$1 | 0;
    var$0.$ensureCapacity((var$0.$length0 + var$2 | 0) - var$1 | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$0.$buffer.data[var$2 + $i | 0] = var$0.$buffer.data[var$1 + $i | 0];
        $i = $i + (-1) | 0;
    }
    var$0.$length0 = var$0.$length0 + (var$2 - var$1 | 0) | 0;
}
function jl_StringBuilder() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_1(var_0) {
    var var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_StringBuilder__init_0(var$0) {
    jl_AbstractStringBuilder__init_1(var$0);
}
function jl_StringBuilder__init_2(var$0, var$1) {
    jl_AbstractStringBuilder__init_4(var$0, var$1);
}
function jl_StringBuilder_append(var$0, var$1) {
    jl_AbstractStringBuilder_append(var$0, var$1);
    return var$0;
}
function jl_StringBuilder_append0(var$0, var$1) {
    jl_AbstractStringBuilder_append0(var$0, var$1);
    return var$0;
}
function jl_StringBuilder_append1(var$0, var$1) {
    jl_AbstractStringBuilder_append2(var$0, var$1);
    return var$0;
}
function jl_StringBuilder_append2(var$0, var$1) {
    jl_AbstractStringBuilder_append3(var$0, var$1);
    return var$0;
}
function jl_StringBuilder_append3(var$0, var$1, var$2, var$3) {
    jl_AbstractStringBuilder_append5(var$0, var$1, var$2, var$3);
    return var$0;
}
function jl_StringBuilder_append4(var$0, var$1) {
    jl_AbstractStringBuilder_append6(var$0, var$1);
    return var$0;
}
function jl_StringBuilder_append5(var$0, var$1) {
    jl_AbstractStringBuilder_append4(var$0, var$1);
    return var$0;
}
function jl_StringBuilder_insert(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_insert1(var$0, var$1, var$2);
    return var$0;
}
function jl_StringBuilder_insert0(var$0, var$1, var$2, var$3, var$4) {
    jl_AbstractStringBuilder_insert4(var$0, var$1, var$2, var$3, var$4);
    return var$0;
}
function jl_StringBuilder_insert1(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_insert3(var$0, var$1, var$2);
    return var$0;
}
function jl_StringBuilder_insert2(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_insert2(var$0, var$1, var$2);
    return var$0;
}
function jl_StringBuilder_delete(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_delete(var$0, var$1, var$2);
    return var$0;
}
function jl_StringBuilder_insert3(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_insert(var$0, var$1, var$2);
    return var$0;
}
function jl_StringBuilder_setLength(var$0, var$1) {
    jl_AbstractStringBuilder_setLength(var$0, var$1);
}
function jl_StringBuilder_getChars(var$0, var$1, var$2, var$3, var$4) {
    jl_AbstractStringBuilder_getChars(var$0, var$1, var$2, var$3, var$4);
}
function jl_StringBuilder_insert4(var$0, var$1, var$2, var$3, var$4) {
    return var$0.$insert5(var$1, var$2, var$3, var$4);
}
function jl_StringBuilder_append6(var$0, var$1, var$2, var$3) {
    return var$0.$append11(var$1, var$2, var$3);
}
function jl_StringBuilder_charAt(var$0, var$1) {
    return jl_AbstractStringBuilder_charAt(var$0, var$1);
}
function jl_StringBuilder_length(var$0) {
    return jl_AbstractStringBuilder_length(var$0);
}
function jl_StringBuilder_toString(var$0) {
    return jl_AbstractStringBuilder_toString(var$0);
}
function jl_StringBuilder_ensureCapacity(var$0, var$1) {
    jl_AbstractStringBuilder_ensureCapacity(var$0, var$1);
}
function jl_StringBuilder_insert5(var$0, var$1, var$2) {
    return var$0.$insert6(var$1, var$2);
}
function jl_StringBuilder_insert6(var$0, var$1, var$2) {
    return var$0.$insert7(var$1, var$2);
}
function jl_StringBuilder_insert7(var$0, var$1, var$2) {
    return var$0.$insert8(var$1, var$2);
}
function jl_StringBuilder_insert8(var$0, var$1, var$2) {
    return var$0.$insert9(var$1, var$2);
}
function ju_ConcurrentModificationException() {
    jl_RuntimeException.call(this);
}
function ju_ConcurrentModificationException__init_() {
    var var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_0(var_0);
    return var_0;
}
function ju_ConcurrentModificationException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function ju_Dictionary() {
    jl_Object.call(this);
}
function ju_Dictionary__init_() {
    var var_0 = new ju_Dictionary();
    ju_Dictionary__init_0(var_0);
    return var_0;
}
function ju_Dictionary__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function jlr_AnnotatedElement() {
}
function ju_Hashtable$1() {
    jl_Object.call(this);
}
function ju_Hashtable$1__init_() {
    var var_0 = new ju_Hashtable$1();
    ju_Hashtable$1__init_0(var_0);
    return var_0;
}
function ju_Hashtable$1__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function ju_Hashtable$1_hasMoreElements(var$0) {
    return 0;
}
function ju_Hashtable$1_nextElement(var$0) {
    $rt_throw(ju_NoSuchElementException__init_());
}
function ju_Map$Entry() {
}
function ju_MapEntry() {
    var a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
function ju_MapEntry__init_(var_0, var_1) {
    var var_2 = new ju_MapEntry();
    ju_MapEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_MapEntry__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$key = var$1;
    var$0.$value0 = var$2;
}
function ju_Hashtable$Entry() {
    var a = this; ju_MapEntry.call(a);
    a.$next0 = null;
    a.$hashcode = 0;
}
function ju_Hashtable$Entry__init_(var_0, var_1) {
    var var_2 = new ju_Hashtable$Entry();
    ju_Hashtable$Entry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_Hashtable$Entry__init_0(var$0, var$1, var$2) {
    ju_MapEntry__init_0(var$0, var$1, var$2);
    var$0.$hashcode = var$1.$hashCode();
}
function ju_Hashtable$Entry_getKeyHash(var$0) {
    return var$0.$key.$hashCode();
}
function ju_Hashtable$Entry_equalsKey(var$0, var$1, var$2) {
    return var$0.$hashcode == var$1.$hashCode() && var$0.$key.$equals(var$1) ? 1 : 0;
}
function ju_Iterator() {
}
function ju_Hashtable$2() {
    jl_Object.call(this);
}
function ju_Hashtable$2__init_() {
    var var_0 = new ju_Hashtable$2();
    ju_Hashtable$2__init_0(var_0);
    return var_0;
}
function ju_Hashtable$2__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function t_CharReader() {
    var a = this; jl_Object.call(a);
    a.$currentLine = null;
    a.$uninitialized = 0;
    a.$line0 = 0;
    a.$column0 = 0;
    a.$vcolumn = 0;
    a.$tabToSpaces = 0;
}
function t_CharReader__init_() {
    var var_0 = new t_CharReader();
    t_CharReader__init_0(var_0);
    return var_0;
}
function t_CharReader__init_0(var$0) {
    jl_Object__init_0(var$0);
    var$0.$currentLine = null;
    var$0.$uninitialized = 1;
    var$0.$line0 = 0;
    var$0.$column0 = 0;
    var$0.$vcolumn = 0;
    var$0.$tabToSpaces = 0;
}
function t_CharReader_getLineNumber(var$0) {
    return var$0.$line0;
}
function t_CharReader_getColumnNumber(var$0) {
    return var$0.$vcolumn;
}
function t_CharReader_getNextChar(var$0) {
    var $readChar;
    if (var$0.$uninitialized) {
        var$0.$currentLine = var$0.$innerGetNextLine();
        var$0.$uninitialized = 0;
    }
    if (var$0.$currentLine === null)
        return 9;
    if (var$0.$tabToSpaces) {
        var$0.$vcolumn = var$0.$vcolumn + 1 | 0;
        if (!(var$0.$vcolumn % 8 | 0))
            var$0.$tabToSpaces = 0;
        return 32;
    }
    if (var$0.$currentLine.$length() == var$0.$column0) {
        var$0.$line0 = var$0.$line0 + 1 | 0;
        var$0.$column0 = 0;
        var$0.$vcolumn = 0;
        var$0.$currentLine = var$0.$innerGetNextLine();
        return 10;
    }
    $readChar = var$0.$currentLine.$charAt(var$0.$column0);
    var$0.$column0 = var$0.$column0 + 1 | 0;
    var$0.$vcolumn = var$0.$vcolumn + 1 | 0;
    if ($readChar != 9)
        return $readChar;
    if (var$0.$vcolumn % 8 | 0)
        var$0.$tabToSpaces = 1;
    return 32;
}
function t_CharReader_backspace(var$0) {
    if (!var$0.$column0)
        t_Debug_ReportBug($rt_s(235));
    var$0.$column0 = var$0.$column0 - 1 | 0;
    var$0.$vcolumn = var$0.$vcolumn - 1 | 0;
}
function t_InputStreamCharReader() {
    t_CharReader.call(this);
    this.$bufferedReader = null;
}
function t_InputStreamCharReader__init_(var_0) {
    var var_1 = new t_InputStreamCharReader();
    t_InputStreamCharReader__init_0(var_1, var_0);
    return var_1;
}
function t_InputStreamCharReader__init_0(var$0, var$1) {
    var var$2;
    t_CharReader__init_0(var$0);
    var$2 = var$1 instanceof ji_BufferedReader ? var$1 : ji_BufferedReader__init_(var$1);
    var$0.$bufferedReader = var$2;
}
function t_InputStreamCharReader_innerGetNextLine(var$0) {
    var var$1, $e, $$je;
    a: {
        try {
            var$1 = var$0.$bufferedReader.$readLine();
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                $e = $$je;
                break a;
            } else {
                throw $$je;
            }
        }
        return var$1;
    }
    t_Debug_ReportError(jl_StringBuilder__init_().$append($rt_s(236)).$append($e.$getMessage()).$toString());
    return null;
}
function otjde_FocusEventTarget() {
}
function otjde_MouseEventTarget() {
}
function otjde_KeyboardEventTarget() {
}
function otjb_WindowEventTarget() {
}
function ju_ArrayList() {
    var a = this; ju_AbstractList.call(a);
    a.$array0 = null;
    a.$size0 = 0;
}
function ju_ArrayList__init_() {
    var var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
}
function ju_ArrayList__init_1(var_0) {
    var var_1 = new ju_ArrayList();
    ju_ArrayList__init_2(var_1, var_0);
    return var_1;
}
function ju_ArrayList__init_0(var$0) {
    ju_ArrayList__init_2(var$0, 10);
}
function ju_ArrayList__init_2(var$0, var$1) {
    ju_AbstractList__init_0(var$0);
    var$0.$array0 = $rt_createArray(jl_Object, var$1);
}
function ju_ArrayList_ensureCapacity(var$0, var$1) {
    var $newLength, var$3, var$4;
    if (var$0.$array0.data.length < var$1) {
        if (var$0.$array0.data.length >= 1073741823)
            $newLength = 2147483647;
        else {
            var$3 = var$0.$array0.data.length * 2 | 0;
            var$4 = 5;
            $newLength = jl_Math_max(var$1, jl_Math_max(var$3, var$4));
        }
        var$0.$array0 = ju_Arrays_copyOf0(var$0.$array0, $newLength);
    }
}
function ju_ArrayList_get(var$0, var$1) {
    ju_ArrayList_checkIndex(var$0, var$1);
    return var$0.$array0.data[var$1];
}
function ju_ArrayList_size(var$0) {
    return var$0.$size0;
}
function ju_ArrayList_add(var$0, var$1) {
    var var$2, var$3;
    var$0.$ensureCapacity(var$0.$size0 + 1 | 0);
    var$2 = var$0.$array0.data;
    var$3 = var$0.$size0;
    var$0.$size0 = var$3 + 1 | 0;
    var$2[var$3] = var$1;
    var$0.$modCount = var$0.$modCount + 1 | 0;
    return 1;
}
function ju_ArrayList_checkIndex(var$0, var$1) {
    if (var$1 >= 0 && var$1 < var$0.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
}
function jnc_CoderMalfunctionError() {
    jl_Error.call(this);
}
function jnc_CoderMalfunctionError__init_(var_0) {
    var var_1 = new jnc_CoderMalfunctionError();
    jnc_CoderMalfunctionError__init_0(var_1, var_0);
    return var_1;
}
function jnc_CoderMalfunctionError__init_0(var$0, var$1) {
    jl_Error__init_4(var$0, var$1);
}
function otjb_StorageProvider() {
}
function otjc_JSArrayReader() {
}
function otjb_Window() {
    jl_Object.call(this);
}
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get0(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength0();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function jl_IllegalMonitorStateException() {
    jl_RuntimeException.call(this);
}
function jl_IllegalMonitorStateException__init_() {
    var var_0 = new jl_IllegalMonitorStateException();
    jl_IllegalMonitorStateException__init_0(var_0);
    return var_0;
}
function jl_IllegalMonitorStateException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function jl_StringBuffer() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuffer__init_(var_0) {
    var var_1 = new jl_StringBuffer();
    jl_StringBuffer__init_0(var_1, var_0);
    return var_1;
}
function jl_StringBuffer__init_0(var$0, var$1) {
    jl_AbstractStringBuilder__init_2(var$0, var$1);
}
function jl_StringBuffer_append(var$0, var$1) {
    jl_AbstractStringBuilder_append(var$0, var$1);
    return var$0;
}
function jl_StringBuffer_insert(var$0, var$1, var$2) {
    jl_AbstractStringBuilder_insert(var$0, var$1, var$2);
    return var$0;
}
function jl_StringBuffer_toString(var$0) {
    return jl_AbstractStringBuilder_toString(var$0);
}
function jl_StringBuffer_ensureCapacity(var$0, var$1) {
    jl_AbstractStringBuilder_ensureCapacity(var$0, var$1);
}
function jl_StringBuffer_insert0(var$0, var$1, var$2) {
    return var$0.$insert10(var$1, var$2);
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode0 = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String_$callClinit() {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
}
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
}
function jl_String__init_0(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_1(var$0, var$1) {
    var var$2, var$3, $i;
    jl_String_$callClinit();
    var$2 = var$1.data;
    jl_Object__init_0(var$0);
    var$3 = var$2.length;
    var$0.$characters = $rt_createCharArray(var$3);
    $i = 0;
    while ($i < var$3) {
        var$0.$characters.data[$i] = var$2[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_2(var$0, var$1, var$2, var$3) {
    var $i, var$5;
    jl_String_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$characters = $rt_createCharArray(var$3);
    $i = 0;
    while ($i < var$3) {
        var$5 = var$1.data;
        var$0.$characters.data[$i] = var$5[$i + var$2 | 0];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt(var$0, var$1) {
    if (var$1 >= 0 && var$1 < var$0.$characters.data.length)
        return var$0.$characters.data[var$1];
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length(var$0) {
    return var$0.$characters.data.length;
}
function jl_String_isEmpty(var$0) {
    return var$0.$characters.data.length ? 0 : 1;
}
function jl_String_indexOf(var$0, var$1, var$2) {
    var $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, var$2);
    if (var$1 < 65536) {
        $bmpChar = var$1 & 65535;
        while (true) {
            if ($i >= var$0.$characters.data.length)
                return (-1);
            if (var$0.$characters.data[$i] == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate(var$1);
    $lo = jl_Character_lowSurrogate(var$1);
    while (true) {
        if ($i >= (var$0.$characters.data.length - 1 | 0))
            return (-1);
        if (var$0.$characters.data[$i] == $hi && var$0.$characters.data[$i + 1 | 0] == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
}
function jl_String_indexOf0(var$0, var$1) {
    return var$0.$indexOf(var$1, 0);
}
function jl_String_substring(var$0, var$1, var$2) {
    if (var$1 > var$2)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    return jl_String__init_0(var$0.$characters, var$1, var$2 - var$1 | 0);
}
function jl_String_trim(var$0) {
    var $lower, $upper;
    $lower = 0;
    $upper = var$0.$length() - 1 | 0;
    a: {
        while ($lower <= $upper) {
            if (var$0.$charAt($lower) > 32)
                break a;
            $lower = $lower + 1 | 0;
        }
    }
    while ($lower <= $upper && var$0.$charAt($upper) <= 32) {
        $upper = $upper + (-1) | 0;
    }
    return var$0.$substring($lower, $upper + 1 | 0);
}
function jl_String_valueOf(var$1) {
    var var$2, var$3;
    jl_String_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = var$1;
    jl_String__init_1(var$2, var$3);
    return var$2;
}
function jl_String_equals(var$0, var$1) {
    var $str, $i;
    if (var$0 === var$1)
        return 1;
    if (!(var$1 instanceof jl_String))
        return 0;
    $str = var$1;
    if ($str.$length() != var$0.$length())
        return 0;
    $i = 0;
    while (true) {
        if ($i >= $str.$length())
            return 1;
        if (var$0.$charAt($i) != $str.$charAt($i))
            break;
        $i = $i + 1 | 0;
    }
    return 0;
}
function jl_String_hashCode(var$0) {
    var var$1, var$2, var$3, $c;
    if (!var$0.$hashCode0) {
        var$1 = var$0.$characters.data;
        var$2 = var$1.length;
        var$3 = 0;
        while (var$3 < var$2) {
            $c = var$1[var$3];
            var$0.$hashCode0 = (31 * var$0.$hashCode0 | 0) + $c | 0;
            var$3 = var$3 + 1 | 0;
        }
    }
    return var$0.$hashCode0;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_81_0__init_();
}
function jl_NegativeArraySizeException() {
    jl_RuntimeException.call(this);
}
function jl_NegativeArraySizeException__init_() {
    var var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_0(var_0);
    return var_0;
}
function jl_NegativeArraySizeException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function t_FindAlignments() {
    jl_Object.call(this);
}
function t_FindAlignments_FindAlignments(var$1) {
    var $line, $inProlog, var$4, var$5, $item, $prevInfixInner, $pos, $token, $bpos, $btoken, $ctok, var$13, var$14, $lPos, $alPos, $aPos, $atoken, $cPos, $cpos, $ctoken, $alignClass, $calignClass, $lTok, var$25;
    t_FindAlignments_setSubscriptField(var$1);
    $line = 0;
    $inProlog = 1;
    a: {
        while (true) {
            if (!$inProlog)
                break a;
            var$4 = var$1.data;
            if ($line >= var$4.length)
                break;
            if (var$4[$line].data.length > 0 && var$4[$line].data[0].$type != 8) {
                $inProlog = 0;
                continue;
            }
            $line = $line + 1 | 0;
        }
    }
    while (true) {
        var$4 = var$1.data;
        var$5 = var$4.length;
        if ($line >= var$5)
            break;
        $item = 0;
        $prevInfixInner = 0;
        while ($item < var$4[$line].data.length) {
            b: {
                $pos = t_Position__init_($line, $item);
                $token = var$4[$line].data[$item];
                if ($token.$subscript)
                    $prevInfixInner = 0;
                else {
                    if (t_FindAlignments_isRightComment(var$1, $pos)) {
                        $bpos = t_FindAlignments_blockingPosition(var$1, $pos);
                        $btoken = null;
                        if ($bpos.$line != (-1))
                            $btoken = $bpos.$toToken(var$1);
                        c: {
                            $ctok = $token;
                            if ($ctok.$subtype != 8 && $ctok.$subtype != 9) {
                                d: {
                                    if ($bpos.$line != (-1) && t_FindAlignments_isRightComment(var$1, $bpos) && $btoken.$column == $token.$column) {
                                        if (!($btoken.$aboveAlign.$line == (-1) && $bpos.$item > 0)) {
                                            if ($btoken.$aboveAlign.$line == (-1))
                                                break d;
                                            var$13 = $btoken.$aboveAlign;
                                            if (var$13.$toToken(var$1).$belowAlign.$line == (-1))
                                                break d;
                                        }
                                        $btoken.$belowAlign = $pos;
                                        if ($btoken.$aboveAlign.$line == (-1)) {
                                            $token.$aboveAlign = $bpos;
                                            break c;
                                        }
                                        $token.$aboveAlign = $btoken.$aboveAlign;
                                        break c;
                                    }
                                }
                                if ($item) {
                                    if ($item != 1)
                                        break c;
                                    if (var$4[$line].data[0].$type != 5)
                                        break c;
                                }
                                var$13 = $pos.$toToken(var$1);
                                var$14 = 1;
                                var$13.$aboveAlign = t_FindAlignments_coveringPosition(var$1, $pos, var$14);
                            } else {
                                t_Debug_Assert0($btoken !== null && $btoken.$type == 5 ? 1 : 0, $rt_s(237));
                                if ($btoken.$subtype == 7)
                                    $token.$aboveAlign = $bpos;
                                else
                                    $token.$aboveAlign = $btoken.$aboveAlign;
                                $btoken.$belowAlign = $pos;
                            }
                        }
                        $prevInfixInner = 0;
                    }
                    if ($prevInfixInner) {
                        t_Debug_Assert0($pos.$item <= 0 ? 0 : 1, $rt_s(238));
                        $lPos = t_Position__init_($pos.$line, $pos.$item - 1 | 0);
                        t_Debug_Assert0($lPos.$toToken(var$1).$aboveAlign.$line == (-1) ? 0 : 1, $rt_s(239));
                        $alPos = $lPos.$toToken(var$1).$aboveAlign;
                        $alPos.$toToken(var$1);
                        if (($alPos.$item + 1 | 0) < var$4[$alPos.$line].data.length) {
                            $aPos = t_Position__init_($alPos.$line, $alPos.$item + 1 | 0);
                            $atoken = $aPos.$toToken(var$1);
                            $cPos = t_FindAlignments_coveringPosition(var$1, $pos, 1);
                            if ($cPos.$line == $aPos.$line && $cPos.$item == $aPos.$item && $token.$column == $atoken.$column && $atoken.$type != 5)
                                $token.$aboveAlign = $aPos;
                        }
                        $prevInfixInner = 0;
                    } else {
                        e: {
                            if (!(!$item && $token.$type != 5)) {
                                if ($item != 1)
                                    break e;
                                if (var$4[$line].data[0].$type != 5)
                                    break e;
                            }
                            var$14 = 1;
                            $token.$aboveAlign = t_FindAlignments_coveringPosition(var$1, $pos, var$14);
                            break b;
                        }
                        if (t_FindAlignments_isLeftComment(var$1, $pos)) {
                            var$14 = 0;
                            $token.$aboveAlign = t_FindAlignments_coveringPosition(var$1, $pos, var$14);
                        } else {
                            $cpos = t_FindAlignments_coveringPosition(var$1, $pos, 1);
                            $ctoken = null;
                            if ($cpos.$line != (-1))
                                $ctoken = $cpos.$toToken(var$1);
                            $alignClass = 0;
                            $calignClass = 0;
                            if ($token.$type == 1) {
                                var$13 = $token.$string;
                                var$14 = 1;
                                $alignClass = t_BuiltInSymbols_GetBuiltInSymbol(var$13, var$14).$alignmentType;
                            }
                            if ($ctoken !== null && $ctoken.$type == 1) {
                                var$13 = $ctoken.$string;
                                var$14 = 1;
                                $calignClass = t_BuiltInSymbols_GetBuiltInSymbol(var$13, var$14).$alignmentType;
                            }
                            f: {
                                if ($ctoken !== null && $token.$column == $ctoken.$column && $alignClass && $alignClass == $calignClass) {
                                    $ctoken.$belowAlign = $pos;
                                    if ($ctoken.$aboveAlign.$line == (-1))
                                        $token.$aboveAlign = $cpos;
                                    else
                                        $token.$aboveAlign = $ctoken.$aboveAlign;
                                    $prevInfixInner = 1;
                                } else {
                                    if ($item != 1) {
                                        if ($item != 2)
                                            break f;
                                        if (var$4[$line].data[0].$type != 5)
                                            break f;
                                    }
                                    if (var$4[$line].data[$item - 1 | 0].$type == 1) {
                                        var$13 = var$4[$line].data[$item - 1 | 0].$string;
                                        var$14 = 1;
                                        if (t_BuiltInSymbols_GetBuiltInSymbol(var$13, var$14).$symbolType == 1 && $ctoken !== null && $token.$column == $ctoken.$column && var$4[$line].data[$item - 1 | 0].$aboveAlign.$line != (-1)) {
                                            $lTok = var$4[$line].data[$item - 1 | 0];
                                            $alPos = $lTok.$aboveAlign;
                                            $alPos.$toToken(var$1);
                                            if ($alPos.$line == $cpos.$line && $alPos.$item == ($cpos.$item - 1 | 0))
                                                $token.$aboveAlign = $cpos;
                                            else {
                                                if ($cpos.$item) {
                                                    if ($cpos.$item != 1)
                                                        break f;
                                                    if (var$4[$cpos.$line].data[0].$type != 5)
                                                        break f;
                                                }
                                                $token.$aboveAlign = $cpos;
                                                $ctoken.$belowAlign = $pos;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            $item = $item + 1 | 0;
        }
        $line = $line + 1 | 0;
        if ($line < var$5 && var$4[$line].data.length > 0 && var$4[$line].data[0].$type == 9)
            $line = var$5;
    }
    t_FindAlignments_FindLabelAlignments(var$1);
    var$25 = 0;
    while (var$25 < var$5) {
        $item = 0;
        while ($item < var$4[var$25].data.length) {
            $token = var$4[var$25].data[$item];
            if ($token.$aboveAlign.$line != (-1)) {
                if ($item > 0)
                    $token.$isAlignmentPoint = 1;
                if ($token.$aboveAlign.$item)
                    $token.$aboveAlign.$toToken(var$1).$isAlignmentPoint = 1;
            }
            if ($token.$belowAlign.$line != (-1)) {
                if ($item > 0)
                    $token.$isAlignmentPoint = 1;
                if ($token.$belowAlign.$line)
                    $token.$belowAlign.$toToken(var$1).$isAlignmentPoint = 1;
            }
            $item = $item + 1 | 0;
        }
        var$25 = var$25 + 1 | 0;
    }
}
function t_FindAlignments_FindLabelAlignments(var$1) {
    var $pcalStartLine, $pcalEndLine, $curLabelLine, var$5, var$6, $tok, $alignCol, $curLine, $alignItem, $notDone, var$12, $curItem, $shouldSkip, var$15, var$16, var$17, $item, var$19, $altok, var$21;
    t_TokenizeSpec_$callClinit();
    if (!t_TokenizeSpec_hasPcal)
        return;
    $pcalStartLine = t_TokenizeSpec_pcalStart.$line + 1 | 0;
    $pcalEndLine = t_TokenizeSpec_pcalEnd.$line;
    $curLabelLine = $pcalStartLine;
    while ($curLabelLine <= $pcalEndLine) {
        var$5 = var$1.data;
        var$6 = var$5.length;
        if ($curLabelLine >= var$6)
            break;
        a: {
            if (var$5[$curLabelLine].data.length > 1 && var$5[$curLabelLine].data[0].$type == 13) {
                $tok = var$5[$curLabelLine].data[1];
                $alignCol = $tok.$column;
                $curLine = $curLabelLine + 1 | 0;
                $alignItem = 1;
                $notDone = 1;
                var$12 = $curLabelLine;
                while ($notDone && $curLine < var$6) {
                    $curItem = 0;
                    $shouldSkip = 0;
                    if (var$5[$curLine].data.length) {
                        if (var$5[$curLine].data[0].$type == 13) {
                            if (var$5[$curLine].data.length > 1)
                                $curItem = 1;
                            else {
                                $notDone = var$5[$curLine].data[0].$column < $alignCol ? 0 : 1;
                                $shouldSkip = 1;
                            }
                        }
                        if (!$shouldSkip) {
                            if (var$5[$curLine].data[$curItem].$column < $alignCol)
                                $notDone = 0;
                            else if (var$5[$curLine].data[$curItem].$column == $alignCol) {
                                var$5[var$12].data[$alignItem].$belowAlign = t_Position__init_($curLine, $curItem);
                                var$5[$curLine].data[$curItem].$aboveAlign = t_Position__init_(var$12, $alignItem);
                                var$12 = $curLine;
                                $alignItem = $curItem;
                            }
                        }
                    }
                    $curLine = $curLine + 1 | 0;
                    if (!($curLine <= $pcalEndLine && $curLine < var$6))
                        $notDone = 0;
                }
                if ($tok.$aboveAlign.$line != (-1)) {
                    var$15 = $tok.$aboveAlign;
                    if (var$15.$toToken(var$1).$belowAlign.$equals0(t_Position__init_($curLabelLine, 1)))
                        break a;
                }
                var$6 = $curLabelLine - 1 | 0;
                var$12 = 1;
                var$16 = 1;
                var$17 = $curLabelLine;
                while (var$16) {
                    b: {
                        if (var$5[var$6].data.length > 0 && var$5[var$6].data[0].$column <= $alignCol) {
                            if (var$5[var$6].data[0].$type == 13) {
                                if (var$5[var$6].data.length <= 1)
                                    break b;
                                if (var$5[var$6].data[1].$column > $alignCol)
                                    break b;
                            }
                            if (var$5[var$6].data[0].$column == $alignCol) {
                                var$5[var$17].data[var$12].$aboveAlign = t_Position__init_(var$6, 0);
                                var$5[var$6].data[0].$belowAlign = t_Position__init_(var$17, var$12);
                                var$12 = 0;
                                var$17 = var$6;
                            } else if (var$5[var$17].data[var$12].$aboveAlign.$line != (-1))
                                var$16 = 0;
                            else {
                                $item = 0;
                                while ($item < var$5[var$6].data.length && var$5[var$6].data[$item].$column <= $alignCol) {
                                    $item = $item + 1 | 0;
                                }
                                var$19 = $item + (-1) | 0;
                                $altok = null;
                                if (var$19 > 0)
                                    $altok = var$5[var$6].data[var$19 - 1 | 0];
                                c: {
                                    if ($altok !== null) {
                                        if ($altok.$type != 13) {
                                            if ($altok.$type != 1)
                                                break c;
                                            var$15 = $altok.$string;
                                            var$21 = 1;
                                            if (!t_BuiltInSymbols_IsBuiltInSymbol(var$15, var$21))
                                                break c;
                                            var$15 = $altok.$string;
                                            var$21 = 0;
                                            if (t_BuiltInSymbols_IsBuiltInSymbol(var$15, var$21))
                                                break c;
                                        }
                                        var$5[var$17].data[var$12].$aboveAlign = t_Position__init_(var$6, var$19);
                                        if (var$5[var$6].data[var$19].$column == $alignCol)
                                            var$5[var$6].data[var$19].$belowAlign = t_Position__init_(var$17, var$12);
                                    }
                                }
                                var$16 = 0;
                            }
                        }
                    }
                    var$6 = var$6 + (-1) | 0;
                    if (var$6 >= $pcalStartLine)
                        continue;
                    var$16 = 0;
                }
            }
        }
        $curLabelLine = $curLabelLine + 1 | 0;
    }
}
function t_FindAlignments_isLeftComment(var$1, var$2) {
    var var$3, var$4;
    a: {
        if (!var$2.$item) {
            var$3 = var$1.data;
            if (var$3[var$2.$line].data[var$2.$item].$type == 5 && var$3[var$2.$line].data.length > 1) {
                var$4 = 1;
                break a;
            }
        }
        var$4 = 0;
    }
    return var$4;
}
function t_FindAlignments_isRightComment(var$1, var$2) {
    var var$3;
    var$3 = var$1.data;
    return var$2.$item == (var$3[var$2.$line].data.length - 1 | 0) && var$3[var$2.$line].data[var$2.$item].$type == 5 ? 1 : 0;
}
function t_FindAlignments_coveringPosition(var$1, var$2, var$3) {
    var $line, $tok, $notDone, var$7, $item, var$9, $nsItem, $dashFound, var$12;
    $line = var$2.$line - 1 | 0;
    $tok = var$2.$toToken(var$1);
    $notDone = 1;
    while ($line >= 0 && $notDone) {
        var$7 = var$1.data;
        if (var$7[$line].data.length > 0) {
            if (var$7[$line].data[0].$type == 8) {
                $line = (-1);
                $notDone = 0;
            } else {
                $item = 0;
                if (var$3 && t_FindAlignments_isLeftComment(var$1, t_Position__init_($line, 0)))
                    $item = 1;
                if (var$7[$line].data[$item].$column <= $tok.$column)
                    $notDone = 0;
            }
        }
        if (!$notDone)
            continue;
        $line = $line - 1 | 0;
    }
    if ($line == (-1))
        return t_Position__init_((-1), 0);
    var$9 = var$1.data;
    $item = 0;
    $nsItem = 0;
    $dashFound = 0;
    if (var$9[$line].data[0].$type == 6)
        $dashFound = 1;
    while (!$dashFound && ($item + 1 | 0) < var$9[$line].data.length && var$9[$line].data[$item + 1 | 0].$column <= $tok.$column) {
        if (var$9[$line].data[$item + 1 | 0].$type == 6)
            $dashFound = 1;
        var$12 = $item + 1 | 0;
        if (var$9[$line].data[var$12].$subscript) {
            $item = var$12;
            continue;
        }
        $item = var$12;
        $nsItem = var$12;
    }
    if (!$dashFound)
        return t_Position__init_($line, $nsItem);
    return t_Position__init_((-1), 0);
}
function t_FindAlignments_blockingPosition(var$1, var$2) {
    var $line, $item, $tok, $notDone, var$7;
    $line = var$2.$line - 1 | 0;
    $item = 0;
    $tok = var$2.$toToken(var$1);
    $notDone = 1;
    while ($line >= 0 && $notDone) {
        a: {
            var$7 = var$1.data;
            if (var$7[$line].data.length > 0) {
                if (var$7[$line].data[0].$type == 8) {
                    $line = (-1);
                    $notDone = 0;
                } else {
                    $item = 0;
                    if (t_FindAlignments_isLeftComment(var$1, t_Position__init_($line, 0)))
                        $item = 1;
                    while ($notDone) {
                        if ($item >= var$7[$line].data.length)
                            break a;
                        if (var$7[$line].data[$item].$column >= $tok.$column && !var$7[$line].data[$item].$subscript) {
                            $notDone = 0;
                            continue;
                        }
                        $item = $item + 1 | 0;
                    }
                }
            }
        }
        if (!$notDone)
            continue;
        $line = $line - 1 | 0;
    }
    if ($line != (-1))
        return t_Position__init_($line, $item);
    return t_Position__init_((-1), 0);
}
function t_FindAlignments_setSubscriptField(var$1) {
    var $line, var$3, $item, $startSub, $nestingDepth, $tok, $symType, var$9, var$10, var$11;
    $line = 0;
    while (true) {
        var$3 = var$1.data;
        if ($line >= var$3.length)
            break;
        $item = 0;
        $startSub = (-1);
        $nestingDepth = 0;
        while ($item < var$3[$line].data.length) {
            a: {
                $tok = var$3[$line].data[$item];
                if ($startSub != (-1)) {
                    $symType = 10;
                    if ($tok.$type == 1) {
                        var$9 = $tok.$string;
                        var$10 = 1;
                        $symType = t_BuiltInSymbols_GetBuiltInSymbol(var$9, var$10).$symbolType;
                    }
                    b: {
                        if (!(!$nestingDepth && $symType != 4)) {
                            if ($nestingDepth != 1)
                                break b;
                            if ($symType != 5)
                                break b;
                        }
                        $nestingDepth = 0;
                        while ($startSub <= $item) {
                            var$3[$line].data[$startSub].$subscript = 1;
                            $startSub = $startSub + 1 | 0;
                        }
                        $startSub = (-1);
                        break a;
                    }
                    if ($symType == 4)
                        $nestingDepth = $nestingDepth + 1 | 0;
                    else if ($symType == 5)
                        $nestingDepth = $nestingDepth - 1 | 0;
                } else if ($tok.$type == 1) {
                    var$9 = $tok.$string;
                    var$10 = 1;
                    if (t_BuiltInSymbols_GetBuiltInSymbol(var$9, var$10).$symbolType != 6) {
                        var$9 = $tok.$string;
                        var$11 = $rt_s(240);
                        if (!var$9.$equals(var$11))
                            break a;
                    }
                    $startSub = $item + 1 | 0;
                }
            }
            $item = $item + 1 | 0;
        }
        $line = $line + 1 | 0;
    }
}
function jnc_CharsetEncoder() {
    var a = this; jl_Object.call(a);
    a.$charset = null;
    a.$replacement = null;
    a.$averageBytesPerChar = 0.0;
    a.$maxBytesPerChar = 0.0;
    a.$malformedAction = null;
    a.$unmappableAction = null;
    a.$status = 0;
}
function jnc_CharsetEncoder__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jnc_CharsetEncoder();
    jnc_CharsetEncoder__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jnc_CharsetEncoder__init_1(var_0, var_1, var_2) {
    var var_3 = new jnc_CharsetEncoder();
    jnc_CharsetEncoder__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jnc_CharsetEncoder__init_0(var$0, var$1, var$2, var$3, var$4) {
    jl_Object__init_0(var$0);
    jnc_CodingErrorAction_$callClinit();
    var$0.$malformedAction = jnc_CodingErrorAction_REPORT;
    var$0.$unmappableAction = jnc_CodingErrorAction_REPORT;
    jnc_CharsetEncoder_checkReplacement(var$0, var$4);
    var$0.$charset = var$1;
    var$0.$replacement = var$4.$clone();
    var$0.$averageBytesPerChar = var$2;
    var$0.$maxBytesPerChar = var$3;
}
function jnc_CharsetEncoder__init_2(var$0, var$1, var$2, var$3) {
    var var$4;
    var$4 = $rt_createByteArray(1);
    var$4.data[0] = 63;
    jnc_CharsetEncoder__init_0(var$0, var$1, var$2, var$3, var$4);
}
function jnc_CharsetEncoder_checkReplacement(var$0, var$1) {
    var var$2;
    if (var$1 !== null) {
        var$2 = var$1.data.length;
        if (var$2 && var$2 >= var$0.$maxBytesPerChar)
            return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0($rt_s(241)));
}
function jnc_CharsetEncoder_onMalformedInput(var$0, var$1) {
    if (var$1 !== null) {
        var$0.$malformedAction = var$1;
        var$0.$implOnMalformedInput(var$1);
        return var$0;
    }
    $rt_throw(jl_IllegalArgumentException__init_0($rt_s(242)));
}
function jnc_CharsetEncoder_implOnMalformedInput(var$0, var$1) {
    return;
}
function jnc_CharsetEncoder_onUnmappableCharacter(var$0, var$1) {
    if (var$1 !== null) {
        var$0.$unmappableAction = var$1;
        var$0.$implOnUnmappableCharacter(var$1);
        return var$0;
    }
    $rt_throw(jl_IllegalArgumentException__init_0($rt_s(242)));
}
function jnc_CharsetEncoder_implOnUnmappableCharacter(var$0, var$1) {
    return;
}
function jnc_CharsetEncoder_encode(var$0, var$1, var$2, var$3) {
    var $result, $e, $remaining, $action, $$je;
    a: {
        if (var$0.$status != 3) {
            if (var$3)
                break a;
            if (var$0.$status != 2)
                break a;
        }
        $rt_throw(jl_IllegalStateException__init_0());
    }
    var$0.$status = !var$3 ? 1 : 2;
    while (true) {
        try {
            $result = var$0.$encodeLoop(var$1, var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_RuntimeException) {
                $e = $$je;
                $rt_throw(jnc_CoderMalfunctionError__init_($e));
            } else {
                throw $$je;
            }
        }
        if ($result.$isUnderflow()) {
            if (!var$3)
                return $result;
            $remaining = var$1.$remaining();
            if ($remaining <= 0)
                return $result;
            $result = jnc_CoderResult_malformedForLength($remaining);
        } else if ($result.$isOverflow())
            break;
        $action = !$result.$isUnmappable() ? var$0.$malformedAction : var$0.$unmappableAction;
        b: {
            jnc_CodingErrorAction_$callClinit();
            if ($action !== jnc_CodingErrorAction_REPLACE) {
                if ($action === jnc_CodingErrorAction_IGNORE)
                    break b;
                else
                    return $result;
            }
            if (var$2.$remaining() < var$0.$replacement.data.length)
                return jnc_CoderResult_OVERFLOW;
            var$2.$put0(var$0.$replacement);
        }
        var$1.$position0(var$1.$position1() + $result.$length() | 0);
    }
    return $result;
}
function jnc_CharsetEncoder_flush(var$0, var$1) {
    var $result;
    if (var$0.$status != 2 && var$0.$status != 4)
        $rt_throw(jl_IllegalStateException__init_0());
    $result = var$0.$implFlush(var$1);
    jnc_CoderResult_$callClinit();
    if ($result === jnc_CoderResult_UNDERFLOW)
        var$0.$status = 3;
    return $result;
}
function jnc_CharsetEncoder_implFlush(var$0, var$1) {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult_UNDERFLOW;
}
function jnci_BufferedEncoder() {
    jnc_CharsetEncoder.call(this);
}
function jnci_BufferedEncoder__init_(var_0, var_1, var_2) {
    var var_3 = new jnci_BufferedEncoder();
    jnci_BufferedEncoder__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jnci_BufferedEncoder__init_0(var$0, var$1, var$2, var$3) {
    jnc_CharsetEncoder__init_2(var$0, var$1, var$2, var$3);
}
function jnci_BufferedEncoder_encodeLoop(var$0, var$1, var$2) {
    var $inArray, $inPos, $inSize, $outArray, $i, var$8, var$9, var$10, var$11, $outSize, $controller;
    $inArray = $rt_createCharArray(jl_Math_min(var$1.$remaining(), 512));
    $inPos = 0;
    $inSize = 0;
    $outArray = $rt_createByteArray(jl_Math_min(var$2.$remaining(), 512));
    a: {
        while (true) {
            if (($inPos + 32 | 0) > $inSize && var$1.$hasRemaining()) {
                $i = $inPos;
                while ($i < $inSize) {
                    var$8 = $inArray.data;
                    var$8[$i - $inPos | 0] = var$8[$i];
                    $i = $i + 1 | 0;
                }
                var$8 = $inArray.data;
                var$9 = $inSize - $inPos | 0;
                $inSize = jl_Math_min(var$1.$remaining() + var$9 | 0, var$8.length);
                var$1.$get1($inArray, var$9, $inSize - var$9 | 0);
                $inPos = 0;
            }
            if (!var$2.$hasRemaining()) {
                if (!var$1.$hasRemaining() && $inPos >= $inSize) {
                    jnc_CoderResult_$callClinit();
                    var$10 = jnc_CoderResult_UNDERFLOW;
                } else {
                    jnc_CoderResult_$callClinit();
                    var$10 = jnc_CoderResult_OVERFLOW;
                }
                break a;
            }
            var$11 = $outArray.data;
            var$9 = 0;
            $outSize = jl_Math_min(var$2.$remaining(), var$11.length);
            $controller = jnci_BufferedEncoder$Controller__init_(var$1, var$2);
            var$10 = var$0.$arrayEncode($inArray, $inPos, $inSize, $outArray, var$9, $outSize, $controller);
            $inPos = $controller.$inPosition;
            if (var$10 === null && var$9 == $controller.$outPosition) {
                jnc_CoderResult_$callClinit();
                var$10 = jnc_CoderResult_UNDERFLOW;
            }
            var$9 = $controller.$outPosition;
            var$2.$put1($outArray, 0, var$9);
            if (var$10 !== null)
                break;
        }
    }
    var$1.$position0(var$1.$position1() - ($inSize - $inPos | 0) | 0);
    return var$10;
}
function jnci_UTF8Encoder() {
    jnci_BufferedEncoder.call(this);
}
function jnci_UTF8Encoder__init_(var_0) {
    var var_1 = new jnci_UTF8Encoder();
    jnci_UTF8Encoder__init_0(var_1, var_0);
    return var_1;
}
function jnci_UTF8Encoder__init_0(var$0, var$1) {
    jnci_BufferedEncoder__init_0(var$0, var$1, 2.0, 4.0);
}
function jnci_UTF8Encoder_arrayEncode(var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) {
    var $result, var$9, var$10, $ch, var$12, var$13, var$14, var$15, $low, $codePoint;
    $result = null;
    a: {
        while (var$2 < var$3) {
            if (var$5 >= var$6) {
                var$9 = var$2;
                break a;
            }
            var$10 = var$1.data;
            var$9 = var$2 + 1 | 0;
            $ch = var$10[var$2];
            if ($ch < 128) {
                var$12 = var$4.data;
                var$13 = var$5 + 1 | 0;
                var$12[var$5] = $ch << 24 >> 24;
            } else if ($ch < 2048) {
                if ((var$5 + 2 | 0) > var$6) {
                    var$9 = var$9 + (-1) | 0;
                    if (var$7.$hasMoreOutput(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$12 = var$4.data;
                var$14 = var$5 + 1 | 0;
                var$12[var$5] = (192 | $ch >> 6) << 24 >> 24;
                var$13 = var$14 + 1 | 0;
                var$12[var$14] = (128 | $ch & 63) << 24 >> 24;
            } else if (!jl_Character_isSurrogate($ch)) {
                if ((var$5 + 3 | 0) > var$6) {
                    var$9 = var$9 + (-1) | 0;
                    if (var$7.$hasMoreOutput(3))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$12 = var$4.data;
                var$15 = var$5 + 1 | 0;
                var$12[var$5] = (224 | $ch >> 12) << 24 >> 24;
                var$14 = var$15 + 1 | 0;
                var$12[var$15] = (128 | $ch >> 6 & 63) << 24 >> 24;
                var$13 = var$14 + 1 | 0;
                var$12[var$14] = (128 | $ch & 63) << 24 >> 24;
            } else {
                if (!jl_Character_isHighSurrogate($ch)) {
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (var$9 >= var$3) {
                    if (var$7.$hasMoreInput())
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                var$14 = var$9 + 1 | 0;
                $low = var$10[var$9];
                if (!jl_Character_isLowSurrogate($low)) {
                    var$9 = var$14 + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if ((var$5 + 4 | 0) > var$6) {
                    var$9 = var$14 + (-2) | 0;
                    if (var$7.$hasMoreOutput(4))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$12 = var$4.data;
                $codePoint = jl_Character_toCodePoint($ch, $low);
                var$9 = var$5 + 1 | 0;
                var$12[var$5] = (240 | $codePoint >> 18) << 24 >> 24;
                var$15 = var$9 + 1 | 0;
                var$12[var$9] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                var$9 = var$15 + 1 | 0;
                var$12[var$15] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                var$13 = var$9 + 1 | 0;
                var$12[var$9] = (128 | $codePoint & 63) << 24 >> 24;
                var$9 = var$14;
            }
            var$2 = var$9;
            var$5 = var$13;
        }
        var$9 = var$2;
    }
    var$7.$setInPosition(var$9);
    var$7.$setOutPosition(var$5);
    return $result;
}
function jl_UnsupportedOperationException() {
    jl_RuntimeException.call(this);
}
function jl_UnsupportedOperationException__init_() {
    var var_0 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_0(var_0);
    return var_0;
}
function jl_UnsupportedOperationException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function jl_IncompatibleClassChangeError() {
    jl_LinkageError.call(this);
}
function jl_IncompatibleClassChangeError__init_(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0(var$0, var$1) {
    jl_LinkageError__init_0(var$0, var$1);
}
function jl_NoSuchMethodError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0(var$0, var$1) {
    jl_IncompatibleClassChangeError__init_0(var$0, var$1);
}
function ji_Writer() {
    jl_Object.call(this);
    this.$lock0 = null;
}
function ji_Writer__init_() {
    var var_0 = new ji_Writer();
    ji_Writer__init_0(var_0);
    return var_0;
}
function ji_Writer__init_0(var$0) {
    jl_Object__init_0(var$0);
    var$0.$lock0 = var$0;
}
function ji_StringWriter() {
    ji_Writer.call(this);
    this.$buf = null;
}
function ji_StringWriter__init_() {
    var var_0 = new ji_StringWriter();
    ji_StringWriter__init_0(var_0);
    return var_0;
}
function ji_StringWriter__init_0(var$0) {
    ji_Writer__init_0(var$0);
    var$0.$buf = jl_StringBuffer__init_(16);
    var$0.$lock0 = var$0.$buf;
}
function ji_StringWriter_close(var$0) {
    return;
}
function ji_StringWriter_flush(var$0) {
    return;
}
function ji_StringWriter_toString(var$0) {
    return var$0.$buf.$toString();
}
function ji_StringWriter_write(var$0, var$1) {
    var$0.$buf.$append12(var$1);
}
function ji_IOException() {
    jl_Exception.call(this);
}
function ji_IOException__init_() {
    var var_0 = new ji_IOException();
    ji_IOException__init_0(var_0);
    return var_0;
}
function ji_IOException__init_0(var$0) {
    jl_Exception__init_0(var$0);
}
function jl_ArrayIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function jl_ArrayIndexOutOfBoundsException__init_(var_0) {
    var var_1 = new jl_ArrayIndexOutOfBoundsException();
    jl_ArrayIndexOutOfBoundsException__init_0(var_1, var_0);
    return var_1;
}
function jl_ArrayIndexOutOfBoundsException__init_0(var$0, var$1) {
    jl_IndexOutOfBoundsException__init_2(var$0, jl_Integer_toString0(var$1));
}
function ji_StringReader() {
    var a = this; ji_Reader.call(a);
    a.$string0 = null;
    a.$index = 0;
}
function ji_StringReader__init_(var_0) {
    var var_1 = new ji_StringReader();
    ji_StringReader__init_0(var_1, var_0);
    return var_1;
}
function ji_StringReader__init_0(var$0, var$1) {
    ji_Reader__init_0(var$0);
    if (var$1 !== null) {
        var$0.$string0 = var$1;
        return;
    }
    $rt_throw(jl_NullPointerException__init_());
}
function ji_StringReader_read(var$0, var$1, var$2, var$3) {
    var $n, $i, var$6, var$7, var$8, var$9;
    ji_StringReader_checkOpened(var$0);
    if (var$0.$index >= var$0.$string0.$length())
        return (-1);
    $n = jl_Math_min(var$0.$string0.$length() - var$0.$index | 0, var$3);
    $i = 0;
    while ($i < $n) {
        var$6 = var$1.data;
        var$7 = var$2 + 1 | 0;
        var$8 = var$0.$string0;
        var$9 = var$0.$index;
        var$0.$index = var$9 + 1 | 0;
        var$6[var$2] = var$8.$charAt(var$9);
        $i = $i + 1 | 0;
        var$2 = var$7;
    }
    return $n;
}
function ji_StringReader_checkOpened(var$0) {
    if (var$0.$string0 !== null)
        return;
    $rt_throw(ji_IOException__init_());
}
function jnc_Charset() {
    var a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
function jnc_Charset__init_(var_0, var_1) {
    var var_2 = new jnc_Charset();
    jnc_Charset__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnc_Charset__init_0(var$0, var$1, var$2) {
    var var$3, var$4, var$5, $alias;
    var$3 = var$2.data;
    jl_Object__init_0(var$0);
    jnc_Charset_checkCanonicalName(var$1);
    var$4 = var$3.length;
    var$5 = 0;
    while (var$5 < var$4) {
        $alias = var$3[var$5];
        jnc_Charset_checkCanonicalName($alias);
        var$5 = var$5 + 1 | 0;
    }
    var$0.$canonicalName = var$1;
    var$0.$aliases = var$2.$clone();
}
function jnc_Charset_checkCanonicalName(var$1) {
    var $i, $c;
    if (var$1.$isEmpty())
        $rt_throw(jnc_IllegalCharsetNameException__init_(var$1));
    if (!jnc_Charset_isValidCharsetStart(var$1.$charAt(0)))
        $rt_throw(jnc_IllegalCharsetNameException__init_(var$1));
    $i = 1;
    while ($i < var$1.$length()) {
        a: {
            $c = var$1.$charAt($i);
            switch ($c) {
                case 43:
                case 45:
                case 46:
                case 58:
                case 95:
                    break;
                default:
                    if (jnc_Charset_isValidCharsetStart($c))
                        break a;
                    else
                        $rt_throw(jnc_IllegalCharsetNameException__init_(var$1));
            }
        }
        $i = $i + 1 | 0;
    }
}
function jnc_Charset_isValidCharsetStart(var$1) {
    return !(var$1 >= 48 && var$1 <= 57) && !(var$1 >= 97 && var$1 <= 122) && var$1 < 65 && var$1 > 90 ? 0 : 1;
}
function jnci_UTF8Charset() {
    jnc_Charset.call(this);
}
function jnci_UTF8Charset__init_() {
    var var_0 = new jnci_UTF8Charset();
    jnci_UTF8Charset__init_0(var_0);
    return var_0;
}
function jnci_UTF8Charset__init_0(var$0) {
    jnc_Charset__init_0(var$0, $rt_s(243), $rt_createArray(jl_String, 0));
}
function jnci_UTF8Charset_newEncoder(var$0) {
    return jnci_UTF8Encoder__init_(var$0);
}
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index0 = 0;
    a.$modCount0 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
function ju_AbstractList$1__init_(var_0) {
    var var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_0(var_1, var_0);
    return var_1;
}
function ju_AbstractList$1__init_0(var$0, var$1) {
    var$0.$this$0 = var$1;
    jl_Object__init_0(var$0);
    var$0.$modCount0 = var$0.$this$0.$modCount;
    var$0.$size1 = var$0.$this$0.$size();
    var$0.$removeIndex = (-1);
}
function ju_AbstractList$1_hasNext(var$0) {
    return var$0.$index0 >= var$0.$size1 ? 0 : 1;
}
function ju_AbstractList$1_next(var$0) {
    var var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification(var$0);
    var$0.$removeIndex = var$0.$index0;
    var$1 = var$0.$this$0;
    var$2 = var$0.$index0;
    var$0.$index0 = var$2 + 1 | 0;
    return var$1.$get2(var$2);
}
function ju_AbstractList$1_checkConcurrentModification(var$0) {
    if (var$0.$modCount0 >= var$0.$this$0.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function ji_BufferedReader() {
    var a = this; ji_Reader.call(a);
    a.$innerReader = null;
    a.$buffer0 = null;
    a.$index1 = 0;
    a.$count0 = 0;
    a.$eof = 0;
    a.$mark0 = 0;
}
function ji_BufferedReader__init_0(var_0, var_1) {
    var var_2 = new ji_BufferedReader();
    ji_BufferedReader__init_1(var_2, var_0, var_1);
    return var_2;
}
function ji_BufferedReader__init_(var_0) {
    var var_1 = new ji_BufferedReader();
    ji_BufferedReader__init_2(var_1, var_0);
    return var_1;
}
function ji_BufferedReader__init_1(var$0, var$1, var$2) {
    ji_Reader__init_0(var$0);
    var$0.$mark0 = (-1);
    if (var$2 < 0)
        $rt_throw(jl_IllegalArgumentException__init_());
    var$0.$innerReader = var$1;
    var$0.$buffer0 = $rt_createCharArray(jl_Math_max(64, var$2));
}
function ji_BufferedReader__init_2(var$0, var$1) {
    ji_BufferedReader__init_1(var$0, var$1, 1024);
}
function ji_BufferedReader_readLine(var$0) {
    var $line, var$2, var$3, $ch;
    ji_BufferedReader_requireOpened(var$0);
    if (var$0.$eof && var$0.$index1 >= var$0.$count0)
        return null;
    $line = jl_StringBuilder__init_();
    a: {
        while (!(var$0.$index1 >= var$0.$count0 && !ji_BufferedReader_fillBuffer(var$0, 0))) {
            var$2 = var$0.$buffer0.data;
            var$3 = var$0.$index1;
            var$0.$index1 = var$3 + 1 | 0;
            $ch = var$2[var$3];
            if ($ch == 10)
                break a;
            if ($ch == 13) {
                if (var$0.$index1 >= var$0.$count0 && !ji_BufferedReader_fillBuffer(var$0, 0))
                    break a;
                if (var$0.$buffer0.data[var$0.$index1] != 10)
                    break a;
                var$0.$index1 = var$0.$index1 + 1 | 0;
                break a;
            }
            $line.$append1($ch);
        }
    }
    return $line.$toString();
}
function ji_BufferedReader_fillBuffer(var$0, var$1) {
    var $charsRead;
    if (var$0.$eof)
        return 0;
    a: {
        while (true) {
            if (var$1 >= var$0.$buffer0.data.length)
                break a;
            $charsRead = var$0.$innerReader.$read(var$0.$buffer0, var$1, var$0.$buffer0.data.length - var$1 | 0);
            if ($charsRead == (-1)) {
                var$0.$eof = 1;
                break a;
            }
            if (!$charsRead)
                break;
            var$1 = var$1 + $charsRead | 0;
        }
    }
    var$0.$count0 = var$1;
    var$0.$index1 = 0;
    var$0.$mark0 = (-1);
    return 1;
}
function ji_BufferedReader_requireOpened(var$0) {
    if (var$0.$innerReader !== null)
        return;
    $rt_throw(ji_IOException__init_());
}
function jn_ReadOnlyBufferException() {
    jl_UnsupportedOperationException.call(this);
}
function jn_ReadOnlyBufferException__init_() {
    var var_0 = new jn_ReadOnlyBufferException();
    jn_ReadOnlyBufferException__init_0(var_0);
    return var_0;
}
function jn_ReadOnlyBufferException__init_0(var$0) {
    jl_UnsupportedOperationException__init_0(var$0);
}
function jl_IllegalStateException() {
    jl_Exception.call(this);
}
function jl_IllegalStateException__init_0() {
    var var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_1(var_0);
    return var_0;
}
function jl_IllegalStateException__init_(var_0) {
    var var_1 = new jl_IllegalStateException();
    jl_IllegalStateException__init_2(var_1, var_0);
    return var_1;
}
function jl_IllegalStateException__init_1(var$0) {
    jl_Exception__init_0(var$0);
}
function jl_IllegalStateException__init_2(var$0, var$1) {
    jl_Exception__init_2(var$0, var$1);
}
function jlr_Array() {
    jl_Object.call(this);
}
function jlr_Array_getLength(var$1) {
    if (var$1 === null || var$1.constructor.$meta.item === undefined) {
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    return var$1.data.length;
}
function jlr_Array_newInstance(var$1, var$2) {
    if (var$1 === null)
        $rt_throw(jl_NullPointerException__init_());
    if (var$1 === $rt_cls($rt_voidcls()))
        $rt_throw(jl_IllegalArgumentException__init_());
    if (var$2 < 0)
        $rt_throw(jl_NegativeArraySizeException__init_());
    return jlr_Array_newInstanceImpl(var$1.$getPlatformClass(), var$2);
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
function otcit_DoubleAnalyzer$Result() {
    jl_Object.call(this);
}
function otcit_DoubleAnalyzer$Result__init_() {
    var var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
}
function otcit_DoubleAnalyzer$Result__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function t_Unicode$OnlineReplacer() {
    var a = this; jl_Object.call(a);
    a.$token = null;
    a.$startOffset = 0;
    a.$nextOffset = 0;
}
function t_Unicode$OnlineReplacer__init_() {
    var var_0 = new t_Unicode$OnlineReplacer();
    t_Unicode$OnlineReplacer__init_0(var_0);
    return var_0;
}
function t_Unicode$OnlineReplacer__init_0(var$0) {
    jl_Object__init_0(var$0);
    var$0.$reset();
}
function t_Unicode$OnlineReplacer_reset(var$0) {
    if (!(var$0.$token !== null && var$0.$token.$length() <= 0))
        var$0.$token = jl_StringBuilder__init_();
    var$0.$nextOffset = (-1);
    var$0.$startOffset = (-1);
}
function t_Unicode$OnlineReplacer_addChar(var$0, var$1, var$2) {
    var var$3;
    a: {
        if (var$0.$token.$length() > 0 && var$0.$token.$charAt(0) == 92) {
            if (var$0.$token.$length() == 1 && var$2 == 47) {
                t_Unicode$OnlineReplacer_appendToToken(var$0, var$1, var$2);
                var$0.$replace();
            } else if (t_Unicode$OnlineReplacer_isBackslashOperatorChar(var$2))
                t_Unicode$OnlineReplacer_appendToToken(var$0, var$1, var$2);
            else {
                var$0.$replace();
                var$0.$addChar0(var$1, var$2);
            }
        } else if (var$0.$token.$length() > 0 && var$0.$token.$charAt(var$0.$token.$length() - 1 | 0) == 91 && var$2 != 93) {
            var$0.$replace();
            var$0.$addChar0(var$1, var$2);
        } else {
            b: {
                if ($rt_s(244).$indexOf0(var$2) < 0) {
                    if (var$2 == 88) {
                        var$3 = var$0.$token;
                        if (var$3.$length() == 1 && var$0.$token.$charAt(0) == 40)
                            break b;
                    }
                    var$0.$replace();
                    var$0.$putChar(var$2);
                    break a;
                }
            }
            t_Unicode$OnlineReplacer_appendToToken(var$0, var$1, var$2);
            t_Unicode_$callClinit();
            if (t_Unicode_IMMEDIATE_REPLACE.$contains(var$0.$token.$toString()))
                var$0.$replace();
        }
    }
}
function t_Unicode$OnlineReplacer_appendToToken(var$0, var$1, var$2) {
    if (var$0.$nextOffset < 0) {
        var$0.$nextOffset = var$1;
        var$0.$startOffset = var$1;
    }
    var$0.$token.$append1(var$2);
    var$0.$nextOffset = var$0.$nextOffset + 1 | 0;
}
function t_Unicode$OnlineReplacer_isBackslashOperatorChar(var$1) {
    var var$2;
    a: {
        b: {
            if (!(var$1 >= 97 && var$1 <= 122)) {
                if (var$1 < 65)
                    break b;
                if (var$1 > 90)
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
}
function t_Unicode$OnlineReplacer_replace(var$0) {
    var $u;
    if (!var$0.$token.$length())
        return;
    $u = t_Unicode_a2u0(var$0.$token.$toString());
    if ($u === null)
        var$0.$putString(var$0.$token);
    else
        var$0.$replace0(var$0.$startOffset, var$0.$token.$length(), $u);
    var$0.$reset();
}
function t_Unicode$OnlineFilter() {
    t_Unicode$OnlineReplacer.call(this);
}
function t_Unicode$OnlineFilter__init_() {
    var var_0 = new t_Unicode$OnlineFilter();
    t_Unicode$OnlineFilter__init_0(var_0);
    return var_0;
}
function t_Unicode$OnlineFilter__init_0(var$0) {
    t_Unicode$OnlineReplacer__init_0(var$0);
}
function t_Unicode$OnlineFilter_addChar(var$0, var$1) {
    var$0.$addChar0((-1), var$1);
}
function t_Unicode$OnlineFilter_replace(var$0, var$1, var$2, var$3) {
    var$0.$putString(var$3);
}
function t_Unicode$OnlineFilter_flush(var$0) {
    var$0.$replace();
}
function t_Unicode$1() {
    t_Unicode$OnlineFilter.call(this);
    this.$val$out = null;
}
function t_Unicode$1__init_(var_0) {
    var var_1 = new t_Unicode$1();
    t_Unicode$1__init_0(var_1, var_0);
    return var_1;
}
function t_Unicode$1__init_0(var$0, var$1) {
    var$0.$val$out = var$1;
    t_Unicode$OnlineFilter__init_0(var$0);
}
function t_Unicode$1_putChar(var$0, var$1) {
    var$0.$val$out.$append1(var$1);
}
function t_Unicode$1_putString(var$0, var$1) {
    var$0.$val$out.$append13(var$1);
}
function jl_NullPointerException() {
    jl_RuntimeException.call(this);
}
function jl_NullPointerException__init_0(var_0) {
    var var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_1, var_0);
    return var_1;
}
function jl_NullPointerException__init_() {
    var var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_2(var_0);
    return var_0;
}
function jl_NullPointerException__init_1(var$0, var$1) {
    jl_RuntimeException__init_2(var$0, var$1);
}
function jl_NullPointerException__init_2(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function jn_ByteBuffer() {
    var a = this; jn_Buffer.call(a);
    a.$start0 = 0;
    a.$array1 = null;
    a.$order = null;
}
function jn_ByteBuffer__init_(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new jn_ByteBuffer();
    jn_ByteBuffer__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function jn_ByteBuffer__init_0(var$0, var$1, var$2, var$3, var$4, var$5) {
    jn_Buffer__init_0(var$0, var$2);
    jn_ByteOrder_$callClinit();
    var$0.$order = jn_ByteOrder_BIG_ENDIAN;
    var$0.$start0 = var$1;
    var$0.$array1 = var$3;
    var$0.$position = var$4;
    var$0.$limit = var$5;
}
function jn_ByteBuffer_wrap(var$1, var$2, var$3) {
    return jn_ByteBufferImpl__init_(0, var$1.data.length, var$1, var$2, var$2 + var$3 | 0, 0, 0);
}
function jn_ByteBuffer_wrap0(var$1) {
    return jn_ByteBuffer_wrap(var$1, 0, var$1.data.length);
}
function jn_ByteBuffer_put(var$0, var$1, var$2, var$3) {
    var var$4, var$5, var$6, $pos, $i, var$9;
    if (!var$3)
        return var$0;
    if (var$0.$isReadOnly())
        $rt_throw(jn_ReadOnlyBufferException__init_());
    if (var$0.$remaining() < var$3)
        $rt_throw(jn_BufferOverflowException__init_());
    if (var$2 >= 0) {
        var$4 = var$1.data;
        var$5 = var$4.length;
        if (var$2 < var$5) {
            var$6 = var$2 + var$3 | 0;
            if (var$6 > var$5)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(245)).$append2(var$6).$append($rt_s(62)).$append2(var$5).$toString()));
            if (var$3 < 0)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(63)).$append2(var$3).$append($rt_s(64)).$toString()));
            $pos = var$0.$position + var$0.$start0 | 0;
            $i = 0;
            while ($i < var$3) {
                var$9 = var$0.$array1.data;
                var$6 = $pos + 1 | 0;
                var$5 = var$2 + 1 | 0;
                var$9[$pos] = var$4[var$2];
                $i = $i + 1 | 0;
                $pos = var$6;
                var$2 = var$5;
            }
            var$0.$position = var$0.$position + var$3 | 0;
            return var$0;
        }
    }
    var$4 = var$1.data;
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(65)).$append2(var$2).$append($rt_s(60)).$append2(var$4.length).$append($rt_s(66)).$toString()));
}
function jn_ByteBuffer_put0(var$0, var$1) {
    return var$0.$put1(var$1, 0, var$1.data.length);
}
function otcjl_TObject() {
    jl_Object.call(this);
}
function jl_NoSuchFieldError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0(var$0, var$1) {
    jl_IncompatibleClassChangeError__init_0(var$0, var$1);
}
function oti_AsyncCallback() {
}
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
function otpp_AsyncCallbackWrapper__init_(var_0) {
    var var_1 = new otpp_AsyncCallbackWrapper();
    otpp_AsyncCallbackWrapper__init_0(var_1, var_0);
    return var_1;
}
function otpp_AsyncCallbackWrapper__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$realAsyncCallback = var$1;
}
function otpp_AsyncCallbackWrapper_create(var$1) {
    return otpp_AsyncCallbackWrapper__init_(var$1);
}
function otpp_AsyncCallbackWrapper_complete(var$0, var$1) {
    var$0.$realAsyncCallback.$complete(var$1);
}
function otpp_AsyncCallbackWrapper_error(var$0, var$1) {
    var$0.$realAsyncCallback.$error(var$1);
}
function ju_Hashtable$HashIterator() {
    var a = this; jl_Object.call(a);
    a.$position2 = 0;
    a.$expectedModCount = 0;
    a.$type0 = null;
    a.$lastEntry = null;
    a.$lastPosition = 0;
    a.$canRemove = 0;
    a.$this$00 = null;
}
function ju_Hashtable$HashIterator__init_(var_0, var_1) {
    var var_2 = new ju_Hashtable$HashIterator();
    ju_Hashtable$HashIterator__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_Hashtable$HashIterator__init_0(var$0, var$1, var$2) {
    var$0.$this$00 = var$1;
    jl_Object__init_0(var$0);
    var$0.$type0 = var$2;
    var$0.$position2 = var$1.$lastSlot;
    var$0.$expectedModCount = var$1.$modCount1;
}
function ju_Hashtable$HashIterator_hasNext(var$0) {
    if (var$0.$lastEntry !== null && var$0.$lastEntry.$next0 !== null)
        return 1;
    while (var$0.$position2 >= var$0.$this$00.$firstSlot) {
        if (var$0.$this$00.$elementData0.data[var$0.$position2] !== null)
            return 1;
        var$0.$position2 = var$0.$position2 - 1 | 0;
    }
    return 0;
}
function ju_Hashtable$HashIterator_next(var$0) {
    if (var$0.$expectedModCount != var$0.$this$00.$modCount1)
        $rt_throw(ju_ConcurrentModificationException__init_());
    if (var$0.$lastEntry !== null)
        var$0.$lastEntry = var$0.$lastEntry.$next0;
    if (var$0.$lastEntry === null) {
        a: {
            while (true) {
                if (var$0.$position2 < var$0.$this$00.$firstSlot)
                    break a;
                var$0.$lastEntry = var$0.$this$00.$elementData0.data[var$0.$position2];
                if (var$0.$lastEntry !== null)
                    break;
                var$0.$position2 = var$0.$position2 - 1 | 0;
            }
        }
        if (var$0.$lastEntry !== null) {
            var$0.$lastPosition = var$0.$position2;
            var$0.$position2 = var$0.$position2 - 1 | 0;
        }
    }
    if (var$0.$lastEntry === null)
        $rt_throw(ju_NoSuchElementException__init_());
    var$0.$canRemove = 1;
    return var$0.$type0.$get3(var$0.$lastEntry);
}
function ju_Hashtable$HashEnumIterator() {
    var a = this; ju_Hashtable$HashIterator.call(a);
    a.$isEnumeration = 0;
    a.$start1 = 0;
    a.$entry = null;
    a.$this$01 = null;
}
function ju_Hashtable$HashEnumIterator__init_(var_0, var_1, var_2) {
    var var_3 = new ju_Hashtable$HashEnumIterator();
    ju_Hashtable$HashEnumIterator__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function ju_Hashtable$HashEnumIterator__init_0(var$0, var$1, var$2, var$3) {
    var$0.$this$01 = var$1;
    ju_Hashtable$HashIterator__init_0(var$0, var$1, var$2);
    var$0.$isEnumeration = var$3;
    var$0.$start1 = var$1.$lastSlot + 1 | 0;
}
function ju_Hashtable$HashEnumIterator_hasMoreElements(var$0) {
    var var$1, var$2;
    if (!var$0.$isEnumeration)
        return ju_Hashtable$HashIterator_hasNext(var$0);
    if (var$0.$entry !== null)
        return 1;
    while (var$0.$start1 > var$0.$this$01.$firstSlot) {
        var$1 = var$0.$this$01.$elementData0.data;
        var$2 = var$0.$start1 - 1 | 0;
        var$0.$start1 = var$2;
        if (var$1[var$2] === null)
            continue;
        else {
            var$0.$entry = var$0.$this$01.$elementData0.data[var$0.$start1];
            return 1;
        }
    }
    return 0;
}
function ju_Hashtable$HashEnumIterator_nextElement(var$0) {
    var $result;
    if (!var$0.$isEnumeration)
        return ju_Hashtable$HashIterator_next(var$0);
    if (!var$0.$hasMoreElements())
        $rt_throw(ju_NoSuchElementException__init_());
    $result = var$0.$type0.$get3(var$0.$entry);
    var$0.$entry = var$0.$entry.$next0;
    return $result;
}
function otci_IntegerUtil() {
    jl_Object.call(this);
}
function otci_IntegerUtil_toUnsignedLogRadixString(var$1, var$2) {
    var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!var$1)
        return $rt_s(246);
    $radix = 1 << var$2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros(var$1) | 0) + var$2 | 0) - 1 | 0) / var$2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, var$2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = otcjl_TCharacter_forDigit(var$1 >>> $pos & $mask, $radix);
        $pos = $pos - var$2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
}
function jl_Object$Monitor() {
    var a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
function jl_Object$Monitor__init_() {
    var var_0 = new jl_Object$Monitor();
    jl_Object$Monitor__init_0(var_0);
    return var_0;
}
function jl_Object$Monitor__init_0(var$0) {
    jl_Object__init_0(var$0);
    var$0.$owner = jl_Thread_currentThread();
}
function t_OutputFileWriter() {
    var a = this; jl_Object.call(a);
    a.$fileWriter = null;
    a.$name1 = null;
}
function t_OutputFileWriter__init_(var_0, var_1) {
    var var_2 = new t_OutputFileWriter();
    t_OutputFileWriter__init_0(var_2, var_0, var_1);
    return var_2;
}
function t_OutputFileWriter__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$fileWriter = null;
    var$0.$name1 = $rt_s(3);
    var$0.$name1 = var$2;
    var$0.$fileWriter = var$1;
}
function t_OutputFileWriter_putLine(var$0, var$1) {
    var $$je;
    a: {
        try {
            var$0.$fileWriter.$write0(jl_StringBuilder__init_().$append(var$1).$append($rt_s(247)).$toString());
            var$0.$fileWriter.$flush();
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                t_Debug_ReportError(jl_StringBuilder__init_().$append($rt_s(248)).$append(var$0.$name1).$append($rt_s(249)).$toString());
                break a;
            } else {
                throw $$je;
            }
        }
    }
}
function t_OutputFileWriter_close(var$0) {
    var $$je;
    a: {
        try {
            var$0.$fileWriter.$close();
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                t_Debug_ReportError(jl_StringBuilder__init_().$append($rt_s(250)).$append(var$0.$name1).$append($rt_s(249)).$toString());
                break a;
            } else {
                throw $$je;
            }
        }
    }
}
function jl_Math() {
    jl_Object.call(this);
}
function jl_Math_min(var$1, var$2) {
    if (var$1 < var$2)
        var$2 = var$1;
    return var$2;
}
function jl_Math_max(var$1, var$2) {
    if (var$1 > var$2)
        var$2 = var$1;
    return var$2;
}
function otji_JS() {
    jl_Object.call(this);
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
function t_CommentToken() {
    var a = this; t_Token.call(a);
    a.$rsubtype = 0;
    a.$subtype = 0;
    a.$delimiters = 0;
}
function t_CommentToken__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new t_CommentToken();
    t_CommentToken__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function t_CommentToken__init_0(var$0, var$1, var$2, var$3, var$4) {
    a: {
        t_Token__init_2(var$0);
        var$0.$delimiters = 0;
        var$0.$type = 5;
        var$0.$column = var$2;
        var$0.$string = var$1;
        var$0.$rsubtype = var$3;
        var$0.$subtype = 0;
        switch (var$0.$rsubtype) {
            case 1:
                var$0.$delimiters = !var$4 ? 4 : 2;
                break a;
            case 2:
            case 3:
            case 4:
                var$0.$delimiters = !var$4 ? 2 : 0;
                break a;
            case 5:
                break;
            default:
                t_Debug_ReportBug($rt_s(251));
                break a;
        }
    }
}
function t_CommentToken_getWidth(var$0) {
    if (var$0.$string === null)
        return 0;
    return var$0.$string.$length() + var$0.$delimiters | 0;
}
function t_CommentToken_ProcessComments(var$1) {
    var $line, $beginLine, var$4, $item, $beginMultiLine, $endMultiLine, $starLine, $tok, var$10, $ch, var$12;
    $line = 0;
    $beginLine = (-1);
    while (true) {
        var$4 = var$1.data;
        if ($line >= var$4.length)
            break;
        $item = 0;
        $beginMultiLine = 0;
        $endMultiLine = 0;
        while ($item < var$4[$line].data.length) {
            if (var$4[$line].data[$item].$type == 5) {
                $starLine = 1;
                $tok = var$4[$line].data[$item];
                if ($item == (var$4[$line].data.length - 1 | 0)) {
                    a: {
                        if (!($tok.$rsubtype != 2 && $tok.$rsubtype != 1)) {
                            var$10 = $tok.$string;
                            if (var$10.$length())
                                break a;
                        }
                        $starLine = 0;
                    }
                    $ch = 0;
                    while ($starLine) {
                        var$10 = $tok.$string;
                        if ($ch >= var$10.$length())
                            break;
                        if ($ch > 3)
                            break;
                        if ($tok.$string.$charAt($ch) != 42) {
                            var$10 = $tok.$string;
                            if (var$10.$charAt($ch) != 45)
                                $starLine = 0;
                        }
                        $ch = $ch + 1 | 0;
                    }
                    var$12 = 4;
                    while ($starLine) {
                        var$10 = $tok.$string;
                        if (var$12 >= var$10.$length())
                            break;
                        if ($tok.$string.$charAt(var$12) != 42) {
                            var$10 = $tok.$string;
                            if (var$10.$charAt(var$12) != 45) {
                                var$10 = $tok.$string;
                                if (var$10.$charAt(var$12) != 32)
                                    $starLine = 0;
                            }
                        }
                        var$12 = var$12 + 1 | 0;
                    }
                    if ($beginLine != (-1) && !(!($tok.$rsubtype != 2 && $tok.$rsubtype != 1) && $tok.$column == var$4[$beginLine].data[var$4[$beginLine].data.length - 1 | 0].$column && !$starLine))
                        $endMultiLine = 1;
                    if ($starLine && !($beginLine != (-1) && $tok.$column == var$4[$beginLine].data[var$4[$beginLine].data.length - 1 | 0].$column))
                        $beginMultiLine = 1;
                }
                b: {
                    switch ($tok.$rsubtype) {
                        case 1:
                        case 2:
                            if ($beginMultiLine) {
                                $tok.$subtype = 7;
                                break b;
                            }
                            if ($endMultiLine) {
                                if (!$starLine) {
                                    $tok.$subtype = 6;
                                    break b;
                                }
                                $tok.$subtype = 9;
                                break b;
                            }
                            if ($beginLine != (-1) && $item == (var$4[$line].data.length - 1 | 0)) {
                                $tok.$subtype = 8;
                                break b;
                            }
                            $tok.$subtype = 6;
                            break b;
                        case 3:
                            if ($item) {
                                $tok.$subtype = 6;
                                break b;
                            }
                            $tok.$subtype = 10;
                            break b;
                        case 4:
                            if ($item != (var$4[$line].data.length - 1 | 0)) {
                                $tok.$subtype = 6;
                                break b;
                            }
                            $tok.$subtype = 10;
                            break b;
                        case 5:
                            break;
                        default:
                            t_Debug_ReportBug($rt_s(252));
                            break b;
                    }
                    $tok.$subtype = 10;
                }
                if (!($tok.$subtype != 8 && $tok.$subtype != 9))
                    $tok.$aboveAlign = t_Position__init_($beginLine, var$4[$beginLine].data.length - 1 | 0);
            } else if ($beginLine != (-1) && $item == (var$4[$line].data.length - 1 | 0))
                $endMultiLine = 1;
            $item = $item + 1 | 0;
        }
        if (!(!$endMultiLine && var$4[$line].data.length))
            $beginLine = (-1);
        if ($beginMultiLine)
            $beginLine = $line;
        $line = $line + 1 | 0;
    }
}
function t_CommentToken_toString(var$0) {
    var $rstypeName, $stypeName;
    a: {
        $rstypeName = $rt_s(3);
        $stypeName = $rt_s(3);
        switch (var$0.$rsubtype) {
            case 1:
                $rstypeName = $rt_s(253);
                break a;
            case 2:
                $rstypeName = $rt_s(254);
                break a;
            case 3:
                $rstypeName = $rt_s(255);
                break a;
            case 4:
                $rstypeName = $rt_s(256);
                break a;
            case 5:
                $rstypeName = $rt_s(257);
                break a;
            default:
        }
    }
    b: {
        switch (var$0.$subtype) {
            case 6:
                $stypeName = $rt_s(258);
                break b;
            case 7:
                $stypeName = $rt_s(259);
                break b;
            case 8:
                $stypeName = $rt_s(260);
                break b;
            case 9:
                $stypeName = $rt_s(261);
                break b;
            case 10:
                $stypeName = $rt_s(262);
                break b;
            default:
        }
    }
    return t_Misc_BreakLine(jl_StringBuilder__init_().$append(var$0.$mostOfString()).$append($rt_s(263)).$append($stypeName).$append($rt_s(264)).$append($rstypeName).$append($rt_s(265)).$append2(var$0.$delimiters).$append($rt_s(58)).$toString());
}
function t_Misc() {
    jl_Object.call(this);
}
function t_Misc_BreakLine(var$1) {
    var $lineLen, $nextChar, $newStr, var$5;
    $lineLen = 0;
    $nextChar = 0;
    $newStr = $rt_s(3);
    while ($nextChar < var$1.$length()) {
        var$5 = var$1.$charAt($nextChar);
        if (var$5 != 9) {
            $newStr = jl_StringBuilder__init_().$append($newStr).$append1(var$5).$toString();
            $lineLen = $lineLen + 1 | 0;
        } else if ($lineLen > 48) {
            $newStr = jl_StringBuilder__init_().$append($newStr).$append($rt_s(266)).$toString();
            $lineLen = 7;
        }
        $nextChar = $nextChar + 1 | 0;
    }
    return $newStr;
}
function t_Misc_IsLetter(var$1) {
    return !(97 <= var$1 && var$1 <= 122) && !(65 <= var$1 && var$1 <= 90) && var$1 != 95 ? 0 : 1;
}
function t_Misc_hasLetter(var$1) {
    var $notFound, $i;
    $notFound = 1;
    $i = 0;
    while ($notFound && $i < var$1.$length()) {
        if (t_Misc_IsLetter(var$1.$charAt($i)))
            $notFound = 0;
        $i = $i + 1 | 0;
    }
    return $notFound ? 0 : 1;
}
function t_Misc_IsDigit(var$1) {
    return 48 <= var$1 && var$1 <= 57 ? 1 : 0;
}
function t_Misc_IsSpace(var$1) {
    return (var$1 != 32 ? 0 : 1) | (var$1 != 12 ? 0 : 1) | (var$1 != 13 ? 0 : 1);
}
function t_Misc_isBlank(var$1) {
    return var$1.$trim().$equals($rt_s(3));
}
function u_ToolIO() {
    jl_Object.call(this);
}
var u_ToolIO_mode = 0;
var u_ToolIO_userDir = null;
var u_ToolIO_out = null;
var u_ToolIO_err = null;
var u_ToolIO_messages = null;
var u_ToolIO_length = 0;
var u_ToolIO_nextMessage = null;
function u_ToolIO_$callClinit() {
    u_ToolIO_$callClinit = $rt_eraseClinit(u_ToolIO);
    u_ToolIO__clinit_();
}
function u_ToolIO__clinit_() {
    u_ToolIO_mode = 0;
    u_ToolIO_userDir = null;
    u_ToolIO_out = jl_System_out();
    u_ToolIO_err = jl_System_err();
    u_ToolIO_messages = $rt_createArray(jl_String, 1);
    u_ToolIO_length = 0;
    u_ToolIO_nextMessage = $rt_s(3);
}
function jl_Object$monitorEnterWait$lambda$_6_0() {
    var a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
function jl_Object$monitorEnterWait$lambda$_6_0__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jl_Object$monitorEnterWait$lambda$_6_0();
    jl_Object$monitorEnterWait$lambda$_6_0__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jl_Object$monitorEnterWait$lambda$_6_0__init_0(var$0, var$1, var$2, var$3, var$4) {
    jl_Object__init_0(var$0);
    var$0.$_00 = var$1;
    var$0.$_1 = var$2;
    var$0.$_2 = var$3;
    var$0.$_3 = var$4;
}
function jl_Object$monitorEnterWait$lambda$_6_0_run(var$0) {
    jl_Object_lambda$monitorEnterWait$0(var$0.$_00, var$0.$_1, var$0.$_2, var$0.$_3);
}
function ju_HashMap$HashEntry() {
    var a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next1 = null;
}
function ju_HashMap$HashEntry__init_(var_0, var_1) {
    var var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap$HashEntry__init_0(var$0, var$1, var$2) {
    ju_MapEntry__init_0(var$0, var$1, null);
    var$0.$origKeyHash = var$2;
}
function ju_Comparator() {
}
function jl_String$_clinit_$lambda$_81_0() {
    jl_Object.call(this);
}
function jl_String$_clinit_$lambda$_81_0__init_() {
    var var_0 = new jl_String$_clinit_$lambda$_81_0();
    jl_String$_clinit_$lambda$_81_0__init_0(var_0);
    return var_0;
}
function jl_String$_clinit_$lambda$_81_0__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function jl_ArrayStoreException() {
    jl_RuntimeException.call(this);
}
function jl_ArrayStoreException__init_() {
    var var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
}
function jl_ArrayStoreException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function jn_ByteBufferImpl() {
    var a = this; jn_ByteBuffer.call(a);
    a.$direct = 0;
    a.$readOnly0 = 0;
}
function jn_ByteBufferImpl__init_(var_0, var_1, var_2, var_3, var_4, var_5, var_6) {
    var var_7 = new jn_ByteBufferImpl();
    jn_ByteBufferImpl__init_0(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
}
function jn_ByteBufferImpl__init_0(var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) {
    jn_ByteBuffer__init_0(var$0, var$1, var$2, var$3, var$4, var$5);
    var$0.$direct = var$6;
    var$0.$readOnly0 = var$7;
}
function jn_ByteBufferImpl_isReadOnly(var$0) {
    return var$0.$readOnly0;
}
function jn_BufferOverflowException() {
    jl_RuntimeException.call(this);
}
function jn_BufferOverflowException__init_() {
    var var_0 = new jn_BufferOverflowException();
    jn_BufferOverflowException__init_0(var_0);
    return var_0;
}
function jn_BufferOverflowException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function ju_AbstractSet() {
    ju_AbstractCollection.call(this);
}
function ju_AbstractSet__init_() {
    var var_0 = new ju_AbstractSet();
    ju_AbstractSet__init_0(var_0);
    return var_0;
}
function ju_AbstractSet__init_0(var$0) {
    ju_AbstractCollection__init_0(var$0);
}
function ju_AbstractMap() {
    jl_Object.call(this);
}
function ju_AbstractMap__init_() {
    var var_0 = new ju_AbstractMap();
    ju_AbstractMap__init_0(var_0);
    return var_0;
}
function ju_AbstractMap__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount0 = 0;
    a.$elementData1 = null;
    a.$modCount2 = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
function ju_HashMap__init_() {
    var var_0 = new ju_HashMap();
    ju_HashMap__init_0(var_0);
    return var_0;
}
function ju_HashMap__init_1(var_0) {
    var var_1 = new ju_HashMap();
    ju_HashMap__init_2(var_1, var_0);
    return var_1;
}
function ju_HashMap__init_3(var_0, var_1) {
    var var_2 = new ju_HashMap();
    ju_HashMap__init_4(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap_newElementArray(var$0, var$1) {
    return $rt_createArray(ju_HashMap$HashEntry, var$1);
}
function ju_HashMap__init_0(var$0) {
    ju_HashMap__init_2(var$0, 16);
}
function ju_HashMap__init_2(var$0, var$1) {
    ju_HashMap__init_4(var$0, var$1, 0.75);
}
function ju_HashMap_calculateCapacity(var$1) {
    var var$2, var$3;
    if (var$1 >= 1073741824)
        return 1073741824;
    if (!var$1)
        return 16;
    var$2 = var$1 - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
}
function ju_HashMap__init_4(var$0, var$1, var$2) {
    var var$3;
    ju_AbstractMap__init_0(var$0);
    if (var$1 >= 0 && var$2 > 0.0) {
        var$3 = ju_HashMap_calculateCapacity(var$1);
        var$0.$elementCount0 = 0;
        var$0.$elementData1 = var$0.$newElementArray0(var$3);
        var$0.$loadFactor = var$2;
        ju_HashMap_computeThreshold(var$0);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
}
function ju_HashMap_computeThreshold(var$0) {
    var$0.$threshold = var$0.$elementData1.data.length * var$0.$loadFactor | 0;
}
function ju_HashMap_containsKey(var$0, var$1) {
    var $m;
    $m = var$0.$getEntry(var$1);
    return $m === null ? 0 : 1;
}
function ju_HashMap_get(var$0, var$1) {
    var $m;
    $m = var$0.$getEntry(var$1);
    if ($m === null)
        return null;
    return $m.$value0;
}
function ju_HashMap_getEntry(var$0, var$1) {
    var $m, $hash, $index;
    if (var$1 === null)
        $m = var$0.$findNullKeyEntry();
    else {
        $hash = ju_HashMap_computeHashCode(var$1);
        $index = $hash & (var$0.$elementData1.data.length - 1 | 0);
        $m = var$0.$findNonNullKeyEntry(var$1, $index, $hash);
    }
    return $m;
}
function ju_HashMap_findNonNullKeyEntry(var$0, var$1, var$2, var$3) {
    var $m, var$5;
    $m = var$0.$elementData1.data[var$2];
    while ($m !== null) {
        if ($m.$origKeyHash == var$3) {
            var$5 = $m.$key;
            if (ju_HashMap_areEqualKeys(var$1, var$5))
                break;
        }
        $m = $m.$next1;
    }
    return $m;
}
function ju_HashMap_findNullKeyEntry(var$0) {
    var $m;
    $m = var$0.$elementData1.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next1;
    }
    return $m;
}
function ju_HashMap_put(var$0, var$1, var$2) {
    return var$0.$putImpl(var$1, var$2);
}
function ju_HashMap_putImpl(var$0, var$1, var$2) {
    var $entry, var$4, $hash, $index, $result;
    if (var$1 === null) {
        $entry = var$0.$findNullKeyEntry();
        if ($entry === null) {
            var$0.$modCount2 = var$0.$modCount2 + 1 | 0;
            $entry = var$0.$createHashedEntry(null, 0, 0);
            var$4 = var$0.$elementCount0 + 1 | 0;
            var$0.$elementCount0 = var$4;
            if (var$4 > var$0.$threshold)
                var$0.$rehash();
        }
    } else {
        $hash = ju_HashMap_computeHashCode(var$1);
        $index = $hash & (var$0.$elementData1.data.length - 1 | 0);
        $entry = var$0.$findNonNullKeyEntry(var$1, $index, $hash);
        if ($entry === null) {
            var$0.$modCount2 = var$0.$modCount2 + 1 | 0;
            $entry = var$0.$createHashedEntry(var$1, $index, $hash);
            var$4 = var$0.$elementCount0 + 1 | 0;
            var$0.$elementCount0 = var$4;
            if (var$4 > var$0.$threshold)
                var$0.$rehash();
        }
    }
    $result = $entry.$value0;
    $entry.$value0 = var$2;
    return $result;
}
function ju_HashMap_createHashedEntry(var$0, var$1, var$2, var$3) {
    var $entry;
    $entry = ju_HashMap$HashEntry__init_(var$1, var$3);
    $entry.$next1 = var$0.$elementData1.data[var$2];
    var$0.$elementData1.data[var$2] = $entry;
    return $entry;
}
function ju_HashMap_rehash(var$0, var$1) {
    var $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!var$1 ? 1 : var$1 << 1);
    $newData = var$0.$newElementArray0($length);
    $i = 0;
    while ($i < var$0.$elementData1.data.length) {
        $entry = var$0.$elementData1.data[$i];
        var$0.$elementData1.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next1;
            $entry.$next1 = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    var$0.$elementData1 = $newData;
    ju_HashMap_computeThreshold(var$0);
}
function ju_HashMap_rehash0(var$0) {
    var$0.$rehash0(var$0.$elementData1.data.length);
}
function ju_HashMap_computeHashCode(var$1) {
    return var$1.$hashCode();
}
function ju_HashMap_areEqualKeys(var$1, var$2) {
    return var$1 !== var$2 && !var$1.$equals(var$2) ? 0 : 1;
}
function t_TLAUnicode$TokenPosition() {
    var a = this; jl_Object.call(a);
    a.$toU = 0;
    a.$spec = null;
}
function t_TLAUnicode$TokenPosition__init_(var_0, var_1) {
    var var_2 = new t_TLAUnicode$TokenPosition();
    t_TLAUnicode$TokenPosition__init_0(var_2, var_0, var_1);
    return var_2;
}
function t_TLAUnicode$TokenPosition__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$toU = var$1;
    var$0.$spec = var$2;
}
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
function ju_HashSet__init_0(var_0) {
    var var_1 = new ju_HashSet();
    ju_HashSet__init_(var_1, var_0);
    return var_1;
}
function ju_HashSet__init_1(var_0) {
    var var_1 = new ju_HashSet();
    ju_HashSet__init_2(var_1, var_0);
    return var_1;
}
function ju_HashSet__init_(var$0, var$1) {
    var $iter;
    ju_HashSet__init_2(var$0, ju_HashMap__init_1(var$1.$size() < 6 ? 11 : var$1.$size() * 2 | 0));
    $iter = var$1.$iterator();
    while ($iter.$hasNext()) {
        var$0.$add($iter.$next());
    }
}
function ju_HashSet__init_2(var$0, var$1) {
    ju_AbstractSet__init_0(var$0);
    var$0.$backingMap = var$1;
}
function ju_HashSet_add(var$0, var$1) {
    return var$0.$backingMap.$put(var$1, var$0) !== null ? 0 : 1;
}
function ju_HashSet_contains(var$0, var$1) {
    return var$0.$backingMap.$containsKey(var$1);
}
function jnc_CoderResult() {
    var a = this; jl_Object.call(a);
    a.$kind = 0;
    a.$length1 = 0;
}
var jnc_CoderResult_UNDERFLOW = null;
var jnc_CoderResult_OVERFLOW = null;
function jnc_CoderResult_$callClinit() {
    jnc_CoderResult_$callClinit = $rt_eraseClinit(jnc_CoderResult);
    jnc_CoderResult__clinit_();
}
function jnc_CoderResult__init_(var_0, var_1) {
    var var_2 = new jnc_CoderResult();
    jnc_CoderResult__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnc_CoderResult__init_0(var$0, var$1, var$2) {
    jnc_CoderResult_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$kind = var$1;
    var$0.$length1 = var$2;
}
function jnc_CoderResult_isUnderflow(var$0) {
    return var$0.$kind ? 0 : 1;
}
function jnc_CoderResult_isOverflow(var$0) {
    return var$0.$kind != 1 ? 0 : 1;
}
function jnc_CoderResult_isError(var$0) {
    return !var$0.$isMalformed() && !var$0.$isUnmappable() ? 0 : 1;
}
function jnc_CoderResult_isMalformed(var$0) {
    return var$0.$kind != 2 ? 0 : 1;
}
function jnc_CoderResult_isUnmappable(var$0) {
    return var$0.$kind != 3 ? 0 : 1;
}
function jnc_CoderResult_length(var$0) {
    if (var$0.$isError())
        return var$0.$length1;
    $rt_throw(jl_UnsupportedOperationException__init_());
}
function jnc_CoderResult_malformedForLength(var$1) {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult__init_(2, var$1);
}
function jnc_CoderResult__clinit_() {
    jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
    jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
}
function otp_Platform() {
    jl_Object.call(this);
}
function otp_Platform_clone(var$1) {
    var copy = new var$1.constructor();
    for (var field in var$1) {
        if (!var$1.hasOwnProperty(field)) {
            continue;
        }
        copy[field] = var$1[field];
    }
    return copy;
}
function otp_Platform_isInstance(var$1, var$2) {
    return var$1 !== null && !(typeof var$1.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable(var$1.constructor, var$2) ? 1 : 0;
}
function otp_Platform_isAssignable(var$1, var$2) {
    var $supertypes, $i;
    if (var$1 === var$2)
        return 1;
    $supertypes = var$1.$meta.supertypes;
    $i = 0;
    while (true) {
        if ($i >= $supertypes.length)
            return 0;
        if (otp_Platform_isAssignable($supertypes[$i], var$2))
            break;
        $i = $i + 1 | 0;
    }
    return 1;
}
function otp_Platform_launchThread(var$1) {
    var$1.$run();
}
function otp_Platform_postpone(var$1) {
    otp_Platform_schedule(var$1, 0);
}
function otp_Platform_schedule(var$1, var$2) {
    return setTimeout(function() {
        otp_Platform_launchThread(var$1);
    }, var$2);
}
function otp_Platform_isPrimitive(var$1) {
    return var$1.$meta.primitive ? 1 : 0;
}
function otp_Platform_getArrayItem(var$1) {
    return var$1.$meta.item;
}
function otp_Platform_getName(var$1) {
    return $rt_str(var$1.$meta.name);
}
function otp_Platform_createQueue$js_body$_30() {
    return [];
}
function jnc_CodingErrorAction() {
    jl_Object.call(this);
    this.$name2 = null;
}
var jnc_CodingErrorAction_IGNORE = null;
var jnc_CodingErrorAction_REPLACE = null;
var jnc_CodingErrorAction_REPORT = null;
function jnc_CodingErrorAction_$callClinit() {
    jnc_CodingErrorAction_$callClinit = $rt_eraseClinit(jnc_CodingErrorAction);
    jnc_CodingErrorAction__clinit_();
}
function jnc_CodingErrorAction__init_(var_0) {
    var var_1 = new jnc_CodingErrorAction();
    jnc_CodingErrorAction__init_0(var_1, var_0);
    return var_1;
}
function jnc_CodingErrorAction__init_0(var$0, var$1) {
    jnc_CodingErrorAction_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$name2 = var$1;
}
function jnc_CodingErrorAction__clinit_() {
    jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(267));
    jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(268));
    jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(269));
}
function jl_IllegalArgumentException() {
    jl_RuntimeException.call(this);
}
function jl_IllegalArgumentException__init_() {
    var var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_0);
    return var_0;
}
function jl_IllegalArgumentException__init_0(var_0) {
    var var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_1, var_0);
    return var_1;
}
function jl_IllegalArgumentException__init_1(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function jl_IllegalArgumentException__init_2(var$0, var$1) {
    jl_RuntimeException__init_2(var$0, var$1);
}
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
function jnc_IllegalCharsetNameException__init_(var_0) {
    var var_1 = new jnc_IllegalCharsetNameException();
    jnc_IllegalCharsetNameException__init_0(var_1, var_0);
    return var_1;
}
function jnc_IllegalCharsetNameException__init_0(var$0, var$1) {
    jl_IllegalArgumentException__init_1(var$0);
    var$0.$charsetName = var$1;
}
function jl_NoClassDefFoundError() {
    jl_LinkageError.call(this);
}
function otcjl_TComparable() {
}
function otcjl_TCharacter() {
    otcjl_TObject.call(this);
}
var otcjl_TCharacter_TYPE = null;
var otcjl_TCharacter_characterCache = null;
function otcjl_TCharacter_$callClinit() {
    otcjl_TCharacter_$callClinit = $rt_eraseClinit(otcjl_TCharacter);
    otcjl_TCharacter__clinit_();
}
function otcjl_TCharacter_forDigit(var$1, var$2) {
    otcjl_TCharacter_$callClinit();
    if (var$2 >= 2 && var$2 <= 36 && var$1 < var$2)
        return var$1 < 10 ? (48 + var$1 | 0) & 65535 : ((97 + var$1 | 0) - 10 | 0) & 65535;
    return 0;
}
function otcjl_TCharacter__clinit_() {
    otcjl_TCharacter_TYPE = $rt_cls($rt_charcls());
    otcjl_TCharacter_characterCache = $rt_createArray(otcjl_TCharacter, 128);
}
function ju_NoSuchElementException() {
    jl_RuntimeException.call(this);
}
function ju_NoSuchElementException__init_() {
    var var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_0(var_0);
    return var_0;
}
function ju_NoSuchElementException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function ju_Hashtable() {
    var a = this; ju_Dictionary.call(a);
    a.$elementCount1 = 0;
    a.$elementData0 = null;
    a.$loadFactor0 = 0.0;
    a.$threshold0 = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount1 = 0;
}
var ju_Hashtable_EMPTY_ENUMERATION = null;
var ju_Hashtable_EMPTY_ITERATOR = null;
function ju_Hashtable_$callClinit() {
    ju_Hashtable_$callClinit = $rt_eraseClinit(ju_Hashtable);
    ju_Hashtable__clinit_();
}
function ju_Hashtable__init_(var_0) {
    var var_1 = new ju_Hashtable();
    ju_Hashtable__init_0(var_1, var_0);
    return var_1;
}
function ju_Hashtable_newEntry(var$1, var$2, var$3) {
    ju_Hashtable_$callClinit();
    return ju_Hashtable$Entry__init_(var$1, var$2);
}
function ju_Hashtable__init_0(var$0, var$1) {
    ju_Hashtable_$callClinit();
    ju_Dictionary__init_0(var$0);
    var$0.$lastSlot = (-1);
    if (var$1 < 0)
        $rt_throw(jl_IllegalArgumentException__init_());
    var$0.$elementCount1 = 0;
    if (!var$1)
        var$1 = 1;
    var$0.$elementData0 = ju_Hashtable_newElementArray(var$0, var$1);
    var$0.$firstSlot = var$0.$elementData0.data.length;
    var$0.$loadFactor0 = 0.75;
    ju_Hashtable_computeMaxSize(var$0);
}
function ju_Hashtable_newElementArray(var$0, var$1) {
    return $rt_createArray(ju_Hashtable$Entry, var$1);
}
function ju_Hashtable_computeMaxSize(var$0) {
    var$0.$threshold0 = var$0.$elementData0.data.length * var$0.$loadFactor0 | 0;
}
function ju_Hashtable_containsKey(var$0, var$1) {
    jl_Object_monitorEnterSync(var$0);
    try {
        return var$0.$getEntry0(var$1) === null ? 0 : 1;
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Hashtable_get(var$0, var$1) {
    var $hash, $index, $entry;
    jl_Object_monitorEnterSync(var$0);
    try {
        $hash = var$1.$hashCode();
        $index = ($hash & 2147483647) % var$0.$elementData0.data.length | 0;
        $entry = var$0.$elementData0.data[$index];
        while (true) {
            if ($entry === null)
                return null;
            if ($entry.$equalsKey(var$1, $hash))
                break;
            $entry = $entry.$next0;
        }
        return $entry.$value0;
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Hashtable_getEntry(var$0, var$1) {
    var $hash, $index, $entry;
    $hash = var$1.$hashCode();
    $index = ($hash & 2147483647) % var$0.$elementData0.data.length | 0;
    $entry = var$0.$elementData0.data[$index];
    while (true) {
        if ($entry === null)
            return null;
        if ($entry.$equalsKey(var$1, $hash))
            break;
        $entry = $entry.$next0;
    }
    return $entry;
}
function ju_Hashtable_keys(var$0) {
    jl_Object_monitorEnterSync(var$0);
    try {
        if (!var$0.$elementCount1)
            return ju_Hashtable_EMPTY_ENUMERATION;
        return ju_Hashtable$HashEnumIterator__init_(var$0, ju_Hashtable$keys$lambda$_19_0__init_(), 1);
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Hashtable_put(var$0, var$1, var$2) {
    var $hash, $index, $entry, $result, var$7, var$8;
    jl_Object_monitorEnterSync(var$0);
    try {
        if (var$1 !== null && var$2 !== null) {
            $hash = var$1.$hashCode();
            $index = ($hash & 2147483647) % var$0.$elementData0.data.length | 0;
            $entry = var$0.$elementData0.data[$index];
            while ($entry !== null && !$entry.$equalsKey(var$1, $hash)) {
                $entry = $entry.$next0;
            }
            if ($entry !== null) {
                $result = $entry.$value0;
                $entry.$value0 = var$2;
                return $result;
            }
            var$0.$modCount1 = var$0.$modCount1 + 1 | 0;
            var$7 = var$0.$elementCount1 + 1 | 0;
            var$0.$elementCount1 = var$7;
            if (var$7 > var$0.$threshold0) {
                var$0.$rehash();
                $index = ($hash & 2147483647) % var$0.$elementData0.data.length | 0;
            }
            if ($index < var$0.$firstSlot)
                var$0.$firstSlot = $index;
            if ($index > var$0.$lastSlot)
                var$0.$lastSlot = $index;
            var$8 = ju_Hashtable_newEntry(var$1, var$2, $hash);
            var$8.$next0 = var$0.$elementData0.data[$index];
            var$0.$elementData0.data[$index] = var$8;
            return null;
        }
        $rt_throw(jl_NullPointerException__init_());
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
}
function ju_Hashtable_rehash(var$0) {
    var $length, $newLast, $newData, $i, var$5, $entry, $index, var$8, $entry_0;
    $length = (var$0.$elementData0.data.length << 1) + 1 | 0;
    if (!$length)
        $length = 1;
    $newLast = (-1);
    $newData = ju_Hashtable_newElementArray(var$0, $length);
    $i = var$0.$lastSlot + 1 | 0;
    var$5 = $length;
    while (true) {
        $i = $i + (-1) | 0;
        if ($i < var$0.$firstSlot)
            break;
        $entry = var$0.$elementData0.data[$i];
        while ($entry !== null) {
            $index = ($entry.$getKeyHash() & 2147483647) % $length | 0;
            if ($index < var$5)
                var$5 = $index;
            if ($index > $newLast)
                $newLast = $index;
            var$8 = $newData.data;
            $entry_0 = $entry.$next0;
            $entry.$next0 = var$8[$index];
            var$8[$index] = $entry;
            $entry = $entry_0;
        }
    }
    var$0.$firstSlot = var$5;
    var$0.$lastSlot = $newLast;
    var$0.$elementData0 = $newData;
    ju_Hashtable_computeMaxSize(var$0);
}
function ju_Hashtable_lambda$keys$1(var$1) {
    ju_Hashtable_$callClinit();
    return var$1.$key;
}
function ju_Hashtable__clinit_() {
    ju_Hashtable_EMPTY_ENUMERATION = ju_Hashtable$1__init_();
    ju_Hashtable_EMPTY_ITERATOR = ju_Hashtable$2__init_();
}
function t_TLA2TexException() {
    jl_RuntimeException.call(this);
    this.$error_message = null;
}
function t_TLA2TexException__init_(var_0) {
    var var_1 = new t_TLA2TexException();
    t_TLA2TexException__init_0(var_1, var_0);
    return var_1;
}
function t_TLA2TexException__init_0(var$0, var$1) {
    jl_RuntimeException__init_1(var$0);
    var$0.$error_message = var$1;
}
function ji_PrintStream() {
    var a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$errorState = 0;
    a.$sb = null;
    a.$buffer1 = null;
    a.$charset0 = null;
}
function ji_PrintStream__init_(var_0, var_1) {
    var var_2 = new ji_PrintStream();
    ji_PrintStream__init_0(var_2, var_0, var_1);
    return var_2;
}
function ji_PrintStream__init_0(var$0, var$1, var$2) {
    ji_FilterOutputStream__init_0(var$0, var$1);
    var$0.$sb = jl_StringBuilder__init_();
    var$0.$buffer1 = $rt_createCharArray(32);
    var$0.$autoFlush = var$2;
    var$0.$charset0 = jnci_UTF8Charset__init_();
}
function ji_PrintStream_write(var$0, var$1, var$2, var$3) {
    var $$je;
    if (!ji_PrintStream_check(var$0))
        return;
    a: {
        try {
            var$0.$out0.$write1(var$1, var$2, var$3);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                var$0.$errorState = 1;
                break a;
            } else {
                throw $$je;
            }
        }
    }
}
function ji_PrintStream_check(var$0) {
    if (var$0.$out0 === null)
        var$0.$errorState = 1;
    return var$0.$errorState ? 0 : 1;
}
function ji_PrintStream_print(var$0, var$1, var$2, var$3) {
    var var$4, $src, $destBytes, $dest, var$8, var$9, $encoder, $overflow;
    var$4 = var$1.data;
    $src = jn_CharBuffer_wrap(var$1, var$2, var$3 - var$2 | 0);
    $destBytes = $rt_createByteArray(jl_Math_max(16, jl_Math_min(var$4.length, 1024)));
    $dest = jn_ByteBuffer_wrap0($destBytes);
    var$8 = var$0.$charset0.$newEncoder();
    jnc_CodingErrorAction_$callClinit();
    var$9 = jnc_CodingErrorAction_REPLACE;
    var$8 = var$8.$onMalformedInput(var$9);
    var$9 = jnc_CodingErrorAction_REPLACE;
    $encoder = var$8.$onUnmappableCharacter(var$9);
    while (true) {
        $overflow = $encoder.$encode($src, $dest, 1).$isOverflow();
        var$0.$write1($destBytes, 0, $dest.$position1());
        $dest.$clear();
        if (!$overflow)
            break;
    }
    while (true) {
        $overflow = $encoder.$flush0($dest).$isOverflow();
        var$0.$write1($destBytes, 0, $dest.$position1());
        $dest.$clear();
        if (!$overflow)
            break;
    }
}
function ji_PrintStream_println(var$0, var$1) {
    var$0.$sb.$append(var$1).$append1(10);
    ji_PrintStream_printSB(var$0);
}
function ji_PrintStream_printSB(var$0) {
    var $buffer;
    $buffer = var$0.$sb.$length() <= var$0.$buffer1.data.length ? var$0.$buffer1 : $rt_createCharArray(var$0.$sb.$length());
    var$0.$sb.$getChars(0, var$0.$sb.$length(), $buffer, 0);
    ji_PrintStream_print(var$0, $buffer, 0, var$0.$sb.$length());
    var$0.$sb.$setLength(0);
}
function t_TLAUnicode() {
    jl_Object.call(this);
}
var t_TLAUnicode_debug = 0;
var t_TLAUnicode_inputFile = null;
var t_TLAUnicode_outputFile = null;
function t_TLAUnicode_$callClinit() {
    t_TLAUnicode_$callClinit = $rt_eraseClinit(t_TLAUnicode);
    t_TLAUnicode__clinit_();
}
function t_TLAUnicode_convert(var$1, var$2) {
    var $out;
    t_TLAUnicode_$callClinit();
    $out = ji_StringWriter__init_();
    t_TLAUnicode_convert0(var$1, ji_StringReader__init_(var$2), $out);
    return $out.$toString();
}
function t_TLAUnicode_convert0(var$1, var$2, var$3) {
    t_TLAUnicode_$callClinit();
    return t_TLAUnicode_convert1(var$1, t_InputStreamCharReader__init_(var$2), t_OutputFileWriter__init_(var$3, null));
}
function t_TLAUnicode_convert1(var$1, var$2, var$3) {
    var $spec, $noCommentSpec;
    t_TLAUnicode_$callClinit();
    t_BuiltInSymbols_Initialize();
    $spec = t_TokenizeSpec_Tokenize(var$2, 1, 1);
    t_Token_FindPfStepTokens($spec);
    t_CommentToken_ProcessComments($spec);
    $noCommentSpec = t_TLAUnicode_filterOutComments($spec);
    t_FindAlignments_FindAlignments($noCommentSpec);
    t_TLAUnicode_convert2(var$1, $spec, $noCommentSpec, var$3);
    return t_TLAUnicode$TokenPosition__init_(var$1, $spec);
}
function t_TLAUnicode_convert2(var$1, var$2, var$3, var$4) {
    var $line, var$6, $out, var$8, $onlyComments, $keepLeftComments, $item, $tok, $ctok, var$14, var$15, $origSpace, $space, $align, $column, var$20, var$21, $alt, $last;
    t_TLAUnicode_$callClinit();
    $line = 0;
    while (true) {
        var$6 = var$2.data;
        if ($line >= var$6.length)
            break;
        $out = jl_StringBuilder__init_();
        var$8 = ju_ArrayList__init_();
        $onlyComments = 1;
        $keepLeftComments = 0;
        $item = 0;
        while ($item < var$6[$line].data.length) {
            a: {
                $tok = var$6[$line].data[$item];
                if ($keepLeftComments && $item == (var$6[$line].data.length - 1 | 0) && $tok.$type == 5) {
                    $ctok = $tok;
                    if ($ctok.$rsubtype == 3)
                        break a;
                    if ($ctok.$rsubtype == 2)
                        break a;
                }
                var$14 = $tok.$column;
                var$15 = $item <= 0 ? 0 : var$6[$line].data[$item - 1 | 0].$column + var$6[$line].data[$item - 1 | 0].$getWidth() | 0;
                b: {
                    $origSpace = var$14 - var$15 | 0;
                    $space = (-1);
                    if ($tok.$aboveAlign.$line == (-1))
                        break b;
                    if ($tok.$type == 5)
                        break b;
                    $align = $tok.$aboveAlign.$toToken(var$3);
                    if ($align.$column != $tok.$column)
                        break b;
                    if ($align.$outcolumn < 0)
                        break b;
                    $column = $out.$length();
                    $space = $align.$outcolumn - $column | 0;
                    if ($space >= 0)
                        break b;
                    if (!$onlyComments)
                        break b;
                    if ($tok.$type == 5)
                        break b;
                    $out.$delete0(0, $out.$length());
                    $space = $align.$outcolumn;
                    $keepLeftComments = 1;
                    var$20 = var$8.$iterator();
                    while (var$20.$hasNext()) {
                        $ctok = var$20.$next();
                        $ctok.$outcolumn = (-1);
                    }
                    if (var$8.$isEmpty())
                        break b;
                    if (var$8.$get2(0).$rsubtype != 4)
                        break b;
                    $out.$append($rt_s(270));
                    $space = $space + (-2) | 0;
                }
                if ($space >= 0)
                    $origSpace = $space ? $space : $origSpace > 0 ? 1 : $space;
                var$15 = $origSpace < 0 ? 0 : 1;
                var$20 = jl_StringBuilder__init_().$append14($tok);
                var$21 = $item <= 0 ? $rt_s(3) : jl_StringBuilder__init_().$append($rt_s(271)).$append14(var$6[$line].data[$item - 1 | 0]).$toString();
                t_Debug_Assert0(var$15, var$20.$append(var$21).$toString());
                t_TLAUnicode_appendSpaces($out, $origSpace);
                if ($tok.$type != 5) {
                    $onlyComments = 0;
                    if (!$keepLeftComments)
                        var$8 = null;
                }
                $tok.$outcolumn = $out.$length();
                var$14 = !var$1 ? ($tok.$outcolumn < $tok.$column ? 0 : 1) : $tok.$outcolumn > $tok.$column ? 0 : 1;
                c: {
                    var$20 = jl_StringBuilder__init_();
                    var$20 = var$20.$append($tok.$toString()).$append($rt_s(272)).$append2($tok.$column).$append($rt_s(273)).$append2($tok.$outcolumn).$toString();
                    t_Debug_Assert0(var$14, var$20);
                    switch ($tok.$type) {
                        case -1:
                        case 2:
                        case 4:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 12:
                        case 13:
                            break;
                        case 0:
                        case 10:
                        case 11:
                            break c;
                        case 1:
                            $alt = !var$1 ? t_Unicode_u2a0($tok.$string) : t_Unicode_a2u0($tok.$string);
                            if ($alt === null)
                                $alt = $tok.$string;
                            $out.$append($alt);
                            break a;
                        case 3:
                            $out.$append(jl_StringBuilder__init_().$append($rt_s(45)).$append($tok.$string).$append($rt_s(45)).$toString());
                            break a;
                        case 5:
                            $ctok = $tok;
                            if ($onlyComments && var$8 !== null)
                                var$8.$add($ctok);
                            t_TLAUnicode_appendCommentToken(var$1, $out, $ctok);
                            break a;
                        default:
                            break c;
                    }
                    $out.$append($tok.$string);
                    break a;
                }
                t_Debug_ReportBug($rt_s(274));
            }
            $item = $item + 1 | 0;
        }
        if ($keepLeftComments) {
            var$20 = var$8.$iterator();
            while (var$20.$hasNext()) {
                $ctok = var$20.$next();
                $out.$append($rt_s(275));
                t_TLAUnicode_appendAndConvertCommentString(var$1, $out, $ctok.$string);
                $out.$append($rt_s(270));
            }
            $last = var$6[$line].data[var$6[$line].data.length - 1 | 0];
            if ($last.$type == 5) {
                $ctok = $last;
                if (!($ctok.$rsubtype != 3 && $ctok.$rsubtype != 2)) {
                    $out.$append($rt_s(276));
                    t_TLAUnicode_appendCommentToken(var$1, $out, $ctok);
                }
            }
        }
        var$4.$putLine($out.$toString());
        $line = $line + 1 | 0;
    }
    var$4.$close();
}
function t_TLAUnicode_appendCommentToken(var$1, var$2, var$3) {
    var $commentString, $line;
    t_TLAUnicode_$callClinit();
    a: {
        $commentString = var$3.$string;
        switch (var$3.$rsubtype) {
            case 1:
                var$2.$append($rt_s(277));
                $line = jl_StringBuilder__init_();
                t_TLAUnicode_appendAndConvertCommentString(var$1, $line, $commentString);
                if (var$3.$subtype == 8)
                    t_TLAUnicode_adjustWidthTo($line, $commentString.$length());
                var$2.$append13($line);
                var$2.$append($rt_s(270));
                break a;
            case 2:
                var$2.$append($rt_s(278));
                t_TLAUnicode_appendAndConvertCommentString(var$1, var$2, $commentString);
                break a;
            case 3:
                if (var$3.$getWidth() > 0)
                    var$2.$append($rt_s(277));
                t_TLAUnicode_appendAndConvertCommentString(var$1, var$2, $commentString);
                break a;
            case 4:
                t_TLAUnicode_appendAndConvertCommentString(var$1, var$2, $commentString);
                var$2.$append($rt_s(270));
                break a;
            case 5:
                break;
            default:
                t_Debug_ReportBug($rt_s(279));
                break a;
        }
        t_TLAUnicode_appendAndConvertCommentString(var$1, var$2, $commentString);
    }
}
function t_TLAUnicode_appendAndConvertCommentString(var$1, var$2, var$3) {
    t_TLAUnicode_$callClinit();
    var$2.$append(t_Unicode_convert(var$1, var$3));
}
function t_TLAUnicode_adjustWidthTo(var$1, var$2) {
    t_TLAUnicode_$callClinit();
    if (var$2 > var$1.$length())
        t_TLAUnicode_appendSpaces(var$1, var$2 - var$1.$length() | 0);
    else if (var$2 < var$1.$length())
        t_TLAUnicode_trimWhitespaceToWidth(var$1, var$2);
}
function t_TLAUnicode_appendSpaces(var$1, var$2) {
    var $i;
    t_TLAUnicode_$callClinit();
    $i = 0;
    while ($i < var$2) {
        var$1.$append1(32);
        $i = $i + 1 | 0;
    }
}
function t_TLAUnicode_trimWhitespaceToWidth(var$1, var$2) {
    var $i;
    t_TLAUnicode_$callClinit();
    $i = var$1.$length() - 1 | 0;
    a: {
        while ($i > var$2) {
            if (var$1.$charAt($i) != 32) {
                $i = $i + 1 | 0;
                break a;
            }
            $i = $i + (-1) | 0;
        }
    }
    if ($i < var$1.$length())
        var$1.$delete0($i, var$1.$length());
}
function t_TLAUnicode_filterOutComments(var$1) {
    var $lines, $i, var$4, $line, $j, $t;
    t_TLAUnicode_$callClinit();
    $lines = ju_ArrayList__init_();
    $i = 0;
    while (true) {
        var$4 = var$1.data;
        if ($i >= var$4.length)
            break;
        $line = ju_ArrayList__init_();
        $j = 0;
        while ($j < var$4[$i].data.length) {
            $t = var$4[$i].data[$j];
            if ($t.$type != 5)
                $line.$add($t);
            $j = $j + 1 | 0;
        }
        $lines.$add($line.$toArray($rt_createArray(t_Token, 0)));
        $i = $i + 1 | 0;
    }
    return $lines.$toArray($rt_createArray($rt_arraycls(t_Token), 0));
}
function t_TLAUnicode__clinit_() {
    t_TLAUnicode_debug = 0;
    t_TLAUnicode_inputFile = null;
    t_TLAUnicode_outputFile = null;
}
function t_Debug() {
    jl_Object.call(this);
}
function t_Debug_ReportError0(var$1, var$2) {
    if (!var$2)
        t_Debug_ReportError(var$1);
}
function t_Debug_ReportError(var$1) {
    u_ToolIO_$callClinit();
    u_ToolIO_out.$println($rt_s(3));
    u_ToolIO_out.$println($rt_s(280));
    u_ToolIO_out.$println($rt_s(3));
    u_ToolIO_out.$println(jl_StringBuilder__init_().$append($rt_s(281)).$append(var$1).$append($rt_s(33)).$toString());
    u_ToolIO_out.$println($rt_s(3));
    $rt_throw(t_TLA2TexException__init_(jl_StringBuilder__init_().$append($rt_s(282)).$append(var$1).$append($rt_s(33)).$toString()));
}
function t_Debug_Assert(var$1) {
    if (!var$1)
        t_Debug_ReportBug($rt_s(283));
}
function t_Debug_Assert0(var$1, var$2) {
    if (!var$1)
        t_Debug_ReportBug(jl_StringBuilder__init_().$append($rt_s(284)).$append(var$2).$toString());
}
function t_Debug_ReportBug(var$1) {
    u_ToolIO_$callClinit();
    u_ToolIO_out.$println($rt_s(3));
    u_ToolIO_out.$println($rt_s(285));
    u_ToolIO_out.$println($rt_s(286));
    u_ToolIO_out.$println($rt_s(287));
    u_ToolIO_out.$println($rt_s(3));
    u_ToolIO_out.$println(jl_StringBuilder__init_().$append($rt_s(281)).$append(var$1).$append($rt_s(33)).$toString());
    u_ToolIO_out.$println($rt_s(3));
    $rt_throw(jl_Error__init_());
}
function otcit_FloatAnalyzer() {
    jl_Object.call(this);
}
var otcit_FloatAnalyzer_mantissa10Table = null;
var otcit_FloatAnalyzer_exp10Table = null;
function otcit_FloatAnalyzer_$callClinit() {
    otcit_FloatAnalyzer_$callClinit = $rt_eraseClinit(otcit_FloatAnalyzer);
    otcit_FloatAnalyzer__clinit_();
}
function otcit_FloatAnalyzer_analyze(var$1, var$2) {
    var $bits, $mantissa, $exponent, $errorShift, var$7, $decExponent, $binExponentCorrection, $mantissaShift, var$11, $decMantissa, var$13, $error, $upError, $downError, $lowerPos, $upperPos;
    otcit_FloatAnalyzer_$callClinit();
    $bits = $rt_floatToIntBits(var$1);
    var$2.$sign = !($bits & (-2147483648)) ? 0 : 1;
    $mantissa = $bits & 8388607;
    $exponent = $bits >> 23 & 255;
    if (!$mantissa && !$exponent) {
        var$2.$mantissa = 0;
        var$2.$exponent = 0;
        return;
    }
    $errorShift = 0;
    if ($exponent)
        var$7 = $mantissa | 8388608;
    else {
        var$7 = $mantissa << 1;
        while (Long_eq(Long_and(Long_fromInt(var$7), Long_fromInt(8388608)), Long_ZERO)) {
            var$7 = var$7 << 1;
            $exponent = $exponent + (-1) | 0;
            $errorShift = $errorShift + 1 | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_FloatAnalyzer_exp10Table, $exponent);
    if ($decExponent < 0)
        $decExponent =  -$decExponent - 2 | 0;
    $binExponentCorrection = $exponent - otcit_FloatAnalyzer_exp10Table.data[$decExponent] | 0;
    $mantissaShift = 9 + $binExponentCorrection | 0;
    var$11 = Long_fromInt(var$7);
    $decMantissa = Long_shru(Long_mul(var$11, Long_fromInt(otcit_FloatAnalyzer_mantissa10Table.data[$decExponent])), 32 - $mantissaShift | 0).lo;
    if ($decMantissa >= 1000000000) {
        $decExponent = $decExponent + 1 | 0;
        var$13 = $exponent - otcit_FloatAnalyzer_exp10Table.data[$decExponent] | 0;
        $mantissaShift = 9 + var$13 | 0;
        $decMantissa = Long_shru(Long_mul(var$11, Long_fromInt(otcit_FloatAnalyzer_mantissa10Table.data[$decExponent])), 32 - $mantissaShift | 0).lo;
    }
    var$13 = (31 - $mantissaShift | 0) - $errorShift | 0;
    $error = var$13 >= 0 ? otcit_FloatAnalyzer_mantissa10Table.data[$decExponent] >>> var$13 : otcit_FloatAnalyzer_mantissa10Table.data[$decExponent] <<  -var$13;
    $upError = ($error + 1 | 0) >> 1;
    $downError = $error >> 1;
    if (var$7 == 4194304)
        $downError = $downError >> 2;
    $lowerPos = otcit_FloatAnalyzer_findLowerDistanceToZero($decMantissa, $downError);
    $upperPos = otcit_FloatAnalyzer_findUpperDistanceToZero($decMantissa, $upError);
    var$7 = $rt_compare($lowerPos, $upperPos);
    var$7 = var$7 > 0 ? $rt_imul($decMantissa / $lowerPos | 0, $lowerPos) : var$7 < 0 ? $rt_imul($decMantissa / $upperPos | 0, $upperPos) + $upperPos | 0 : $rt_imul(($decMantissa + ($upperPos / 2 | 0) | 0) / $upperPos | 0, $upperPos);
    if (var$7 >= 1000000000) {
        $decExponent = $decExponent + 1 | 0;
        var$7 = var$7 / 10 | 0;
    } else if (var$7 < 100000000) {
        $decExponent = $decExponent + (-1) | 0;
        var$7 = var$7 * 10 | 0;
    }
    var$2.$mantissa = var$7;
    var$2.$exponent = $decExponent - 50 | 0;
}
function otcit_FloatAnalyzer_findLowerDistanceToZero(var$1, var$2) {
    var $pos, $mantissaRight;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 10;
    while ($pos <= var$2) {
        $pos = $pos * 10 | 0;
    }
    $mantissaRight = var$1 % $pos | 0;
    if ($mantissaRight >= (var$2 / 2 | 0))
        $pos = $pos / 10 | 0;
    return $pos;
}
function otcit_FloatAnalyzer_findUpperDistanceToZero(var$1, var$2) {
    var $pos, $mantissaRight;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 10;
    while ($pos <= var$2) {
        $pos = $pos * 10 | 0;
    }
    $mantissaRight = var$1 % $pos | 0;
    if (($pos - $mantissaRight | 0) > (var$2 / 2 | 0))
        $pos = $pos / 10 | 0;
    return $pos;
}
function otcit_FloatAnalyzer__clinit_() {
    var $decMantissaOne, $exponent, $i, var$4, var$5, $remainder, $maxMantissa, var$8, $shift, var$10, $shiftedOffPart;
    otcit_FloatAnalyzer_mantissa10Table = $rt_createIntArray(100);
    otcit_FloatAnalyzer_exp10Table = $rt_createIntArray(100);
    $decMantissaOne = 2000000000;
    $exponent = 127;
    $i = 0;
    var$4 = $decMantissaOne;
    while ($i < 50) {
        otcit_FloatAnalyzer_mantissa10Table.data[$i + 50 | 0] = $rt_udiv(var$4, 20);
        otcit_FloatAnalyzer_exp10Table.data[$i + 50 | 0] = $exponent;
        var$5 = $rt_udiv(var$4, 10);
        $remainder = $rt_umod(var$5, 10);
        while (var$5 <= $decMantissaOne && !(var$5 & (-2147483648))) {
            var$5 = var$5 << 1;
            $exponent = $exponent + 1 | 0;
            $remainder = $remainder << 1;
        }
        var$4 = var$5 + ($remainder / 10 | 0) | 0;
        $i = $i + 1 | 0;
    }
    $maxMantissa = 214748364;
    var$8 = 127;
    $i = 0;
    while ($i < 50) {
        $shift = 0;
        var$4 = $decMantissaOne;
        while (var$4 > $maxMantissa) {
            var$4 = var$4 >> 1;
            $shift = $shift + 1 | 0;
            var$8 = var$8 + (-1) | 0;
        }
        var$10 = var$4 * 10 | 0;
        if ($shift <= 0)
            $decMantissaOne = var$10;
        else {
            $shiftedOffPart = Long_fromInt($decMantissaOne & ((1 << $shift) - 1 | 0));
            $decMantissaOne = Long_add(Long_fromInt(var$10), Long_shr(Long_mul($shiftedOffPart, Long_fromInt(10)), $shift)).lo;
        }
        otcit_FloatAnalyzer_mantissa10Table.data[(50 - $i | 0) - 1 | 0] = $rt_udiv($decMantissaOne, 20);
        otcit_FloatAnalyzer_exp10Table.data[(50 - $i | 0) - 1 | 0] = var$8;
        $i = $i + 1 | 0;
    }
}
function jn_BufferUnderflowException() {
    jl_RuntimeException.call(this);
}
function jn_BufferUnderflowException__init_() {
    var var_0 = new jn_BufferUnderflowException();
    jn_BufferUnderflowException__init_0(var_0);
    return var_0;
}
function jn_BufferUnderflowException__init_0(var$0) {
    jl_RuntimeException__init_1(var$0);
}
function t_BuiltInSymbols() {
    jl_Object.call(this);
}
var t_BuiltInSymbols_builtInHashTable = null;
var t_BuiltInSymbols_prefixHashTable = null;
var t_BuiltInSymbols_pcalBuiltInHashTable = null;
var t_BuiltInSymbols_pcalPrefixHashTable = null;
var t_BuiltInSymbols_stringCharTable = null;
var t_BuiltInSymbols_canPrecedeLabelTable = null;
var t_BuiltInSymbols_nullString = null;
var t_BuiltInSymbols_pcalLeftParen = null;
var t_BuiltInSymbols_pcalRightParen = null;
var t_BuiltInSymbols_pcalLeftBrace = null;
var t_BuiltInSymbols_pcalRightBrace = null;
function t_BuiltInSymbols_$callClinit() {
    t_BuiltInSymbols_$callClinit = $rt_eraseClinit(t_BuiltInSymbols);
    t_BuiltInSymbols__clinit_();
}
function t_BuiltInSymbols_Initialize() {
    t_BuiltInSymbols_$callClinit();
    t_BuiltInSymbols_buildHashTable();
    t_BuiltInSymbols_buildPrefixHashTable();
    t_BuiltInSymbols_buildStringCharTable();
    t_BuiltInSymbols_buildCanPrecedeLabelTable();
}
function t_BuiltInSymbols_IsBuiltInSymbol0(var$1) {
    t_BuiltInSymbols_$callClinit();
    return null === t_BuiltInSymbols_GetBuiltInSymbol0(var$1) ? 0 : 1;
}
function t_BuiltInSymbols_IsBuiltInSymbol(var$1, var$2) {
    t_BuiltInSymbols_$callClinit();
    return null === t_BuiltInSymbols_GetBuiltInSymbol(var$1, var$2) ? 0 : 1;
}
function t_BuiltInSymbols_GetBuiltInSymbol(var$1, var$2) {
    var $sym;
    t_BuiltInSymbols_$callClinit();
    $sym = !var$2 ? t_BuiltInSymbols_builtInHashTable.$get(var$1) : t_BuiltInSymbols_pcalBuiltInHashTable.$get(var$1);
    if ($sym !== null && !($sym.$pcal && !var$2))
        return $sym;
    return null;
}
function t_BuiltInSymbols_GetBuiltInSymbol0(var$1) {
    t_BuiltInSymbols_$callClinit();
    return t_BuiltInSymbols_builtInHashTable.$get(var$1);
}
function t_BuiltInSymbols_IsBuiltInPrefix(var$1, var$2) {
    t_BuiltInSymbols_$callClinit();
    if (!var$2)
        return t_BuiltInSymbols_prefixHashTable.$containsKey(var$1);
    return t_BuiltInSymbols_pcalPrefixHashTable.$containsKey(var$1);
}
function t_BuiltInSymbols_IsStringChar(var$1) {
    t_BuiltInSymbols_$callClinit();
    return t_BuiltInSymbols_stringCharTable.$containsKey(jl_String_valueOf(var$1));
}
function t_BuiltInSymbols_CanPrecedeLabel(var$1) {
    t_BuiltInSymbols_$callClinit();
    return t_BuiltInSymbols_canPrecedeLabelTable.$containsKey(var$1);
}
function t_BuiltInSymbols_buildStringCharTable() {
    var $legalChars, $n;
    t_BuiltInSymbols_$callClinit();
    $legalChars = $rt_s(288);
    $n = 0;
    while ($n < $legalChars.$length()) {
        t_BuiltInSymbols_stringCharTable.$put(jl_String_valueOf($legalChars.$charAt($n)), t_BuiltInSymbols_nullString);
        $n = $n + 1 | 0;
    }
}
function t_BuiltInSymbols_buildCanPrecedeLabelTable() {
    var $canPrecedeLabel, var$2, $i;
    t_BuiltInSymbols_$callClinit();
    $canPrecedeLabel = $rt_createArray(jl_String, 10);
    var$2 = $canPrecedeLabel.data;
    var$2[0] = $rt_s(289);
    var$2[1] = $rt_s(66);
    var$2[2] = $rt_s(14);
    var$2[3] = $rt_s(290);
    var$2[4] = $rt_s(291);
    var$2[5] = $rt_s(292);
    var$2[6] = $rt_s(293);
    var$2[7] = $rt_s(294);
    var$2[8] = $rt_s(295);
    var$2[9] = $rt_s(296);
    $i = 0;
    while ($i < var$2.length) {
        t_BuiltInSymbols_canPrecedeLabelTable.$put(var$2[$i], t_BuiltInSymbols_nullString);
        $i = $i + 1 | 0;
    }
}
function t_BuiltInSymbols_add(var$1, var$2, var$3, var$4) {
    t_BuiltInSymbols_$callClinit();
    t_BuiltInSymbols_add0(var$1, var$2, var$3, var$4);
    if (t_Unicode_a2uc(var$1) !== null)
        t_BuiltInSymbols_add0(t_Unicode_a2u0(var$1), var$2, var$3, var$4);
}
function t_BuiltInSymbols_add0(var$1, var$2, var$3, var$4) {
    t_BuiltInSymbols_$callClinit();
    t_BuiltInSymbols_builtInHashTable.$put(var$1, t_Symbol__init_(var$1, var$2, var$3, var$4));
    t_BuiltInSymbols_pcalBuiltInHashTable.$put(var$1, t_Symbol__init_(var$1, var$2, var$3, var$4));
}
function t_BuiltInSymbols_pcaladd(var$1, var$2, var$3, var$4) {
    t_BuiltInSymbols_$callClinit();
    t_BuiltInSymbols_pcalBuiltInHashTable.$put(var$1, t_Symbol__init_0(var$1, var$2, var$3, var$4, 1));
}
function t_BuiltInSymbols_buildHashTable() {
    t_BuiltInSymbols_$callClinit();
    t_BuiltInSymbols_add($rt_s(297), $rt_s(298), 7, 0);
    t_BuiltInSymbols_add($rt_s(299), $rt_s(300), 7, 0);
    t_BuiltInSymbols_add($rt_s(301), $rt_s(302), 7, 0);
    t_BuiltInSymbols_add($rt_s(303), $rt_s(304), 7, 0);
    t_BuiltInSymbols_add($rt_s(305), $rt_s(306), 1, 60);
    t_BuiltInSymbols_add($rt_s(307), $rt_s(308), 7, 0);
    t_BuiltInSymbols_add($rt_s(309), $rt_s(310), 7, 0);
    t_BuiltInSymbols_add($rt_s(311), $rt_s(312), 7, 0);
    t_BuiltInSymbols_add($rt_s(313), $rt_s(314), 7, 0);
    t_BuiltInSymbols_add($rt_s(315), $rt_s(316), 7, 0);
    t_BuiltInSymbols_add($rt_s(317), $rt_s(318), 7, 0);
    t_BuiltInSymbols_add($rt_s(319), $rt_s(320), 7, 0);
    t_BuiltInSymbols_add($rt_s(321), $rt_s(322), 7, 0);
    t_BuiltInSymbols_add($rt_s(10), $rt_s(323), 7, 0);
    t_BuiltInSymbols_add($rt_s(324), $rt_s(325), 7, 0);
    t_BuiltInSymbols_add($rt_s(36), $rt_s(326), 7, 0);
    t_BuiltInSymbols_add($rt_s(327), $rt_s(328), 7, 0);
    t_BuiltInSymbols_add($rt_s(329), $rt_s(330), 7, 0);
    t_BuiltInSymbols_add($rt_s(331), $rt_s(332), 7, 0);
    t_BuiltInSymbols_add($rt_s(333), $rt_s(334), 7, 0);
    t_BuiltInSymbols_add($rt_s(335), $rt_s(336), 7, 0);
    t_BuiltInSymbols_add($rt_s(337), $rt_s(338), 7, 0);
    t_BuiltInSymbols_add($rt_s(339), $rt_s(340), 7, 0);
    t_BuiltInSymbols_add($rt_s(341), $rt_s(342), 7, 0);
    t_BuiltInSymbols_add($rt_s(343), $rt_s(344), 7, 0);
    t_BuiltInSymbols_add($rt_s(345), $rt_s(346), 7, 0);
    t_BuiltInSymbols_add($rt_s(347), $rt_s(348), 7, 0);
    t_BuiltInSymbols_add($rt_s(349), $rt_s(350), 7, 0);
    t_BuiltInSymbols_add($rt_s(351), $rt_s(352), 7, 0);
    t_BuiltInSymbols_add($rt_s(353), $rt_s(354), 7, 0);
    t_BuiltInSymbols_add($rt_s(355), $rt_s(356), 7, 0);
    t_BuiltInSymbols_add($rt_s(357), $rt_s(358), 7, 0);
    t_BuiltInSymbols_add($rt_s(359), $rt_s(360), 7, 0);
    t_BuiltInSymbols_add($rt_s(361), $rt_s(362), 7, 0);
    t_BuiltInSymbols_add($rt_s(363), $rt_s(364), 7, 0);
    t_BuiltInSymbols_add($rt_s(365), $rt_s(366), 7, 0);
    t_BuiltInSymbols_add($rt_s(367), $rt_s(368), 7, 0);
    t_BuiltInSymbols_add($rt_s(369), $rt_s(370), 7, 0);
    t_BuiltInSymbols_add($rt_s(371), $rt_s(372), 7, 0);
    t_BuiltInSymbols_add($rt_s(373), $rt_s(374), 7, 0);
    t_BuiltInSymbols_add($rt_s(375), $rt_s(376), 7, 0);
    t_BuiltInSymbols_add($rt_s(377), $rt_s(378), 7, 0);
    t_BuiltInSymbols_add($rt_s(379), $rt_s(380), 7, 0);
    t_BuiltInSymbols_add($rt_s(377), $rt_s(378), 7, 0);
    t_BuiltInSymbols_add($rt_s(381), $rt_s(382), 7, 0);
    t_BuiltInSymbols_add($rt_s(383), $rt_s(384), 7, 0);
    t_BuiltInSymbols_add($rt_s(385), $rt_s(386), 7, 0);
    t_BuiltInSymbols_add($rt_s(16), $rt_s(387), 6, 0);
    t_BuiltInSymbols_add($rt_s(17), $rt_s(388), 6, 0);
    t_BuiltInSymbols_add($rt_s(84), $rt_s(389), 6, 0);
    t_BuiltInSymbols_add($rt_s(390), $rt_s(58), 6, 0);
    t_BuiltInSymbols_add($rt_s(21), $rt_s(21), 4, 0);
    t_BuiltInSymbols_add($rt_s(391), $rt_s(391), 4, 0);
    t_BuiltInSymbols_add($rt_s(14), $rt_s(392), 4, 0);
    t_BuiltInSymbols_add($rt_s(71), $rt_s(393), 4, 0);
    t_BuiltInSymbols_add($rt_s(66), $rt_s(66), 5, 0);
    t_BuiltInSymbols_add($rt_s(15), $rt_s(394), 5, 0);
    t_BuiltInSymbols_add($rt_s(58), $rt_s(58), 5, 0);
    t_BuiltInSymbols_add($rt_s(72), $rt_s(389), 5, 0);
    t_BuiltInSymbols_add($rt_s(98), $rt_s(395), 2, 0);
    t_BuiltInSymbols_add($rt_s(99), $rt_s(396), 2, 0);
    t_BuiltInSymbols_add($rt_s(101), $rt_s(397), 2, 0);
    t_BuiltInSymbols_add($rt_s(102), $rt_s(398), 2, 0);
    t_BuiltInSymbols_add($rt_s(94), $rt_s(399), 2, 0);
    t_BuiltInSymbols_add($rt_s(96), $rt_s(400), 2, 0);
    t_BuiltInSymbols_add($rt_s(104), $rt_s(401), 2, 0);
    t_BuiltInSymbols_add($rt_s(105), $rt_s(401), 2, 0);
    t_BuiltInSymbols_add($rt_s(106), $rt_s(402), 2, 0);
    t_BuiltInSymbols_add($rt_s(70), $rt_s(403), 2, 0);
    t_BuiltInSymbols_add($rt_s(404), $rt_s(405), 2, 0);
    t_BuiltInSymbols_add($rt_s(406), $rt_s(407), 2, 0);
    t_BuiltInSymbols_add($rt_s(408), $rt_s(409), 2, 0);
    t_BuiltInSymbols_add($rt_s(410), $rt_s(411), 2, 0);
    t_BuiltInSymbols_add($rt_s(412), $rt_s(413), 2, 0);
    t_BuiltInSymbols_add($rt_s(414), $rt_s(415), 2, 0);
    t_BuiltInSymbols_add($rt_s(86), $rt_s(416), 3, 0);
    t_BuiltInSymbols_add($rt_s(417), $rt_s(418), 3, 0);
    t_BuiltInSymbols_add($rt_s(419), $rt_s(420), 3, 0);
    t_BuiltInSymbols_add($rt_s(421), $rt_s(422), 3, 0);
    t_BuiltInSymbols_add($rt_s(112), $rt_s(423), 1, 1);
    t_BuiltInSymbols_add($rt_s(158), $rt_s(424), 1, 2);
    t_BuiltInSymbols_add($rt_s(114), $rt_s(425), 1, 3);
    t_BuiltInSymbols_add($rt_s(115), $rt_s(425), 1, 4);
    t_BuiltInSymbols_add($rt_s(90), $rt_s(426), 1, 5);
    t_BuiltInSymbols_add($rt_s(92), $rt_s(427), 1, 6);
    t_BuiltInSymbols_add($rt_s(126), $rt_s(428), 1, 7);
    t_BuiltInSymbols_add($rt_s(124), $rt_s(429), 1, 7);
    t_BuiltInSymbols_add($rt_s(128), $rt_s(430), 1, 7);
    t_BuiltInSymbols_add($rt_s(130), $rt_s(431), 1, 7);
    t_BuiltInSymbols_add($rt_s(147), $rt_s(432), 1, 8);
    t_BuiltInSymbols_add($rt_s(149), $rt_s(433), 1, 8);
    t_BuiltInSymbols_add($rt_s(434), $rt_s(435), 1, 9);
    t_BuiltInSymbols_add($rt_s(132), $rt_s(436), 1, 10);
    t_BuiltInSymbols_add($rt_s(133), $rt_s(436), 1, 11);
    t_BuiltInSymbols_add($rt_s(135), $rt_s(437), 1, 12);
    t_BuiltInSymbols_add($rt_s(136), $rt_s(437), 1, 13);
    t_BuiltInSymbols_add($rt_s(68), $rt_s(438), 1, 14);
    t_BuiltInSymbols_add($rt_s(67), $rt_s(439), 1, 15);
    t_BuiltInSymbols_add($rt_s(108), $rt_s(438), 1, 16);
    t_BuiltInSymbols_add($rt_s(110), $rt_s(439), 1, 17);
    t_BuiltInSymbols_add($rt_s(153), $rt_s(440), 1, 18);
    t_BuiltInSymbols_add($rt_s(8), $rt_s(441), 1, 19);
    t_BuiltInSymbols_add($rt_s(442), $rt_s(443), 1, 19);
    t_BuiltInSymbols_add($rt_s(13), $rt_s(444), 1, 20);
    t_BuiltInSymbols_add($rt_s(445), $rt_s(446), 1, 21);
    t_BuiltInSymbols_add($rt_s(240), $rt_s(447), 1, 22);
    t_BuiltInSymbols_add($rt_s(448), $rt_s(449), 1, 23);
    t_BuiltInSymbols_add($rt_s(228), $rt_s(450), 1, 24);
    t_BuiltInSymbols_add($rt_s(451), $rt_s(452), 1, 25);
    t_BuiltInSymbols_add($rt_s(453), $rt_s(454), 1, 26);
    t_BuiltInSymbols_add($rt_s(455), $rt_s(456), 1, 27);
    t_BuiltInSymbols_add($rt_s(457), $rt_s(458), 1, 27);
    t_BuiltInSymbols_add($rt_s(459), $rt_s(460), 1, 28);
    t_BuiltInSymbols_add($rt_s(461), $rt_s(462), 1, 29);
    t_BuiltInSymbols_add($rt_s(463), $rt_s(464), 1, 30);
    t_BuiltInSymbols_add($rt_s(220), $rt_s(465), 1, 31);
    t_BuiltInSymbols_add($rt_s(224), $rt_s(466), 1, 32);
    t_BuiltInSymbols_add($rt_s(222), $rt_s(467), 1, 33);
    t_BuiltInSymbols_add($rt_s(226), $rt_s(468), 1, 34);
    t_BuiltInSymbols_add($rt_s(469), $rt_s(470), 1, 35);
    t_BuiltInSymbols_add($rt_s(471), $rt_s(472), 1, 35);
    t_BuiltInSymbols_add($rt_s(473), $rt_s(474), 1, 35);
    t_BuiltInSymbols_add($rt_s(475), $rt_s(476), 1, 36);
    t_BuiltInSymbols_add($rt_s(160), $rt_s(477), 1, 37);
    t_BuiltInSymbols_add($rt_s(163), $rt_s(478), 1, 37);
    t_BuiltInSymbols_add($rt_s(161), $rt_s(477), 1, 37);
    t_BuiltInSymbols_add($rt_s(164), $rt_s(478), 1, 37);
    t_BuiltInSymbols_add($rt_s(172), $rt_s(479), 1, 38);
    t_BuiltInSymbols_add($rt_s(173), $rt_s(479), 1, 38);
    t_BuiltInSymbols_add($rt_s(169), $rt_s(480), 1, 39);
    t_BuiltInSymbols_add($rt_s(170), $rt_s(480), 1, 39);
    t_BuiltInSymbols_add($rt_s(481), $rt_s(482), 1, 40);
    t_BuiltInSymbols_add($rt_s(167), $rt_s(482), 1, 40);
    t_BuiltInSymbols_add($rt_s(138), $rt_s(483), 1, 41);
    t_BuiltInSymbols_add($rt_s(200), $rt_s(484), 1, 42);
    t_BuiltInSymbols_add($rt_s(202), $rt_s(485), 1, 43);
    t_BuiltInSymbols_add($rt_s(156), $rt_s(486), 1, 44);
    t_BuiltInSymbols_add($rt_s(182), $rt_s(487), 1, 45);
    t_BuiltInSymbols_add($rt_s(175), $rt_s(488), 1, 46);
    t_BuiltInSymbols_add($rt_s(176), $rt_s(488), 1, 46);
    t_BuiltInSymbols_add($rt_s(178), $rt_s(489), 1, 47);
    t_BuiltInSymbols_add($rt_s(180), $rt_s(490), 1, 48);
    t_BuiltInSymbols_add($rt_s(120), $rt_s(491), 1, 49);
    t_BuiltInSymbols_add($rt_s(122), $rt_s(492), 1, 49);
    t_BuiltInSymbols_add($rt_s(493), $rt_s(494), 1, 49);
    t_BuiltInSymbols_add($rt_s(117), $rt_s(495), 1, 49);
    t_BuiltInSymbols_add($rt_s(118), $rt_s(495), 1, 49);
    t_BuiltInSymbols_add($rt_s(31), $rt_s(496), 1, 49);
    t_BuiltInSymbols_add($rt_s(32), $rt_s(497), 1, 49);
    t_BuiltInSymbols_add($rt_s(140), $rt_s(498), 1, 49);
    t_BuiltInSymbols_add($rt_s(141), $rt_s(498), 1, 49);
    t_BuiltInSymbols_add($rt_s(144), $rt_s(499), 1, 49);
    t_BuiltInSymbols_add($rt_s(184), $rt_s(500), 1, 49);
    t_BuiltInSymbols_add($rt_s(188), $rt_s(501), 1, 49);
    t_BuiltInSymbols_add($rt_s(186), $rt_s(502), 1, 49);
    t_BuiltInSymbols_add($rt_s(190), $rt_s(503), 1, 49);
    t_BuiltInSymbols_add($rt_s(218), $rt_s(504), 1, 49);
    t_BuiltInSymbols_add($rt_s(216), $rt_s(505), 1, 49);
    t_BuiltInSymbols_add($rt_s(212), $rt_s(506), 1, 49);
    t_BuiltInSymbols_add($rt_s(214), $rt_s(507), 1, 49);
    t_BuiltInSymbols_add($rt_s(204), $rt_s(508), 1, 50);
    t_BuiltInSymbols_add($rt_s(192), $rt_s(509), 1, 51);
    t_BuiltInSymbols_add($rt_s(196), $rt_s(510), 1, 51);
    t_BuiltInSymbols_add($rt_s(194), $rt_s(511), 1, 51);
    t_BuiltInSymbols_add($rt_s(198), $rt_s(512), 1, 51);
    t_BuiltInSymbols_add($rt_s(210), $rt_s(513), 1, 52);
    t_BuiltInSymbols_add($rt_s(514), $rt_s(515), 8, 53);
    t_BuiltInSymbols_add($rt_s(74), $rt_s(516), 1, 54);
    t_BuiltInSymbols_add($rt_s(73), $rt_s(517), 1, 55);
    t_BuiltInSymbols_add($rt_s(75), $rt_s(518), 1, 56);
    t_BuiltInSymbols_add($rt_s(77), $rt_s(519), 1, 57);
    t_BuiltInSymbols_add($rt_s(520), $rt_s(521), 2, 58);
    t_BuiltInSymbols_add($rt_s(522), $rt_s(523), 2, 58);
    t_BuiltInSymbols_add($rt_s(524), $rt_s(525), 1, 59);
    t_BuiltInSymbols_add($rt_s(526), $rt_s(527), 1, 59);
    t_BuiltInSymbols_add($rt_s(69), $rt_s(528), 1, 60);
    t_BuiltInSymbols_add($rt_s(529), $rt_s(530), 1, 61);
    t_BuiltInSymbols_add($rt_s(531), $rt_s(532), 7, 62);
    t_BuiltInSymbols_add($rt_s(533), $rt_s(534), 7, 62);
    t_BuiltInSymbols_add($rt_s(535), $rt_s(536), 1, 0);
    t_BuiltInSymbols_add($rt_s(537), $rt_s(538), 1, 0);
    t_BuiltInSymbols_add($rt_s(539), $rt_s(540), 1, 0);
    t_BuiltInSymbols_add($rt_s(541), $rt_s(542), 1, 0);
    t_BuiltInSymbols_add($rt_s(543), $rt_s(544), 1, 0);
    t_BuiltInSymbols_add($rt_s(545), $rt_s(546), 1, 0);
    t_BuiltInSymbols_add($rt_s(150), $rt_s(547), 1, 0);
    t_BuiltInSymbols_add($rt_s(548), $rt_s(549), 1, 0);
    t_BuiltInSymbols_add($rt_s(550), $rt_s(551), 1, 0);
    t_BuiltInSymbols_add($rt_s(552), $rt_s(553), 1, 0);
    t_BuiltInSymbols_add($rt_s(554), $rt_s(555), 1, 0);
    t_BuiltInSymbols_add($rt_s(154), $rt_s(440), 1, 0);
    t_BuiltInSymbols_add($rt_s(142), $rt_s(498), 1, 0);
    t_BuiltInSymbols_add($rt_s(145), $rt_s(499), 1, 0);
    t_BuiltInSymbols_add($rt_s(151), $rt_s(547), 1, 0);
    t_BuiltInSymbols_add($rt_s(206), $rt_s(556), 1, 0);
    t_BuiltInSymbols_add($rt_s(208), $rt_s(557), 1, 0);
    t_BuiltInSymbols_add($rt_s(558), $rt_s(559), 1, 0);
    t_BuiltInSymbols_add($rt_s(560), $rt_s(561), 8, 0);
    t_BuiltInSymbols_add($rt_s(33), $rt_s(33), 8, 0);
    t_BuiltInSymbols_add($rt_s(562), $rt_s(563), 9, 0);
    t_BuiltInSymbols_add($rt_s(1), $rt_s(1), 9, 0);
    t_BuiltInSymbols_pcaladd($rt_s(564), $rt_s(565), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(18), $rt_s(566), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(28), $rt_s(567), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(27), $rt_s(568), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(289), $rt_s(569), 8, 63);
    t_BuiltInSymbols_pcaladd($rt_s(570), $rt_s(571), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(572), $rt_s(573), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(290), $rt_s(574), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(575), $rt_s(576), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(577), $rt_s(578), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(579), $rt_s(580), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(291), $rt_s(581), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(292), $rt_s(582), 1, 64);
    t_BuiltInSymbols_pcaladd($rt_s(293), $rt_s(583), 1, 64);
    t_BuiltInSymbols_pcaladd($rt_s(584), $rt_s(585), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(586), $rt_s(587), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(294), $rt_s(588), 1, 65);
    t_BuiltInSymbols_pcaladd($rt_s(295), $rt_s(589), 1, 65);
    t_BuiltInSymbols_pcaladd($rt_s(296), $rt_s(590), 1, 65);
    t_BuiltInSymbols_pcaladd($rt_s(591), $rt_s(592), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(593), $rt_s(594), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(595), $rt_s(596), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(597), $rt_s(598), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(599), $rt_s(600), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(601), $rt_s(602), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(603), $rt_s(604), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(605), $rt_s(606), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(607), $rt_s(608), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(609), $rt_s(610), 7, 0);
    t_BuiltInSymbols_pcaladd($rt_s(611), $rt_s(612), 7, 0);
    t_BuiltInSymbols_pcaladd(t_BuiltInSymbols_pcalLeftParen, $rt_s(613), 4, 0);
    t_BuiltInSymbols_pcaladd(t_BuiltInSymbols_pcalRightParen, $rt_s(614), 5, 0);
    t_BuiltInSymbols_pcaladd(t_BuiltInSymbols_pcalLeftBrace, $rt_s(615), 4, 0);
    t_BuiltInSymbols_pcaladd(t_BuiltInSymbols_pcalRightBrace, $rt_s(616), 5, 0);
}
function t_BuiltInSymbols_buildPrefixHashTable() {
    var $builtInEnum, $symbol, var$3, var$4;
    t_BuiltInSymbols_$callClinit();
    $builtInEnum = t_BuiltInSymbols_builtInHashTable.$keys();
    while ($builtInEnum.$hasMoreElements()) {
        a: {
            $symbol = $builtInEnum.$nextElement();
            if (!t_Misc_IsLetter($symbol.$charAt(0))) {
                if ($symbol.$length() > 1) {
                    var$3 = 0;
                    if ($symbol.$charAt(var$3) == 92) {
                        var$3 = 1;
                        if (t_Misc_IsLetter($symbol.$charAt(var$3)))
                            break a;
                    }
                }
                while ($symbol.$length() > 0) {
                    t_BuiltInSymbols_prefixHashTable.$put($symbol, t_BuiltInSymbols_nullString);
                    $symbol = $symbol.$substring(0, $symbol.$length() - 1 | 0);
                }
            }
        }
    }
    var$4 = t_BuiltInSymbols_pcalBuiltInHashTable.$keys();
    while (var$4.$hasMoreElements()) {
        b: {
            $symbol = var$4.$nextElement();
            if (!t_Misc_IsLetter($symbol.$charAt(0))) {
                if ($symbol.$length() > 1) {
                    var$3 = 0;
                    if ($symbol.$charAt(var$3) == 92) {
                        var$3 = 1;
                        if (t_Misc_IsLetter($symbol.$charAt(var$3)))
                            break b;
                    }
                }
                while ($symbol.$length() > 0) {
                    t_BuiltInSymbols_pcalPrefixHashTable.$put($symbol, t_BuiltInSymbols_nullString);
                    $symbol = $symbol.$substring(0, $symbol.$length() - 1 | 0);
                }
            }
        }
    }
}
function t_BuiltInSymbols__clinit_() {
    t_BuiltInSymbols_builtInHashTable = ju_Hashtable__init_(200);
    t_BuiltInSymbols_prefixHashTable = ju_Hashtable__init_(700);
    t_BuiltInSymbols_pcalBuiltInHashTable = ju_Hashtable__init_(200);
    t_BuiltInSymbols_pcalPrefixHashTable = ju_Hashtable__init_(700);
    t_BuiltInSymbols_stringCharTable = ju_Hashtable__init_(100);
    t_BuiltInSymbols_canPrecedeLabelTable = ju_Hashtable__init_(15);
    t_BuiltInSymbols_nullString = $rt_s(3);
    t_BuiltInSymbols_pcalLeftParen = $rt_s(617);
    t_BuiltInSymbols_pcalRightParen = $rt_s(618);
    t_BuiltInSymbols_pcalLeftBrace = $rt_s(619);
    t_BuiltInSymbols_pcalRightBrace = $rt_s(620);
}
function jl_ConsoleOutputStreamStderr() {
    ji_OutputStream.call(this);
}
function jl_ConsoleOutputStreamStderr__init_() {
    var var_0 = new jl_ConsoleOutputStreamStderr();
    jl_ConsoleOutputStreamStderr__init_0(var_0);
    return var_0;
}
function jl_ConsoleOutputStreamStderr__init_0(var$0) {
    ji_OutputStream__init_0(var$0);
}
function jl_ConsoleOutputStreamStderr_write(var$0, var$1) {
    $rt_putStderr(var$1);
}
function otcit_FloatAnalyzer$Result() {
    var a = this; jl_Object.call(a);
    a.$mantissa = 0;
    a.$exponent = 0;
    a.$sign = 0;
}
function otcit_FloatAnalyzer$Result__init_() {
    var var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_0(var_0);
    return var_0;
}
function otcit_FloatAnalyzer$Result__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function t_Client() {
    jl_Object.call(this);
}
function t_Client_main(var$1) {
    var $document, var$3, $tags, $i, $node, $pre, $text, $content, $result, var$11, $pre1, $stuff;
    $document = otjdh_HTMLDocument_current();
    var$3 = $rt_s(621);
    $tags = $document.getElementsByTagName($rt_ustr(var$3));
    $i = 0;
    while ($i < $tags.length) {
        $node = $tags[$i];
        $pre = $node.firstChild;
        $text = $pre.firstChild;
        $content = $rt_str($text.nodeValue);
        jl_System_out().$println(jl_StringBuilder__init_1($rt_s(622)).$append2($i).$toString());
        jl_System_out().$println($content);
        $result = t_TLAUnicode_convert(1, $content);
        otjdx_Node_delete$static($pre);
        var$11 = $rt_s(623);
        $pre1 = $document.createElement($rt_ustr(var$11));
        $stuff = $document.createTextNode($rt_ustr($result));
        $pre1.appendChild($stuff);
        $node.appendChild($pre1);
        $i = $i + 1 | 0;
    }
}
function t_Symbol() {
    var a = this; jl_Object.call(a);
    a.$TLAString = null;
    a.$TeXString = null;
    a.$symbolType = 0;
    a.$pcal = 0;
    a.$alignmentType = 0;
}
function t_Symbol__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new t_Symbol();
    t_Symbol__init_1(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function t_Symbol__init_0(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new t_Symbol();
    t_Symbol__init_2(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function t_Symbol__init_1(var$0, var$1, var$2, var$3, var$4) {
    jl_Object__init_0(var$0);
    var$0.$pcal = 0;
    var$0.$TLAString = var$1;
    var$0.$TeXString = var$2;
    var$0.$symbolType = var$3;
    var$0.$alignmentType = var$4;
    var$0.$pcal = 0;
}
function t_Symbol__init_2(var$0, var$1, var$2, var$3, var$4, var$5) {
    jl_Object__init_0(var$0);
    var$0.$pcal = 0;
    var$0.$TLAString = var$1;
    var$0.$TeXString = var$2;
    var$0.$symbolType = var$3;
    var$0.$alignmentType = var$4;
    var$0.$pcal = var$5;
}
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name3 = null;
    a.$platformClass = null;
}
function jl_Class__init_(var_0) {
    var var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
}
function jl_Class__init_0(var$0, var$1) {
    var var$2;
    jl_Object__init_0(var$0);
    var$0.$platformClass = var$1;
    var$2 = var$0;
    var$1.classObject = var$2;
}
function jl_Class_getClass(var$1) {
    var $result;
    if (var$1 === null)
        return null;
    $result = var$1.classObject;
    if ($result === null)
        $result = jl_Class__init_(var$1);
    return $result;
}
function jl_Class_getPlatformClass(var$0) {
    return var$0.$platformClass;
}
function jl_Class_isInstance(var$0, var$1) {
    return otp_Platform_isInstance(var$1, var$0.$platformClass);
}
function jl_Class_getName(var$0) {
    if (var$0.$name3 === null)
        var$0.$name3 = otp_Platform_getName(var$0.$platformClass);
    return var$0.$name3;
}
function jl_Class_isPrimitive(var$0) {
    return otp_Platform_isPrimitive(var$0.$platformClass);
}
function jl_Class_getComponentType(var$0) {
    return jl_Class_getClass(otp_Platform_getArrayItem(var$0.$platformClass));
}
function jl_Class_desiredAssertionStatus(var$0) {
    return 1;
}
function ju_Arrays$ArrayAsList() {
    ju_AbstractList.call(this);
    this.$array2 = null;
}
function ju_Arrays$ArrayAsList__init_(var_0) {
    var var_1 = new ju_Arrays$ArrayAsList();
    ju_Arrays$ArrayAsList__init_0(var_1, var_0);
    return var_1;
}
function ju_Arrays$ArrayAsList__init_0(var$0, var$1) {
    ju_AbstractList__init_0(var$0);
    var$0.$array2 = var$1;
}
function ju_Arrays$ArrayAsList_get(var$0, var$1) {
    return var$0.$array2.data[var$1];
}
function ju_Arrays$ArrayAsList_size(var$0) {
    return var$0.$array2.data.length;
}
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, ["$isEmptyMonitor", function() { return jl_Object_isEmptyMonitor(this); }, "$deleteMonitor", function() { jl_Object_deleteMonitor(this); }, "$getClass0", function() { return jl_Object_getClass(this); }, "$hashCode", function() { return jl_Object_hashCode(this); }, "$equals", function(var_1) { return jl_Object_equals(this, var_1); }, "$toString", function() { return jl_Object_toString(this); }, "$identity", function() { return jl_Object_identity(this); },
"$clone", function() { return jl_Object_clone(this); }],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, ["$fillInStackTrace", function() { return jl_Throwable_fillInStackTrace(this); }, "$getMessage", function() { return jl_Throwable_getMessage(this); }],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Float, 0, jl_Number, [jl_Comparable], 0, 3, jl_Float_$callClinit, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0,
otjdx_Node, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjdx_Document, 0, jl_Object, [otjdx_Node], 3, 3, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, ["$write1", function(var_1, var_2, var_3) { ji_OutputStream_write(this, var_1, var_2, var_3); }],
jl_ConsoleOutputStreamStdout, 0, ji_OutputStream, [], 0, 0, 0, ["$write", function(var_1) { jl_ConsoleOutputStreamStdout_write(this, var_1); }],
ju_Enumeration, 0, jl_Object, [], 3, 3, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0,
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, ["$hasMoreInput", function() { return jnci_BufferedEncoder$Controller_hasMoreInput(this); }, "$hasMoreOutput", function(var_1) { return jnci_BufferedEncoder$Controller_hasMoreOutput(this, var_1); }, "$setInPosition", function(var_1) { jnci_BufferedEncoder$Controller_setInPosition(this, var_1); }, "$setOutPosition", function(var_1) { jnci_BufferedEncoder$Controller_setOutPosition(this, var_1); }],
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, jl_Integer_$callClinit, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0,
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, jl_AbstractStringBuilder$Constants_$callClinit, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, ["$isEmpty", function() { return ju_AbstractCollection_isEmpty(this); }, "$toArray", function(var_1) { return ju_AbstractCollection_toArray(this, var_1); }],
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, ["$iterator", function() { return ju_AbstractList_iterator(this); }],
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0,
ju_Vector, 0, ju_AbstractList, [ju_List, ju_RandomAccess, jl_Cloneable, ji_Serializable], 0, 3, ju_Vector_$callClinit, ["$newElementArray", function(var_1) { return ju_Vector_newElementArray(this, var_1); }, "$addElement", function(var_1) { ju_Vector_addElement(this, var_1); }, "$elementAt", function(var_1) { return ju_Vector_elementAt(this, var_1); }, "$growByOne", function() { ju_Vector_growByOne(this); }, "$size", function() { return ju_Vector_size(this); }],
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjdh_HTMLDocument, 0, jl_Object, [otjdx_Document, otjde_EventTarget], 3, 3, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, jl_Character_$callClinit, ["$equals", function(var_1) { return jl_Character_equals(this, var_1); }, "$hashCode", function() { return jl_Character_hashCode(this); }],
t_TokenizeSpec, 0, jl_Object, [], 0, 3, t_TokenizeSpec_$callClinit, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0,
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, jl_Thread_$callClinit, 0,
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$monitorExit$lambda$_8_0_run(this); }],
t_Token, 0, jl_Object, [], 0, 3, 0, ["$getWidth", function() { return t_Token_getWidth(this); }, "$mostOfString", function() { return t_Token_mostOfString(this); }, "$toString", function() { return t_Token_toString(this); }],
t_Token$PfStepToken, 0, t_Token, [], 0, 3, 0, 0,
otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0,
jn_Buffer, 0, jl_Object, [], 1, 3, 0, ["$position1", function() { return jn_Buffer_position(this); }, "$position0", function(var_1) { return jn_Buffer_position0(this, var_1); }, "$clear", function() { return jn_Buffer_clear(this); }, "$remaining", function() { return jn_Buffer_remaining(this); }, "$hasRemaining", function() { return jn_Buffer_hasRemaining(this); }],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0]);
$rt_metadata([jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, ["$get1", function(var_1, var_2, var_3) { return jn_CharBuffer_get(this, var_1, var_2, var_3); }],
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0,
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, ["$getChar", function(var_1) { return jn_CharBufferOverArray_getChar(this, var_1); }],
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
t_Unicode, 0, jl_Object, [], 4, 3, t_Unicode_$callClinit, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0,
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0,
ji_Reader, 0, jl_Object, [ji_Closeable], 1, 3, 0, 0,
ju_MapEntry$Type, 0, jl_Object, [], 3, 0, 0, 0,
ju_Hashtable$keys$lambda$_19_0, 0, jl_Object, [ju_MapEntry$Type], 0, 3, 0, ["$get3", function(var_1) { return ju_Hashtable$keys$lambda$_19_0_get(this, var_1); }],
t_Position, 0, jl_Object, [], 0, 3, 0, ["$toToken", function(var_1) { return t_Position_toToken(this, var_1); }, "$equals0", function(var_1) { return t_Position_equals(this, var_1); }, "$toString", function() { return t_Position_toString(this); }],
jn_ByteOrder, 0, jl_Object, [], 4, 3, jn_ByteOrder_$callClinit, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$append5", function(var_1) { return jl_AbstractStringBuilder_append(this, var_1); }, "$insert", function(var_1, var_2) { return jl_AbstractStringBuilder_insert(this, var_1, var_2); }, "$append6", function(var_1) { return jl_AbstractStringBuilder_append0(this, var_1); }, "$append0", function(var_1, var_2) { return jl_AbstractStringBuilder_append1(this, var_1, var_2); }, "$insert0", function(var_1, var_2, var_3) { return jl_AbstractStringBuilder_insert0(this,
var_1, var_2, var_3); }, "$append7", function(var_1) { return jl_AbstractStringBuilder_append2(this, var_1); }, "$insert1", function(var_1, var_2) { return jl_AbstractStringBuilder_insert1(this, var_1, var_2); }, "$append8", function(var_1) { return jl_AbstractStringBuilder_append3(this, var_1); }, "$insert2", function(var_1, var_2) { return jl_AbstractStringBuilder_insert2(this, var_1, var_2); }, "$append10", function(var_1) { return jl_AbstractStringBuilder_append4(this, var_1); }, "$insert3", function(var_1,
var_2) { return jl_AbstractStringBuilder_insert3(this, var_1, var_2); }, "$ensureCapacity", function(var_1) { jl_AbstractStringBuilder_ensureCapacity(this, var_1); }, "$toString", function() { return jl_AbstractStringBuilder_toString(this); }, "$length", function() { return jl_AbstractStringBuilder_length(this); }, "$charAt", function(var_1) { return jl_AbstractStringBuilder_charAt(this, var_1); }, "$append4", function(var_1, var_2, var_3) { return jl_AbstractStringBuilder_append5(this, var_1, var_2, var_3);
}, "$insert4", function(var_1, var_2, var_3, var_4) { return jl_AbstractStringBuilder_insert4(this, var_1, var_2, var_3, var_4); }, "$append9", function(var_1) { return jl_AbstractStringBuilder_append6(this, var_1); }, "$getChars", function(var_1, var_2, var_3, var_4) { jl_AbstractStringBuilder_getChars(this, var_1, var_2, var_3, var_4); }, "$setLength", function(var_1) { jl_AbstractStringBuilder_setLength(this, var_1); }, "$delete", function(var_1, var_2) { return jl_AbstractStringBuilder_delete(this, var_1,
var_2); }, "$insertSpace", function(var_1, var_2) { jl_AbstractStringBuilder_insertSpace(this, var_1, var_2); }],
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, ["$append", function(var_1) { return jl_StringBuilder_append(this, var_1); }, "$append2", function(var_1) { return jl_StringBuilder_append0(this, var_1); }, "$append3", function(var_1) { return jl_StringBuilder_append1(this, var_1); }, "$append1", function(var_1) { return jl_StringBuilder_append2(this, var_1); }, "$append11", function(var_1, var_2, var_3) { return jl_StringBuilder_append3(this, var_1, var_2, var_3); }, "$append13", function(var_1)
{ return jl_StringBuilder_append4(this, var_1); }, "$append14", function(var_1) { return jl_StringBuilder_append5(this, var_1); }, "$insert8", function(var_1, var_2) { return jl_StringBuilder_insert(this, var_1, var_2); }, "$insert5", function(var_1, var_2, var_3, var_4) { return jl_StringBuilder_insert0(this, var_1, var_2, var_3, var_4); }, "$insert6", function(var_1, var_2) { return jl_StringBuilder_insert1(this, var_1, var_2); }, "$insert7", function(var_1, var_2) { return jl_StringBuilder_insert2(this, var_1,
var_2); }, "$delete0", function(var_1, var_2) { return jl_StringBuilder_delete(this, var_1, var_2); }, "$insert9", function(var_1, var_2) { return jl_StringBuilder_insert3(this, var_1, var_2); }, "$setLength", function(var_1) { jl_StringBuilder_setLength(this, var_1); }, "$getChars", function(var_1, var_2, var_3, var_4) { jl_StringBuilder_getChars(this, var_1, var_2, var_3, var_4); }, "$insert4", function(var_1, var_2, var_3, var_4) { return jl_StringBuilder_insert4(this, var_1, var_2, var_3, var_4); }, "$append4",
function(var_1, var_2, var_3) { return jl_StringBuilder_append6(this, var_1, var_2, var_3); }, "$charAt", function(var_1) { return jl_StringBuilder_charAt(this, var_1); }, "$length", function() { return jl_StringBuilder_length(this); }, "$toString", function() { return jl_StringBuilder_toString(this); }, "$ensureCapacity", function(var_1) { jl_StringBuilder_ensureCapacity(this, var_1); }, "$insert3", function(var_1, var_2) { return jl_StringBuilder_insert5(this, var_1, var_2); }, "$insert2", function(var_1,
var_2) { return jl_StringBuilder_insert6(this, var_1, var_2); }, "$insert1", function(var_1, var_2) { return jl_StringBuilder_insert7(this, var_1, var_2); }, "$insert", function(var_1, var_2) { return jl_StringBuilder_insert8(this, var_1, var_2); }],
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ju_Dictionary, 0, jl_Object, [], 1, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 4, 0, 0, ["$hasMoreElements", function() { return ju_Hashtable$1_hasMoreElements(this); }, "$nextElement", function() { return ju_Hashtable$1_nextElement(this); }],
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, ["$getKeyHash", function() { return ju_Hashtable$Entry_getKeyHash(this); }, "$equalsKey", function(var_1, var_2) { return ju_Hashtable$Entry_equalsKey(this, var_1, var_2); }],
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0,
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 4, 0, 0, 0,
t_CharReader, 0, jl_Object, [], 1, 3, 0, ["$getLineNumber", function() { return t_CharReader_getLineNumber(this); }, "$getColumnNumber", function() { return t_CharReader_getColumnNumber(this); }, "$getNextChar", function() { return t_CharReader_getNextChar(this); }, "$backspace", function() { t_CharReader_backspace(this); }],
t_InputStreamCharReader, 0, t_CharReader, [], 0, 3, 0, ["$innerGetNextLine", function() { return t_InputStreamCharReader_innerGetNextLine(this); }],
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget], 3, 3, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, ["$ensureCapacity", function(var_1) { ju_ArrayList_ensureCapacity(this, var_1); }, "$get2", function(var_1) { return ju_ArrayList_get(this, var_1); }, "$size", function() { return ju_ArrayList_size(this); }, "$add", function(var_1) { return ju_ArrayList_add(this, var_1); }, "$checkIndex", function(var_1) { ju_ArrayList_checkIndex(this, var_1); }],
jnc_CoderMalfunctionError, 0, jl_Error, [], 0, 3, 0, 0,
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, ["$addEventListener$exported$0", function(var_1, var_2) { return otjb_Window_addEventListener$exported$0(this, var_1, var_2); }, "$removeEventListener$exported$1", function(var_1, var_2) { return otjb_Window_removeEventListener$exported$1(this, var_1, var_2); }, "$get$exported$2", function(var_1) { return otjb_Window_get$exported$2(this, var_1); }, "$removeEventListener$exported$3", function(var_1,
var_2, var_3) { return otjb_Window_removeEventListener$exported$3(this, var_1, var_2, var_3); }, "$dispatchEvent$exported$4", function(var_1) { return otjb_Window_dispatchEvent$exported$4(this, var_1); }, "$getLength$exported$5", function() { return otjb_Window_getLength$exported$5(this); }, "$addEventListener$exported$6", function(var_1, var_2, var_3) { return otjb_Window_addEventListener$exported$6(this, var_1, var_2, var_3); }],
jl_IllegalMonitorStateException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, ["$append12", function(var_1) { return jl_StringBuffer_append(this, var_1); }, "$insert10", function(var_1, var_2) { return jl_StringBuffer_insert(this, var_1, var_2); }, "$toString", function() { return jl_StringBuffer_toString(this); }, "$ensureCapacity", function(var_1) { jl_StringBuffer_ensureCapacity(this, var_1); }, "$insert", function(var_1, var_2) { return jl_StringBuffer_insert0(this, var_1, var_2); }],
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, jl_String_$callClinit, ["$charAt", function(var_1) { return jl_String_charAt(this, var_1); }, "$length", function() { return jl_String_length(this); }, "$isEmpty", function() { return jl_String_isEmpty(this); }, "$indexOf", function(var_1, var_2) { return jl_String_indexOf(this, var_1, var_2); }, "$indexOf0", function(var_1) { return jl_String_indexOf0(this, var_1); }, "$substring", function(var_1, var_2) { return jl_String_substring(this,
var_1, var_2); }, "$trim", function() { return jl_String_trim(this); }, "$equals", function(var_1) { return jl_String_equals(this, var_1); }, "$hashCode", function() { return jl_String_hashCode(this); }],
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
t_FindAlignments, 0, jl_Object, [], 0, 3, 0, 0,
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, ["$checkReplacement", function(var_1) { jnc_CharsetEncoder_checkReplacement(this, var_1); }, "$onMalformedInput", function(var_1) { return jnc_CharsetEncoder_onMalformedInput(this, var_1); }, "$implOnMalformedInput", function(var_1) { jnc_CharsetEncoder_implOnMalformedInput(this, var_1); }, "$onUnmappableCharacter", function(var_1) { return jnc_CharsetEncoder_onUnmappableCharacter(this, var_1); }, "$implOnUnmappableCharacter", function(var_1) { jnc_CharsetEncoder_implOnUnmappableCharacter(this,
var_1); }, "$encode", function(var_1, var_2, var_3) { return jnc_CharsetEncoder_encode(this, var_1, var_2, var_3); }, "$flush0", function(var_1) { return jnc_CharsetEncoder_flush(this, var_1); }, "$implFlush", function(var_1) { return jnc_CharsetEncoder_implFlush(this, var_1); }],
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, ["$encodeLoop", function(var_1, var_2) { return jnci_BufferedEncoder_encodeLoop(this, var_1, var_2); }],
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, ["$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF8Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
jl_UnsupportedOperationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
ji_Writer, 0, jl_Object, [jl_Appendable, ji_Closeable, ji_Flushable], 1, 3, 0, 0,
ji_StringWriter, 0, ji_Writer, [], 0, 3, 0, ["$close", function() { ji_StringWriter_close(this); }, "$flush", function() { ji_StringWriter_flush(this); }, "$toString", function() { return ji_StringWriter_toString(this); }, "$write0", function(var_1) { ji_StringWriter_write(this, var_1); }],
ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0,
jl_ArrayIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0]);
$rt_metadata([ji_StringReader, 0, ji_Reader, [], 0, 3, 0, ["$read", function(var_1, var_2, var_3) { return ji_StringReader_read(this, var_1, var_2, var_3); }, "$checkOpened", function() { ji_StringReader_checkOpened(this); }],
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0,
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, ["$newEncoder", function() { return jnci_UTF8Charset_newEncoder(this); }],
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", function() { return ju_AbstractList$1_hasNext(this); }, "$next", function() { return ju_AbstractList$1_next(this); }, "$checkConcurrentModification", function() { ju_AbstractList$1_checkConcurrentModification(this); }],
ji_BufferedReader, 0, ji_Reader, [], 0, 3, 0, ["$readLine", function() { return ji_BufferedReader_readLine(this); }, "$fillBuffer", function(var_1) { return ji_BufferedReader_fillBuffer(this, var_1); }, "$requireOpened", function() { ji_BufferedReader_requireOpened(this); }],
jn_ReadOnlyBufferException, 0, jl_UnsupportedOperationException, [], 0, 3, 0, 0,
jl_IllegalStateException, 0, jl_Exception, [], 0, 3, 0, 0,
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0,
t_Unicode$OnlineReplacer, 0, jl_Object, [], 1, 3, 0, ["$reset", function() { t_Unicode$OnlineReplacer_reset(this); }, "$addChar0", function(var_1, var_2) { t_Unicode$OnlineReplacer_addChar(this, var_1, var_2); }, "$appendToToken", function(var_1, var_2) { t_Unicode$OnlineReplacer_appendToToken(this, var_1, var_2); }, "$replace", function() { t_Unicode$OnlineReplacer_replace(this); }],
t_Unicode$OnlineFilter, 0, t_Unicode$OnlineReplacer, [], 1, 0, 0, ["$addChar", function(var_1) { t_Unicode$OnlineFilter_addChar(this, var_1); }, "$replace0", function(var_1, var_2, var_3) { t_Unicode$OnlineFilter_replace(this, var_1, var_2, var_3); }, "$flush", function() { t_Unicode$OnlineFilter_flush(this); }],
t_Unicode$1, 0, t_Unicode$OnlineFilter, [], 0, 0, 0, ["$putChar", function(var_1) { t_Unicode$1_putChar(this, var_1); }, "$putString", function(var_1) { t_Unicode$1_putString(this, var_1); }],
jl_NullPointerException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, ["$put1", function(var_1, var_2, var_3) { return jn_ByteBuffer_put(this, var_1, var_2, var_3); }, "$put0", function(var_1) { return jn_ByteBuffer_put0(this, var_1); }],
otcjl_TObject, 0, jl_Object, [], 0, 3, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$complete", function(var_1) { otpp_AsyncCallbackWrapper_complete(this, var_1); }, "$error", function(var_1) { otpp_AsyncCallbackWrapper_error(this, var_1); }],
ju_Hashtable$HashIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", function() { return ju_Hashtable$HashIterator_hasNext(this); }, "$next", function() { return ju_Hashtable$HashIterator_next(this); }],
ju_Hashtable$HashEnumIterator, 0, ju_Hashtable$HashIterator, [ju_Enumeration], 0, 0, 0, ["$hasMoreElements", function() { return ju_Hashtable$HashEnumIterator_hasMoreElements(this); }, "$nextElement", function() { return ju_Hashtable$HashEnumIterator_nextElement(this); }],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0,
t_OutputFileWriter, 0, jl_Object, [], 0, 3, 0, ["$putLine", function(var_1) { t_OutputFileWriter_putLine(this, var_1); }, "$close", function() { t_OutputFileWriter_close(this); }],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
t_CommentToken, 0, t_Token, [], 0, 3, 0, ["$getWidth", function() { return t_CommentToken_getWidth(this); }, "$toString", function() { return t_CommentToken_toString(this); }],
t_Misc, 0, jl_Object, [], 4, 3, 0, 0,
u_ToolIO, 0, jl_Object, [], 0, 3, u_ToolIO_$callClinit, 0,
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$monitorEnterWait$lambda$_6_0_run(this); }],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0,
jl_String$_clinit_$lambda$_81_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
jl_ArrayStoreException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, ["$isReadOnly", function() { return jn_ByteBufferImpl_isReadOnly(this); }],
jn_BufferOverflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, ["$newElementArray0", function(var_1) { return ju_HashMap_newElementArray(this, var_1); }, "$computeThreshold", function() { ju_HashMap_computeThreshold(this); }, "$containsKey", function(var_1) { return ju_HashMap_containsKey(this, var_1); }, "$get", function(var_1) { return ju_HashMap_get(this, var_1); }, "$getEntry", function(var_1) { return ju_HashMap_getEntry(this, var_1); }, "$findNonNullKeyEntry", function(var_1, var_2, var_3) {
return ju_HashMap_findNonNullKeyEntry(this, var_1, var_2, var_3); }, "$findNullKeyEntry", function() { return ju_HashMap_findNullKeyEntry(this); }, "$put", function(var_1, var_2) { return ju_HashMap_put(this, var_1, var_2); }, "$putImpl", function(var_1, var_2) { return ju_HashMap_putImpl(this, var_1, var_2); }, "$createHashedEntry", function(var_1, var_2, var_3) { return ju_HashMap_createHashedEntry(this, var_1, var_2, var_3); }, "$rehash0", function(var_1) { ju_HashMap_rehash(this, var_1); }, "$rehash", function()
{ ju_HashMap_rehash0(this); }],
t_TLAUnicode$TokenPosition, 0, jl_Object, [], 0, 3, 0, 0,
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, ["$add", function(var_1) { return ju_HashSet_add(this, var_1); }, "$contains", function(var_1) { return ju_HashSet_contains(this, var_1); }],
jnc_CoderResult, 0, jl_Object, [], 0, 3, jnc_CoderResult_$callClinit, ["$isUnderflow", function() { return jnc_CoderResult_isUnderflow(this); }, "$isOverflow", function() { return jnc_CoderResult_isOverflow(this); }, "$isError", function() { return jnc_CoderResult_isError(this); }, "$isMalformed", function() { return jnc_CoderResult_isMalformed(this); }, "$isUnmappable", function() { return jnc_CoderResult_isUnmappable(this); }, "$length", function() { return jnc_CoderResult_length(this); }],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, jnc_CodingErrorAction_$callClinit, 0,
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jnc_IllegalCharsetNameException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0,
otcjl_TComparable, 0, jl_Object, [], 3, 3, 0, 0,
otcjl_TCharacter, 0, otcjl_TObject, [otcjl_TComparable], 0, 3, otcjl_TCharacter_$callClinit, 0,
ju_NoSuchElementException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 0, 3, ju_Hashtable_$callClinit, ["$newElementArray1", function(var_1) { return ju_Hashtable_newElementArray(this, var_1); }, "$computeMaxSize", function() { ju_Hashtable_computeMaxSize(this); }, "$containsKey", function(var_1) { return ju_Hashtable_containsKey(this, var_1); }, "$get", function(var_1) { return ju_Hashtable_get(this, var_1); }, "$getEntry0", function(var_1) { return ju_Hashtable_getEntry(this, var_1); }, "$keys", function()
{ return ju_Hashtable_keys(this); }, "$put", function(var_1, var_2) { return ju_Hashtable_put(this, var_1, var_2); }, "$rehash", function() { ju_Hashtable_rehash(this); }]]);
$rt_metadata([t_TLA2TexException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, ["$write1", function(var_1, var_2, var_3) { ji_PrintStream_write(this, var_1, var_2, var_3); }, "$check", function() { return ji_PrintStream_check(this); }, "$print", function(var_1, var_2, var_3) { ji_PrintStream_print(this, var_1, var_2, var_3); }, "$println", function(var_1) { ji_PrintStream_println(this, var_1); }, "$printSB", function() { ji_PrintStream_printSB(this); }],
t_TLAUnicode, 0, jl_Object, [], 0, 3, t_TLAUnicode_$callClinit, 0,
t_Debug, 0, jl_Object, [], 0, 3, 0, 0,
otcit_FloatAnalyzer, 0, jl_Object, [], 4, 3, otcit_FloatAnalyzer_$callClinit, 0,
jn_BufferUnderflowException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
t_BuiltInSymbols, 0, jl_Object, [], 4, 3, t_BuiltInSymbols_$callClinit, 0,
jl_ConsoleOutputStreamStderr, 0, ji_OutputStream, [], 0, 0, 0, ["$write", function(var_1) { jl_ConsoleOutputStreamStderr_write(this, var_1); }],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0,
t_Client, 0, jl_Object, [], 0, 3, 0, 0,
t_Symbol, 0, jl_Object, [], 0, 3, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, ["$getPlatformClass", function() { return jl_Class_getPlatformClass(this); }, "$isInstance", function(var_1) { return jl_Class_isInstance(this, var_1); }, "$getName", function() { return jl_Class_getName(this); }, "$isPrimitive", function() { return jl_Class_isPrimitive(this); }, "$getComponentType", function() { return jl_Class_getComponentType(this); }, "$desiredAssertionStatus", function() { return jl_Class_desiredAssertionStatus(this); }],
ju_Arrays$ArrayAsList, 0, ju_AbstractList, [ju_RandomAccess], 0, 0, 0, ["$get2", function(var_1) { return ju_Arrays$ArrayAsList_get(this, var_1); }, "$size", function() { return ju_Arrays$ArrayAsList_size(this); }]]);
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "@", "Either src or dest is null", "", " `", "\' found at\n    line ", ", column ", "TokenizeSpec.Tokenize called with illegal mode", "-", "Input ended before beginning of module", "MODULE", "Illegal lexeme", "Input ended before end of module", "*", "{", "}", "WF_", "SF_", "algorithm", "Illegal lexeme ", "Extra end-of-module lexeme on line ", "(", "Illegal character in string", "Illegal character following \\ in string", "case LINE_COM_STAR",
"Input ended in the middle of a comment", "Input ended in the middle of a multi-line comment", "--algorithm", "--fair", "Illegal state in TokenizeSpec.Tokenize", "main", "<", ">", ".", "BUILTIN", "NUMBER", "STRING", "IDENT", "COMMENT", "DASHES", "END_MODULE", "PROLOG", "EPILOG", "PF_STEP", "PCAL_LABEL", "\"", "null", "[str |-> ", ",\t type |-> ", ",\t col |-> ", ",\t width |-> ", ",\t outcolumn |-> ", ",\t above |-> ", ",\t below |-> ", ", space |-> ", ", align |-> true", ", dist |-> ", ", sub |-> true", "]",
"New position ", " is outside of range [0;", "The last char in dst ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", ")", "\\/", "/\\", "[]", "<>", "<<", ">>", "|->", "->", "<-", "≜", "==", "←", "→", "↦", "⟨", "⟩", "⟩_", ">>_", "′", "\'", "□", "◇", "↝", "~>", "⥅", "-+->", "∀∀", "\\AA", "∃∃", "\\EE", "∀", "\\A", "\\forall", "∃", "\\E", "\\exists", "¬", "~", "\\lnot", "\\neg", "∧", "\\land", "∨", "\\lor", "⇒", "=>", "≡", "<=>", "\\equiv", "≠", "#", "/=", "∈", "\\in", "∉", "\\notin",
"⊂", "\\subset", "⊆", "\\subseteq", "⊃", "\\supset", "⊇", "\\supseteq", "∩", "\\cap", "\\intersect", "∪", "\\cup", "\\union", "⊎", "\\uplus", "≤", "<=", "=<", "\\leq", "≥", ">=", "\\geq", "≪", "\\ll", "≫", "\\gg", "%", "\\mod", "×", "\\X", "\\times", "÷", "\\div", "⋅", "\\cdot", "⊕", "(+)", "\\oplus", "⊖", "(-)", "\\ominus", "⊗", "(X)", "\\otimes", "⊘", "(/)", "\\oslash", "⊙", "(.)", "\\odot", "∘", "\\o", "\\circ", "◯", "\\bigcirc", "•", "\\bullet", "⋆", "\\star", "≺", "\\prec", "≼", "\\preceq", "≻", "\\succ",
"≽", "\\succeq", "⊏", "\\sqsubset", "⊑", "\\sqsubseteq", "⊐", "\\sqsupset", "⊒", "\\sqsupseteq", "⊓", "\\sqcap", "⊔", "\\sqcup", "≍", "\\asymp", "≀", "\\wr", "≅", "\\cong", "∝", "\\propto", "≈", "\\approx", "≐", "\\doteq", "≃", "\\simeq", "～", "\\sim", "⊢", "|-", "⊣", "-|", "⊨", "|=", "⫤", "=|", "‖", "||", "toToken method of Position called with bad object", "nil", ", ", "BIG_ENDIAN", "LITTLE_ENDIAN", "Index out of bounds", "CharReader.backspace trying to move past beginning of line", "Error reading file: ",
"Bad blocking token for a MULTI or NULL token", "prevInfixInner true for first item on line", "prevInfixInner true, but token to left not aligned", "^", "Replacement preconditions do not hold", "Action must be non-null", "UTF-8", "=<>[]()+-\\/#.|~!$&*:\'^", "The last byte in src ", "0", "\n", "Error trying to write to output file ", ".\n    Perhaps there is a file-system problem.", "Error trying to close output file ", "CommentToken constructor called with illegal subtype", "Bad token rsubtype in CommentToken.ProcessComments",
"NORMAL", "LINE", "BEGIN_OVERRUN", "END_OVERRUN", "OVERRUN", "ONE_LINE", "BEGIN_MULTI", "MULTI", "NULL", "PAR", ",\t subtype |-> ", ",\t rsubtype |-> ", ",\t delim |-> ", "\n       ", "IGNORE", "REPLACE", "REPORT", "*)", " :: ", " :: column: ", " outcolumn: ", "Bad token type found.", " (*", " ", "(*", "\\*", "Bad CommentToken subtype found.", "TLATeX unrecoverable error:", " -- ", "TLATeX unrecoverable error: -- ", "Assertion failure", "Failure of assertion: ", "You have discovered a bug in TLATeX.", "Send the following information and the",
"input file to the current maintainer(s).", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ~!@#$%^&*()_-+={}[]|:;<,>.?/`\'0123456789", ";", "begin", "do", "either", "or", "then", "else", "elsif", "_", "\\_", "ASSUMPTION", "{\\ASSUMPTION}", "AXIOM", "{\\AXIOM}", "BOOLEAN", "{\\BOOLEAN}", "CASE", "{\\CASE}", "CONSTANT", "{\\CONSTANT}", "CONSTANTS", "{\\CONSTANTS}", "EXCEPT", "{\\EXCEPT}", "EXTENDS", "{\\EXTENDS}", "FALSE", "{\\FALSE}", "IF", "{\\IF}", "INSTANCE", "{\\INSTANCE}", "LOCAL", "{\\LOCAL}", "{\\MODULE}",
"OTHER", "{\\OTHER}", "{\\STRING}", "THEOREM", "{\\THEOREM}", "TRUE", "{\\TRUE}", "VARIABLE", "{\\VARIABLE}", "VARIABLES", "{\\VARIABLES}", "WITH", "{\\WITH}", "BY", "{\\BY}", "OBVIOUS", "{\\OBVIOUS}", "HAVE", "{\\HAVE}", "QED", "{\\QED}", "TAKE", "{\\TAKE}", "DEF", "{\\DEF}", "HIDE", "{\\HIDE}", "RECURSIVE", "{\\RECURSIVE}", "USE", "{\\USE}", "DEFINE", "{\\DEFINE}", "PROOF", "{\\PROOF}", "WITNESS", "{\\WITNESS}", "PICK", "{\\PICK}", "DEFS", "{\\DEFS}", "SUFFICES", "{\\SUFFICES}", "NEW", "{\\NEW}", "LAMBDA",
"{\\LAMBDA}", "STATE", "{\\STATE}", "ACTION", "{\\ACTION}", "TEMPORAL", "{\\TEMPORAL}", "ONLY", "{\\ONLY}", "OMITTED", "{\\OMITTED}", "LEMMA", "{\\LEMMA}", "PROPOSITION", "{\\PROPOSITION}", "COROLLARY", "{\\COROLLARY}", "{\\WF}", "{\\SF}", "{\\rangle}", "]_", "[", "\\{", "{\\langle}", "\\}", "\\A\\,", "\\forall\\,", "\\E\\,", "\\exists\\,", "{\\AA}", "{\\EE}", "{\\lnot}", "{\\neg}", "{\\Diamond}", "CHOOSE", "{\\CHOOSE}", "ENABLED", "{\\ENABLED}", "UNCHANGED", "{\\UNCHANGED}", "SUBSET", "{\\SUBSET}", "UNION",
"{\\UNION}", "DOMAIN", "{\\DOMAIN}", "\\.{\'}", "^+", "\\.{\\mbox{}^+}", "^*", "\\.{\\mbox{}^*}", "^#", "\\.{\\mbox{}^{\\#}}", "\\.{\\implies}", "\\.{\\cdot}", "\\.{\\equiv}", "\\.{\\leadsto}", "\\.{\\whileop}", "\\.{\\subseteq}", "\\.{\\subset}", "\\.{\\supset}", "\\.{\\supseteq}", "\\.{\\ll}", "\\.{\\gg}", "\\", "\\.{\\,\\backslash\\,}", "\\.{\\cap}", "\\.{\\cup}", "\\.{\\land}", "\\.{\\lor}", "\\.{\\times}", "\\.{-}", "+", "\\.{+}", "\\.{*}", "/", "\\.{/}", "\\.{\\ct}", "|", "\\.{\\,|\\,}", "\\.{\\p@barbar}",
"&", "\\.{\\,\\&\\,}", "&&", "\\.{\\,\\&\\&\\,}", "++", "\\.{\\pp}", "--", "\\.{\\mm}", "**", "\\.{\\stst}", "//", "\\.{\\slsl}", "^^", "\\.{\\ct\\ct}", "\\.{\\vdash}", "\\.{\\models}", "\\.{\\dashv}", "\\.{\\eqdash}", "<:", "\\.{\\ltcolon}", ":>", "\\.{\\colongt}", ":=", "\\.{:=}", "::=", "\\.{::=}", "\\.{\\oplus}", "\\.{\\ominus}", "\\.{\\odot}", "\\.{\\oslash}", "(\\X)", "\\.{\\otimes}", "\\.{\\uplus}", "\\.{\\sqcap}", "\\.{\\sqcup}", "\\.{\\div}", "\\.{\\star}", "\\.{\\circ}", "\\.{\\bigcirc}", "\\.{\\bullet}",
"\\.{\\in}", "\\.{\\notin}", "=", "\\.{=}", "\\.{\\neq}", "\\.{<}", "\\.{>}", "\\.{\\leq}", "\\.{\\geq}", "\\.{\\prec}", "\\.{\\succ}", "\\.{\\preceq}", "\\.{\\succeq}", "\\.{\\sim}", "\\.{\\simeq}", "\\.{\\approx}", "\\.{\\doteq}", "\\.{\\asymp}", "\\.{\\sqsubset}", "\\.{\\sqsupset}", "\\.{\\sqsubseteq}", "\\.{\\sqsupseteq}", "\\.{\\propto}", ":", "\\.{:}", "\\.{\\rightarrow}", "\\.{\\mapsto}", "\\.{\\leftarrow}", "\\.{\\defeq}", "ELSE", "\\.{\\ELSE}", "THEN", "\\.{\\THEN}", "LET", "\\.{\\LET}", "IN", "\\.{\\IN}",
"{\\Box}", "::", "{\\coloncolon}", "ASSUME", "{\\ASSUME}", "PROVE", "{\\PROVE}", "..", "\\.{\\dotdot}", "...", "\\.{\\dots}", "$", "\\.{\\,\\$\\,}", "$$", "\\.{\\,\\$\\$\\,}", "?", "\\.{?}", "??", "\\.{\\,??\\,}", "\\.{\\%}", "%%", "\\.{\\,\\%\\%\\,}", "##", "\\.{\\,\\#\\#\\,}", "@@", "\\.{\\,@@\\,}", "!!", "\\.{!!}", "\\.{\\wr}", "\\.{\\cong}", "!", "{\\bang}", ",", ",\\,", "-.", "\\.{-\\!.\\,}", "fair", "{\\p@fair}", "{\\p@algorithm}", "{\\p@mmfair}", "{\\p@mmalgorithm}", "{\\p@semicolon}", "assert", "{\\p@assert}",
"await", "{\\p@await}", "{\\p@begin}", "end", "{\\p@end}", "call", "{\\p@call}", "define", "{\\p@define}", "{\\p@do}", "{\\p@either}", "{\\p@or}", "goto", "{\\p@goto}", "if", "{\\p@if}", "{\\p@then}", "{\\p@else}", "{\\p@elsif}", "macro", "{\\p@macro}", "print", "{\\p@print}", "procedure", "{\\p@procedure}", "process", "{\\p@process}", "return", "{\\p@return}", "skip", "{\\p@skip}", "variable", "{\\p@variable}", "variables", "{\\p@variables}", "while", "{\\p@while}", "with", "{\\p@with}", "when", "{\\p@when}",
"{\\p@lparen}", "{\\p@rparen}", "{\\p@lbrace}", "{\\p@rbrace}", "\u0000", "\u0001", "\u0002", "\u0003", "tlaplus", "TLAPLUS ", "pre"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
function Long_eq(a, b) {
    return a.hi === b.hi && a.lo === b.lo;
}
function Long_ne(a, b) {
    return a.hi !== b.hi || a.lo !== b.lo;
}
function Long_gt(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x > y;
    }
    return (a.lo & 1) > (b.lo & 1);
}
function Long_ge(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x >= y;
    }
    return (a.lo & 1) >= (b.lo & 1);
}
function Long_lt(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x < y;
    }
    return (a.lo & 1) < (b.lo & 1);
}
function Long_le(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x <= y;
    }
    return (a.lo & 1) <= (b.lo & 1);
}
function Long_add(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo + b.lo);
    } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo + b_lolo | 0;
    var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_inc(a) {
    var lo = a.lo + 1 | 0;
    var hi = a.hi;
    if (lo === 0) {
        hi = hi + 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_dec(a) {
    var lo = a.lo - 1 | 0;
    var hi = a.hi;
    if (lo ===  -1) {
        hi = hi - 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_neg(a) {
    return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
}
function Long_sub(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo - b.lo);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo - b_lolo | 0;
    var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_compare(a, b) {
    var r = a.hi - b.hi;
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
function Long_mul(a, b) {
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = 0;
    var lohi = 0;
    var hilo = 0;
    var hihi = 0;
    lolo = a_lolo * b_lolo | 0;
    lohi = lolo >>> 16;
    lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    hihi = hilo >>> 16;
    hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
    var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
    return positive ? result : Long_neg(result);
}
function Long_div(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_divRem(a, b))[0];
}
function Long_udiv(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[0];
}
function Long_rem(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
    }
    return (Long_divRem(a, b))[1];
}
function Long_urem(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[1];
}
function Long_divRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
}
function Long_udivRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return [q, a];
}
function Long_shiftLeft16(a) {
    return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
}
function Long_shiftRight16(a) {
    return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
}
function Long_and(a, b) {
    return new Long(a.lo & b.lo, a.hi & b.hi);
}
function Long_or(a, b) {
    return new Long(a.lo | b.lo, a.hi | b.hi);
}
function Long_xor(a, b) {
    return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
}
function Long_shl(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
    } else if (b === 32) {
        return new Long(0, a.lo);
    } else {
        return new Long(0, a.lo << b - 32);
    }
}
function Long_shr(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
    } else if (b === 32) {
        return new Long(a.hi, a.hi >> 31);
    } else {
        return new Long(a.hi >> b - 32, a.hi >> 31);
    }
}
function Long_shru(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
    } else if (b === 32) {
        return new Long(a.hi, 0);
    } else {
        return new Long(a.hi >>> b - 32, 0);
    }
}
function LongInt(lo, hi, sup) {
    this.lo = lo;
    this.hi = hi;
    this.sup = sup;
}
function LongInt_mul(a, b) {
    var a_lolo = (a.lo & 0xFFFF) * b | 0;
    var a_lohi = (a.lo >>> 16) * b | 0;
    var a_hilo = (a.hi & 0xFFFF) * b | 0;
    var a_hihi = (a.hi >>> 16) * b | 0;
    var sup = a.sup * b | 0;
    a_lohi = a_lohi + (a_lolo >>> 16) | 0;
    a_hilo = a_hilo + (a_lohi >>> 16) | 0;
    a_hihi = a_hihi + (a_hilo >>> 16) | 0;
    sup = sup + (a_hihi >>> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup & 0xFFFF;
}
function LongInt_sub(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo - b_lolo | 0;
    a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_add(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo + b_lolo | 0;
    a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_inc(a) {
    a.lo = a.lo + 1 | 0;
    if (a.lo === 0) {
        a.hi = a.hi + 1 | 0;
        if (a.hi === 0) {
            a.sup = a.sup + 1 & 0xFFFF;
        }
    }
}
function LongInt_dec(a) {
    a.lo = a.lo - 1 | 0;
    if (a.lo ===  -1) {
        a.hi = a.hi - 1 | 0;
        if (a.hi ===  -1) {
            a.sup = a.sup - 1 & 0xFFFF;
        }
    }
}
function LongInt_ucompare(a, b) {
    var r = a.sup - b.sup;
    if (r !== 0) {
        return r;
    }
    r = (a.hi >>> 1) - (b.hi >>> 1);
    if (r !== 0) {
        return r;
    }
    r = (a.hi & 1) - (b.hi & 1);
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function LongInt_numOfLeadingZeroBits(a) {
    var n = 0;
    var d = 16;
    while (d > 0) {
        if (a >>> d !== 0) {
            a >>>= d;
            n = n + d | 0;
        }
        d = d / 2 | 0;
    }
    return 31 - n;
}
function LongInt_shl(a, b) {
    if (b === 0) {
        return;
    }
    if (b < 32) {
        a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
        a.hi = a.lo >>> 32 - b | a.hi << b;
        a.lo <<= b;
    } else if (b === 32) {
        a.sup = a.hi & 0xFFFF;
        a.hi = a.lo;
        a.lo = 0;
    } else if (b < 64) {
        a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
        a.hi = a.lo << b;
        a.lo = 0;
    } else if (b === 64) {
        a.sup = a.lo & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    } else {
        a.sup = a.lo << b - 64 & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    }
}
function LongInt_shr(a, b) {
    if (b === 0) {
        return;
    }
    if (b === 32) {
        a.lo = a.hi;
        a.hi = a.sup;
        a.sup = 0;
    } else if (b < 32) {
        a.lo = a.lo >>> b | a.hi << 32 - b;
        a.hi = a.hi >>> b | a.sup << 32 - b;
        a.sup >>>= b;
    } else if (b === 64) {
        a.lo = a.sup;
        a.hi = 0;
        a.sup = 0;
    } else if (b < 64) {
        a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
        a.hi = a.sup >>> b - 32;
        a.sup = 0;
    } else {
        a.lo = a.sup >>> b - 64;
        a.hi = 0;
        a.sup = 0;
    }
}
function LongInt_copy(a) {
    return new LongInt(a.lo, a.hi, a.sup);
}
function LongInt_div(a, b) {
    var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
    var sz = 1 + (bits / 16 | 0);
    var dividentBits = bits % 16;
    LongInt_shl(b, bits);
    LongInt_shl(a, dividentBits);
    var q = new LongInt(0, 0, 0);
    while (sz-- > 0) {
        LongInt_shl(q, 16);
        var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
        var digitB = b.hi >>> 16;
        var digit = digitA / digitB | 0;
        var t = LongInt_copy(b);
        LongInt_mul(t, digit);
        if (LongInt_ucompare(t, a) >= 0) {
            while (LongInt_ucompare(t, a) > 0) {
                LongInt_sub(t, b);
                 --digit;
            }
        } else {
            while (true) {
                var nextT = LongInt_copy(t);
                LongInt_add(nextT, b);
                if (LongInt_ucompare(nextT, a) > 0) {
                    break;
                }
                t = nextT;
                ++digit;
            }
        }
        LongInt_sub(a, t);
        q.lo |= digit;
        LongInt_shl(a, 16);
    }
    LongInt_shr(a, bits + 16);
    return q;
}
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (var i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : function(result) {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    var result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        var self = this;
        var callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(function() {
            self.resume();
        });
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
function $rt_suspending() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
}
function $rt_resuming() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
}
function $rt_suspend(callback) {
    return ($rt_nativeThread()).suspend(callback);
}
function $rt_startThread(runner, callback) {
    (new TeaVMThread(runner)).start(callback);
}
var $rt_currentNativeThread = null;
function $rt_nativeThread() {
    return $rt_currentNativeThread;
}
function $rt_invalidPointer() {
    throw new Error("Invalid recorded state");
}
main = $rt_mainStarter(t_Client_main);
(function() {
    var c;
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
})();
})();

//# sourceMappingURL=classes.js.map