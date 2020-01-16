
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// Vue.config.productionTip = false;
//
// const app = new Vue({
//     // el: '#app'
// });

/**
 * Semantic UI
 */
require('semantic-ui/dist/semantic.min');

// window.onload = function(){
//     $('.ui.dropdown').dropdown();
// };

$('.btnWithToolTip').popup();

/**
 * CodeMirror scripts
 */
require('codemirror/mode/css/css');
require('codemirror/mode/go/go');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/php/php');
require('codemirror/mode/swift/swift');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/sass/sass');
require('codemirror/mode/shell/shell');
require('codemirror/mode/sql/sql');
require('codemirror/mode/xml/xml');

require('codemirror/addon/display/autorefresh');

require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/javascript-hint');

require('codemirror/addon/selection/mark-selection');
require('codemirror/addon/selection/active-line');

require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/edit/matchtags');

/**
 * KC Scripts
 */
require('./navbar');
require('./auth/login');
require('./form_alert_message');
require('./question/post_question');
require('./reusable_components/content_management_preview');
require('./reusable_components/content_editor');
require('./reusable_components/content_action_view');
require('./reusable_components/list_content_action_view');
