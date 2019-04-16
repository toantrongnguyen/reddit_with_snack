import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import dictionary from './lang/dictionary'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Validator.localize(dictionary)

Vue.use(VeeValidate)

Validator.extend('password', {
  getMessage: () => dictionary.en.password.strong_password,
  validate: value => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    return strongRegex.test(value)
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
