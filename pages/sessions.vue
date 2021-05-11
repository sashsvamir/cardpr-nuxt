<template>
  <div>
    <h1>Sessions</h1>
    <button @click="$fetch">Refresh</button>
    <table class="sessions">
      <thead class="session">
        <tr>
          <th>#</th>
          <th>ip_address</th>
          <th>user_agent</th>
          <th>last_activity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(session, key) in sessions" :key="session.id" class="session" :class="{active: session.id === current_id}">
          <td>{{ key+1 }}</td>
          <td>{{ session.ip_address }}</td>
          <td>{{ session.user_agent }}</td>
          <td>{{ session.last_activity }}</td>
          <td>
            <button @click="onClickRemove(session)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      current_id: null,
      sessions: []
    }
  },

  // call fetch only on client-side
  fetchOnServer: false,
  async fetch() {
    const res = await this.$axios.get('/sessions')
    this.current_id = res.data.current_id
    this.sessions = res.data.sessions
  },

  methods: {
    async onClickRemove(session) {

      await this.$axios.get('/csrf') // get csrf cookie

      this.$axios.delete('/session/' + session.id)
        .then(res => {
          this.fetch()
        })
        .catch(err => console.log(err))
    },
  },

}
</script>

<style>
.sessions {
  margin-top: 20px;
  width: 100%;
  text-align: left;
}
.sessions td, .sessions th {
  padding: 10px;
}
.active {
  color: dodgerblue;
}
</style>
