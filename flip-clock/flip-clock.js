!function(c) {
    function t(t) {
        for (var e, r, n = t[0], i = t[1], o = t[2], s = 0, a = []; s < n.length; s++)
            r = n[s],
            l[r] && a.push(l[r][0]),
            l[r] = 0;
        for (e in i)
            Object.prototype.hasOwnProperty.call(i, e) && (c[e] = i[e]);
        for (p && p(t); a.length; )
            a.shift()();
        return f.push.apply(f, o || []),
        u()
    }
    function u() {
        for (var t, e = 0; e < f.length; e++) {
            for (var r = f[e], n = !0, i = 1; i < r.length; i++) {
                var o = r[i];
                0 !== l[o] && (n = !1)
            }
            n && (f.splice(e--, 1),
            t = s(s.s = r[0]))
        }
        return t
    }
    var r = {}
      , l = {
        1: 0
    }
      , f = [];
    function s(t) {
        if (r[t])
            return r[t].exports;
        var e = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return c[t].call(e.exports, e, e.exports, s),
        e.l = !0,
        e.exports
    }
    s.m = c,
    s.c = r,
    s.d = function(t, e, r) {
        s.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }
    ,
    s.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    s.t = function(e, t) {
        if (1 & t && (e = s(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (s.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var n in e)
                s.d(r, n, function(t) {
                    return e[t]
                }
                .bind(null, n));
        return r
    }
    ,
    s.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return s.d(e, "a", e),
        e
    }
    ,
    s.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    s.p = "/kuan-vue-flip-clock/";
    var e = window.webpackJsonp = window.webpackJsonp || []
      , n = e.push.bind(e);
    e.push = t,
    e = e.slice();
    for (var i = 0; i < e.length; i++)
        t(e[i]);
    var p = n;
    f.push([17, 0]),
    u()
}([, function(t, e, r) {}
, function(t, e, r) {}
, function(t, e, r) {}
, , , , , function(t, e, r) {
    "use strict";
    var n = r(1);
    r.n(n).a
}
, , , , function(t, e, r) {
    "use strict";
    var n = r(2);
    r.n(n).a
}
, function(t, e, r) {
    "use strict";
    var n = r(3);
    r.n(n).a
}
, , , , function(t, e, r) {
    "use strict";
    r.r(e);
    r(7);
    var n = r(6)
      , i = {
        props: {
            total: {
                type: Number,
                default: 9
            },
            current: {
                type: Number,
                default: -1
            }
        },
        data: function() {
            return {
                before: this.total === this.current ? -1 : this.total,
                isPlay: !1
            }
        },
        watch: {
            current: function(t, e) {
                this.before = e,
                this.isPlay || (this.isPlay = !0)
            }
        }
    }
      , o = (r(8),
    r(0))
      , s = Object(o.a)(i, function() {
        var r = this
          , t = r.$createElement
          , n = r._self._c || t;
        return n("div", {
            class: {
                play: r.isPlay
            }
        }, [n("ul", {
            staticClass: "flip"
        }, r._l(r.total + 1, function(t, e) {
            return n("li", {
                key: t,
                staticClass: "item",
                class: {
                    active: r.current === e,
                    before: e === r.before
                }
            }, [n("div", {
                staticClass: "up"
            }, [n("div", {
                staticClass: "shadow"
            }), r._v(" "), n("div", {
                staticClass: "inn"
            }, [r._v(r._s(e))])]), r._v(" "), n("div", {
                staticClass: "down"
            }, [n("div", {
                staticClass: "shadow"
            }), r._v(" "), n("div", {
                staticClass: "inn"
            }, [r._v(r._s(e))])])])
        }), 0)])
    }, [], !1, null, "250ac99c", null).exports
      , a = r(4)
      , c = r.n(a);
    // 添加全局变量来跟踪当前时间格式（true表示24小时制，false表示12小时制）
    var is24HourFormat = false;

    // 切换时间格式的函数
    function toggleHourFormat() {
        is24HourFormat = !is24HourFormat;
        document.getElementById('hour-format-btn').textContent = is24HourFormat ? '24小时制' : '12小时制';
        // 更新时钟显示
        var clockComponent = document.querySelector('flip-clock');
        if (clockComponent && clockComponent.__vue__) {
            clockComponent.__vue__.timeArr = u();
        }
    }

    // 添加按钮点击事件监听
    document.addEventListener('DOMContentLoaded', function() {
        var hourFormatBtn = document.getElementById('hour-format-btn');
        if (hourFormatBtn) {
            hourFormatBtn.addEventListener('click', toggleHourFormat);
        }
    });

    function u(t) {
        var e = 0 < arguments.length && void 0 !== t ? t : new Date
          , r = e.getHours()
          , n = e.getMinutes()
          , i = e.getSeconds()
          , isAM = true;

        // 根据当前时间格式调整小时
        if (!is24HourFormat) {
            isAM = r < 12;
            r = r % 12;
            r = r === 0 ? 12 : r; // 12点而不是0点
        }

        // 生成时间数组
        var timeArr = [].concat(c()(l(r)), c()(l(n)), c()(l(i)));

        // 添加AM/PM信息（如果是12小时制）
        if (!is24HourFormat) {
            timeArr.push(isAM ? 0 : 1); // 0表示AM，1表示PM
        }

        return timeArr;
    }
    function l(t) {
        return 10 <= t ? ("" + t).split("").map(function(t) {
            return Number(t)
        }) : [0, t]
    }
    var f = {
        components: {
            FlipItem: s
        },
        data: function() {
            return {
                timeArr: u()
            }
        },
        mounted: function() {
            this.startTimer()
        },
        beforeDestroy: function() {
            this.stopTimer()
        },
        methods: {
            startTimer: function() {
                var t = this;
                this.stopTimer(),
                this.timer = setTimeout(function() {
                    t.timeArr = u(),
                    t.startTimer()
                }, 1e3)
            },
            stopTimer: function() {
                clearTimeout(this.timer)
            }
        }
    }
      , p = (r(12),
    {
        components: {
            FlipClock: Object(o.a)(f, function() {
                var t = this
                  , e = t.$createElement
                  , r = t._self._c || e;
                return r("div", {
                    staticClass: "clock-wrapper"
                }, [
                    // AM/PM显示（仅在12小时制时显示）
                    t.timeArr.length > 6 ? r("div", {
                        staticClass: "am-pm-indicator",
                        class: {
                            'am': t.timeArr[6] === 0,
                            'pm': t.timeArr[6] === 1
                        }
                    }, [t._v(t.timeArr[6] === 0 ? "AM" : "PM")]) : t._e(),
                    t._v(" "),
                    r("div", {
                        staticClass: "clock-container"
                    }, [r("flip-item", {
                        attrs: {
                            total: is24HourFormat ? 2 : 1,
                            current: t.timeArr[0]
                        }
                    }), t._v(" "), r("flip-item", {
                        attrs: {
                            total: 9,
                            current: t.timeArr[1]
                        }
                    }), t._v(" "), r("div", {
                        staticClass: "colon"
                    }), t._v(" "), r("flip-item", {
                        attrs: {
                            total: 5,
                            current: t.timeArr[2]
                        }
                    }), t._v(" "), r("flip-item", {
                        attrs: {
                            total: 9,
                            current: t.timeArr[3]
                        }
                    }), t._v(" "), r("div", {
                        staticClass: "colon"
                    }), t._v(" "), r("flip-item", {
                        attrs: {
                            total: 5,
                            current: t.timeArr[4]
                        }
                    }), t._v(" "), r("flip-item", {
                        attrs: {
                            total: 9,
                            current: t.timeArr[5]
                        }
                    })], 1)
                ], 1)
            }, [], !1, null, "685c45cf", null).exports
        }
    })
      , v = (r(13),
    Object(o.a)(p, function() {
        var t = this.$createElement
          , e = this._self._c || t;
        return e("div", {
            staticClass: "test-clock-container"
        }, [e("flip-clock")], 1)
    }, [], !1, null, null, null).exports);
    new n.a({
        render: function(t) {
            return t(v)
        }
    }).$mount("#app")
}
]);
