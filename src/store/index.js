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
    isRestartButtonDisabled: true,
    stylingObject: {
      guessElement: null,
      cardBlock: null,
      timerDisplay: null,
      hint: {}
    },
    classNameObject: {
      guessElement: {},
      cardBlock: {},
      timerDisplay: {
        center: true
      }
    },
    RhymusGame: {
      currentCard: undefined,
      rhymeElementText: 'Press start to play!'
    },
    incorrectGuesses: 0,
    correctGuesses: 0,
    isCorrect: null
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
    incrementTotalCorrect: state => state.totalCorrect++,
    initializeTotalWrong: state => state.totalWrong = 0,
    incrementTotalWrong: state => state.totalWrong++,
    isFirstGameBoolean: state => state.isFirstGame = (state.isFirstGame) ? false : state.isFirstGame,
    initializeHintText: state => state.hintText = '',
    updateHintText: (state, payload) => state.hintText = `Hint: ${payload.capitalizeFirstLetter}`,
    initializeWrongText: state => state.wrongText = '',
    updateWrongText: (state, payload) => state.wrongText = `incorrect guesses: ${payload.incorrectGuesses}`,
    isRestartButtonDisabledBoolean: (state, payload) => state.isRestartButtonDisabled = payload.boolean,
    updateStylingObject: (state, payload) => state.stylingObject[payload.elementType] = payload.css,
    updateClassNameObject: (state, payload) => state.classNameObject[payload.elementType][payload.classNameKey] = payload.classNameValue,
    updateRhymusGame: (state, payload) => state.RhymusGame[payload.property] = payload.value,
    initializeIncorrectGuesses: state => state.incorrectGuesses = 0,
    incrementIncorrectGuesses: state => state.incorrectGuesses++,
    initializeCorrectGuesses: state => state.correctGuesses = 0,
    incrementCorrectGuesses: state => state.correctGuesses++,
    isCorrectBoolean: (state, payload) => state.isCorrect = payload.boolean
  },
  actions: {
  },
  modules: {
  }
})
