<template>
  <div>
    <h1>Profile</h1>

    <p>
      <strong>id:</strong>
      {{ loggedInUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ loggedInUser.email }}
    </p>
    <p>
      <strong>Phone:</strong>
      {{ loggedInUser.phone }}
    </p>

    <br>
    <br>

    <h4>
      Change Password:
    </h4>

    <br>

    <Notification :message="error" v-if="error" />

    <form method="post" @submit.prevent="onSubmit">
      <div class="field">
        <div class="control">
          <input type="password" name="password" placeholder="Current password" v-model="old_password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="password" name="password" placeholder="New password" v-model="password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="password" name="password_confirmation" placeholder="Confirm new password" v-model="password_confirmation">
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
  data() {
    return {
      old_password: '',
      password: '',
      password_confirmation: '',
      error: null,
    }
  },

  // call fetch only on client-side
  // fetchOnServer: false,
  // async fetch() {
  //   const res = await this.$axios.get('/sessions')
  //   this.current_id = res.data.current_id
  //   this.sessions = res.data.sessions
  // },

  computed: {
    loggedInUser() {
      return this.$auth.loggedIn
    },
  },

  methods: {
    onSubmit() {
      const payload = {
        // email: this.loggedInUser.email,
        old_password: this.old_password,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }

      this.$axios.post('/password', payload)
        .then(res => {
          alert('password was changes')
          this.clearForm()
        })
        .catch(e => {
          this.error = e.response ? e.response.data.message : e
        })
    },

    clearForm() {
      this.old_password = ''
      this.password = ''
      this.password_confirmation = ''
      this.error = null
    },
  },

}
</script>

<style>

</style>
