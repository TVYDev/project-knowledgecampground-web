!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=83)}({0:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}n.d(t,"a",function(){return a});var a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.type=t,this.msg=n}return o(e,null,[{key:"ERROR",get:function(){return"error"}},{key:"SUCCESS",get:function(){return"success"}},{key:"WARNING",get:function(){return"warning"}},{key:"INFO",get:function(){return"info"}}]),o(e,[{key:"show",value:function(){new Noty({type:this.type,theme:"relax",layout:"topRight",text:this.msg,timeout:"2000",progressBar:!0,closeWith:["click"],animation:{open:"animated bounceInRight",close:"animated bounceOutRight"}}).show()}}]),e}()},83:function(e,t,n){e.exports=n(84)},84:function(e,t,n){"use strict";n.r(t);var r=n(0);$(document).ready(function(){var e=document.querySelector('.pageViewQuestion input[name="userPublicId"]').value,t=document.querySelector('.pageViewQuestion input[name="questionPublicId"]').value,n=document.querySelector('tvy-content-action-view[data-for="currentQuestion"]');a(n,t,"question"),document.querySelectorAll('tvy-content-action-view[data-for="answer"]').forEach(function(e){var t=e.getAttribute("data-public-id");a(e,t,"answer")});var o=document.querySelector('tvy-content-management-preview[data-for="currentAnswer"]');function a(n,r,o){var a=window.location.origin+"/".concat(o,"/get-info/")+r;e&&(a+="?viewer=".concat(e)),$.ajax({url:a,headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},type:"GET",success:function(e){if(!0===e.success){var t=e.data,r=t.owner_avatar_url,a=t.author_name,i=t.author_id,u=t.readable_time,s=t.description,l=t.relativePathStoreImages,f=t.comments,d=t.vote,v=t.vote_by_viewer;if("question"===o){var m=e.data,y=m.is_favorite_by_viewer,p=m.summary_info,g=p.num_views,w=p.last_active_date;c(y),h=g,b=w,(_=$(".questionSummaryInfo")).find(".numViews").text(h),_.find(".lastActive").text(b)}n.vote=d,n.voteByViewer=v,n.contentType=o,n.ownerAvatarUrl=r,n.authorName=a,n.authorId=i,n.readableTime=u,n.description=JSON.parse(s),n.relativePathStoreImages=l,n.comments=f,n.getViewContent()}var h,b,_},error:function(e){console.log("Error getting content of ".concat(o," [").concat(t,"]"),e)}})}o.contentType="answer",o.getManagementPreview();var i=window.location.search.match(/top=(\w+)&?/);function c(e){var t=$(".questionFavorite");e?(t.addClass("selected fas"),t.removeClass("far")):(t.removeClass("selected fas"),t.addClass("far"));var n=t.hasClass("selected")?"Unmark as favorite":"Mark as favorite";t.attr("title",n)}i&&$("html, body").animate({scrollTop:$("#".concat(i[1])).offset().top-30},500),$("#formAnswerQuestion").submit(function(e){var t=!0,n=$("tvy-content-editor").attr("data-has-value"),o=$(".answerContentManagement .TVYContentOrder").children();("true"!==n||o.length<1)&&(new r.a(r.a.WARNING,"Please add description for your answer").show(),t=!1),t||e.preventDefault()}),$(".questionFavorite").click(function(){var e=$(this).hasClass("selected");!function(e,t){var n=window.location.origin+"/activity/manage-favorite-question";$.ajax({url:n,headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},type:"POST",data:{question_public_id:e,is_favorite:t},success:function(e){!0===e.success?c(t):console.log("Failed to manage favorite question",e)},error:function(t){console.log("Error getting content of ".concat(type," [").concat(e,"]"),t)}})}(t,!e)})})}});