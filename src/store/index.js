import Vue from 'vue'
import Vuex from 'vuex'
import puzzlesArray from '../puzzles'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    puzzlesArray: puzzlesArray,
    cardNumber: 1,
    isGameStarted: false,
    timeRemaining: null,
    guessValue: '',
    totalCorrect: 0,
    totalWrong: 0,
    isFirstGame: true,
    hintText: '',
    wrongText: '',
    isRestartButtonDisabled: true
  },
  getters: {
    puzzlesArrayCount: state => state.puzzlesArray.length
  },
  mutations: {
    incrementCardNumber: state => state.cardNumber++,
    isGameStartedBoolean: (state, payload) => state.isGameStarted = payload.boolean,
    initializeCardNumber: state => state.cardNumber = 1,
    setTimeRemaining: (state, payload) => state.timeRemaining = payload.time,
    decrementTimeRemaining: state => state.timeRemaining--,
    initializeGuessValue: state => state.guessValue = '',
    updateGuessValue: (state, payload) => state.guessValue = payload.val,
    initializeTotalCorrect: state => state.totalCorrect = 0,
    incerementTotalCorrect: state => state.totalCorrect++,
    initializeTotalWrong: state => state.totalWrong = 0,
    incerementTotalWrong: state => state.totalWrong++,
    isFirstGameBoolean: state => state.isFirstGame = (state.isFirstGame) ? false : state.isFirstGame,
    initializeHintText: state => state.hintText = '',
    updateHintText: (state, payload) => state.hintText = `Hint: ${payload.capitalizeFirstLetter}`,
    initializeWrongText: state => state.wrongText = '',
    updateWrongText: (state, payload) => state.wrongText = `incorrect guesses: ${payload.incorrectGuesses}`,
    isRestartButtonDisabledBoolean: (state, payload) => state.isRestartButtonDisabled = payload.boolean
  },
  actions: {
  },
  modules: {
  }
})
