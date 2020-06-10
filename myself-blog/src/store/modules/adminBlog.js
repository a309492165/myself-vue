export default {
  namespaced: true,
  state: {
    catalogId: 0
  },
  mutations: {
    setCatalogId (state, id) {
      state.catalogId = id
    }
  }
}
