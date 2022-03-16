// import { Labels } from '@/views/Labels.vue';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagsListModel from './models/tagsListModel';

Vue.config.productionTip = false;
Vue.component("Nav", Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagsListModel.fetch();
window.createTag = (name: string) => {
  const message = tagsListModel.create(name);
  if (message === "duplicated") {
    window.alert("标签名重复");
  }
};
window.removeTag = (id: string) => {
  return tagsListModel.remove(id);
};
window.updateName = (id: string, name: string) => {
  tagsListModel.updateTagName(id, name);
};

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');