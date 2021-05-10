<template>
  <div>

    <h1>Login</h1>

    <Notification :message="error" v-if="error" />

    <form method="post" @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input type="text" :disabled="token_waiting" name="email" placeholder="Your email" v-model="email">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="password" :disabled="token_waiting" name="password" placeholder="Password" v-model="password">
        </div>
      </div>

      <div v-if="token_waiting" class="field">
        Please, enter sms code from number: {{ phone }}
        <div class="control">
          <input type="text" name="token" placeholder="sms code" v-model="token">
        </div>
      </div>

      <div class="control">
        <button type="submit">Submit</button>
      </div>
    </form>

    <div class="has-text-centered" style="margin-top: 20px">
      <p>
        Forgot your password? <nuxt-link to="/password-reset-request">Recover</nuxt-link>
      </p>
    </div>
  </div>

</template>

<script>
export default {

  data: function () {
    return {
      email: '',
      password: '',
      error: null,

      token_waiting: false,
      token: null,
      phone: null,
    }
  },

  methods: {

    onSubmit() {
      if (!this.token_waiting) {
        this.submitCredentials()
      } else {
        this.submitCredentialsWithToken()
      }
    },

    async submitCredentials() {
      const payload = {
        email: this.email,
        password: this.password,
      }

      try {
        const res = await this.$axios.post('/login', payload)
        this.token_waiting = true
        this.phone = res.data.phone
        this.error = null
      } catch(e) {
        this.error = e.response ? e.response.data.message : e
      }
    },

    async submitCredentialsWithToken() {
      const payload = {
        email: this.email,
        password: this.password,
        token: this.token,
      }

      try {
        await this.$auth.loginWith('local', { data: payload })
        this.error = null
      } catch(e) {
        this.error = e.response ? e.response.data.message : e
      }
    },

  }
}
</script>

<style>

</style>
