"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.loadUser = void 0;

var _actionsTypes = require("../const/actionsTypes");

var api = _interopRequireWildcard(require("../../api/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var loadUser = function loadUser() {
  return function _callee(dispath) {
    var localUser;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            localUser = JSON.parse(localStorage.getItem("user_info"));

            if (localUser) {
              dispath({
                type: _actionsTypes.AUTH,
                data: localUser
              });
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.loadUser = loadUser;

var signin = function signin(data2, navigate) {
  return function _callee2(dispath) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(api.signIn(data2));

          case 3:
            _ref = _context2.sent;
            data = _ref.data;
            dispath({
              type: _actionsTypes.AUTH,
              data: data
            });
            navigate("/");
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
}; // export const signup = (formData, navigate) => async (dispatch)=>{
//     try{
//         // signup user
//         const {data} = await api.signUp(formData)
//         dispatch({type : AUTH, data})
//         navigate("/")
//     }catch(err){
//         console.log(err)
//     }
// }


exports.signin = signin;