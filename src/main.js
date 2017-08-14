import Vue from 'vue';
import VueResource from "Vue-resource";
import VueSwipe from "./directive/vue-swipe.js";
import baseCSS from '../static/css/base.css';
import mainCss from '../static/css/main.css';
import App from './App.vue';
//import Touch from './Touch';
import router from './router';
import { emoji } from './api/emoji.js';

Vue.use(VueResource);
Vue.use(VueSwipe);
let $root = null
//Vue.prototype.$Touch = {
//  setRoot (vm) {
//      $root = vm
//  },
//  hideGlobalNav () {
//      $root.state.globalNavShow = false
//  },
//  showGlobalNav () {
//      $root.state.globalNavShow = true
//  }
//}
//let swiper = new Touch();
//Vue.prototype.$swipe = swiper;
Vue.prototype.emoji = emoji;

const app = new Vue({
    router,
    render : h => h(App)
}).$mount("#app")



//footRouter.start(App,"app");