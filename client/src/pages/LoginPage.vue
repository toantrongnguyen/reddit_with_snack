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

export default {
  name: 'LoginPage',
  components: {
    AuthenticationLayout,
    BriefDescription,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-page-display {
    /* display: flex; */
  }
</style>
