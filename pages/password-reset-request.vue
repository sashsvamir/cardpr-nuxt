<template>
  <div>
    <h1>Request Reset Password</h1>

    <br>

    <Notification :message="error" v-if="error" />

    <form method="post" @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input type="email" name="email" placeholder="email" v-model="email">
        </div>
      </div>
      <div class="control">
        <button type="submit">Submit</button>
      </div>
    </form>

    <p v-if="reset_password_token">
      Try to reset by follow:
      <NuxtLink :to="{ path: '/password-reset', query: { token: reset_password_token, email: email }}">
        {{ reset_password_token }}
      </NuxtLink>
    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      error: null,

      reset_password_token: null,
    }
  },

  methods: {
    async onSubmit() {
      const payload = {
        email: this.email,
      }

      await this.$axios.get('/csrf') // get csrf cookie

      this.$axios.post('/password-reset-request', payload)
        .then(res => {
          alert('Check your email to reset password link')
          this.reset_password_token = res.data.token
          this.error = null
        })
        .catch(e => {
          this.error = e.response ? e.response.data.message : e
        })
    },

  },

}
</script>

<style>

</style>
