<template>
  <div class='login-page-display container-fluid'>
    <div class="row">
      <authentication-layout></authentication-layout>
      <brief-description></brief-description>
    </div>
  </div>
</template>

<script>
import AuthenticationLayout from '@/components/Login/AuthenticationLayout'
import BriefDescription from '@/components/Login/BriefDescription'
import RedirectIfAuthenticated from '@/mixins/RedirectIfAuthenticated'

export default {
  name: 'LoginPage',

  mixins: [RedirectIfAuthenticated],

  components: {
    AuthenticationLayout,
    BriefDescription,
  },

  created() {
    this.__protectRoute()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
