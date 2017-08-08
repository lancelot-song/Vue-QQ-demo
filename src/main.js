import Vue from 'vue';
import VueResource from "Vue-resource";
import baseCSS from '../static/css/base.css';
import mainCss from '../static/css/main.css';
import App from './App.vue';
import Touch from './Touch';
import router from './router'

Vue.use(VueResource)
let $root = null

Vue.prototype.$Touch = {
    setRoot (vm) {
        $root = vm
    },
    hideGlobalNav () {
        $root.state.globalNavShow = false
    },
    showGlobalNav () {
        $root.state.globalNavShow = true
    }
}
let swiper = new Touch();
Vue.prototype.$swipe = swiper;

const app = new Vue({
    router,
    render : h => h(App)
}).$mount("#app")



//footRouter.start(App,"app");