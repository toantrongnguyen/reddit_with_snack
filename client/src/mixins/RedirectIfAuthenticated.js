import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('Global', [
      'isLogin',
    ]),
  },

  methods: {
    __protectRoute() {
      if (this.isLogin) {
        this.__redirect()
      }
    },

    __redirect() {
      const redirect = {
        'name': 'homepage'
      }

      this.$router.push(redirect)
    },
  },
}
