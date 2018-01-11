import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router/dist/vue-router.min';//vue-router
import App from './app';

import myPlugin from './plugins/myPlugin';
Vue.use(myPlugin);

import storeOption from './vuex/store';
import routes from './routes';

import FastClick from 'fastclick' 
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueRouter);

FastClick.attach(document.body);

Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'error',
  loading: 'assets/images/commons/icon2.png',
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
})

window.store = new Vuex.Store(storeOption);

window.router = new VueRouter({
  routes: routes,
  hashbang:true,//将路径格式化为#!开头,
  // mode:'history'
});

var LogSign = 'Loging';
window.thisPage = '';
router.beforeEach((to, from, next) => {
    var len = routes.length;
    for (var i = 0; i<len; i++) {
       if(routes[i].path==to.path){
           document.title=Mconf.name+'-'+routes[i].title;
           window.thisPage=routes[i];
           break;
       }
    }
    // 登录验证
    if(to.matched.some( m => m.meta.auth)){
        if(store.state.isLogin==LogSign||cm.getLS('isLogin')==LogSign) {
            if(store.state.isLogin!=LogSign){
              store.commit('isLogin',LogSign);
            }
            next();
        }else{
            next({path:'/mine/log'});
 　　　 } 
　　}else{ 
　　　　 next();
　　}
})

window.cmApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});