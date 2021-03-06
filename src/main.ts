// import { Labels } from '@/views/Labels.vue';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;
Vue.component("Nav", Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);


new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');

if (document.documentElement.clientWidth > 500) {
  const img = document.createElement('img');
  img.src = 'img/qrcode.png'
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'translate(-50%,-50%)'
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
  document.documentElement.onclick = () => {
    img.style.display = 'none'//点击任何地方隐藏二维码
  }
  document.body.appendChild(img)
}