
const state = {
  giftCache: JSON.parse(sessionStorage.getItem("giftCache")) || [],
}

const mutations = {
  INIT_GIFT_CACHE: (state, data) => {
    // eslint-disable-next-line no-prototype-builtins
    sessionStorage.setItem('giftCache', JSON.stringify(data))
    state.giftCache=data
  }
}

const actions = {
  initGiftCache({ commit }, data) {
    commit('INIT_GIFT_CACHE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

