export const state = () => ({
  user: null,
})

export const mutations = {

  loginWith(state, data) {
    state.user = data.user
  },

  logout(state) {
    state.user = null
  },

}
