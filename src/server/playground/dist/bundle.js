var S, d, O, x, R, W, B, U = {}, $ = [], Y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function k(e, t) {
    for(var n in t)e[n] = t[n];
    return e;
}
function V(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
}
function Z(e, t, n) {
    var o, l, _, s = {};
    for(_ in t)_ == "key" ? o = t[_] : _ == "ref" ? l = t[_] : s[_] = t[_];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? S.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for(_ in e.defaultProps)s[_] === void 0 && (s[_] = e.defaultProps[_]);
    return P(e, s, o, l, null);
}
function P(e, t, n, o, l) {
    var _ = {
        type: e,
        props: t,
        key: n,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: l ?? ++O
    };
    return l == null && d.vnode != null && d.vnode(_), _;
}
function N(e) {
    return e.children;
}
function A(e, t) {
    this.props = e, this.context = t;
}
function C(e, t) {
    if (t == null) return e.__ ? C(e.__, e.__.__k.indexOf(e) + 1) : null;
    for(var n; t < e.__k.length; t++)if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
    return typeof e.type == "function" ? C(e) : null;
}
function j(e) {
    var t, n;
    if ((e = e.__) != null && e.__c != null) {
        for(e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)if ((n = e.__k[t]) != null && n.__e != null) {
            e.__e = e.__c.base = n.__e;
            break;
        }
        return j(e);
    }
}
function L(e) {
    (!e.__d && (e.__d = !0) && x.push(e) && !D.__r++ || W !== d.debounceRendering) && ((W = d.debounceRendering) || R)(D);
}
function D() {
    for(var e; D.__r = x.length;)e = x.sort(function(t, n) {
        return t.__v.__b - n.__v.__b;
    }), x = [], e.some(function(t) {
        var n, o, l, _, s, u;
        t.__d && (s = (_ = (n = t).__v).__e, (u = n.__P) && (o = [], (l = k({}, _)).__v = _.__v + 1, M(u, _, l, n.__n, u.ownerSVGElement !== void 0, _.__h != null ? [
            s
        ] : null, o, s ?? C(_), _.__h), J(o, _), _.__e != s && j(_)));
    });
}
function z(e, t, n, o, l, _, s, u, p, a) {
    var r, v, c, i, f, b, h, y = o && o.__k || $, m = y.length;
    for(n.__k = [], r = 0; r < t.length; r++)if ((i = n.__k[r] = (i = t[r]) == null || typeof i == "boolean" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" ? P(null, i, null, null, i) : Array.isArray(i) ? P(N, {
        children: i
    }, null, null, null) : i.__b > 0 ? P(i.type, i.props, i.key, null, i.__v) : i) != null) {
        if (i.__ = n, i.__b = n.__b + 1, (c = y[r]) === null || c && i.key == c.key && i.type === c.type) y[r] = void 0;
        else for(v = 0; v < m; v++){
            if ((c = y[v]) && i.key == c.key && i.type === c.type) {
                y[v] = void 0;
                break;
            }
            c = null;
        }
        M(e, i, c = c || U, l, _, s, u, p, a), f = i.__e, (v = i.ref) && c.ref != v && (h || (h = []), c.ref && h.push(c.ref, null, i), h.push(v, i.__c || f, i)), f != null ? (b == null && (b = f), typeof i.type == "function" && i.__k === c.__k ? i.__d = p = G(i, p, e) : p = q(e, i, c, y, f, p), typeof n.type == "function" && (n.__d = p)) : p && c.__e == p && p.parentNode != e && (p = C(c));
    }
    for(n.__e = b, r = m; r--;)y[r] != null && (typeof n.type == "function" && y[r].__e != null && y[r].__e == n.__d && (n.__d = C(o, r + 1)), Q(y[r], y[r]));
    if (h) for(r = 0; r < h.length; r++)K(h[r], h[++r], h[++r]);
}
function G(e, t, n) {
    for(var o, l = e.__k, _ = 0; l && _ < l.length; _++)(o = l[_]) && (o.__ = e, t = typeof o.type == "function" ? G(o, t, n) : q(n, o, o, l, o.__e, t));
    return t;
}
function q(e, t, n, o, l, _) {
    var s, u, p;
    if (t.__d !== void 0) s = t.__d, t.__d = void 0;
    else if (n == null || l != _ || l.parentNode == null) e: if (_ == null || _.parentNode !== e) e.appendChild(l), s = null;
    else {
        for(u = _, p = 0; (u = u.nextSibling) && p < o.length; p += 2)if (u == l) break e;
        e.insertBefore(l, _), s = _;
    }
    return s !== void 0 ? s : l.nextSibling;
}
function te(e, t, n, o, l) {
    var _;
    for(_ in n)_ === "children" || _ === "key" || _ in t || T(e, _, null, n[_], o);
    for(_ in t)l && typeof t[_] != "function" || _ === "children" || _ === "key" || _ === "value" || _ === "checked" || n[_] === t[_] || T(e, _, t[_], n[_], o);
}
function F(e, t, n) {
    t[0] === "-" ? e.setProperty(t, n) : e[t] = n == null ? "" : typeof n != "number" || Y.test(t) ? n : n + "px";
}
function T(e, t, n, o, l) {
    var _;
    e: if (t === "style") if (typeof n == "string") e.style.cssText = n;
    else {
        if (typeof o == "string" && (e.style.cssText = o = ""), o) for(t in o)n && t in n || F(e.style, t, "");
        if (n) for(t in n)o && n[t] === o[t] || F(e.style, t, n[t]);
    }
    else if (t[0] === "o" && t[1] === "n") _ = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + _] = n, n ? o || e.addEventListener(t, _ ? I : H, _) : e.removeEventListener(t, _ ? I : H, _);
    else if (t !== "dangerouslySetInnerHTML") {
        if (l) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t in e) try {
            e[t] = n ?? "";
            break e;
        } catch  {}
        typeof n == "function" || (n != null && (n !== !1 || t[0] === "a" && t[1] === "r") ? e.setAttribute(t, n) : e.removeAttribute(t));
    }
}
function H(e) {
    this.l[e.type + !1](d.event ? d.event(e) : e);
}
function I(e) {
    this.l[e.type + !0](d.event ? d.event(e) : e);
}
function M(e, t, n, o, l, _, s, u, p) {
    var a, r, v, c, i, f, b, h, y, m, w, g = t.type;
    if (t.constructor !== void 0) return null;
    n.__h != null && (p = n.__h, u = t.__e = n.__e, t.__h = null, _ = [
        u
    ]), (a = d.__b) && a(t);
    try {
        e: if (typeof g == "function") {
            if (h = t.props, y = (a = g.contextType) && o[a.__c], m = a ? y ? y.props.value : a.__ : o, n.__c ? b = (r = t.__c = n.__c).__ = r.__E : ("prototype" in g && g.prototype.render ? t.__c = r = new g(h, m) : (t.__c = r = new A(h, m), r.constructor = g, r.render = _e), y && y.sub(r), r.props = h, r.state || (r.state = {}), r.context = m, r.__n = o, v = r.__d = !0, r.__h = []), r.__s == null && (r.__s = r.state), g.getDerivedStateFromProps != null && (r.__s == r.state && (r.__s = k({}, r.__s)), k(r.__s, g.getDerivedStateFromProps(h, r.__s))), c = r.props, i = r.state, v) g.getDerivedStateFromProps == null && r.componentWillMount != null && r.componentWillMount(), r.componentDidMount != null && r.__h.push(r.componentDidMount);
            else {
                if (g.getDerivedStateFromProps == null && h !== c && r.componentWillReceiveProps != null && r.componentWillReceiveProps(h, m), !r.__e && r.shouldComponentUpdate != null && r.shouldComponentUpdate(h, r.__s, m) === !1 || t.__v === n.__v) {
                    r.props = h, r.state = r.__s, t.__v !== n.__v && (r.__d = !1), r.__v = t, t.__e = n.__e, t.__k = n.__k, t.__k.forEach(function(E) {
                        E && (E.__ = t);
                    }), r.__h.length && s.push(r);
                    break e;
                }
                r.componentWillUpdate != null && r.componentWillUpdate(h, r.__s, m), r.componentDidUpdate != null && r.__h.push(function() {
                    r.componentDidUpdate(c, i, f);
                });
            }
            r.context = m, r.props = h, r.state = r.__s, (a = d.__r) && a(t), r.__d = !1, r.__v = t, r.__P = e, a = r.render(r.props, r.state, r.context), r.state = r.__s, r.getChildContext != null && (o = k(k({}, o), r.getChildContext())), v || r.getSnapshotBeforeUpdate == null || (f = r.getSnapshotBeforeUpdate(c, i)), w = a != null && a.type === N && a.key == null ? a.props.children : a, z(e, Array.isArray(w) ? w : [
                w
            ], t, n, o, l, _, s, u, p), r.base = t.__e, t.__h = null, r.__h.length && s.push(r), b && (r.__E = r.__ = null), r.__e = !1;
        } else _ == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = ne(n.__e, t, n, o, l, _, s, p);
        (a = d.diffed) && a(t);
    } catch (E) {
        t.__v = null, (p || _ != null) && (t.__e = u, t.__h = !!p, _[_.indexOf(u)] = null), d.__e(E, t, n);
    }
}
function J(e, t) {
    d.__c && d.__c(t, e), e.some(function(n) {
        try {
            e = n.__h, n.__h = [], e.some(function(o) {
                o.call(n);
            });
        } catch (o) {
            d.__e(o, n.__v);
        }
    });
}
function ne(e, t, n, o, l, _, s, u) {
    var p, a, r, v = n.props, c = t.props, i = t.type, f = 0;
    if (i === "svg" && (l = !0), _ != null) {
        for(; f < _.length; f++)if ((p = _[f]) && (p === e || (i ? p.localName == i : p.nodeType == 3))) {
            e = p, _[f] = null;
            break;
        }
    }
    if (e == null) {
        if (i === null) return document.createTextNode(c);
        e = l ? document.createElementNS("http://www.w3.org/2000/svg", i) : document.createElement(i, c.is && c), _ = null, u = !1;
    }
    if (i === null) v === c || u && e.data === c || (e.data = c);
    else {
        if (_ = _ && S.call(e.childNodes), a = (v = n.props || U).dangerouslySetInnerHTML, r = c.dangerouslySetInnerHTML, !u) {
            if (_ != null) for(v = {}, f = 0; f < e.attributes.length; f++)v[e.attributes[f].name] = e.attributes[f].value;
            (r || a) && (r && (a && r.__html == a.__html || r.__html === e.innerHTML) || (e.innerHTML = r && r.__html || ""));
        }
        if (te(e, c, v, l, u), r) t.__k = [];
        else if (f = t.props.children, z(e, Array.isArray(f) ? f : [
            f
        ], t, n, o, l && i !== "foreignObject", _, s, _ ? _[0] : n.__k && C(n, 0), u), _ != null) for(f = _.length; f--;)_[f] != null && V(_[f]);
        u || ("value" in c && (f = c.value) !== void 0 && (f !== e.value || i === "progress" && !f) && T(e, "value", f, v.value, !1), "checked" in c && (f = c.checked) !== void 0 && f !== e.checked && T(e, "checked", f, v.checked, !1));
    }
    return e;
}
function K(e, t, n) {
    try {
        typeof e == "function" ? e(t) : e.current = t;
    } catch (o) {
        d.__e(o, n);
    }
}
function Q(e, t, n) {
    var o, l;
    if (d.unmount && d.unmount(e), (o = e.ref) && (o.current && o.current !== e.__e || K(o, null, t)), (o = e.__c) != null) {
        if (o.componentWillUnmount) try {
            o.componentWillUnmount();
        } catch (_) {
            d.__e(_, t);
        }
        o.base = o.__P = null;
    }
    if (o = e.__k) for(l = 0; l < o.length; l++)o[l] && Q(o[l], t, typeof e.type != "function");
    n || e.__e == null || V(e.__e), e.__e = e.__d = void 0;
}
function _e(e, t, n) {
    return this.constructor(e, n);
}
function re(e, t, n) {
    var o, l, _;
    d.__ && d.__(e, t), l = (o = typeof n == "function") ? null : n && n.__k || t.__k, _ = [], M(t, e = (!o && n || t).__k = Z(N, null, [
        e
    ]), l || U, U, t.ownerSVGElement !== void 0, !o && n ? [
        n
    ] : l ? null : t.firstChild ? S.call(t.childNodes) : null, _, !o && n ? n : l ? l.__e : t.firstChild, o), J(_, e);
}
function oe(e, t) {
    re(e, t, oe);
}
function se(e, t) {
    var n = {
        __c: t = "__cC" + B++,
        __: e,
        Consumer: function(o, l) {
            return o.children(l);
        },
        Provider: function(o) {
            var l, _;
            return this.getChildContext || (l = [], (_ = {})[t] = this, this.getChildContext = function() {
                return _;
            }, this.shouldComponentUpdate = function(s) {
                this.props.value !== s.value && l.some(L);
            }, this.sub = function(s) {
                l.push(s);
                var u = s.componentWillUnmount;
                s.componentWillUnmount = function() {
                    l.splice(l.indexOf(s), 1), u && u.call(s);
                };
            }), o.children;
        }
    };
    return n.Provider.__ = n.Consumer.contextType = n;
}
S = $.slice, d = {
    __e: function(e, t) {
        for(var n, o, l; t = t.__;)if ((n = t.__c) && !n.__) try {
            if ((o = n.constructor) && o.getDerivedStateFromError != null && (n.setState(o.getDerivedStateFromError(e)), l = n.__d), n.componentDidCatch != null && (n.componentDidCatch(e), l = n.__d), l) return n.__E = n;
        } catch (_) {
            e = _;
        }
        throw e;
    }
}, O = 0, A.prototype.setState = function(e, t) {
    var n;
    n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = k({}, this.state), typeof e == "function" && (e = e(k({}, n), this.props)), e && k(n, e), e != null && this.__v && (t && this.__h.push(t), L(this));
}, A.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), L(this));
}, A.prototype.render = N, x = [], R = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, D.__r = 0, B = 0;
var c, r, l, i = 0, h = [], H1 = d.__b, p = d.__r, d1 = d.diffed, y = d.__c, E = d.unmount;
function a(_, n) {
    d.__h && d.__h(r, _, i || n), i = 0;
    var t = r.__H || (r.__H = {
        __: [],
        __h: []
    });
    return _ >= t.__.length && t.__.push({}), t.__[_];
}
function F1(_) {
    return i = 1, q1(A1, _);
}
function q1(_, n, t) {
    var u = a(c++, 2);
    return u.t = _, u.__c || (u.__ = [
        t ? t(n) : A1(void 0, n),
        function(o) {
            var f = u.t(u.__[0], o);
            u.__[0] !== f && (u.__ = [
                f,
                u.__[1]
            ], u.__c.setState({}));
        }
    ], u.__c = r), u.__;
}
function T1(_, n) {
    var t = a(c++, 3);
    !d.__s && v(t.__H, n) && (t.__ = _, t.__H = n, r.__H.__h.push(t));
}
function V1(_) {
    return i = 5, g(function() {
        return {
            current: _
        };
    }, []);
}
function g(_, n) {
    var t = a(c++, 7);
    return v(t.__H, n) && (t.__ = _(), t.__H = n, t.__h = _), t.__;
}
function R1(_, n) {
    return i = 8, g(function() {
        return _;
    }, n);
}
function S1(_) {
    var n = r.context[_.__c], t = a(c++, 9);
    return t.c = _, n ? (t.__ == null && (t.__ = !0, n.sub(r)), n.props.value) : _.__;
}
function x1() {
    h.forEach(function(_) {
        if (_.__P) try {
            _.__H.__h.forEach(s), _.__H.__h.forEach(m), _.__H.__h = [];
        } catch (n) {
            _.__H.__h = [], d.__e(n, _.__v);
        }
    }), h = [];
}
d.__b = function(_) {
    r = null, H1 && H1(_);
}, d.__r = function(_) {
    p && p(_), c = 0;
    var n = (r = _.__c).__H;
    n && (n.__h.forEach(s), n.__h.forEach(m), n.__h = []);
}, d.diffed = function(_) {
    d1 && d1(_);
    var n = _.__c;
    n && n.__H && n.__H.__h.length && (h.push(n) !== 1 && l === d.requestAnimationFrame || ((l = d.requestAnimationFrame) || function(t) {
        var u, o = function() {
            clearTimeout(f), b && cancelAnimationFrame(u), setTimeout(t);
        }, f = setTimeout(o, 100);
        b && (u = requestAnimationFrame(o));
    })(x1)), r = null;
}, d.__c = function(_, n) {
    n.some(function(t) {
        try {
            t.__h.forEach(s), t.__h = t.__h.filter(function(u) {
                return !u.__ || m(u);
            });
        } catch (u) {
            n.some(function(o) {
                o.__h && (o.__h = []);
            }), n = [], d.__e(u, t.__v);
        }
    }), y && y(_, n);
}, d.unmount = function(_) {
    E && E(_);
    var n = _.__c;
    if (n && n.__H) try {
        n.__H.__.forEach(s);
    } catch (t) {
        d.__e(t, n.__v);
    }
};
var b = typeof requestAnimationFrame == "function";
function s(_) {
    var n = r;
    typeof _.__c == "function" && _.__c(), r = n;
}
function m(_) {
    var n = r;
    _.__c = _.__(), r = n;
}
function v(_, n) {
    return !_ || _.length !== n.length || n.some(function(t, u) {
        return t !== _[u];
    });
}
function A1(_, n) {
    return typeof n == "function" ? n(_) : n;
}
var ACTION_TYPE;
(function(ACTION_TYPE) {
    ACTION_TYPE["SET_SERVICE"] = "SET_SELECTED_SERVICE";
    ACTION_TYPE["SET_METHOD"] = "SET_SELECTED_METHOD";
    ACTION_TYPE["SET_SCHEMA"] = "SET_SCHEMA";
    ACTION_TYPE["SET_ACT"] = "SET_ACT";
    ACTION_TYPE["SET_POST_FIELDS"] = "SET_POST_FIELDS";
    ACTION_TYPE["RESET_POST_FIELDS"] = "RESET_POST_FIELDS";
    ACTION_TYPE["SET_GET_FIELDS"] = "SET_GET_FIELDS";
    ACTION_TYPE["RESET_GET_FIELDS"] = "RESET_GET_FIELDS";
    ACTION_TYPE["SET_FORM_DATA"] = "SET_FORM_DATA";
    ACTION_TYPE["SET_HEADER"] = "SET_HEADER";
    ACTION_TYPE["SET_HISTORY"] = "ADD_HISTORY";
    ACTION_TYPE["SET_RESPONSE"] = "SET_RESPONSE";
})(ACTION_TYPE || (ACTION_TYPE = {}));
const initialState = {
    service: "",
    method: "",
    schema: "",
    act: "",
    postFields: {},
    getFields: {},
    formData: {},
    headers: {
        Authorization: ""
    },
    history: [],
    response: null,
    setService: ()=>({}),
    setMethod: ()=>({}),
    setSchema: ()=>({}),
    setAct: ()=>({}),
    setPostFields: ()=>({}),
    resetPostFields: ()=>({}),
    setGetFields: ()=>({}),
    resetGetFields: ()=>({}),
    setFormData: ()=>({}),
    setHeader: ()=>({}),
    setHistory: ()=>({}),
    setResponse: ()=>({})
};
const LesanContext = se(initialState);
function lesanReducer(state, action) {
    const { type , payload  } = action;
    switch(type){
        case ACTION_TYPE.SET_SERVICE:
            {
                return {
                    ...state,
                    service: payload
                };
            }
        case ACTION_TYPE.SET_METHOD:
            {
                return {
                    ...state,
                    method: payload
                };
            }
        case ACTION_TYPE.SET_SCHEMA:
            {
                return {
                    ...state,
                    schema: payload
                };
            }
        case ACTION_TYPE.SET_ACT:
            {
                return {
                    ...state,
                    act: payload
                };
            }
        case ACTION_TYPE.SET_POST_FIELDS:
            {
                return {
                    ...state,
                    postFields: payload
                };
            }
        case ACTION_TYPE.RESET_POST_FIELDS:
            {
                return {
                    ...state,
                    postFields: {}
                };
            }
        case ACTION_TYPE.SET_GET_FIELDS:
            {
                return {
                    ...state,
                    getFields: payload
                };
            }
        case ACTION_TYPE.RESET_GET_FIELDS:
            {
                return {
                    ...state,
                    getFields: {}
                };
            }
        case ACTION_TYPE.SET_FORM_DATA:
            {
                return {
                    ...state,
                    formData: payload
                };
            }
        case ACTION_TYPE.SET_HEADER:
            {
                return {
                    ...state,
                    headers: payload
                };
            }
        case ACTION_TYPE.SET_HISTORY:
            {
                return {
                    ...state,
                    history: payload
                };
            }
        case ACTION_TYPE.SET_RESPONSE:
            {
                return {
                    ...state,
                    response: payload
                };
            }
        default:
            throw new Error(`Unhandled action type`);
    }
}
const LesanProvider = (props)=>{
    const [state, dispatch] = q1(lesanReducer, initialState);
    const setService = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_SERVICE,
            payload
        }), [
        dispatch
    ]);
    const setMethod = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_METHOD,
            payload
        }), [
        dispatch
    ]);
    const setSchema = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_SCHEMA,
            payload
        }), [
        dispatch
    ]);
    const setAct = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_ACT,
            payload
        }), [
        dispatch
    ]);
    const setPostFields = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_POST_FIELDS,
            payload
        }), [
        dispatch
    ]);
    const resetPostFields = R1((payload)=>dispatch({
            type: ACTION_TYPE.RESET_POST_FIELDS,
            payload
        }), [
        dispatch
    ]);
    const setGetFields = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_GET_FIELDS,
            payload
        }), [
        dispatch
    ]);
    const resetGetFields = R1((payload)=>dispatch({
            type: ACTION_TYPE.RESET_GET_FIELDS,
            payload
        }), [
        dispatch
    ]);
    const setFormData = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_FORM_DATA,
            payload
        }), [
        dispatch
    ]);
    const setHeader = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_HEADER,
            payload
        }), [
        dispatch
    ]);
    const setHistory = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_HISTORY,
            payload
        }), [
        dispatch
    ]);
    const setResponse = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_RESPONSE,
            payload
        }), [
        dispatch
    ]);
    const value = g(()=>({
            ...state,
            setService,
            setMethod,
            setSchema,
            setAct,
            setPostFields,
            resetPostFields,
            setGetFields,
            resetGetFields,
            setFormData,
            setHeader,
            setHistory,
            setResponse
        }), [
        state
    ]);
    return Z(LesanContext.Provider, {
        value: value,
        ...props
    });
};
const useLesan = ()=>{
    const context = S1(LesanContext);
    if (context === undefined) {
        console.warn(`useLesan must be used within a LesanProvider`);
    }
    return context;
};
const ManagedLesanContext = (props)=>{
    const { children  } = props;
    return Z(LesanProvider, null, children);
};
var ClassNames;
(function(ClassNames) {
    ClassNames["string"] = "cute-string";
    ClassNames["undefined"] = "cute-undefined";
    ClassNames["function"] = "cute-function";
    ClassNames["number"] = "cute-number";
    ClassNames["boolean"] = "cute-boolean";
    ClassNames["null"] = "cute-null";
    ClassNames["colon"] = "cute-colon";
    ClassNames["key"] = "cute-key";
})(ClassNames || (ClassNames = {}));
const pre = {
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial",
    fontSize: 15,
    lineHeight: "20px",
    display: "inline-block",
    borderRadius: 3,
    padding: "10px 15px",
    color: "#f8f8f2",
    textShadow: "1px 1px black",
    whiteSpace: 'pre-wrap'
};
const regEx = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
const syntaxHighlight = (json)=>{
    const jsonString = JSON.stringify(json, replacer, 2).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return jsonString.replace(regEx, (match)=>{
        let className = ClassNames.number;
        let text = match;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                className = ClassNames.key;
                text = text.replace(":", `<span class="${ClassNames.colon}">:</span>`);
            } else {
                if (match === "\"undefined\"") {
                    className = ClassNames.undefined;
                } else if (match === "\"[Function]\"") {
                    className = ClassNames.function;
                } else {
                    className = ClassNames.string;
                }
            }
        } else if (/true|false/.test(match)) {
            className = ClassNames.boolean;
        } else if (/null/.test(match)) {
            className = ClassNames.null;
        }
        return `<span class="${className}">${text}</span>`;
    });
};
const replacer = (_, value)=>{
    if (typeof value === "function") {
        return "[Function]";
    }
    if (typeof value === "undefined") {
        return "undefined";
    }
    return value;
};
const cutify = (json)=>{
    return syntaxHighlight(json).replace(/"/g, "");
};
const JSONViewer = ({ jsonData  })=>{
    const cutifiedJson = cutify(jsonData);
    return Z(N, null, Z("div", {
        class: "json-viewer-toolbar"
    }), Z("pre", {
        style: pre,
        dangerouslySetInnerHTML: {
            __html: cutifiedJson
        }
    }));
};
function History({ setFormFromHistory  }) {
    const { history , response , setHistory  } = useLesan();
    const [show, setShow] = F1("");
    return Z("div", {
        className: "history"
    }, history && history?.length > 0 ? Z("div", {
        className: ""
    }, Z("br", null), history.map((hi)=>Z("div", {
            className: "history-detail",
            key: hi.id
        }, Z("section", {
            className: "history-re"
        }, Z("span", {
            className: "history-re-title"
        }, "REQUEST"), Z("div", {
            className: "history-re-detail"
        }, Z("div", {
            className: "history-re-detail-title"
        }, Z("div", null, " ", Z(JSONViewer, {
            jsonData: hi.request.body.wants.model
        })), Z("span", null, "|"), Z("div", null, Z(JSONViewer, {
            jsonData: hi.request.body.wants.act
        }))), show === hi.id ? Z("button", {
            onClick: ()=>setShow(""),
            className: "history-re-detail-button"
        }, "Hide", Z("span", {
            className: "history-re-detail-button-icon"
        }, "–")) : Z("button", {
            onClick: ()=>setShow(hi.id),
            className: "history-re-detail-button"
        }, "Show", " ", Z("span", {
            className: "history-re-detail-button-icon"
        }, "+"))), Z("div", {
            className: "history-re-detail-complete",
            "data-show": show === hi.id
        }, " ", Z(JSONViewer, {
            jsonData: hi.request
        }))), Z("section", {
            className: "history-re history-response"
        }, Z("span", {
            className: "history-re-title"
        }, "RESPONSE"), Z("div", {
            className: "history-re-detail"
        }, Z("div", {
            className: "history-re-detail-title"
        }, Z("div", {
            className: "history-re-response-title"
        }, " ", Z("span", {
            className: "history-re-response-title-status"
        }, "success:"), Z("div", {
            className: "history-re-response-info"
        }, Z(JSONViewer, {
            jsonData: hi.response.success
        })))), Z("button", {
            onClick: ()=>setFormFromHistory(hi.request),
            className: "history-re-detail-button"
        }, "Use", " ", Z("span", {
            className: "history-re-detail-button-icon"
        }, "➜", " "))), Z("div", {
            className: "history-re-detail-complete",
            "data-show": show === hi.id
        }, " ", Z(JSONViewer, {
            jsonData: hi.response
        })))))) : Z("span", {
        className: "no-history"
    }, '"There is no history to display"'));
}
function Modal(props) {
    return Z("div", {
        className: "modal-overlay",
        onClick: props.toggle
    }, Z("div", {
        className: "modal-box",
        onClick: (e)=>e.stopPropagation()
    }, Z("span", {
        className: "modal-title"
    }, props.title), Z("div", {
        className: "modal-content"
    }, props.children)));
}
function Setting({ configUrl  }) {
    const { headers , setHeader  } = useLesan();
    const [urlAddress, setUrlAddress] = F1("");
    return Z("div", {
        className: "setting"
    }, Z("div", {
        className: "url"
    }, Z("p", {
        className: "url-title"
    }, "Set Url"), Z("div", {
        className: "url-detail"
    }, " ", Z("input", {
        className: "url-input",
        placeholder: "Set URL"
    }), Z("button", {
        className: "btn url-button"
    }, "Apply"))), Z("div", {
        className: "sidebar__section sidebar__section--headers"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "set headers"), Object.entries(headers).map(([objKey, objValue])=>Z("div", {
            className: "sidebar__input-double",
            key: objKey
        }, Z("input", {
            placeholder: objKey,
            id: objKey,
            value: objKey,
            name: objKey,
            onChange: (e)=>{
                objKey = e.target.value;
            }
        }), Z("input", {
            placeholder: objValue,
            id: objValue,
            value: objValue,
            name: objValue,
            onChange: (e)=>{
                objValue = e.target.value;
            }
        }), Z("button", {
            className: "btn btn--add",
            onClick: ()=>{
                setHeader({
                    ...headers,
                    [objKey]: objValue
                });
            }
        }, "add +")))));
}
function useModal() {
    const [isOpen, setisOpen] = F1(false);
    const toggleModal = ()=>{
        setisOpen(!isOpen);
    };
    return {
        isOpen,
        toggleModal
    };
}
const Page = ()=>{
    const { isOpen , toggleModal  } = useModal();
    const { act , formData , getFields , headers , history , method , postFields , response , schema , service , setService , setMethod , setSchema , setAct , setPostFields , setGetFields , setFormData , setHistory , setResponse , resetGetFields , resetPostFields  } = useLesan();
    const [active, setActive] = F1("");
    const [actsObj, setActsObj] = F1({});
    const [schemasObj, setSchemasObj] = F1({});
    const [urlAddress, setUrlAddress] = F1(window && window.location ? window.location.href : "http://localhost:1366");
    const formRef = V1(null);
    const configUrl = (address)=>{
        setUrlAddress(address);
        setService("");
        setMethod("");
        setSchema("");
        resetGetFields();
        resetPostFields();
        setFormData({});
        fetch(`${address}static/get/schemas`).then((value)=>{
            value.json().then(({ schemas , acts  })=>{
                setActsObj(acts);
                setSchemasObj(schemas);
            });
        });
    };
    const setFormFromHistory = (request)=>{
        setService(request.body.service);
        setMethod(request.body.contents);
        setSchema(request.body.wants.model);
        setAct(request.body.wants.act);
        const actObj = actsObj[request.body.service][request.body.contents][request.body.wants.model][request.body.wants.act]["validator"]["schema"];
        setGetFields(actObj["get"]["schema"]);
        setPostFields(actObj["set"]["schema"]);
        setResponse(null);
        toggleModal();
    };
    T1(()=>{
        configUrl(window.location.href);
    }, []);
    const uid = function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };
    const handleChange = (event)=>{
        const { name , value , type , alt  } = event.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? Number(value) : alt === "array" || alt === "boolean" ? JSON.parse(value) : value
        });
    };
    const deepen = (obj)=>{
        const result = {
            get: {},
            set: {}
        };
        for(const objectPath in obj){
            const parts = objectPath.split(".");
            let target = result;
            while(parts.length > 1){
                const part = parts.shift();
                target = target[part] = target[part] || {};
            }
            target[parts[0]] = obj[objectPath];
        }
        return result;
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const details = deepen(formData);
        const body = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: JSON.stringify({
                service: service,
                contents: method,
                wants: {
                    model: schema,
                    act: act
                },
                details
            })
        };
        const sendedRequest = await fetch(`${urlAddress}lesan`, body);
        const jsonSendedRequest = await sendedRequest.json();
        setResponse(jsonSendedRequest);
        setHistory([
            {
                request: {
                    ...body,
                    body: JSON.parse(body.body)
                },
                response: jsonSendedRequest,
                id: uid()
            },
            ...history
        ]);
    };
    const renderGetFields = (getField, keyName, margin)=>Z("div", {
            style: {
                marginLeft: `${margin + 10}px`
            }
        }, Z("div", {
            className: "sidebar__section-heading--subfields"
        }, keyName), Object.keys(getField["schema"]).map((item)=>getField["schema"][item].type === "enums" ? Z("div", {
                className: "input-cnt get-items",
                key: item
            }, Z("label", {
                htmlFor: item
            }, keyName, ".", item, ":"), Z("div", {
                className: "get-values"
            }, Z("span", {
                onClick: ()=>{
                    const copy = {
                        ...formData
                    };
                    delete copy[`get.${keyName}.${item}`];
                    setFormData(copy);
                }
            }), Z("span", {
                className: formData[`get.${keyName}.${item}`] === 0 ? "active" : "",
                onClick: ()=>{
                    setFormData({
                        ...formData,
                        [`get.${keyName}.${item}`]: 0
                    });
                }
            }, "0"), Z("span", {
                className: formData[`get.${keyName}.${item}`] === 1 ? "active" : "",
                onClick: ()=>{
                    setFormData({
                        ...formData,
                        [`get.${keyName}.${item}`]: 1
                    });
                }
            }, "1"))) : renderGetFields(getField["schema"][item], `${keyName}.${item}`, margin + 10)));
    const canShowContent = service && method && schema && postFields && getFields && act;
    const canShowSchema = service && method;
    const canShowAct = service && method && schema;
    return Z("div", {
        className: "cnt"
    }, Z("div", {
        className: "sidebar"
    }, Z("div", {
        className: "sections"
    }, Z("div", {
        className: "sidebar__section sidebar__section--services"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select services"), Z("select", {
        className: "sidebar__select",
        value: service,
        onChange: (event)=>{
            setService(event.target.value);
            setMethod("");
            setSchema("");
            resetGetFields();
            resetPostFields();
            setFormData({});
        }
    }, Z("option", {
        value: ""
    }), Object.keys(actsObj).map((service, index)=>Z("option", {
            key: index,
            value: service
        }, service)))), Z("div", {
        className: "sidebar__section sidebar__section--method"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select content"), Z("select", {
        className: "sidebar__select",
        value: method,
        onChange: (event)=>{
            setMethod(event.target.value);
            setSchema("");
            resetGetFields();
            resetPostFields();
            setFormData({});
        }
    }, Z("option", {
        value: ""
    }), Z("option", {
        value: "dynamic"
    }, "dynamic"), Z("option", {
        value: "static"
    }, "static"))), Z("div", {
        className: "sidebar__section sidebar__section--schema"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select schema"), Z("select", {
        className: "sidebar__select",
        disabled: !canShowSchema,
        value: canShowSchema ? schema : undefined,
        onChange: (event)=>{
            setSchema(event.target.value);
            resetGetFields();
            resetPostFields();
            setFormData({});
        }
    }, Z("option", {
        value: ""
    }), canShowSchema ? Object.keys(actsObj[service][method]).map((schema)=>Z("option", {
            value: schema
        }, schema)) : null)), Z("div", {
        className: "sidebar__section sidebar__section--act"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select action"), Z("select", {
        className: "sidebar__select",
        disabled: !canShowAct,
        value: canShowAct ? act : undefined,
        onChange: (event)=>{
            const actObj = actsObj[service][method][schema][event.target.value]["validator"]["schema"];
            formRef && formRef.current && formRef.current.reset();
            setAct(event.target.value);
            setGetFields(actObj["get"]["schema"]);
            setPostFields(actObj["set"]["schema"]);
            setFormData({});
        }
    }, Z("option", {
        value: ""
    }), canShowAct ? Object.keys(actsObj[service][method][schema]).map((schema)=>Z("option", {
            value: schema
        }, schema)) : null))), Z("div", {
        className: ""
    }, " ", Z("button", {
        className: "btn btn-modal",
        onClick: ()=>{
            setActive("History");
            toggleModal();
        }
    }, " ", "History", " "), Z("button", {
        className: "btn btn-modal btn-modal-2",
        onClick: ()=>{
            setActive("Setting");
            toggleModal();
        }
    }, "Setting"), Z("button", {
        className: "btn btn-modal btn-modal-3",
        onClick: ()=>{
            setActive("Graph");
            toggleModal();
        }
    }, "Graph"), Z("button", {
        className: "btn btn-modal btn-modal-4",
        onClick: ()=>{
            setActive("E2E Test");
            toggleModal();
        }
    }, "E2E Test"))), canShowContent && Z("div", {
        className: "sidebar sidebar--fields"
    }, Z("form", {
        ref: formRef,
        onSubmit: handleSubmit,
        className: "form--fields"
    }, Z("div", {
        className: "sidebar__section-heading sidebar__section-heading--fields"
    }, "SET fields"), Object.keys(postFields).map((item)=>Z("div", {
            className: "input-cnt",
            key: item
        }, Z("label", {
            htmlFor: item
        }, item, ":"), postFields[item]["type"] === "enums" ? Z("select", {
            className: "sidebar__select",
            value: formData[`set.${item}`],
            onChange: (event)=>{
                setFormData({
                    ...formData,
                    [`set.${item}`]: event.target.value
                });
            }
        }, Z("option", {
            value: ""
        }), Object.keys(postFields[item]["schema"]).map((schema)=>Z("option", {
                value: schema
            }, schema))) : Z("input", {
            placeholder: item,
            id: item,
            value: formData[`set.${item}`],
            name: `set.${item}`,
            type: postFields[item]["type"] === "number" ? "number" : "string",
            alt: postFields[item]["type"],
            onChange: handleChange
        }))), Z("div", {
        className: "sidebar__section-heading sidebar__section-heading--fields"
    }, "GET fields"), Object.keys(getFields).map((item)=>getFields[item].type === "enums" ? Z("div", {
            className: "input-cnt get-items"
        }, Z("label", {
            htmlFor: item
        }, item, ":"), Z("div", {
            className: "get-values"
        }, Z("span", {
            onClick: ()=>{
                const copy = {
                    ...formData
                };
                delete copy[`get.${item}`];
                setFormData(copy);
            }
        }), Z("span", {
            className: formData[`get.${item}`] === 0 ? "active" : "",
            onClick: ()=>{
                setFormData({
                    ...formData,
                    [`get.${item}`]: 0
                });
            }
        }, "0"), Z("span", {
            className: formData[`get.${item}`] === 1 ? "active" : "",
            onClick: ()=>{
                setFormData({
                    ...formData,
                    [`get.${item}`]: 1
                });
            }
        }, "1"))) : renderGetFields(getFields[item], item, 0)), Z("div", {
        className: "cnt--btn-send"
    }, Z("button", {
        className: "btn btn--send",
        type: "submit"
    }, "send")))), Z("div", {
        className: "response"
    }, response && Z("div", {
        class: "response-detail"
    }, Z("p", {
        className: "response-detail-title"
    }, "Response"), Z("div", {
        className: "response-detail-info"
    }, Z(JSONViewer, {
        jsonData: response
    }), response && response?.success === true ? Z("div", {
        className: "success"
    }) : Z("div", {
        className: "fail"
    }))), isOpen && Z(Modal, {
        toggle: toggleModal,
        title: active
    }, active === "History" ? Z(History, {
        setFormFromHistory: setFormFromHistory
    }) : active === "Setting" ? Z(Setting, {
        configUrl: configUrl
    }) : "")));
};
oe(Z(ManagedLesanContext, null, Z(Page, null)), document.getElementById("root"));
