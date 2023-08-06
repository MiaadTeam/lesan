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
    ACTION_TYPE["SET_TABS_DATA"] = "SET_TABS_DATA";
    ACTION_TYPE["DELETE_ITEM_HISTORY"] = "DELETE_ITEM_HISTORY";
    ACTION_TYPE["SET_ACTS_OBJ"] = "SET_ACTS_OBJ";
    ACTION_TYPE["SET_SCHEMAS_OBJ"] = "SET_SCHEMAS_OBJ";
    ACTION_TYPE["SET_E2E_FORMS"] = "SET_E2E_FORMS";
    ACTION_TYPE["ADD_E2E_FORM"] = "ADD_E2E_FORM";
    ACTION_TYPE["OPEN_MODAL"] = "OPEN_MODAL";
    ACTION_TYPE["SET_ACTIVE_TAB"] = "SET_ACTIVE_TAB";
    ACTION_TYPE["ADD_TAB"] = "ADD_TAB";
    ACTION_TYPE["CLOSE_TAB"] = "CLOSE_TAB";
})(ACTION_TYPE || (ACTION_TYPE = {}));
var MODAL_TYPES;
(function(MODAL_TYPES) {
    MODAL_TYPES["HISTORY"] = "HISTORY";
    MODAL_TYPES["DOCUMENT"] = "DOCUMENT";
    MODAL_TYPES["SETTING"] = "SETTING";
    MODAL_TYPES["E2E_TEST"] = "E2E TEST";
    MODAL_TYPES["SCHEMA"] = "SCHEMA";
})(MODAL_TYPES || (MODAL_TYPES = {}));
const uid = ()=>Date.now().toString(36) + Math.random().toString(36).substr(2);
const tabInitial = {
    tabsData: [
        {
            service: "",
            method: "",
            schema: "",
            act: "",
            postFields: {},
            getFields: {},
            formData: {},
            response: null
        }
    ],
    activeTab: 0,
    setActiveTab: ()=>({}),
    addTab: ()=>({}),
    closeTab: ()=>({}),
    setTabsData: ()=>({})
};
const schemaInitial = {
    schemasObj: {},
    actsObj: {},
    setService: ()=>({}),
    setMethod: ()=>({}),
    setSchema: ()=>({}),
    setAct: ()=>({}),
    setActsObj: ()=>({}),
    setSchemasObj: ()=>({}),
    setPostFields: ()=>({}),
    resetPostFields: ()=>({}),
    setGetFields: ()=>({}),
    resetGetFields: ()=>({}),
    setFormData: ()=>({}),
    setResponse: ()=>({})
};
const historyInitial = {
    history: [],
    deleteItemHistory: ()=>({}),
    setHistory: ()=>({})
};
const headerInitial = {
    headers: {
        Authorization: ""
    },
    setHeader: ()=>({})
};
const e2eFirstInp = ()=>({
        id: uid(),
        bodyHeaders: `
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": ""
  },
  "body": {
    "service": "main",
    "contents": "dynamic",
    "wants": {
    "model": "",
    "act": ""
  },
    "details": {
      "get": {
      },
    "set": {
    }
  }
}
}
            `,
        repeat: 1,
        captures: []
    });
