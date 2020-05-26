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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

/***/ "./resources/js/question/view_question.js":
/*!************************************************!*\
  !*** ./resources/js/question/view_question.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NotyAlertMessage */ "./resources/js/NotyAlertMessage.js");

$(document).ready(function () {
  var userPublicId = document.querySelector('.pageViewQuestion input[name="userPublicId"]').value; // Fill ContentActionView for current question

  var questionPublicId = document.querySelector('.pageViewQuestion input[name="questionPublicId"]').value;
  var currentQuestionContentActionView = document.querySelector('tvy-content-action-view[data-for="currentQuestion"]');
  getInfoForQuestionContentActionView(currentQuestionContentActionView, questionPublicId); // Fill ContentActionView for each answer

  var allAnswerContentActionViews = document.querySelectorAll('tvy-content-action-view[data-for="answer"]');
  allAnswerContentActionViews.forEach(function (answerContentActionView) {
    var answerPublicId = answerContentActionView.getAttribute('data-public-id');
    getInfoForAnswerContentActionView(answerContentActionView, answerPublicId);
  }); // ContentManagementPreview for answer

  var currentQuestionContentManagementPreview = document.querySelector('tvy-content-management-preview[data-for="currentAnswer"]');
  currentQuestionContentManagementPreview.contentType = 'answer';
  currentQuestionContentManagementPreview.getManagementPreview();

  function getInfoForQuestionContentActionView(contentActonView, publicId) {
    getInfoForContentActionView(contentActonView, publicId, 'question');
  }

  function getInfoForAnswerContentActionView(contentActionView, publicId) {
    getInfoForContentActionView(contentActionView, publicId, 'answer');
  }

  function getInfoForContentActionView(contentActionView, publicId, type) {
    var url = window.location.origin + "/".concat(type, "/get-info/") + publicId;

    if (userPublicId) {
      url += "?viewer=".concat(userPublicId);
    }

    $.ajax({
      url: url,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      type: 'GET',
      success: function success(result) {
        if (result.success === true) {
          var _result$data = result.data,
              owner_avatar_url = _result$data.owner_avatar_url,
              author_name = _result$data.author_name,
              author_id = _result$data.author_id,
              readable_time = _result$data.readable_time,
              description = _result$data.description,
              relativePathStoreImages = _result$data.relativePathStoreImages,
              comments = _result$data.comments,
              vote = _result$data.vote,
              vote_by_viewer = _result$data.vote_by_viewer;

          if (type === 'question') {
            var is_favorite_by_viewer = result.data.is_favorite_by_viewer;
            setUIStateBtnFavoriteQuestion(is_favorite_by_viewer);
          }

          contentActionView.vote = vote;
          contentActionView.voteByViewer = vote_by_viewer;
          contentActionView.contentType = type;
          contentActionView.ownerAvatarUrl = owner_avatar_url;
          contentActionView.authorName = author_name;
          contentActionView.authorId = author_id;
          contentActionView.readableTime = readable_time;
          contentActionView.description = JSON.parse(description);
          contentActionView.relativePathStoreImages = relativePathStoreImages;
          contentActionView.comments = comments;
          contentActionView.getViewContent();
        }
      },
      error: function error(err) {
        console.log("Error getting content of ".concat(type, " [").concat(questionPublicId, "]"), err);
      }
    });
  }

  var search = window.location.search;
  var regexSearch = /top=(\w+)&?/;
  var result = search.match(regexSearch);

  if (result) {
    $('html, body').animate({
      scrollTop: $("#".concat(result[1])).offset().top - 30
    }, 500);
  }

  $('#formAnswerQuestion').submit(function (e) {
    var canSubmit = true;
    var hasValueDesc = $('tvy-content-editor').attr('data-has-value');
    var descElements = $('.answerContentManagement .TVYContentOrder').children();

    if (hasValueDesc !== 'true' || descElements.length < 1) {
      new _NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"](_NotyAlertMessage__WEBPACK_IMPORTED_MODULE_0__["default"].WARNING, 'Please add description for your answer').show();
      canSubmit = false;
    }

    if (!canSubmit) {
      e.preventDefault();
    }
  }); // Favorite question

  $('.questionFavorite').click(function () {
    var isFavorite = $(this).hasClass('selected');
    manageFavoriteQuestion(questionPublicId, !isFavorite);
  });

  function setUIStateBtnFavoriteQuestion(isFavorite) {
    var btnFavoriteQuestion = $('.questionFavorite');

    if (isFavorite) {
      btnFavoriteQuestion.addClass('selected fas');
      btnFavoriteQuestion.removeClass('far');
    } else {
      btnFavoriteQuestion.removeClass('selected fas');
      btnFavoriteQuestion.addClass('far');
    }

    var title = btnFavoriteQuestion.hasClass('selected') ? 'Unmark as favorite' : 'Mark as favorite';
    btnFavoriteQuestion.attr('title', title);
  }

  function manageFavoriteQuestion(questionPublicId, isFavorite) {
    var url = window.location.origin + '/activity/manage-favorite-question';
    $.ajax({
      url: url,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      type: 'POST',
      data: {
        'question_public_id': questionPublicId,
        'is_favorite': isFavorite
      },
      success: function success(result) {
        if (result.success === true) {
          setUIStateBtnFavoriteQuestion(isFavorite);
        } else {
          console.log("Failed to manage favorite question", result);
        }
      },
      error: function error(err) {
        console.log("Error getting content of ".concat(type, " [").concat(questionPublicId, "]"), err);
      }
    });
  }
});

/***/ }),

/***/ 1:
/*!******************************************************!*\
  !*** multi ./resources/js/question/view_question.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Vannyou\KC\kc_web\resources\js\question\view_question.js */"./resources/js/question/view_question.js");


/***/ })

/******/ });