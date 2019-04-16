import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import dictionary from './lang/dictionary'
import 'bootstrap/dist/css/bootstrap.css'
import store from '@/stores'
import VueI18n from 'vue-i18n'
import lang from './lang'

Vue.config.productionTip = false
Validator.localize(dictionary)

Vue.use(VeeValidate)
Vue.use(VueI18n)

Validator.extend('password', {
  getMessage: () => dictionary.en.password.strong_password,
  validate: value => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    return strongRegex.test(value)
  }
})

const i18n = new VueI18n({
  locale: 'en',
  messages: lang,
})

new Vue({
  render: h => h(App),
  store,
  router,
  i18n,
}).$mount('#app')
