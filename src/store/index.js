import Vue from 'vue'
import Vuex from 'vuex'
import puzzlesArray from '../puzzles'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    puzzlesArray: puzzlesArray,
    cardNumber: 1
  },
  getters: {
    puzzlesArrayCount: state => state.puzzlesArray.length
  },
  mutations: {
    incrementCardNumber: state => state.cardNumber++
  },
  actions: {
  },
  modules: {
  }
})
