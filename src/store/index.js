import Vue from 'vue'
import Vuex from 'vuex'
import puzzlesArray from '../puzzles'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    puzzlesArray: puzzlesArray,
    cardNumber: 1,
    isGameStarted: false,
    timeRemaining: null
  },
  getters: {
    puzzlesArrayCount: state => state.puzzlesArray.length
  },
  mutations: {
    incrementCardNumber: state => state.cardNumber++,
    isGameStartedBoolean: (state, payload) => state.isGameStarted = payload.boolean,
    initializeCardNumber: state => state.cardNumber = 1,
    setTimeRemaining: (state, payload) => state.timeRemaining = payload.time,
    decrementTimeRemaining: state => state.timeRemaining--
  },
  actions: {
  },
  modules: {
  }
})
