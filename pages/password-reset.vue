<template>
  <div>
    <h1>Reset Password</h1>

    <br>

    <Notification :message="error" v-if="error" />

    <form method="post" @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input type="password" name="password" placeholder="Password" v-model="password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="password" name="password_confirmation" placeholder="Confirm Password" v-model="password_confirmation">
        </div>
      </div>
      <div class="control">
        <button type="submit">Submit</button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      password_confirmation: '',
      error: null,

      email: null,
      reset_password_token: null,
    }
  },

  mounted() {
    this.reset_password_token = this.$route.query.token
    this.email = this.$route.query.email
  },

  methods: {
    onSubmit() {
      const payload = {
        email: this.email,
        token: this.reset_password_token,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }

      this.$axios.post('/password-reset', payload)
        .then(res => {
          alert('Your password was reset, try to login')
          // this.error = null
          this.$router.push('/login')
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
