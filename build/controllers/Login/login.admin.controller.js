"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var AccAdmin = require('../../model/AccAdmin');
var Role = require('../../model/Role');
require('dotenv').config();
// Secret key cho JWT
var JWT_SECRET = process.env.JWT_SECRET;
module.exports = {
  loginAccAdmin: function () {
    var _loginAccAdmin = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
      var _req$body, email, password, admin, saltRounds, hashedPassword, isMatch, token;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return AccAdmin.findOne({
              email: email
            });
          case 4:
            admin = _context.sent;
            if (admin) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", res.status(401).json({
              message: 'Email không tồn tại'
            }));
          case 7:
            saltRounds = 10;
            _context.next = 10;
            return bcrypt.hash(password, saltRounds);
          case 10:
            hashedPassword = _context.sent;
            console.log("admin.password: ", admin.password);
            console.log("password: ", password);
            console.log("hashedPassword: ", hashedPassword);
            console.log('EXPIRESIN:', process.env.EXPIRESIN);

            // So sánh mật khẩu với bcrypt
            _context.next = 17;
            return bcrypt.compare(password, admin.password);
          case 17:
            isMatch = _context.sent;
            if (isMatch) {
              _context.next = 20;
              break;
            }
            return _context.abrupt("return", res.status(401).json({
              message: 'Mật khẩu không chính xác'
            }));
          case 20:
            // Tạo token JWT
            token = jwt.sign({
              adminId: admin._id,
              email: admin.email
            }, JWT_SECRET, {
              expiresIn: process.env.EXPIRESIN
            } // Thời gian hết hạn của token
            ); // Lưu token vào cookie

            res.cookie('token', token, {
              httpOnly: true,
              // Bảo mật hơn khi chỉ có server mới có thể truy cập cookie này
              secure: process.env.NODE_ENV === 'production',
              // Chỉ cho phép cookie qua HTTPS nếu là production
              maxAge: parseInt(process.env.MAXAGE) // 1 giờ
            });

            // Trả về thông tin admin (có thể trả về thông tin khác tùy nhu cầu)
            res.json({
              message: 'Đăng nhập thành công',
              access_token: token,
              data: admin
            });
            console.log("\u0110\u0103ng nh\u1EADp th\xE0nh c\xF4ng v\u1EDBi token: ".concat(token));
            _context.next = 30;
            break;
          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            res.status(500).json({
              message: 'Lỗi máy chủ'
            });
          case 30:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 26]]);
    }));
    function loginAccAdmin(_x, _x2) {
      return _loginAccAdmin.apply(this, arguments);
    }
    return loginAccAdmin;
  }(),
  logoutAdmin: function () {
    var _logoutAdmin = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            try {
              // Xóa cookie chứa token
              res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' // Bảo đảm chỉ xóa cookie qua HTTPS nếu là production
              });

              // Trả về phản hồi thành công
              res.status(200).json({
                message: 'Đăng xuất thành công'
              });
            } catch (error) {
              console.error(error);
              res.status(500).json({
                message: 'Lỗi máy chủ'
              });
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function logoutAdmin(_x3, _x4) {
      return _logoutAdmin.apply(this, arguments);
    }
    return logoutAdmin;
  }(),
  registerAccAdmin: function () {
    var _registerAccAdmin = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
      var _req$body2, email, password, firstName, lastName, address, phone, gender, check, hashedPassword, dangKy;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, firstName = _req$body2.firstName, lastName = _req$body2.lastName, address = _req$body2.address, phone = _req$body2.phone, gender = _req$body2.gender;
            console.log("email, password, firstName, lastName, address, phone, gender: ", email, password, firstName, lastName, address, phone, gender);
            _context3.prev = 2;
            _context3.next = 5;
            return AccAdmin.findOne({
              email: email
            });
          case 5:
            check = _context3.sent;
            if (!check) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", res.status(400).json({
              success: false,
              message: 'Tài Khoản Đã Tồn Tại! Vui Lòng Chọn Email Khác!'
            }));
          case 10:
            _context3.next = 12;
            return bcrypt.hash(password, 10);
          case 12:
            hashedPassword = _context3.sent;
            _context3.next = 15;
            return AccAdmin.create({
              email: email,
              password: hashedPassword,
              firstName: firstName,
              lastName: lastName,
              address: address,
              phone: phone,
              gender: gender
            });
          case 15:
            dangKy = _context3.sent;
            return _context3.abrupt("return", res.status(201).json({
              success: true,
              message: 'Đăng ký tài khoản thành công',
              data: dangKy
            }));
          case 17:
            _context3.next = 22;
            break;
          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", res.status(500).json({
              success: false,
              message: _context3.t0
            }));
          case 22:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[2, 19]]);
    }));
    function registerAccAdmin(_x5, _x6) {
      return _registerAccAdmin.apply(this, arguments);
    }
    return registerAccAdmin;
  }()
};