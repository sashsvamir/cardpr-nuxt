<template>
  <div>

    <h1>Add user</h1>
    <h2>not implemented</h2>

    <Notification :message="error" v-if="error" />

    <form method="post" @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input type="tel" name="phone" placeholder="Your Phone number" v-model="phone">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="text" name="email" placeholder="Your email" v-model="email">
        </div>
      </div>
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
  middleware: 'authenticated',
  data: function () {
    return {
      phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: null,
    }
  },
  methods: {

    async onSubmit() {
      const payload = {
        phone: this.phone,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }

      try {
        await this.$axios.post('/register', payload)
      } catch(e) {
        this.error = e.response ? e.response.data.message : e
      }
    },

  }
}
</script>

<style>

</style>
