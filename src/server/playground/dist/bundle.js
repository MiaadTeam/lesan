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
    ACTION_TYPE["SET_ACTIVE_TAB"] = "SET_ACTIVE_TAB";
    ACTION_TYPE["ADD_TAB"] = "ADD_TAB";
    ACTION_TYPE["CLOSE_TAB"] = "CLOSE_TAB";
})(ACTION_TYPE || (ACTION_TYPE = {}));
const initialState = {
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
    schemasObj: {},
    actsObj: {},
    headers: {
        Authorization: ""
    },
    history: [],
    activeTab: 0,
    setActiveTab: ()=>({}),
    addTab: ()=>({}),
    closeTab: ()=>({}),
    setTabsData: ()=>({}),
    deleteItemHistory: ()=>({}),
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
            deleteItemHistory
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
const uid = ()=>Date.now().toString(36) + Math.random().toString(36).substr(2);
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
function E2E({ configUrl  }) {
    const [e2eFroms, setE2eForms] = F1([]);
    const [resultView, setResultView] = F1(false);
    const [results, setResults] = F1([]);
    const [urlAddress, setUrlAddress] = F1("");
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
        for await (const e2eForm of e2eFroms){
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
                    baseUrl: "http://localhost:8000/",
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
    return Z("div", {
        className: "e2e modal-content"
    }, resultView ? Z("div", {
        className: "results"
    }, results.map((re)=>Z("div", {
            key: re.id
        }, Z("div", null, "request:", Z(JSONViewer, {
            jsonData: re.request
        })), Z("div", null, "response:", Z(JSONViewer, {
            jsonData: re.response
        })), Z("hr", null))), Z("button", {
        className: "btn btn--add",
        onClick: ()=>{
            setResults([]);
            setResultView(false);
        }
    }, "back to TEST")) : Z(N, null, Z("button", {
        className: "btn btn--add",
        onClick: ()=>{
            setE2eForms((e2eForm)=>[
                    ...e2eForm,
                    {
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
      "model": "province",
      "act": "addProvince"
    },
    "details": {
      "get": {
        "abb": 0
      },
      "set": {
        "name": "hamedan",
        "enName": "sd",
        "abb": "hm"
      }
    }
  }
}
`,
                        repeat: 1,
                        captures: []
                    }
                ]);
        }
    }, "add +"), Z("div", {
        className: "sidebar__section sidebar__section--headers"
    }, e2eFroms.map((e2eForm, idx)=>Z(N, null, Z("div", {
            className: "sidebar__input-double",
            key: e2eForm.id
        }, Z("div", {
            className: "sidebar__section-heading"
        }, "set test body and headers"), Z("textarea", {
            placeholder: "please paste a request body here",
            value: e2eForm.bodyHeaders,
            name: `${e2eForm.id}-body`,
            rows: 18,
            onChange: (e)=>{
                setE2eForms((e2eForm)=>{
                    const copy = [
                        ...e2eForm
                    ];
                    copy[idx].bodyHeaders = e.target.value;
                    return [
                        ...copy
                    ];
                });
            }
        }), Z("div", {
            className: "sidebar__section-heading"
        }, "set repeat time"), Z("input", {
            placeholder: "set repeat number",
            value: e2eForm.repeat,
            name: `${e2eForm.id}-repeat`,
            type: "number",
            onChange: (e)=>{
                setE2eForms((e2eForm)=>{
                    const copy = [
                        ...e2eForm
                    ];
                    copy[idx].repeat = e.target.value;
                    return [
                        ...copy
                    ];
                });
            }
        }), Z("div", {
            className: "sidebar__section-heading"
        }, "capture variables"), Z("button", {
            className: "btn btn--add",
            onClick: ()=>{
                setE2eForms((e2eForm)=>{
                    const copy = [
                        ...e2eForm
                    ];
                    copy[idx].captures.push({
                        key: "",
                        value: ""
                    });
                    return copy;
                });
            }
        }, "add capture variable item"), e2eForm.captures.map((capture, capId)=>Z(N, null, Z("input", {
                placeholder: "set a variable name",
                value: capture.key,
                onChange: (e)=>{
                    setE2eForms((e2eForm)=>{
                        const copy = [
                            ...e2eForm
                        ];
                        copy[idx].captures[capId].key = e.target.value;
                        return copy;
                    });
                }
            }), Z("input", {
                placeholder: "set a value for variable",
                value: capture.value,
                onChange: (e)=>{
                    setE2eForms((e2eForm)=>{
                        const copy = [
                            ...e2eForm
                        ];
                        copy[idx].captures[capId].value = e.target.value;
                        return copy;
                    });
                }
            }), Z("hr", null)))), Z("hr", null), Z("hr", null)))), Z("button", {
        className: "btn btn--add",
        onClick: async ()=>{
            setResultView(true);
            await runE2eTest();
        }
    }, "Run E2E Test")));
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
            className: "history-detail",
            id: hi.id
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
            className: "history-re history-response"
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
            className: "history-re-title"
        }, "RESPONSE")), Z("div", {
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
function GraphIcon() {
    return Z("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        opacity: "0.5",
        d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z",
        stroke: "#1C274C",
        "stroke-width": "1.5"
    }), Z("path", {
        d: "M7 18V9",
        stroke: "#1C274C",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), Z("path", {
        d: "M12 18V6",
        stroke: "#1C274C",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), Z("path", {
        d: "M17 18V13",
        stroke: "#1C274C",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }));
}
function HistoryIcon() {
    return Z("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M5.07868 5.06891C8.87402 1.27893 15.0437 1.31923 18.8622 5.13778C22.6824 8.95797 22.7211 15.1313 18.9262 18.9262C15.1312 22.7211 8.95793 22.6824 5.13774 18.8622C2.87389 16.5984 1.93904 13.5099 2.34047 10.5812C2.39672 10.1708 2.775 9.88377 3.18537 9.94002C3.59575 9.99627 3.88282 10.3745 3.82658 10.7849C3.4866 13.2652 4.27782 15.881 6.1984 17.8016C9.44288 21.0461 14.6664 21.0646 17.8655 17.8655C21.0646 14.6664 21.046 9.44292 17.8015 6.19844C14.5587 2.95561 9.33889 2.93539 6.13935 6.12957L6.88705 6.13333C7.30126 6.13541 7.63535 6.47288 7.63327 6.88709C7.63119 7.3013 7.29372 7.63539 6.87951 7.63331L4.33396 7.62052C3.92269 7.61845 3.58981 7.28556 3.58774 6.8743L3.57495 4.32874C3.57286 3.91454 3.90696 3.57707 4.32117 3.57498C4.73538 3.5729 5.07285 3.907 5.07493 4.32121L5.07868 5.06891Z",
        fill: "#1C274C"
    }), Z("path", {
        opacity: "0.5",
        d: "M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.5429 12.6036C11.3554 12.416 11.25 12.1617 11.25 11.8964V8C11.25 7.58579 11.5858 7.25 12 7.25Z",
        fill: "#1C274C"
    }));
}
function SettingIcon() {
    return Z("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M3 9.10986V14.8799C3 16.9999 3 16.9999 5 18.3499L10.5 21.5299C11.33 22.0099 12.68 22.0099 13.5 21.5299L19 18.3499C21 16.9999 21 16.9999 21 14.8899V9.10986C21 6.99986 21 6.99986 19 5.64986L13.5 2.46986C12.68 1.98986 11.33 1.98986 10.5 2.46986L5 5.64986C3 6.99986 3 6.99986 3 9.10986Z",
        stroke: "#292D32",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }), Z("path", {
        opacity: "0.34",
        d: "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",
        stroke: "#292D32",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }));
}
function TestIcon() {
    return Z("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, Z("path", {
        d: "M9.74872 2.49415L18.1594 7.31987M9.74872 2.49415L2.65093 14.7455C1.31093 17.0584 2.10615 20.0159 4.42709 21.3513C6.74803 22.6867 9.7158 21.8942 11.0558 19.5813L12.5511 17.0003L14.1886 14.1738L15.902 11.2163L18.1594 7.31987M9.74872 2.49415L8.91283 2M18.1594 7.31987L19 7.80374",
        stroke: "#1C274C",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), Z("path", {
        opacity: "0.5",
        d: "M15.9021 11.2164L13.3441 9.74463M14.1887 14.1739L9.98577 11.7557M12.5512 17.0004L9.93848 15.4972",
        stroke: "#1C274C",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
    }), Z("path", {
        opacity: "0.5",
        d: "M22 14.9166C22 16.0672 21.1046 16.9999 20 16.9999C18.8954 16.9999 18 16.0672 18 14.9166C18 14.1967 18.783 13.2358 19.3691 12.6174C19.7161 12.2512 20.2839 12.2512 20.6309 12.6174C21.217 13.2358 22 14.1967 22 14.9166Z",
        stroke: "#1C274C",
        "stroke-width": "1.5"
    }));
}
function CopyIcon() {
    return Z("svg", {
        version: "1.2",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 98 123",
        width: 28,
        fill: "white"
    }, Z("path", {
        id: "Layer",
        "fill-rule": "evenodd",
        class: "s0",
        d: "m83.8 9.2v69.5c0 1-0.8 1.8-1.9 1.8h-8.5v8.3c0 1-0.8 1.8-1.8 1.8h-55.5c-1.1 0-1.9-0.8-1.9-1.8v-69.5c0-1 0.8-1.8 1.9-1.8h8.5v-8.3c0-1 0.8-1.8 1.8-1.8h55.5c1.1 0 1.9 0.8 1.9 1.8zm-14 77.7c0 0 0-8.2 0-8.2v-44.7h-11.2q0 0 0 0c-1 0-1.8-0.8-1.8-1.8v-11h-38.9v65.7c0 0 51.9 0 51.9 0zm-8.2-39c0 1-0.8 1.8-1.8 1.8h-32c-1 0-1.8-0.8-1.8-1.8 0-1 0.8-1.8 1.8-1.8h32c1 0 1.8 0.8 1.8 1.8zm-35.6-12.3c0-1 0.8-1.8 1.8-1.8h21.2c1 0 1.9 0.8 1.9 1.8 0 1-0.9 1.8-1.9 1.8h-21.2c-1 0-1.8-0.8-1.8-1.8zm35.6 36.9c0 1-0.8 1.8-1.8 1.8h-32c-1 0-1.8-0.8-1.8-1.8 0-1 0.8-1.8 1.8-1.8h32c1 0 1.8 0.8 1.8 1.8zm0-12.3c0 1-0.8 1.8-1.8 1.8h-32c-1 0-1.8-0.8-1.8-1.8 0-1 0.8-1.8 1.8-1.8h32c1 0 1.8 0.8 1.8 1.8zm18.5-49.1h-51.9v6.4h30.4q0 0 0 0 0.2 0 0.3 0.1 0.1 0 0.2 0 0.1 0 0.2 0.1 0.1 0 0.2 0.1 0 0 0.1 0 0.1 0.1 0.1 0.2 0.1 0 0.2 0l13 12.8q0 0 0 0 0.1 0.1 0.2 0.2 0 0.1 0 0.2 0.1 0.1 0.2 0.2 0 0.1 0 0.2 0.1 0.1 0.1 0.2 0 0.2 0 0.3v44.7h6.7c0 0 0-65.7 0-65.7zm-19.7 12.6l0.1 6.6h6.7z"
    }));
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
const lesanAPI = ({ baseUrl , options  })=>fetch(`${baseUrl}lesan`, options).then((res)=>res.json());
const Main = ({ urlAddress  })=>{
    const { activeTab , tabsData , actsObj , headers , history , setService , setMethod , setSchema , setAct , setPostFields , setGetFields , setFormData , setHistory , setResponse , resetGetFields , resetPostFields  } = useLesan();
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
        }, 400);
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
    };
    const canShowRequestFields = tabsData[activeTab].service && tabsData[activeTab].method && tabsData[activeTab].schema && tabsData[activeTab].postFields && tabsData[activeTab].getFields && tabsData[activeTab].act;
    const canShowSchema = tabsData[activeTab].service && tabsData[activeTab].method;
    const canShowAct = tabsData[activeTab].service && tabsData[activeTab].method && tabsData[activeTab].schema;
    const response = JSON.stringify(tabsData[activeTab].response);
    const copyResponse = ()=>{
        navigator.clipboard.writeText(response);
    };
    const request = JSON.stringify(requestFunction());
    const copyRequest = ()=>{
        navigator.clipboard.writeText(request);
    };
    return Z(N, null, Z("div", {
        className: "sidebar"
    }, Z("div", {
        className: "sidebar__sections-wrapper"
    }, Z("div", {
        className: "sidebar__section sidebar__section--services"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select services"), Z("select", {
        className: "sidebar__select",
        value: tabsData[activeTab].service,
        onChange: (event)=>{
            setService({
                data: event.target.value,
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
        }
    }, Z("option", {
        value: ""
    }), Object.keys(actsObj).map((service, index)=>Z("option", {
            key: `${activeTab}.${index}--`,
            value: service
        }, service)))), Z("div", {
        className: "sidebar__section sidebar__section--method"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select content"), Z("select", {
        className: "sidebar__select",
        value: tabsData[activeTab].method,
        onChange: (event)=>{
            setMethod({
                data: event.target.value,
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
        value: canShowSchema ? tabsData[activeTab].schema : undefined,
        onChange: (event)=>{
            setSchema({
                data: event.target.value,
                index: activeTab
            });
            resetGetFields(activeTab);
            resetPostFields(activeTab);
            setFormData({
                data: {},
                index: activeTab
            });
        }
    }, Z("option", {
        value: ""
    }), canShowSchema ? Object.keys(actsObj[tabsData[activeTab].service][tabsData[activeTab].method]).map((schema, index)=>Z("option", {
            key: `${activeTab}.${index}---`,
            value: schema
        }, schema)) : null)), Z("div", {
        className: "sidebar__section sidebar__section--act"
    }, Z("div", {
        className: "sidebar__section-heading"
    }, "select action"), Z("select", {
        className: "sidebar__select",
        disabled: !canShowAct,
        value: canShowAct ? tabsData[activeTab].act : undefined,
        onChange: (event)=>{
            const actObj = actsObj[tabsData[activeTab].service][tabsData[activeTab].method][tabsData[activeTab].schema][event.target.value]["validator"]["schema"];
            formRef && formRef.current && formRef.current.reset();
            setAct({
                data: event.target.value,
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
            setFormData({
                data: {},
                index: activeTab
            });
        }
    }, Z("option", {
        value: ""
    }), canShowAct ? Object.keys(actsObj[tabsData[activeTab].service][tabsData[activeTab].method][tabsData[activeTab].schema]).map((schema, index)=>Z("option", {
            key: `${activeTab}.${index}----`,
            value: schema
        }, schema)) : null)))), canShowRequestFields && Z("div", {
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
        }, item, " :"), tabsData[activeTab].postFields[item]["type"] === "enums" ? Z("select", {
            className: "sidebar__select",
            value: tabsData[activeTab].formData[`set.${item}`],
            onChange: (event)=>{
                setFormData({
                    data: {
                        ...tabsData[activeTab].formData,
                        [`set.${item}`]: event.target.value
                    },
                    index: activeTab
                });
            }
        }, Z("option", {
            value: ""
        }), Object.keys(tabsData[activeTab].postFields[item]["schema"]).map((schema, index)=>Z("option", {
                key: `${activeTab}.${index}------`,
                value: schema
            }, schema))) : Z("input", {
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
    }, "Copy Response")))), Z("div", {
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
function Setting({ configUrl  }) {
    const { headers , setHeader  } = useLesan();
    const [urlAddress, setUrlAddress] = F1("");
    return Z("div", {
        className: "setting modal-content"
    }, Z("div", {
        className: "url"
    }, Z("p", {
        className: "url-title"
    }, "Fetch Config"), Z("div", {
        className: "url-detail"
    }, Z("button", {
        className: "btn url-button",
        onClick: ()=>configUrl()
    }, "Refetch Config")), Z("div", {
        className: "url-detail"
    }, " ", Z("input", {
        className: "url-input",
        placeholder: "Set URL",
        onChange: (e)=>setUrlAddress(e.target.value)
    }), Z("button", {
        className: "btn url-button",
        onClick: ()=>configUrl(urlAddress)
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
const getSchemasAPI = ({ baseUrl  })=>fetch(`${baseUrl}playground/static/get/schemas`).then((res)=>res.json());
var MODAL_TYPES;
(function(MODAL_TYPES) {
    MODAL_TYPES["HISTORY"] = "HISTORY";
    MODAL_TYPES["GRAPH"] = "GRAPH";
    MODAL_TYPES["SETTING"] = "SETTING";
    MODAL_TYPES["E2E_TEST"] = "E2E_TEST";
})(MODAL_TYPES || (MODAL_TYPES = {}));
const Page = ()=>{
    const { isOpen , toggleModal  } = useModal();
    const { tabsData , activeTab , actsObj , addTab , setActiveTab , setService , setMethod , setSchema , setAct , setPostFields , setGetFields , setFormData , setHistory , setResponse , resetGetFields , closeTab , resetPostFields , setSchemasObj , setActsObj  } = useLesan();
    const [active, setActive] = F1("");
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
        });
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
        const generateFormData = (formData, returnFormData, keyname)=>{
            for(const key in formData){
                typeof formData[key] === "object" ? generateFormData(formData[key], returnFormData, keyname ? `${keyname}.${key}` : key) : returnFormData[`${keyname}.${key}`] = formData[key];
            }
            return returnFormData;
        };
        const historyFromData = generateFormData(request.body.details, {}, "");
        setFormData({
            data: historyFromData,
            index: activeTab
        });
        toggleModal();
    };
    const modalBtnClickHandler = (type)=>{
        setActive(type);
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
        }
    }, "+")), Z(Main, {
        urlAddress: urlAddress
    }), Z("div", {
        className: "sidebar__btns-wrapper"
    }, Z("span", {
        className: "btn-modal",
        onClick: ()=>modalBtnClickHandler(MODAL_TYPES.HISTORY)
    }, Z("span", {
        className: "tooltip-text"
    }, "History"), Z(HistoryIcon, null)), Z("span", {
        className: "btn-modal",
        onClick: ()=>modalBtnClickHandler(MODAL_TYPES.SETTING)
    }, Z("span", {
        className: "tooltip-text"
    }, "Setting"), Z(SettingIcon, null)), Z("span", {
        className: "btn-modal",
        onClick: ()=>modalBtnClickHandler(MODAL_TYPES.GRAPH)
    }, Z("span", {
        className: "tooltip-text"
    }, "Graph"), Z(GraphIcon, null)), Z("span", {
        className: "btn-modal",
        onClick: ()=>modalBtnClickHandler(MODAL_TYPES.E2E_TEST)
    }, Z("span", {
        className: "tooltip-text"
    }, "Test"), Z(TestIcon, null))), isOpen && Z(Modal, {
        toggle: toggleModal,
        title: active
    }, active === MODAL_TYPES.HISTORY ? Z(History, {
        setFormFromHistory: setFormFromHistory
    }) : active === MODAL_TYPES.SETTING ? Z(Setting, {
        configUrl: configUrl
    }) : active === MODAL_TYPES.E2E_TEST ? Z(E2E, {
        configUrl: configUrl
    }) : Z(N, null)));
};
oe(Z(ManagedLesanContext, null, Z(Page, null)), document.getElementById("root"));
