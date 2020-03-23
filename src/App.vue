<template>
  <div id="app">
    <section id="game_canvas">
      <Header />
      <RhymeCard :assignListeners="assignListeners"
                 @input="guessValueUpdate" />
    </section>
  </div>
</template>

<script>
import Header from './components/Header'
import RhymeCard from './components/RhymeCard'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    Header,
    RhymeCard,
  },
  methods: {
    assignListeners(e) {
      if ((e.key === 'Enter') && this.isGameStarted) this.checkAnswer()
    },
    checkAnswer() {
      if (this.guessValue === this.RhymusGame.currentCard.answer) {
          this.$store.commit('isCorrectBoolean', { boolean: true })
          this.$store.commit('incrementTotalCorrect')
          this.correctAnswer()
          } else if (this.guessValue === '' || undefined) {
          alert('Please enter a guess!')
          } else {
          this.$store.commit('isCorrectBoolean', { boolean: false })
          this.$store.commit('incrementTotalWrong')
          this.incorrectAnswer()
      }
    },
    guessValueUpdate(val) {
      this.$store.commit('updateGuessValue', { val: val })
    },
    correctAnswer() {
      this.$store.commit('updateClassNameObject', { elementType: 'cardBlock', classNameKey: 'correct', 
                                                    classNameValue: (this.isCorrect) ? true : null })
      this.$store.commit('updateClassNameObject', { elementType: 'guessElement', classNameKey: 'correct', 
                                                    classNameValue: (this.isCorrect) ? true : null })
      this.$store.commit('incrementCardNumber')
      this.$store.commit('incrementCorrectGuesses')
      setTimeout(() => {
          this.$store.commit('updateClassNameObject', { elementType: 'cardBlock', classNameKey: 'correct', classNameValue: false })
          this.$store.commit('updateClassNameObject', { elementType: 'guessElement', classNameKey: 'correct', classNameValue: false })                                             
          if (this.cardNumber < this.puzzlesArrayCount) {
              this.$store.dispatch('loadCard', this.puzzlesArray[this.cardNumber])
          }
          else {
              this.$store.dispatch('gameOver')
          }
      }, 800)
    },
    incorrectAnswer() {
      this.$store.commit('updateClassNameObject', { elementType: 'cardBlock', classNameKey: 'incorrect',
                                                    classNameValue: this.isCorrect ? null : true }) 
      this.$store.commit('updateClassNameObject', { elementType: 'guessElement', classNameKey: 'incorrect',
                                                    classNameValue: this.isCorrect ? null : true }) 
      this.$store.commit('incrementIncorrectGuesses')
      this.$store.commit('initializeGuessValue')

      setTimeout(() => {
          this.$store.commit('updateClassNameObject', { elementType: 'cardBlock', classNameKey: 'incorrect', classNameValue: false }) 
          this.$store.commit('updateClassNameObject', { elementType: 'guessElement', classNameKey: 'incorrect', classNameValue: false })
      }, 500)
      this.$store.commit('updateWrongText', { incorrectGuesses: this.incorrectGuesses })
      //if there are more than 4 incorrect guesses on a single card the player loses
      if (this.incorrectGuesses > 1 && this.incorrectGuesses < 4) {
          this.$store.commit('updateStylingObject', { elementType: 'hint', css: { display: 'flex' }})
          this.$store.commit('updateHintText', { capitalizeFirstLetter: this.capitalizeFirstLetter })
      } else {
          this.$store.dispatch('gameOver')
      }
    },
    ...mapActions([
      'loadCard',
      'gameOver'
    ])
  },
  computed: {
    capitalizeFirstLetter() {
      return this.RhymusGame.currentCard.hint.charAt(0).toUpperCase() + this.RhymusGame.currentCard.hint.slice(1).toLowerCase()
    },
    ...mapState([
      'puzzlesArray', 
      'cardNumber', 
      'isGameStarted', 
      'timeRemaining', 
      'guessValue', 
      'totalCorrect', 
      'isFirstGame',
      'hintText',
      'wrongText',
      'isRestartButtonDisabled',
      'stylingObject',
      'classNameObject',
      'RhymusGame',
      'incorrectGuesses',
      'correctGuesses',
      'isCorrect',
      'timer'
    ]),
    ...mapGetters([
      'puzzlesArrayCount'
    ]),
    ...mapMutations([
      'incrementCardNumber', 
      'decrementTimeRemaining', 
      'initializeGuessValue', 
      'updateGuessValue',
      'incrementTotalCorrect',
      'incrementTotalWrong',
      'isFirstGameBoolean',
      'initializeHintText',
      'updateHintText',
      'initializeWrongText',
      'updateWrongText',
      'updateStylingObject',
      'updateClassNameObject',
      'updateRhymusGame',
      'incrementIncorrectGuesses',
      'incrementCorrectGuesses',
      'updateTimer'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

:root {
  --bg: #dfdfdf;
  --primary: #3182a6;
  --danger: #ef5350;
  --white: #fff;
  --light-grey: #B0B0B0;
  --hint-grey: #EFEFEF;
  --primary-gradient: linear-gradient(166.21deg, #2a8c92 2.56%, #347bb2 122.3%);
  --s-border-radius: 3px;
  --l-border-radius: 8px;
  --base-font: 16px;
  --font: 'Roboto', sans-serif;
  --drop-shadow: 0px 4px 12px rgba(42, 101, 146, 0.4);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: auto;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg);
  font-family: var(--font);
}

section#game_canvas {
  width: 300px;
}

</style>
