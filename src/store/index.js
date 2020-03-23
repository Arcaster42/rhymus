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
    isCorrect: null,
    timer: null,
    playTimeSeconds: 30
  },
  getters: {
    puzzlesArrayCount: state => {
      return state.puzzlesArray.length
    }
  },
  mutations: {
    incrementCardNumber: state => { 
      return state.cardNumber++ 
    },
    isGameStartedBoolean: (state, payload) => {
      return state.isGameStarted = payload.boolean 
    },
    initializeCardNumber: state => { 
      return state.cardNumber = 1
    },
    setTimeRemaining: (state, payload) => {  
      return state.timeRemaining = payload.time
    },
    decrementTimeRemaining: state => {
      return state.timeRemaining--
    },
    initializeGuessValue: state => {
      return state.guessValue = ''
    },
    updateGuessValue: (state, payload) => {
      return state.guessValue = payload.val
    },
    initializeTotalCorrect: state => {
      return state.totalCorrect = 0
    },
    incrementTotalCorrect: state => {
      return state.totalCorrect++
    },
    initializeTotalWrong: state => {
      return state.totalWrong = 0
    },
    incrementTotalWrong: state => {
      return state.totalWrong++
    },
    isFirstGameBoolean: state => { 
      return state.isFirstGame = (state.isFirstGame) ? false : state.isFirstGame
    },
    initializeHintText: state => {
      return state.hintText = ''
    },
    updateHintText: (state, payload) => {
      return state.hintText = `Hint: ${payload.capitalizeFirstLetter}`
    },
    initializeWrongText: state => {
      return state.wrongText = ''
    },
    updateWrongText: (state, payload) => {
      return state.wrongText = `incorrect guesses: ${payload.incorrectGuesses}`
    },
    isRestartButtonDisabledBoolean: (state, payload) => {
      return state.isRestartButtonDisabled = payload.boolean
    },
    updateStylingObject: (state, payload) => {
      return state.stylingObject[payload.elementType] = payload.css
    },
    updateClassNameObject: (state, payload) => {
      return state.classNameObject[payload.elementType][payload.classNameKey] = payload.classNameValue
    },
    updateRhymusGame: (state, payload) => { 
      return state.RhymusGame[payload.property] = payload.value
    },
    initializeIncorrectGuesses: state => {
      return state.incorrectGuesses = 0
    },
    incrementIncorrectGuesses: state => {
      return state.incorrectGuesses++
    },
    initializeCorrectGuesses: state => {
      return state.correctGuesses = 0
    },
    incrementCorrectGuesses: state => {
      return state.correctGuesses++
    },
    isCorrectBoolean: (state, payload) => {
      return state.isCorrect = payload.boolean
    },
    updateTimer: (state, payload) => {
      return state.timer = payload.event
    }
  },
  actions: {
    loadCard(context, nextCard) {
      context.commit('updateRhymusGame', { property: 'currentCard', value: nextCard })
      context.commit('initializeGuessValue')
      context.commit('initializeHintText')
      context.commit('initializeWrongText')
      context.commit('initializeIncorrectGuesses')
      context.dispatch('resetTimer')
    },
    resetTimer(context) {
      clearInterval(context.state.timer)
      context.commit('updateTimer', { event: setInterval( () => context.dispatch('countDown'), 1000) })
    },
    countDown(context) {
      context.state.timeRemaining === 0 ? context.dispatch('gameOver') : context.commit('decrementTimeRemaining')
    },
    gameOver(context) { 
      // Accounts for array starting at 0
      if (context.state.timeRemaining === 0 || context.state.correctGuesses + 1 === context.getters.puzzlesArrayCount || context.state.incorrectGuesses > 3) {
          context.commit('isFirstGameBoolean')
          context.commit('isGameStartedBoolean', { boolean: false })
          context.commit('updateClassNameObject', { elementType: 'timerDisplay', classNameKey: 'running', classNameValue: false })
          context.commit('updateClassNameObject', { elementType: 'timerDisplay', classNameKey: 'gameover', classNameValue: true })
          context.commit('updateRhymusGame', { property: 'rhymeElementText', value: 'Game Over!' })                                              
          context.commit('updateStylingObject', { elementType: 'timerDisplay', css: { background: 'var(--danger)' }})
          context.commit('updateStylingObject', { elementType: 'cardBlock', css: { background: 'var(--danger)' }})
          context.commit('updateStylingObject', { elementType: 'hint', css: { display: 'none' }})
      }
    },
  }
})
