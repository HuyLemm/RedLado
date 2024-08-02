"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var footer = document.getElementById('footer');

  _axios["default"].get('/src/components/footer/footer.html').then(function (response) {
    footer.innerHTML = response.data;
  })["catch"](function (error) {
    console.error('Error loading footer:', error);
  });
});