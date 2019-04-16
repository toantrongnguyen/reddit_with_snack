import Vuex from 'vuex'
import Vue from 'vue'
import Global from '@/stores/modules/Global'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Global
  }
})

export default store
