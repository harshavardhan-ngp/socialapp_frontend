import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from "vuelidate";
import router from "./router";
import DefaultLayout from './layout/DefaultLayout'
import BlankLayout from './layout/BlankLayout'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate);
Vue.component('DefaultLayout', DefaultLayout)
Vue.component('BlankLayout', BlankLayout)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