const e2eInitial = {
    e2eForms: [
        e2eFirstInp()
    ],
    setE2eForms: ()=>({}),
    addE2eForm: ()=>({})
};
const modalInitial = {
    modal: null,
    setModal: ()=>({})
};
const initialState = {
    ...tabInitial,
    ...schemaInitial,
    ...historyInitial,
    ...headerInitial,
    ...e2eInitial,
    ...modalInitial
};
function lesanReducer(state, action) {
    const { type , payload  } = action;
    switch(type){
        case ACTION_TYPE.SET_SERVICE:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    service: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.SET_METHOD:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    method: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.SET_SCHEMA:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    schema: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.SET_ACT:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    act: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.SET_POST_FIELDS:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    postFields: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.RESET_POST_FIELDS:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload] = {
                    ...copyTabsData[payload],
                    postFields: {}
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.SET_GET_FIELDS:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    getFields: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.RESET_GET_FIELDS:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload] = {
                    ...copyTabsData[payload],
                    getFields: {}
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.SET_FORM_DATA:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    formData: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
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
        case ACTION_TYPE.SET_TABS_DATA:
            {
                return {
                    ...state,
                    tabsData: payload
                };
            }
        case ACTION_TYPE.SET_RESPONSE:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData[payload.index] = {
                    ...copyTabsData[payload.index],
                    response: payload.data
                };
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ]
                };
            }
        case ACTION_TYPE.ADD_TAB:
            {
                return {
                    ...state,
                    tabsData: [
                        ...state.tabsData,
                        {
                            service: "",
                            method: "",
                            schema: "",
                            act: "",
                            postFields: {},
                            getFields: {},
                            formData: {},
                            response: null
                        }
                    ],
                    activeTab: state.tabsData.length
                };
            }
        case ACTION_TYPE.SET_ACTIVE_TAB:
            {
                return {
                    ...state,
                    activeTab: payload
                };
            }
        case ACTION_TYPE.CLOSE_TAB:
            {
                const copyTabsData = [
                    ...state.tabsData
                ];
                copyTabsData.length > 1 && copyTabsData.splice(payload, 1);
                return {
                    ...state,
                    tabsData: [
                        ...copyTabsData
                    ],
                    activeTab: copyTabsData.length >= 1 && state.activeTab >= payload && state.activeTab !== 0 ? state.activeTab - 1 : state.activeTab
                };
            }
        case ACTION_TYPE.DELETE_ITEM_HISTORY:
            {
                return {
                    ...state,
                    history: state.history.slice(0, payload).concat(state.history.slice(payload + 1))
                };
            }
        case ACTION_TYPE.SET_ACTS_OBJ:
            {
                return {
                    ...state,
                    actsObj: payload
                };
            }
        case ACTION_TYPE.SET_SCHEMAS_OBJ:
            {
                return {
                    ...state,
                    schemasObj: payload
                };
            }
        case ACTION_TYPE.SET_E2E_FORMS:
            {
                return {
                    ...state,
                    e2eForms: payload
                };
            }
        case ACTION_TYPE.ADD_E2E_FORM:
            {
                return {
                    ...state,
                    e2eForms: [
                        ...state.e2eForms,
                        payload
                    ]
                };
            }
        case ACTION_TYPE.OPEN_MODAL:
            {
                return {
                    ...state,
                    modal: payload
                };
            }
        default:
            throw new Error(`Unhandled action type`);
    }
}
const LesanContext = se(initialState);
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
    const setActiveTab = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_ACTIVE_TAB,
            payload
        }), [
        dispatch
    ]);
    const addTab = R1((payload)=>dispatch({
            type: ACTION_TYPE.ADD_TAB,
            payload
        }), [
        dispatch
    ]);
    const closeTab = R1((payload)=>dispatch({
            type: ACTION_TYPE.CLOSE_TAB,
            payload
        }), [
        dispatch
    ]);
    const deleteItemHistory = R1((payload)=>dispatch({
            type: ACTION_TYPE.DELETE_ITEM_HISTORY,
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
    const setTabsData = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_TABS_DATA,
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
    const setSchemasObj = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_SCHEMAS_OBJ,
            payload
        }), [
        dispatch
    ]);
    const setActsObj = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_ACTS_OBJ,
            payload
        }), [
        dispatch
    ]);
    const setE2eForms = R1((payload)=>dispatch({
            type: ACTION_TYPE.SET_E2E_FORMS,
            payload
        }), [
        dispatch
    ]);
    const addE2eForm = R1((payload)=>dispatch({
            type: ACTION_TYPE.ADD_E2E_FORM,
            payload
        }), [
        dispatch
    ]);
    const setModal = R1((payload)=>dispatch({
            type: ACTION_TYPE.OPEN_MODAL,
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
            setTabsData,
            setResponse,
            setActsObj,
            setSchemasObj,
            setActiveTab,
            addTab,
            closeTab,
            deleteItemHistory,
            setE2eForms,
            addE2eForm,
            setModal
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
const createNestedObjectsFromKeys = (obj)=>{
    const result = {
        get: {},
        set: {}
    };
    for(const objectPath in obj){
        if (obj[objectPath] || obj[objectPath] === 0) {
            const parts = objectPath.split(".");
            let target = result;
            while(parts.length > 1){
                const part = parts.shift();
                target[part] = target[part] || {};
                target = target[part];
            }
            target[parts[0]] = obj[objectPath];
        }
    }
    return result;
};
const generateFormData = (formData, returnFormData, keyname)=>{
    for(const key in formData){
        typeof formData[key] === "object" ? generateFormData(formData[key], returnFormData, keyname ? `${keyname}.${key}` : key) : returnFormData[`${keyname}.${key}`] = formData[key];
    }
    return returnFormData;
};
function AddIcon() {
    return Z("svg", {
        width: "25px",
        height: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z",
        fill: "lightcoral"
    }), Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
function BackIcon() {
    return Z("svg", {
        width: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-miterlimit": "10",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        d: "M8.57 10.7701L7 9.19012L8.57 7.62012",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
const DeleteIcon = ()=>{
    return Z("svg", {
        width: "25px",
        viewBox: "-0.5 0 25 25",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z",
        stroke: "bisque",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        id: "Vector",
        d: "M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }));
};
function DownIcon() {
    return Z("svg", {
        width: "25px",
        viewBox: "-0.5 0 25 25",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z",
        stroke: "bisque",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        d: "M16 10.99L13.13 14.05C12.9858 14.2058 12.811 14.3298 12.6166 14.4148C12.4221 14.4998 12.2122 14.5437 12 14.5437C11.7878 14.5437 11.5779 14.4998 11.3834 14.4148C11.189 14.3298 11.0142 14.2058 10.87 14.05L8 10.99",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }));
}
function ExportIcon() {
    return Z("svg", {
        width: "25px",
        height: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M11.2501 7.06066L8.03039 10.2803L6.96973 9.21967L12.0001 4.18934L17.0304 9.21967L15.9697 10.2803L12.7501 7.06066L12.7501 16.5L11.2501 16.5L11.2501 7.06066Z",
        fill: "lightcoral"
    }), Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
function HelpIcon() {
    return Z("svg", {
        width: "25px",
        height: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
function ImportIcon() {
    return Z("svg", {
        width: "25px",
        height: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M12.75 13.9393L15.9697 10.7197L17.0303 11.7803L12 16.8107L6.96967 11.7803L8.03033 10.7197L11.25 13.9393L11.25 4.5L12.75 4.5L12.75 13.9393Z",
        fill: "lightcoral"
    }), Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
function RunIcon() {
    return Z("svg", {
        width: "25px",
        height: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M13.8876 9.9348C14.9625 10.8117 15.5 11.2501 15.5 12C15.5 12.7499 14.9625 13.1883 13.8876 14.0652C13.5909 14.3073 13.2966 14.5352 13.0261 14.7251C12.7888 14.8917 12.5201 15.064 12.2419 15.2332C11.1695 15.8853 10.6333 16.2114 10.1524 15.8504C9.6715 15.4894 9.62779 14.7336 9.54038 13.2222C9.51566 12.7947 9.5 12.3757 9.5 12C9.5 11.6243 9.51566 11.2053 9.54038 10.7778C9.62779 9.26636 9.6715 8.51061 10.1524 8.1496C10.6333 7.78859 11.1695 8.11466 12.2419 8.76679C12.5201 8.93597 12.7888 9.10831 13.0261 9.27492C13.2966 9.46483 13.5909 9.69274 13.8876 9.9348Z",
        stroke: "lightcoral",
        "stroke-width": "2"
    }), Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
function UpIcon() {
    return Z("svg", {
        width: "25px",
        viewBox: "-0.5 0 25 25",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z",
        stroke: "bisque",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        d: "M8 13.8599L10.87 10.8C11.0125 10.6416 11.1868 10.5149 11.3815 10.4282C11.5761 10.3415 11.7869 10.2966 12 10.2966C12.2131 10.2966 12.4239 10.3415 12.6185 10.4282C12.8132 10.5149 12.9875 10.6416 13.13 10.8L16 13.8599",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }));
}
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
    return Z(N, null, Z("pre", {
        style: pre,
        dangerouslySetInnerHTML: {
            __html: cutifiedJson
        }
    }));
};
function E2E({ baseUrl  }) {
    const { e2eForms , setE2eForms  } = useLesan();
    const handleMove = (fromIndex, toIndex)=>{
        if (fromIndex === 0 && toIndex <= 0) {
            return;
        } else {
            const element = e2eForms[fromIndex];
            e2eForms.splice(fromIndex, 1);
            e2eForms.splice(toIndex, 0, element);
            setE2eForms([
                ...e2eForms
            ]);
        }
    };
    const handleDelete = (fromIndex)=>{
        e2eForms[fromIndex];
        e2eForms.splice(fromIndex, 1);
        setE2eForms([
            ...e2eForms
        ]);
    };
    const [view, setView] = F1("e2e");
    const [results, setResults] = F1([]);
    const exportForm = ()=>{
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(e2eForms))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "Configdata.json";
        link.click();
    };
    const jsonFileUpload = (e)=>{
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e)=>{
            const data = JSON.parse(e.target.result);
            setE2eForms(data);
        };
    };
    const exportResults = ()=>{
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(results))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
        link.click();
    };
    const lesanAPI = async ({ baseUrl , options  })=>{
        const fetching = await fetch(`${baseUrl}lesan`, options);
        return await fetching.json();
    };
    const replaceCaptureString = (obj, variablesSet)=>{
        for(const key in obj){
            if (typeof obj[key] === "object") {
                replaceCaptureString(obj[key], variablesSet);
            }
            const value = obj[key];
            if (typeof value === "string" && value.includes("{")) {
                const openBraceIndexes = [];
                for(let index = 0; index < value.length; index++){
                    if (value[index] === "{") {
                        openBraceIndexes.push(index);
                    }
                }
                const closeBraceIndexes = [];
                for(let index = 0; index < value.length; index++){
                    if (value[index] === "}") {
                        closeBraceIndexes.push(index);
                    }
                }
                const variablesName = openBraceIndexes.map((openBrace, index)=>{
                    return value.slice(openBrace + 1, closeBraceIndexes[index]);
                });
                variablesName.forEach((variableName)=>{
                    for (const setValue of variablesSet){
                        if (setValue.key === variableName) {
                            obj[key] = obj[key].replace(`{${variableName}}`, setValue.value);
                        }
                    }
                });
            }
        }
    };
    const runE2eTest = async ()=>{
        const parsedCaptures = new Set();
        for await (const e2eForm of e2eForms){
            const parsedHeaderBody = JSON.parse(e2eForm.bodyHeaders);
            replaceCaptureString(parsedHeaderBody, parsedCaptures);
            const body = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...parsedHeaderBody.headers
                },
                body: JSON.stringify(parsedHeaderBody.body)
            };
            let jsonSendedRequest;
            for(let repeat = 0; repeat < e2eForm.repeat; repeat++){
                jsonSendedRequest = await lesanAPI({
                    baseUrl: baseUrl,
                    options: body
                });
                setResults((results)=>[
                        ...results,
                        {
                            id: uid(),
                            request: {
                                ...body,
                                body: parsedHeaderBody.body
                            },
                            response: jsonSendedRequest
                        }
                    ]);
            }
            const captures = [
                ...e2eForm.captures
            ].filter((capture)=>capture.key && capture.value);
            const parsedCapuresValue = captures.map((capture)=>{
                const parts = capture.value.split("[");
                const value = [];
                parts.forEach((part)=>{
                    let slicedPart = part.slice(0, part.indexOf("]"));
                    if (!isNaN(Number(slicedPart))) {
                        slicedPart = Number(slicedPart);
                    }
                    value.push(slicedPart);
                });
                value.shift();
                return {
                    key: capture.key,
                    value
                };
            });
            parsedCapuresValue.forEach((capture)=>{
                if (capture.value.length > 0) {
                    let getedValue = jsonSendedRequest;
                    capture.value.forEach((capValue)=>{
                        getedValue = getedValue[capValue];
                    });
                    parsedCaptures.add({
                        key: capture.key,
                        value: getedValue
                    });
                }
            });
        }
    };
    const plusRepeatHandler = (index)=>{
        const copy = [
            ...e2eForms
        ];
        copy[index].repeat += 1;
        setE2eForms([
            ...copy
        ]);
    };
    const minesRepeatHandler = (index)=>{
        const copy = [
            ...e2eForms
        ];
        if (copy[index].repeat > 0) {
            copy[index].repeat -= 1;
        }
        setE2eForms([
            ...copy
        ]);
    };
    return Z("div", {
        className: "e2e modal-content"
    }, view === "result" ? Z(N, null, Z("br", null), Z("div", {
        className: "results"
    }, Z("div", {
        className: "results-buttons"
    }, Z("button", {
        className: "btn  e2e-back-button",
        onClick: ()=>{
            setResults([]);
            setView("e2e");
        }
    }, Z(BackIcon, null), Z("span", null, "Back")), Z("button", {
        className: "btn  e2e-back-button e2e-export_results-button",
        onClick: exportResults
    }, Z(ExportIcon, null), Z("span", null, "Export"))), results.map((re)=>Z("div", {
            key: re.id,
            className: "container-detail"
        }, Z("section", {
            className: "container-re "
        }, Z("span", {
            className: "container-re-title"
        }, "REQUEST"), Z(JSONViewer, {
            jsonData: re.request
        })), Z("section", {
            className: "container-re history-response"
        }, Z("span", {
            className: "container-re-title"
        }, "RESPONSE"), Z(JSONViewer, {
            jsonData: re.response
        })))))) : view === "e2e" ? Z(N, null, Z("div", {
        className: "sidebar__section sidebar__section--headers"
    }, e2eForms.map((e2eForm, idx)=>Z(N, null, Z("div", {
            className: "sidebar__input-double",
            key: e2eForm.id
        }, e2eForms.length > 1 && Z("div", {
            className: "e2e-move-buttons"
        }, Z("div", {
            className: "e2e-move-div",
            onClick: ()=>handleMove(idx, idx - 1)
        }, Z(UpIcon, null)), Z("div", {
            className: "e2e-move-div",
            onClick: ()=>handleMove(idx, idx + 1)
        }, Z(DownIcon, null)), Z("div", {
            className: "e2e-move-div e2e-move-close",
            onClick: ()=>handleDelete(idx)
        }, Z(DeleteIcon, null))), Z("div", {
            className: "sidebar__section-body-heading"
        }, Z("div", {
            className: "sidebar__section-heading"
        }, "set test body and headers"), Z("textarea", {
            placeholder: "please paste a request body here",
            value: e2eForm.bodyHeaders,
            name: `${e2eForm.id}-body`,
            rows: 18,
            onChange: (e)=>{
                const copy = [
                    ...e2eForms
                ];
                copy[idx].bodyHeaders = e.target.value;
                setE2eForms([
                    ...copy
                ]);
            }
        })), Z("div", {
            className: "sidebar__section-capture"
        }, Z("div", {
            className: "e2e_sidebar__section-heading"
        }, "set repeat time"), Z("div", {
            className: "repeat__number"
        }, Z("input", {
            placeholder: "set repeat number",
            value: e2eForm.repeat,
            name: `${e2eForm.id}-repeat`,
            type: "number",
            onChange: (e)=>{
                const copy = [
                    ...e2eForms
                ];
                copy[idx].repeat = e.target.value;
                setE2eForms([
                    ...copy
                ]);
            }
        }), Z("button", {
            className: "e2e-back-button e2e-export_results-button",
            onClick: ()=>plusRepeatHandler(idx)
        }, "+"), Z("button", {
            className: "e2e-back-button e2e-export_results-button",
            onClick: ()=>minesRepeatHandler(idx)
        }, "-")), Z("div", {
            className: "e2e_sidebar__section-heading"
        }, "capture variables"), Z("button", {
            className: "btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture ",
            onClick: ()=>{
                const copy = [
                    ...e2eForms
                ];
                copy[idx].captures.push({
                    key: "",
                    value: ""
                });
                setE2eForms([
                    ...copy
                ]);
            }
        }, "add capture variable item"), e2eForm.captures.map((capture, capId)=>Z(N, null, Z("div", {
                className: "sidebar__section-add-capture"
            }, Z("input", {
                placeholder: "set a variable name",
                value: capture.key,
                onChange: (e)=>{
                    const copy = [
                        ...e2eForms
                    ];
                    copy[idx].captures[capId].key = e.target.value;
                    setE2eForms([
                        ...copy
                    ]);
                }
            }), Z("input", {
                placeholder: "set a value for variable",
                value: capture.value,
                onChange: (e)=>{
                    const copy = [
                        ...e2eForms
                    ];
                    copy[idx].captures[capId].value = e.target.value;
                    setE2eForms([
                        ...copy
                    ]);
                }
            })), Z("hr", null)))))))), Z("div", {
        className: "results-buttons"
    }, Z("button", {
        className: "btn  e2e-back-button e2e-export_results-button",
        onClick: ()=>{
            setE2eForms([
                ...e2eForms,
                e2eFirstInp()
            ]);
        }
    }, Z(AddIcon, null), Z("span", null, "Add")), Z("button", {
        className: "btn e2e-back-button e2e-run-botton e2e-export_results-button",
        onClick: async ()=>{
            setView("result");
            await runE2eTest();
        }
    }, Z(RunIcon, null), Z("span", null, "Run E2E Test")), Z("input", {
        id: "actual-btn",
        type: "file",
        onChange: jsonFileUpload,
        hidden: true
    }), Z("label", {
        htmlFor: "actual-btn",
        className: "btn e2e-back-button e2e-export_results-button"
    }, Z(ImportIcon, null), Z("span", null, "Import")), Z("button", {
        className: "btn e2e-back-button e2e-export_results-button",
        onClick: exportForm
    }, Z(ExportIcon, null), Z("span", null, "Export")), Z("button", {
        onClick: ()=>setView("help"),
        className: "btn e2e-back-button e2e-export_results-button"
    }, Z(HelpIcon, null), Z("span", null, "Help")))) : view === "help" ? Z("div", {
        className: "help"
    }, " ", Z("button", {
        className: "btn  e2e-back-button",
        onClick: ()=>{
            setView("e2e");
        }
    }, Z(BackIcon, null), Z("span", null, "Back")), Z("section", {
        className: "e2e_help-content"
    }, Z("p", null, "With E2E Test, you can test the whole application by sending a sequence of HTTP requests."), Z("p", null, "In the image below, you can see the first view of the E2E test modal page, which contains a button bar at the top and two separate requests."), Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/829b3288-3d69-4fd0-a1fc-22d011b8d079",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    }), Z("hr", null), Z("p", null, "In the button bar, you have these buttons:", Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/4edd6034-d6b2-4de9-8c43-8f2fe511aa14",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    }), Z("ul", null, Z("li", null, "Add: This button adds one request section."), Z("li", null, "Run E2E Test: This button runs all requests and shows their results."), Z("li", null, "Import: This button stands for importing an E2E config in JSON format."), Z("li", null, "Export: This button stands for exporting an existing E2E config in JSON format."), Z("li", null, "Help: This button switches to the help of the E2E modal page."))), Z("hr", null), Z("div", null, Z("p", null, "Each request section have 2 side"), Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/fa9ceb35-21dd-493a-82cc-cd7391f5fc79",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    }), Z("hr", null), Z("section", {
        className: "e2e_help--section---right-side"
    }, Z("p", null, "The right side is a set of configurations for the repeat time of each request and capturing variables of the request response. In the Capture Variables section, you can add a pair of tuple inputs for the key name of the capture variable and its value. You can capture the value of a capture variable with braces syntax. For example, if you get back this response from a request:", Z("pre", null, "{\n", "  body: [\n", "    {\n", "      _id: 64c6839c50adc3cb65726934,\n", "      name: همدان,\n", "      enName: Hamedan,\n", "      abb: HM\n", "    }\n", "  ],\n", "  success: true\n", "  }\n", "}\n"), "You can capture _id with [body][0][_id] or for name: [body][0][name]."), Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/1cea1db3-44c2-49b5-8739-a9afa8a6e1fa",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    })), Z("hr", null), Z("section", {
        className: "e2e_help--section---right-side"
    }, Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/5c9899fa-8be6-42d1-8f4f-8fd965264645",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    }), Z("p", null, "The left side is a text area for writing headers and the body of the request in JSON format. In this text area, you can use a text parser to implement the captured value you captured before inside these symbols ", "{}", ".")), Z("hr", null), Z("p", null, "Also, we have some buttons on the top right side of each request section. With these buttons, you can move up and down and delete requests.", Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/900a5b98-3e7f-460a-a756-403ecaedcf86",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    }))), Z("hr", null), Z("div", null, Z("p", null, "After clicking on the Run E2E Test button, you can see the result of each test. Also, in the result view, you can export the results in JSON format."), Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/8c367965-a1b7-40b8-8638-60d2d0ea2609",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    })), Z("hr", null), Z("div", null, Z("p", null, "Additionally, you can go to the E2E Test modal page from the main page by clicking on the Test icon inside the response header section. This way, you can add a new test section and prepopulate the Header and Body text areas with the sent request from the main page.", Z("img", {
        src: "https://github.com/MiaadTeam/lesan/assets/6236123/74dc9e93-2b41-4840-afc1-f4e8e83c9889",
        alt: "full screen e2e",
        className: "e2e_help--fullscreen-img"
    }))))) : "");
}
function Dustbin() {
    return Z("svg", {
        id: "Layer_1",
        "data-name": "Layer 1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 105.7 122.88",
        width: 20
    }, Z("path", {
        fill: "white",
        d: "M30.46,14.57V5.22A5.18,5.18,0,0,1,32,1.55v0A5.19,5.19,0,0,1,35.68,0H70a5.22,5.22,0,0,1,3.67,1.53l0,0a5.22,5.22,0,0,1,1.53,3.67v9.35h27.08a3.36,3.36,0,0,1,3.38,3.37V29.58A3.38,3.38,0,0,1,102.32,33H98.51l-8.3,87.22a3,3,0,0,1-2.95,2.69H18.43a3,3,0,0,1-3-2.95L7.19,33H3.37A3.38,3.38,0,0,1,0,29.58V17.94a3.36,3.36,0,0,1,3.37-3.37Zm36.27,0V8.51H39v6.06ZM49.48,49.25a3.4,3.4,0,0,1,6.8,0v51.81a3.4,3.4,0,1,1-6.8,0V49.25ZM69.59,49a3.4,3.4,0,1,1,6.78.42L73,101.27a3.4,3.4,0,0,1-6.78-.43L69.59,49Zm-40.26.42A3.39,3.39,0,1,1,36.1,49l3.41,51.8a3.39,3.39,0,1,1-6.77.43L29.33,49.46ZM92.51,33.38H13.19l7.94,83.55H84.56l8-83.55Z"
    }));
}
const useNonInitialEffect = (effect, deps)=>{
    const initialRender = V1(true);
    T1(()=>{
        let effectReturns = ()=>{};
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            effectReturns = effect();
        }
        if (effectReturns && typeof effectReturns === "function") {
            return effectReturns;
        }
    }, deps);
};
function History({ setFormFromHistory  }) {
    const { history , setHistory , deleteItemHistory  } = useLesan();
    const [show, setShow] = F1("");
    useNonInitialEffect(()=>{
        localStorage.setItem("localHistory", JSON.stringify(history));
    }, [
        history
    ]);
    return Z("div", {
        className: "history modal-content"
    }, history && history?.length > 0 ? Z("div", {
        className: ""
    }, Z("br", null), history.map((hi, index)=>Z("div", {
            className: "container-detail",
            id: hi.id
        }, Z("section", {
            className: "container-re"
        }, Z("span", {
            className: "container-re-title"
        }, "REQUEST"), Z("div", {
            className: "container-re-detail"
        }, Z("div", {
            className: "container-re-detail-title"
        }, Z("div", null, " ", Z(JSONViewer, {
            jsonData: hi.request.body.wants.model
        })), Z("span", null, "|"), Z("div", null, Z(JSONViewer, {
            jsonData: hi.request.body.wants.act
        }))), Z("div", {
            className: "history-re-detail-date"
        }, hi.reqTime), show === hi.id ? Z("button", {
            onClick: ()=>setShow(""),
            className: "history-re-detail-button"
        }, "Hide", Z("span", {
            className: "history-re-detail-button-icon"
        }, "–")) : Z("button", {
            onClick: ()=>{
                setShow(hi.id);
                document.getElementById(hi.id)?.scrollIntoView();
            },
            className: "history-re-detail-button"
        }, "Show", " ", Z("span", {
            className: "history-re-detail-button-icon"
        }, "+"))), Z("div", {
            className: "history-re-detail-complete",
            "data-show": show === hi.id
        }, " ", Z(JSONViewer, {
            jsonData: hi.request
        }))), Z("section", {
            className: "container-re history-response"
        }, Z("div", {
            className: "history-re-title_delete",
            style: {
                position: "relative"
            },
            onClick: (event)=>{
                event.stopPropagation();
                deleteItemHistory(index);
            }
        }, Z("span", {
            className: "history-re-delete"
        }, "x"), Z("span", {
            className: "container-re-title"
        }, "RESPONSE")), Z("div", {
            className: "container-re-detail"
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
    }, '"There is no history to display"'), history && history.length > 0 ? Z("div", {
        className: "clear-history"
    }, Z("button", {
        className: "btn clear-history-button tooltip",
        onClick: ()=>{
            if (confirm("Clear All History?") == true) {
                setHistory([]);
            }
        }
    }, " ", Z(Dustbin, null), Z("span", {
        className: "tooltip-text"
    }, "Clear History"))) : "");
}
function DocumentIcon() {
    return Z("svg", {
        width: "25px",
        viewBox: "0 0 26 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
    }), Z("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("g", {
        id: "SVGRepo_iconCarrier"
    }, " ", Z("path", {
        d: "M4 6V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V9C20 7.34315 18.6569 6 17 6H4ZM4 6V5",
        stroke: "lightcoral",
        "stroke-width": "1.5"
    }), " ", Z("path", {
        d: "M18 6.00002V6.75002H18.75V6.00002H18ZM15.7172 2.32614L15.6111 1.58368L15.7172 2.32614ZM4.91959 3.86865L4.81353 3.12619H4.81353L4.91959 3.86865ZM5.07107 6.75002H18V5.25002H5.07107V6.75002ZM18.75 6.00002V4.30604H17.25V6.00002H18.75ZM15.6111 1.58368L4.81353 3.12619L5.02566 4.61111L15.8232 3.0686L15.6111 1.58368ZM4.81353 3.12619C3.91638 3.25435 3.25 4.0227 3.25 4.92895H4.75C4.75 4.76917 4.86749 4.63371 5.02566 4.61111L4.81353 3.12619ZM18.75 4.30604C18.75 2.63253 17.2678 1.34701 15.6111 1.58368L15.8232 3.0686C16.5763 2.96103 17.25 3.54535 17.25 4.30604H18.75ZM5.07107 5.25002C4.89375 5.25002 4.75 5.10627 4.75 4.92895H3.25C3.25 5.9347 4.06532 6.75002 5.07107 6.75002V5.25002Z",
        fill: "lightcoral"
    }), " ", Z("path", {
        opacity: "0.5",
        d: "M8 12H16",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), " ", Z("path", {
        opacity: "0.5",
        d: "M8 15.5H13.5",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), " "));
}
function HistoryIcon() {
    return Z("svg", {
        width: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        "fill-rule": "evenodd",
        opacity: "0.5",
        "clip-rule": "evenodd",
        d: "M5.07868 5.06891C8.87402 1.27893 15.0437 1.31923 18.8622 5.13778C22.6824 8.95797 22.7211 15.1313 18.9262 18.9262C15.1312 22.7211 8.95793 22.6824 5.13774 18.8622C2.87389 16.5984 1.93904 13.5099 2.34047 10.5812C2.39672 10.1708 2.775 9.88377 3.18537 9.94002C3.59575 9.99627 3.88282 10.3745 3.82658 10.7849C3.4866 13.2652 4.27782 15.881 6.1984 17.8016C9.44288 21.0461 14.6664 21.0646 17.8655 17.8655C21.0646 14.6664 21.046 9.44292 17.8015 6.19844C14.5587 2.95561 9.33889 2.93539 6.13935 6.12957L6.88705 6.13333C7.30126 6.13541 7.63535 6.47288 7.63327 6.88709C7.63119 7.3013 7.29372 7.63539 6.87951 7.63331L4.33396 7.62052C3.92269 7.61845 3.58981 7.28556 3.58774 6.8743L3.57495 4.32874C3.57286 3.91454 3.90696 3.57707 4.32117 3.57498C4.73538 3.5729 5.07285 3.907 5.07493 4.32121L5.07868 5.06891Z",
        fill: "lightcoral"
    }), Z("path", {
        d: "M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.5429 12.6036C11.3554 12.416 11.25 12.1617 11.25 11.8964V8C11.25 7.58579 11.5858 7.25 12 7.25Z",
        fill: "lightcoral"
    }));
}
function ReFetchIcon() {
    return Z("svg", {
        height: "25px",
        width: "25px",
        version: "1.1",
        id: "Layer_1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        fill: "#000000"
    }, Z("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
    }), Z("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("g", {
        id: "SVGRepo_iconCarrier"
    }, " ", Z("circle", {
        opacity: 0.34,
        style: "fill:lightcoral;",
        cx: "256.602",
        cy: "226.267",
        r: "171.059"
    }), " ", Z("path", {
        style: "fill:lightcoral",
        d: "M482.195,226.196C482.195,101.471,380.725,0,256.001,0S29.804,101.471,29.804,226.196 c0,7.409,6.007,13.416,13.416,13.416s13.416-6.008,13.416-13.416c0-109.93,89.434-199.363,199.363-199.363 s199.363,89.434,199.363,199.363c0,109.928-89.434,199.362-199.363,199.362h-23.276l33.282-37.255 c4.937-5.525,4.458-14.007-1.067-18.944c-5.525-4.937-14.008-4.457-18.944,1.068l-47.576,53.255c-7.788,8.718-7.788,21.866,0,30.584 l47.576,53.255c2.651,2.968,6.322,4.478,10.01,4.478c3.181,0,6.375-1.126,8.934-3.41c5.526-4.937,6.004-13.419,1.067-18.944 l-33.282-37.255h23.276C380.725,452.39,482.195,350.919,482.195,226.196z"
    }), " "));
}
function SchemaIcon() {
    return Z("svg", {
        fill: "lightcoral",
        height: "25px",
        width: "25px",
        viewBox: "0 0 436.668 436.668"
    }, Z("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
    }), Z("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("g", {
        id: "SVGRepo_iconCarrier"
    }, " ", Z("g", null, " ", Z("path", {
        opacity: 0.34,
        d: "M203.334,85.818v59.141c4.884-0.8,9.893-1.223,15-1.223s10.116,0.423,15,1.223V85.818c14.657-5.935,25-20.296,25-37.081 c0-22.092-17.909-40-40-40s-40,17.908-40,40C178.334,65.522,188.677,79.883,203.334,85.818z"
    }), " ", Z("path", {
        opacity: 0.34,
        d: "M70.642,204.021l56.242,18.274c1.539-10.139,4.732-19.74,9.292-28.525L79.912,175.49 c-1.115-15.774-11.577-30.049-27.541-35.236c-21.01-6.827-43.576,4.672-50.403,25.682c-6.827,21.01,4.672,43.576,25.682,50.403 C43.614,221.525,60.468,216.126,70.642,204.021z"
    }), " ", Z("path", {
        opacity: 0.34,
        d: "M152.577,301.224l-34.792,47.887c-15.346-3.813-32.156,1.725-42.022,15.305c-12.985,17.872-9.023,42.887,8.849,55.872 s42.887,9.023,55.872-8.849c9.866-13.579,9.939-31.277,1.571-44.694l34.772-47.86C167.8,314.333,159.616,308.347,152.577,301.224z"
    }), " ", Z("path", {
        opacity: 0.34,
        d: "M318.883,349.112l-34.792-47.887c-7.039,7.122-15.223,13.109-24.25,17.661l34.772,47.86 c-8.369,13.417-8.296,31.115,1.571,44.694c12.985,17.872,38,21.834,55.872,8.849s21.834-38,8.849-55.872 C351.038,350.837,334.229,345.298,318.883,349.112z"
    }), " ", Z("path", {
        opacity: 0.34,
        d: "M434.699,165.936c-6.827-21.01-29.393-32.508-50.403-25.682c-15.964,5.187-26.426,19.462-27.541,35.236l-56.263,18.281 c4.559,8.784,7.752,18.386,9.292,28.525l56.242-18.274c10.174,12.105,27.028,17.504,42.992,12.318 C430.028,209.512,441.526,186.946,434.699,165.936z"
    }), " ", Z("path", {
        d: "M280.834,236.237c0-34.462-28.037-62.5-62.5-62.5s-62.5,28.038-62.5,62.5s28.037,62.5,62.5,62.5 S280.834,270.7,280.834,236.237z"
    }), " "), " "));
}
function SettingIcon() {
    return Z("svg", {
        width: "25px",
        height: 25,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M3 9.10986V14.8799C3 16.9999 3 16.9999 5 18.3499L10.5 21.5299C11.33 22.0099 12.68 22.0099 13.5 21.5299L19 18.3499C21 16.9999 21 16.9999 21 14.8899V9.10986C21 6.99986 21 6.99986 19 5.64986L13.5 2.46986C12.68 1.98986 11.33 1.98986 10.5 2.46986L5 5.64986C3 6.99986 3 6.99986 3 9.10986Z",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: 0.34
    }), Z("path", {
        d: "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }));
}
function TestIcon() {
    return Z("svg", {
        width: "25px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        opacity: 0.5,
        d: "M9.74872 2.49415L18.1594 7.31987M9.74872 2.49415L2.65093 14.7455C1.31093 17.0584 2.10615 20.0159 4.42709 21.3513C6.74803 22.6867 9.7158 21.8942 11.0558 19.5813L12.5511 17.0003L14.1886 14.1738L15.902 11.2163L18.1594 7.31987M9.74872 2.49415L8.91283 2M18.1594 7.31987L19 7.80374",
        stroke: "lightcoral",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), Z("path", {
        d: "M15.9021 11.2164L13.3441 9.74463M14.1887 14.1739L9.98577 11.7557M12.5512 17.0004L9.93848 15.4972",
        stroke: "lightcpral",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), Z("path", {
        d: "M22 14.9166C22 16.0672 21.1046 16.9999 20 16.9999C18.8954 16.9999 18 16.0672 18 14.9166C18 14.1967 18.783 13.2358 19.3691 12.6174C19.7161 12.2512 20.2839 12.2512 20.6309 12.6174C21.217 13.2358 22 14.1967 22 14.9166Z",
        stroke: "lightcoral",
        "stroke-width": "1.5"
    }));
}
function CopyIcon() {
    return Z("svg", {
        width: "28px",
        fill: "white",
        viewBox: "0 0 32 32",
        style: "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;",
        version: "1.1"
    }, Z("path", {
        d: "M9.101,7l8.899,0c1.857,-0 3.637,0.737 4.95,2.05c1.313,1.313 2.05,3.093 2.05,4.95l0,8.899c0.953,-0.195 1.837,-0.665 2.536,-1.363c0.937,-0.938 1.464,-2.21 1.464,-3.536c0,-2.977 0,-7.023 0,-10c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-2.977,0 -7.023,0 -10,0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.698,0.699 -1.168,1.583 -1.363,2.536Z"
    }), Z("path", {
        d: "M23,14c0,-1.326 -0.527,-2.598 -1.464,-3.536c-0.938,-0.937 -2.21,-1.464 -3.536,-1.464c-2.977,0 -7.023,0 -10,0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.937,0.938 -1.464,2.21 -1.464,3.536c0,2.977 0,7.023 0,10c-0,1.326 0.527,2.598 1.464,3.536c0.938,0.937 2.21,1.464 3.536,1.464c2.977,-0 7.023,-0 10,-0c1.326,0 2.598,-0.527 3.536,-1.464c0.937,-0.938 1.464,-2.21 1.464,-3.536l0,-10Zm-15,10l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Z"
    }), Z("g", {
        id: "Icon"
    }));
}
function RunTestIcon() {
    return Z("svg", {
        width: 25,
        height: 25,
        fill: "#ffffff",
        version: "1.1",
        id: "Capa_1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 104.778 104.778"
    }, Z("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
    }), Z("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("g", {
        id: "SVGRepo_iconCarrier"
    }, " ", Z("g", null, " ", Z("path", {
        d: "M96.832,88.406l-23.02-39.908V21.959c4.385-1.595,7.447-5.797,7.447-10.618C81.26,5.089,76.176,0,69.928,0H42.6 c-6.251,0-11.334,5.089-11.334,11.341c0,4.815,3.07,9.017,7.457,10.618v26.55l-2.083,3.685V30.359c0-1.546-1.257-2.802-2.803-2.802 H8.723c-1.546,0-2.801,1.256-2.801,2.802v59.557c0,7.475,5.742,13.614,13.174,14.648c0.331,0.126,0.683,0.214,1.059,0.214h67.227 c4.79,0,8.433-1.762,10.282-4.979C99.503,96.598,99.208,92.543,96.832,88.406z M11.513,89.916v-6.079h8.254 c1.546,0,2.802-1.26,2.802-2.802c0-1.549-1.256-2.802-2.802-2.802h-8.254v-9.09h8.254c1.546,0,2.802-1.263,2.802-2.801 c0-1.555-1.256-2.802-2.802-2.802h-8.254v-9.097h8.254c1.546,0,2.802-1.256,2.802-2.801c0-1.55-1.256-2.803-2.802-2.803h-8.254 V33.149h19.512v56.767c0,5.095-4.375,9.248-9.756,9.248C15.883,99.17,11.513,95.011,11.513,89.916z M92.794,96.997 c-0.799,1.379-2.779,2.178-5.432,2.178H33.189c2.118-2.55,3.439-5.734,3.439-9.259V63.19c0.245-0.207,0.476-0.443,0.645-0.743 l6.679-11.82c0.236-0.422,0.364-0.898,0.364-1.379V19.776c0-1.415-1.048-2.603-2.449-2.78c-2.859-0.364-5.015-2.796-5.015-5.655 c0-3.161,2.571-5.738,5.731-5.738H69.91c3.165,0,5.734,2.577,5.734,5.738c0,2.859-2.155,5.286-5.017,5.655 c-1.401,0.178-2.446,1.365-2.446,2.78v29.472c0,0.493,0.122,0.977,0.374,1.401l23.396,40.559 C93.292,93.506,93.593,95.617,92.794,96.997z M76.466,79.53c0,5.412-4.377,9.794-9.801,9.794c-5.411,0-9.795-4.382-9.795-9.794 c0-5.406,4.384-9.795,9.795-9.795C72.089,69.735,76.466,74.124,76.466,79.53z M54.609,68.877c0,2.665-2.146,4.799-4.802,4.799 c-2.657,0-4.802-2.156-4.802-4.799c0-2.644,2.15-4.8,4.802-4.8C52.468,64.077,54.609,66.233,54.609,68.877z M58.195,58.048 c-1.672,0-3.015-1.341-3.015-3.01c0-1.667,1.343-3.009,3.015-3.009c1.663,0,3.015,1.343,3.015,3.009 C61.21,56.707,59.853,58.048,58.195,58.048z M49.534,86.315c0,1.669-1.352,3.009-3.016,3.009c-1.665,0-3.014-1.34-3.014-3.009 c0-1.663,1.349-3.016,3.014-3.016C48.182,83.3,49.534,84.652,49.534,86.315z M54.805,46.184c-2.185,0-3.956-1.771-3.956-3.957 c0-2.186,1.771-3.957,3.956-3.957c2.183,0,3.957,1.771,3.957,3.957C58.762,44.414,56.983,46.184,54.805,46.184z"
    }), " "), " "));
}
function SuccessIcon() {
    return Z("svg", {
        version: "1.1",
        viewBox: "0 0 29.756 29.756",
        style: "enable-background:new 0 0 29.756 29.756;"
    }, Z("path", {
        d: "M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752   c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z"
    }));
}
function useOutsideClick(callback) {
    const ref = V1(null);
    T1(()=>{
        const handleClick = (event)=>{
            if (ref.current && !ref.current.contains(event?.target)) {
                callback();
            }
        };
        document.addEventListener("click", handleClick);
        return ()=>{
            document.removeEventListener("click", handleClick);
        };
    }, [
        ref
    ]);
    return ref;
}
function ChevronDownIcon() {
    return Z("svg", {
        width: 25,
        height: 25,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
    }), Z("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("g", {
        id: "SVGRepo_iconCarrier"
    }, " ", Z("path", {
        d: "M6 9L12 15L18 9M12 9H12.01",
        stroke: "lightcoral",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), " "));
}
function Selected({ items , onClickItem , incomeActiveItem , canShow  }) {
    const [show, setShow] = F1(false);
    const [activeItem, setActiveItem] = F1("");
    T1(()=>{
        setActiveItem(incomeActiveItem || "");
    }, [
        incomeActiveItem
    ]);
    const handleClickOutside = ()=>{
        setShow(false);
    };
    const ref = useOutsideClick(handleClickOutside);
    return Z("div", null, Z("div", {
        className: "select",
        disabled: canShow
    }, Z("div", {
        className: `select--empty ${show === true ? "active-select--empty" : ""}`,
        ref: ref,
        onClick: ()=>setShow(!show)
    }, Z("div", {
        className: "select--empty--left-side"
    }, " ", Z("span", {
        className: `${activeItem ? "select-empty--left-side--clear" : "select-empty--left-side--clear--inactive"}`,
        onClick: (e)=>{
            setActiveItem("");
            onClickItem("");
            setShow(false);
            e.stopPropagation();
        }
    }, "x"), Z("span", null, activeItem)), Z(ChevronDownIcon, null)), show && Z("div", {
        className: "select--sub-buttons",
        "data-show": show
    }, items?.map((item, index)=>Z("div", {
            className: `option ${item === activeItem ? "active-option" : ""}`,
            onClick: ()=>{
                setActiveItem(item);
                onClickItem(item);
                setShow(false);
            }
        }, item)))));
}
const lesanAPI = ({ baseUrl , options  })=>fetch(`${baseUrl}lesan`, options).then((res)=>res.json());
const Main = ({ urlAddress  })=>{
    const { activeTab , tabsData , actsObj , headers , history , setService , setMethod , setSchema , setAct , setPostFields , setGetFields , setFormData , setHistory , setResponse , resetGetFields , resetPostFields , addE2eForm , setModal  } = useLesan();
    const [active, setActive] = F1(false);
    const changeGetValue = (value, keyname, getObj, returnObj)=>{
        for(const key in getObj){
            getObj[key].type === "enums" ? returnObj[`${keyname}.${key}`] = value : changeGetValue(value, `${keyname}.${key}`, getObj[key].schema, returnObj);
        }
        return returnObj;
    };
    const formRef = V1(null);
    const handleChange = (event)=>{
        const { name , value , type , alt  } = event.target;
        let updatedValue;
        if (type === "number") {
            updatedValue = Number(value);
        } else if (alt === "array" || alt === "boolean") {
            updatedValue = JSON.parse(value);
        } else {
            updatedValue = value;
        }
        setFormData({
            data: {
                ...tabsData[activeTab].formData,
                [name]: updatedValue
            },
            index: activeTab
        });
    };
    const renderGetFields = ({ getField , keyName , margin  })=>Z("div", {
            style: {
                marginLeft: `${margin + 1}px`
            },
            className: "sidebar__section_container",
            key: `${activeTab}.${keyName}`
        }, Z("div", {
            className: "sidebar__section-heading--subfields"
        }, keyName), Object.keys(getField["schema"]).map((item, index)=>getField["schema"][item].type === "enums" ? Z("div", {
                className: "input-cnt get-items",
                key: `${activeTab}.${item}-${index}`
            }, Z("label", {
                htmlFor: item
            }, keyName, ".", item, ":"), Z("div", {
                className: "get-values"
            }, Z("span", {
                onClick: ()=>{
                    const copy = {
                        ...tabsData[activeTab].formData
                    };
                    delete copy[`get.${keyName}.${item}`];
                    setFormData({
                        data: copy,
                        index: activeTab
                    });
                }
            }), Z("span", {
                className: tabsData[activeTab].formData[`get.${keyName}.${item}`] === 0 ? "active" : "",
                onClick: ()=>{
                    setFormData({
                        index: activeTab,
                        data: {
                            ...tabsData[activeTab].formData,
                            [`get.${keyName}.${item}`]: 0
                        }
                    });
                }
            }, "0"), Z("span", {
                className: tabsData[activeTab].formData[`get.${keyName}.${item}`] === 1 ? "active" : "",
                onClick: ()=>{
                    setFormData({
                        data: {
                            ...tabsData[activeTab].formData,
                            [`get.${keyName}.${item}`]: 1
                        },
                        index: activeTab
                    });
                }
            }, "1"))) : renderGetFields({
                getField: getField["schema"][item],
                keyName: `${keyName}.${item}`,
                margin: margin + 1
            })));
    const requestFunction = ()=>{
        const details = createNestedObjectsFromKeys(tabsData[activeTab].formData);
        const body = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: JSON.stringify({
                service: tabsData[activeTab].service,
                contents: tabsData[activeTab].method,
                wants: {
                    model: tabsData[activeTab].schema,
                    act: tabsData[activeTab].act
                },
                details
            })
        };
        return {
            body
        };
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const sendRequest = new Date().toLocaleDateString();
        setActive(true);
        setTimeout(()=>{
            setActive(false);
        }, 450);
        const jsonSendedRequest = await lesanAPI({
            baseUrl: urlAddress,
            options: requestFunction().body
        });
        setResponse({
            data: jsonSendedRequest,
            index: activeTab
        });
        const newHistory = [
            {
                request: {
                    ...requestFunction().body,
                    body: JSON.parse(requestFunction().body.body)
                },
                response: jsonSendedRequest,
                id: uid(),
                reqTime: sendRequest
            },
            ...history
        ];
        setHistory(newHistory);
        localStorage.setItem("localHistory", JSON.stringify(newHistory));
        localStorage.setItem("localTabsData", JSON.stringify(tabsData));
    };
    const canShowRequestFields = tabsData[activeTab].service && tabsData[activeTab].method && tabsData[activeTab].schema && tabsData[activeTab].postFields && tabsData[activeTab].getFields && tabsData[activeTab].act;
    const canShowSchema = tabsData[activeTab].service && tabsData[activeTab].method;
    const canShowAct = tabsData[activeTab].service && tabsData[activeTab].method && tabsData[activeTab].schema;
    const copyResponse = ()=>{
        const response = JSON.stringify(tabsData[activeTab].response);
        navigator.clipboard.writeText(response);
    };
    const copyRequest = ()=>{
        const request = requestFunction();
        console.log(request);
        request.body.body = JSON.parse(request.body.body);
        navigator.clipboard.writeText(JSON.stringify(request));
    };
    const runE2eRequest = ()=>{
        const request = requestFunction();
        request.body.body = JSON.parse(request.body.body);
        const { method , ...rest } = request.body;
        const newE2eForm = {
            id: uid(),
            bodyHeaders: JSON.stringify({
                ...rest
            }, null, 2),
            repeat: 1,
            captures: []
        };
        addE2eForm(newE2eForm);
        setModal(MODAL_TYPES.E2E_TEST);
    };
    const onClickItem = (item, type)=>{
        if (type === "service") {
            setService({
                data: item,
                index: activeTab
            });
            setMethod({
                data: "",
                index: activeTab
            });
            setSchema({
                data: "",
                index: activeTab
            });
        }
        if (type === "method") {
            setMethod({
                data: item,
                index: activeTab
            });
            setSchema({
                data: "",
                index: activeTab
            });
        }
        if (type === "schema") {
            setSchema({
                data: item,
                index: activeTab
            });
        }
        setAct({
            data: "",
            index: activeTab
        });
        resetGetFields(activeTab);
        resetPostFields(activeTab);
        if (type === "action") {
            const actObj = actsObj[tabsData[activeTab].service][tabsData[activeTab].method][tabsData[activeTab].schema][item]["validator"]["schema"];
            formRef && formRef.current && formRef.current.reset();
            setAct({
                data: item,
                index: activeTab
            });
            setGetFields({
                data: actObj["get"]["schema"],
                index: activeTab
            });
            setPostFields({
                data: actObj["set"]["schema"],
                index: activeTab
            });
        }
        setFormData({
            data: {},
            index: activeTab
        });
        localStorage.setItem("localTabsData", JSON.stringify(tabsData));
    };
    return Z(N, null, Z("div", {
        className: "sidebar"
    }, Z("div", {
        className: "sidebar__sections-wrapper"
    }, Z("div", {
        className: "sidebar__section sidebar__section--services"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select services"), Z(Selected, {
        onClickItem: (item)=>onClickItem(item, "service"),
        items: Object.keys(actsObj),
        incomeActiveItem: tabsData[activeTab].service ? tabsData[activeTab].service : null
    })), Z("div", {
        className: "sidebar__section sidebar__section--method"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select content"), Z(Selected, {
        onClickItem: (item)=>onClickItem(item, "method"),
        items: [
            "dynamic",
            "static"
        ],
        incomeActiveItem: tabsData[activeTab].method ? tabsData[activeTab].method : null
    })), Z("div", {
        className: "sidebar__section sidebar__section--schema"
    }, Z("div", {
        onClick: ()=>console.log(canShowSchema),
        className: "sidebar__section-heading"
    }, "select schema"), Z(Selected, {
        canShow: !canShowSchema,
        onClickItem: (item)=>onClickItem(item, "schema"),
        items: canShowSchema ? Object.keys(actsObj[tabsData[activeTab].service][tabsData[activeTab].method]) : [],
        incomeActiveItem: tabsData[activeTab].schema ? tabsData[activeTab].schema : null
    })), Z("div", {
        className: "sidebar__section sidebar__section--act"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select action"), Z(Selected, {
        canShow: !canShowAct,
        onClickItem: (item)=>onClickItem(item, "action"),
        items: canShowAct ? Object.keys(actsObj[tabsData[activeTab].service][tabsData[activeTab].method][tabsData[activeTab].schema]) : [],
        incomeActiveItem: tabsData[activeTab].act ? tabsData[activeTab].act : null
    })))), canShowRequestFields && Z("div", {
        className: "sidebar sidebar--fields"
    }, Z("form", {
        ref: formRef,
        onSubmit: handleSubmit,
        className: "form--fields"
    }, Z("div", {
        className: "sidebar__section-heading sidebar__section-heading--fields"
    }, "SET fields"), Object.keys(tabsData[activeTab].postFields).map((item)=>Z("div", {
            className: "input-cnt",
            key: `${activeTab}.${item}-----`
        }, Z("label", {
            htmlFor: item
        }, item, " :"), tabsData[activeTab].postFields[item]["type"] === "enums" ? Z(Selected, {
            onClickItem: (item)=>{
                setFormData({
                    data: {
                        ...tabsData[activeTab].formData,
                        [`set.${item}`]: item
                    },
                    index: activeTab
                });
                localStorage.setItem("localTabsData", JSON.stringify(tabsData));
            },
            items: Object.keys(tabsData[activeTab].postFields[item]["schema"])
        }) : Z("input", {
            className: "input",
            placeholder: item,
            id: item,
            value: tabsData[activeTab].formData[`set.${item}`],
            name: `set.${item}`,
            type: tabsData[activeTab].postFields[item]["type"] === "number" ? "number" : "string",
            alt: tabsData[activeTab].postFields[item]["type"],
            onChange: handleChange
        }))), Z("div", {
        className: "sidebar__section-heading sidebar__section-heading--fields"
    }, "GET fields"), Z("div", {
        className: "input-cnt get-items border-bottom"
    }, Z("label", null, "All Items :"), Z("div", {
        className: "get-values"
    }, Z("span", {
        onClick: ()=>{
            const copy = changeGetValue(null, "get", tabsData[activeTab].getFields, {});
            setFormData({
                data: {
                    ...tabsData[activeTab].formData,
                    ...copy
                },
                index: activeTab
            });
        }
    }), Z("span", {
        onClick: ()=>{
            const copy = changeGetValue(0, "get", tabsData[activeTab].getFields, {});
            setFormData({
                data: {
                    ...tabsData[activeTab].formData,
                    ...copy
                },
                index: activeTab
            });
        }
    }, "0"), Z("span", {
        onClick: ()=>{
            const copy = changeGetValue(1, "get", tabsData[activeTab].getFields, {});
            setFormData({
                data: {
                    ...tabsData[activeTab].formData,
                    ...copy
                },
                index: activeTab
            });
        }
    }, "1"))), Object.keys(tabsData[activeTab].getFields).map((item)=>tabsData[activeTab].getFields[item].type === "enums" ? Z("div", {
            className: "input-cnt get-items",
            key: `${activeTab}.${item}-------`
        }, Z("label", {
            htmlFor: item
        }, item, ":"), Z("div", {
            className: "get-values"
        }, Z("span", {
            onClick: ()=>{
                const copy = {
                    ...tabsData[activeTab].formData
                };
                delete copy[`get.${item}`];
                setFormData(copy);
            }
        }), Z("span", {
            className: tabsData[activeTab].formData[`get.${item}`] === 0 ? "active" : "",
            onClick: ()=>{
                setFormData({
                    data: {
                        ...tabsData[activeTab].formData,
                        [`get.${item}`]: 0
                    },
                    index: activeTab
                });
            }
        }, "0"), Z("span", {
            className: tabsData[activeTab].formData[`get.${item}`] === 1 ? "active" : "",
            onClick: ()=>{
                setFormData({
                    data: {
                        ...tabsData[activeTab].formData,
                        [`get.${item}`]: 1
                    },
                    index: activeTab
                });
            }
        }, "1"))) : renderGetFields({
            getField: tabsData[activeTab].getFields[item],
            keyName: item,
            margin: 0
        })), Z("div", {
        class: "wrapper"
    }, Z("button", {
        class: "send-button",
        "data-active": active
    }, Z("span", null, "Send"), Z("div", {
        class: "successe"
    }, Z(SuccessIcon, null)))))), Z("div", {
        className: "response"
    }, tabsData[activeTab].response && Z("div", {
        class: "response-detail"
    }, Z("div", {
        className: "response-detail-button_title"
    }, Z("p", {
        className: "response-detail-title"
    }, "Response"), Z("div", {
        className: "response-detail-buttons"
    }, Z("div", {
        className: "btn response-detail-button ",
        onClick: copyRequest
    }, Z(CopyIcon, null), Z("span", {
        className: "tooltip-text"
    }, "Copy Request")), Z("div", {
        className: "btn response-detail-button ",
        onClick: ()=>{
            copyResponse;
        }
    }, Z(CopyIcon, null), Z("span", {
        className: "tooltip-text"
    }, "Copy Response")), Z("div", {
        className: "btn response-detail-button ",
        onClick: ()=>{
            runE2eRequest();
        }
    }, Z(RunTestIcon, null), Z("span", {
        className: "tooltip-text"
    }, "Run E2E Test")))), Z("div", {
        className: "response-detail-info"
    }, Z(JSONViewer, {
        jsonData: tabsData[activeTab].response
    }), tabsData[activeTab].response && tabsData[activeTab].response?.success === true ? Z("div", {
        className: "success"
    }) : Z("div", {
        className: "fail"
    })))));
};
const Modal = (props)=>Z("div", {
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
function TickIcon() {
    return Z("svg", {
        width: 25,
        height: 25,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M7.75 11.9999L10.58 14.8299L16.25 9.16992",
        stroke: "lightcoral",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), " ", Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z",
        fill: "bisque"
    }));
}
function Setting({ configUrl  }) {
    const handleDelete = (fromIndex)=>{
        headersState[fromIndex];
        headersState.splice(fromIndex, 1);
        setHeadersState([
            ...headersState
        ]);
    };
    const { headers , setHeader  } = useLesan();
    const [headersState, setHeadersState] = F1([
        {
            key: "",
            value: ""
        }
    ]);
    const [urlAddress, setUrlAddress] = F1("");
    T1(()=>{
        const arrHeader = [];
        for(const key in headers){
            arrHeader.push({
                key,
                value: headers[key]
            });
        }
        setHeadersState(arrHeader);
    }, []);
    return Z("div", {
        className: "setting modal-content"
    }, Z("div", {
        className: "url"
    }, Z("p", {
        className: "url-title"
    }, "Fetch Config"), Z("div", {
        className: "url-detail"
    }, " ", Z("input", {
        className: "url-input",
        placeholder: "Set URL",
        onChange: (e)=>setUrlAddress(e.target.value)
    }), Z("button", {
        className: "setting_fetch-config--apply-button e2e-back-button e2e-add-capture ",
        onClick: ()=>configUrl(urlAddress)
    }, Z(TickIcon, null), Z("span", null, "Apply"), " "))), Z("div", {
        className: "sidebar__section sidebar__section--headers"
    }, Z("div", {
        className: "sidebar__section-heading setting_heading"
    }, " ", Z("span", {
        className: "setting_heading--title"
    }, "Set Headers"), Z("button", {
        className: "setting_add-header--button e2e-back-button e2e-export_results-button e2e-add-capture ",
        onClick: ()=>{
            setHeadersState([
                ...headersState,
                {
                    key: "",
                    value: ""
                }
            ]);
        }
    }, Z(AddIcon, null), Z("span", null, "Add Header"))), Z("div", {
        className: "setting_container--setheaders"
    }, Z("div", {
        className: "setting_set-headers"
    }, headersState?.map((hst, idx)=>Z("div", {
            key: `${idx}____`,
            className: "setting_set-headers--inputs"
        }, Z("div", {
            className: "setting__set-headers--key-value setting__set-headers--key"
        }, Z("span", null, "Key:"), Z("input", {
            className: "setting_set-headers--inputs--key",
            placeholder: "Authotization",
            value: hst.key,
            onChange: (e)=>{
                setHeadersState((prevState)=>{
                    prevState[idx].key = e.target.value;
                    return prevState;
                });
            }
        })), Z("div", {
            className: "setting__set-headers--key-value setting__set-headers--value"
        }, Z("span", null, "Value:"), Z("input", {
            className: "setting_set-headers--inputs--value",
            placeholder: "some string ...",
            value: hst.value,
            onChange: (e)=>{
                setHeadersState((prevState)=>{
                    prevState[idx].value = e.target.value;
                    return prevState;
                });
            }
        })), headersState.length > 1 && Z("div", {
            className: "setting_set-headers--delete-button e2e-move-div e2e-move-close",
            onClick: ()=>handleDelete(idx)
        }, Z(DeleteIcon, null))))), Z("button", {
        className: "setting_set-headers--apply-button e2e-back-button e2e-add-capture ",
        onClick: ()=>{
            const newHeaders = {};
            for (const header of headersState){
                const { key , value  } = header;
                newHeaders[key] = value;
            }
            setHeader(newHeaders);
        }
    }, Z(TickIcon, null), Z("span", null, "Apply")))));
}
const getSchemasAPI = ({ baseUrl  })=>fetch(`${baseUrl}playground/static/get/schemas`).then((res)=>res.json());
const Page = ()=>{
    const { tabsData , setTabsData , activeTab , actsObj , addTab , setActiveTab , setService , setMethod , setSchema , setAct , setPostFields , setGetFields , setFormData , setHistory , setResponse , resetGetFields , closeTab , resetPostFields , setSchemasObj , setActsObj , setModal , modal  } = useLesan();
    const [show, setShow] = F1("");
    const parsedWindowUrl = ()=>{
        return window && window.location ? `${new URL(window.location.href).origin}/` : "http://localhost:1366/";
    };
    const [urlAddress, setUrlAddress] = F1("");
    T1(()=>{
        configUrl(parsedWindowUrl());
        const localHistory = JSON.parse(localStorage.getItem("localHistory"));
        if (localHistory) setHistory(localHistory);
    }, []);
    const configUrl = (address)=>{
        address && setUrlAddress(address);
        setService({
            data: "",
            index: activeTab
        });
        setMethod({
            data: "",
            index: activeTab
        });
        setSchema({
            data: "",
            index: activeTab
        });
        resetGetFields(activeTab);
        resetPostFields(activeTab);
        setFormData({
            data: {},
            index: activeTab
        });
        getSchemasAPI({
            baseUrl: address ? address : urlAddress
        }).then(({ schemas , acts  })=>{
            setActsObj(acts);
            setSchemasObj(schemas);
            let localTabsData = localStorage.getItem("localTabsData");
            if (localTabsData) {
                localTabsData = JSON.parse(localTabsData);
                const parsedLocalTabData = [];
                const proccessTabData = (tab)=>{
                    parsedLocalTabData.pop();
                    const parsedFromData = createNestedObjectsFromKeys(tab.formData);
                    for(const setKeys in parsedFromData.set){
                        if (acts[tab.service][tab.method][tab.schema][tab.act].validator.schema.set.schema[setKeys] === undefined) {
                            delete parsedFromData.set[setKeys];
                        }
                    }
                    for(const getKey in parsedFromData.get){
                        if (acts[tab.service][tab.method][tab.schema][tab.act].validator.schema.get.schema[getKey] === undefined) {
                            delete parsedFromData.get[getKey];
                        }
                    }
                    const newGeneratedFormData = generateFormData(parsedFromData, {}, "");
                    tab.postFields = acts[tab.service][tab.method][tab.schema][tab.act].validator.schema.set.schema;
                    tab.getFields = acts[tab.service][tab.method][tab.schema][tab.act].validator.schema.get.schema;
                    parsedLocalTabData.push({
                        ...tab,
                        formData: newGeneratedFormData
                    });
                };
                for (const tab of localTabsData){
                    if (tab.service && tab.service in acts) {
                        parsedLocalTabData.push(tab);
                    }
                    if (tab.method && !(tab.method in acts[tab.service])) {
                        parsedLocalTabData.pop();
                    }
                    if (tab.schema && !(tab.schema in acts[tab.service][tab.method])) {
                        parsedLocalTabData.pop();
                    }
                    if (tab.act && !(tab.act in acts[tab.service][tab.method][tab.schema])) {
                        parsedLocalTabData.pop();
                    }
                    if (tab.service && tab.method && tab.schema && tab.act && tab.act in acts[tab.service][tab.method][tab.schema]) {
                        proccessTabData(tab);
                    }
                }
                if (parsedLocalTabData.length < 1) {
                    parsedLocalTabData.push({
                        service: "",
                        method: "",
                        schema: "",
                        act: "",
                        postFields: {},
                        getFields: {},
                        formData: {},
                        response: null
                    });
                }
                setTabsData(parsedLocalTabData);
            }
        });
    };
    const toggleModal = ()=>{
        setModal(null);
    };
    const setFormFromHistory = (request)=>{
        setService({
            data: request.body.service,
            index: activeTab
        });
        setMethod({
            data: request.body.contents,
            index: activeTab
        });
        setSchema({
            data: request.body.wants.model,
            index: activeTab
        });
        setAct({
            data: request.body.wants.act,
            index: activeTab
        });
        const actObj = actsObj[request.body.service][request.body.contents][request.body.wants.model][request.body.wants.act]["validator"]["schema"];
        setGetFields({
            data: actObj["get"]["schema"],
            index: activeTab
        });
        setPostFields({
            data: actObj["set"]["schema"],
            index: activeTab
        });
        setResponse({
            data: null,
            index: activeTab
        });
        const historyFromData = generateFormData(request.body.details, {}, "");
        setFormData({
            data: historyFromData,
            index: activeTab
        });
        toggleModal();
    };
    return Z("div", {
        className: "cnt"
    }, Z("div", {
        className: "tabs-container",
        style: {
            display: "flex"
        }
    }, tabsData.map((tab, index)=>Z(N, null, Z("div", {
            className: "tab-name",
            "data-tab": activeTab === index,
            onClick: ()=>{
                setActiveTab(index);
            }
        }, tabsData[index].act ? `${tabsData[index].schema} | ${tabsData[index].act}` : tabsData[index].schema ? `${tabsData[index].method} | ${tabsData[index].schema}` : tabsData[index].method ? `${tabsData[index].service} | ${tabsData[index].method}` : tabsData[index].service ? tabsData[index].service : `Tab ${index}`, Z("span", {
            className: "add-tab tab-close",
            onClick: (event)=>{
                event.stopPropagation();
                closeTab(index);
            }
        }, "x")))), Z("span", {
        className: "add-tab",
        onClick: ()=>{
            addTab(null);
            localStorage.setItem("localTabsData", JSON.stringify(tabsData));
        }
    }, "+")), Z(Main, {
        urlAddress: urlAddress
    }), Z("div", {
        className: "main-btn-wrapper"
    }, Z("span", {
        className: "btn btn-modal btn-setting",
        onClick: ()=>setModal(MODAL_TYPES.SETTING)
    }, Z("span", {
        className: "btn-modal-title"
    }, "Setting"), Z(SettingIcon, null)), Z("span", {
        className: "btn btn-modal btn-history",
        onClick: ()=>setModal(MODAL_TYPES.HISTORY)
    }, Z("span", {
        className: "btn-modal-title"
    }, "History"), Z(HistoryIcon, null)), Z("span", {
        className: "btn btn-modal btn-e2e",
        onClick: ()=>setModal(MODAL_TYPES.E2E_TEST)
    }, Z("span", {
        className: "btn-modal-title"
    }, "E2E Test"), Z(TestIcon, null)), Z("span", {
        className: "btn btn-modal btn-graph",
        onClick: ()=>setModal(MODAL_TYPES.SCHEMA)
    }, Z("span", {
        className: "btn-modal-title"
    }, "Schema"), Z(SchemaIcon, null)), Z("span", {
        className: "btn btn-modal btn-doc ",
        onClick: ()=>setModal(MODAL_TYPES.DOCUMENT)
    }, Z("span", {
        className: "btn-modal-title"
    }, "Document"), Z(DocumentIcon, null)), Z("span", {
        className: "btn btn-modal btn-refetch",
        onClick: ()=>configUrl()
    }, Z("span", {
        className: "btn-modal-title"
    }, "Refetch"), Z(ReFetchIcon, null))), modal !== null && Z(Modal, {
        toggle: toggleModal,
        title: modal
    }, modal === MODAL_TYPES.HISTORY ? Z(History, {
        setFormFromHistory: setFormFromHistory
    }) : modal === MODAL_TYPES.SETTING ? Z(Setting, {
        configUrl: configUrl
    }) : modal === MODAL_TYPES.E2E_TEST ? Z(E2E, {
        baseUrl: urlAddress
    }) : Z(N, null)));
};
oe(Z(ManagedLesanContext, null, Z(Page, null)), document.getElementById("root"));
