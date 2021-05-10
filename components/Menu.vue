<template>
  <div class="menu">
    <NuxtLink to="/">Main</NuxtLink>
    <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
    <NuxtLink v-if="isAuthenticated" to="/register">Add user</NuxtLink>
    <NuxtLink v-if="isAuthenticated" to="/sessions">Sessions</NuxtLink>
    <NuxtLink v-if="isAuthenticated" to="/profile">Profile</NuxtLink>

    <a v-if="isAuthenticated" @click="onClickLogout">Logout</a>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$auth.loggedIn
    }
  },
  methods: {
    onClickLogout() {
      this.$auth.logout(/*'/logout'*/)
        .then(res => {
          // this.$store.commit('auth/logout')
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style>
.menu {
  margin-bottom: 50px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
  .menu a {
    cursor: pointer;
    color: #3b8070;
    padding-right: 10px;
    margin-right: 10px;
  }
  .menu a:hover {
    color: #35495e;
  }
</style>
