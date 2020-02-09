/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/NotyAlertMessage.js":
/*!******************************************!*\
  !*** ./resources/js/NotyAlertMessage.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotyAlertMessage; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NotyAlertMessage =
/*#__PURE__*/
function () {
  _createClass(NotyAlertMessage, null, [{
    key: "ERROR",
    get: function get() {
      return 'error';
    }
  }, {
    key: "SUCCESS",
    get: function get() {
      return 'success';
    }
  }, {
    key: "WARNING",
    get: function get() {
      return 'warning';
    }
  }, {
    key: "INFO",
    get: function get() {
      return 'info';
    }
  }]);

  function NotyAlertMessage(type, msg) {
    _classCallCheck(this, NotyAlertMessage);

    this.type = type;
    this.msg = msg;
  }

  _createClass(NotyAlertMessage, [{
    key: "show",
    value: function show() {
      new Noty({
        type: this.type,
        theme: 'relax',
        layout: 'topRight',
        text: this.msg,
        timeout: '2000',
        progressBar: true,
        closeWith: ['click'],
        animation: {
          open: 'animated bounceInRight',
          // Animate.css class names
          close: 'animated bounceOutRight' // Animate.css class names

        }
      }).show();
    }
  }]);

  return NotyAlertMessage;
}();



/***/ }),

/***/ "./resources/js/question/post_question.js":
/*!************************************************!*\
  !*** ./resources/js/question/post_question.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NotyAlertMessage */ "./resources/js/NotyAlertMessage.js");

$(document).ready(function () {
  var currentQuestionContentManagementPreview = document.querySelector('tvy-content-management-preview[data-for="currentQuestion"]');
  currentQuestionContentManagementPreview.contentType = 'question';
  currentQuestionContentManagementPreview.getManagementPreview();
  $('.subjectOfQuestion').dropdown({
    forceSelection: false,
    onChange: function onChange(value) {
      var subjectPublicId = value;
      var url = window.location.origin + '/tag/get_tags_of_subject/' + subjectPublicId;
      $.ajax({
        url: url,
        type: 'GET',
        success: function success(result) {
          var tags = result;
          $('.tagsOfQuestion .menu').html('');
          $('.tagsOfQuestion').dropdown('clear');

          if (tags.length > 0) {
            tags.forEach(function (ele) {
              var html = '<div class="item" data-value="' + ele.public_id + '">';
              html += '<img class="ui mini avatar image" src="' + ele.img_url + '">';
              html += '<span class="menuSubjectName">' + ele.name_en + '</span>';
              html += '<span class="menuNewLine"><br><br></span>';
              html += '<span class="menuSubjectDesc">';
              html += '<a href="https://www.google.com/" target="_blank"><i class="fas fa-info-circle"></i></a>&nbsp;';
              html += ele.desc_en;
              html += '</span>';
              html += '</div>';
              $('.tagsOfQuestion .menu').append(html);
            });
          }
        },
        error: function error(err) {
          console.log(err);
        }
      });
    }
  });
  $('.tagsOfQuestion').dropdown({
    forceSelection: false
  });
  $('#formAskQuestion').submit(function (e) {
    var canSubmit = true;
    var valueSubject = $('.subjectOfQuestion').dropdown('get value');
    var hasValueDesc = $('tvy-content-editor').attr('data-has-value');
    var descElements = $('.questionContentManagement .TVYContentOrder').children();

    if (hasValueDesc !== 'true' || descElements.length < 1) {
      new _NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"](_NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"].WARNING, 'Please add description for your question').show();
      canSubmit = false;
    } else {
      if (valueSubject === '') {
        new _NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"](_NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"].WARNING, 'Please choose a related subject').show();
        canSubmit = false;
      } else {
        var valueTags = $('.tagsOfQuestion').dropdown('get value');

        if (valueTags === '') {
          new _NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"](_NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"].WARNING, 'Please choose at least one related tag').show();
          canSubmit = false;
        }
      }
    }

    if (!canSubmit) {
      e.preventDefault();
    }
  });
});

/***/ }),

/***/ 2:
/*!******************************************************!*\
  !*** multi ./resources/js/question/post_question.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Vannyou\KC\kc_web\resources\js\question\post_question.js */"./resources/js/question/post_question.js");


/***/ })

/******/ });