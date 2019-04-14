<template>
  <div class="container">
    <div class="form-group">
      <label class="control-label">URL API</label>
      <div class="col-sm-10">
        <input v-model="url" autocomplete="off" type="text" class="form-control" placeholder="customers">
      </div>
    </div>
    <button class="btn btn-sm btn-primary" @click="callApi">Call Api</button>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import axios from 'axios'
window.axios = axios

export default {
  name: 'TestPage',

  data: () => ({
    url: '',
    result: '',
  }),

  methods: {
    callApi() {
      axios.get(this.url)
        .then(result => {
          this.result = result.data
        })
        .catch(error => {
          this.result = error
        })
    },
  },
}
</script>
