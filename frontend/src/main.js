import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import store from './store'

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000/api/',
});

Vue.prototype.$http = http;

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
