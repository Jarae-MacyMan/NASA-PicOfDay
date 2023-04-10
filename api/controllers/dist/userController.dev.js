"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken"); //const config = require("config")


require("dotenv").config();

var User = require("../models/user");

var userContoller =
/*#__PURE__*/
function () {
  function userContoller() {
    _classCallCheck(this, userContoller);
  }

  _createClass(userContoller, null, [{
    key: "signinController",
    value: function signinController(req, res) {
      var _req$body, email, password, existingUser, isPasswordOk, token;

      return regeneratorRuntime.async(function signinController$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // normal-auth
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              console.log(email, password);

              if (!(email === "" || password === "")) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: "Invalid field!"
              }));

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return regeneratorRuntime.awrap(User.findOne({
                email: email
              }));

            case 7:
              existingUser = _context.sent;

              if (existingUser) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                message: "User does not exist!"
              }));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(bcrypt.compare(password, existingUser.password));

            case 12:
              isPasswordOk = _context.sent;

              if (isPasswordOk) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: "Invalid credintials!"
              }));

            case 15:
              token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
              }, process.env.JWT_SECRET, {
                expiresIn: "1h"
              });
              res.status(200).json({
                result: existingUser,
                token: token
              });
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](4);
              res.status(500).json({
                message: "Something went wrong!"
              });

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[4, 19]]);
    }
  }, {
    key: "signupController",
    value: function signupController(req, res) {
      var _req$body2, username, email, password, existingUser, hashedPassword, result, token;

      return regeneratorRuntime.async(function signupController$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // normal form signup
              _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;
              console.log(email, password, email);
              _context2.prev = 2;

              if (!(email === "" || password === "" || username === "" && password.length >= 4)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                message: "Invalid field!"
              }));

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(User.findOne({
                email: email
              }));

            case 7:
              existingUser = _context2.sent;

              if (!existingUser) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                message: "User already exist!"
              }));

            case 10:
              _context2.next = 12;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

            case 12:
              hashedPassword = _context2.sent;
              _context2.next = 15;
              return regeneratorRuntime.awrap(User.create({
                email: email,
                password: hashedPassword,
                username: username
              }));

            case 15:
              result = _context2.sent;
              token = jwt.sign({
                email: result.email,
                id: result._id
              }, process.env.JWT_SECRET, {
                expiresIn: "1h"
              });
              res.status(200).json({
                result: result,
                token: token
              });
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](2);
              res.status(500).json({
                message: "Something went wrong!"
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[2, 20]]);
    }
  }, {
    key: "getVerified",
    value: function getVerified(req, res) {
      return regeneratorRuntime.async(function getVerified$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              return _context3.abrupt("return", res.json(true));

            case 4:
              _context3.prev = 4;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
              return _context3.abrupt("return", res.status(500).send("Server Error"));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 4]]);
    }
  }]);

  return userContoller;
}();

module.exports = userContoller;