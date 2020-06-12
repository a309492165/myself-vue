export default {
  namespaced: true,
  state: {
    catalogId: null,
    articleId: null
  },
  getters: {
    getCatalogId (state) {
      if (!state.catalogId) {
        state.catalogId = sessionStorage.getItem('catalogId')
      }
      return state.catalogId
    },
    getArticleId (state) {
      if (!state.articleId) {
        state.articleId = sessionStorage.getItem('articleId')
      }
      return state.articleId
    }
  },
  mutations: {
    setCatalogId (state, id) {
      state.catalogId = id
      sessionStorage.setItem('catalogId', id)
    },
    setArticleId (state, id) {
      state.articleId = id
      sessionStorage.setItem('articleId', id)
    }
  }
}
