<template>
  <div id="app">
    <section id="game_canvas">
      <Header :startGame="startGame" />
      <RhymeCard :assignListeners="assignListeners"
                 @input="guessValueUpdate" />
    </section>
  </div>
</template>

<script>
import Header from './components/Header'
import RhymeCard from './components/RhymeCard'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    Header,
    RhymeCard,
  },
  data() {
          return {
            playTimeSeconds: 30,
          }
      },
  methods: {
    startGame(e) {      
      this.$store.commit('isGameStartedBoolean', { boolean: true })
      this.$store.commit('setTimeRemaining', { time: this.playTimeSeconds })
      this.$store.commit('isRestartButtonDisabledBoolean', { boolean: false })
      this.$store.commit('updateStylingObject', { elementType: 'timerDisplay', 
                                                  css: (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null })
      this.$store.commit('updateStylingObject', { elementType: 'cardBlock', 
                                                  css: (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null })
      this.$store.commit('updateClassNameObject', { elementType: 'timerDisplay', classNameKey: 'running',
                                                    classNameValue: (this.isGameStarted) ? true : null })
      this.$el.querySelector('#rhyme_guess').focus()
      this.loadCard(this.puzzlesArray[0])

      if (e.target.classList.contains('header_button_start')) {
        this.shufflePuzzles(this.puzzlesArray)
      }
      if (!this.isFirstGame) {
        this.$store.commit('initializeCardNumber')
        this.$store.commit('initializeCorrectGuesses')
        this.$store.commit('initializeIncorrectGuesses')
        this.$store.commit('initializeTotalCorrect')
        this.$store.commit('initializeTotalWrong')
      }
    },
    assignListeners(e) {
      if ((e.key === 'Enter') && this.isGameStarted) this.checkAnswer()
    },
    loadCard(nextCard) {
      this.$store.commit('updateRhymusGame', { property: 'currentCard', value: nextCard })
      this.$store.commit('initializeGuessValue')
      this.$store.commit('initializeHintText')
      this.$store.commit('initializeWrongText')
      this.$store.commit('initializeIncorrectGuesses')
      this.resetTimer()
    },
    resetTimer() {
      clearInterval(this.timer)
      this.$store.commit('updateTimer', { event: setInterval(this.countDown, 1000)})
    },
    countDown() {
      this.timeRemaining === 0 ? this.gameOver() : this.$store.commit('decrementTimeRemaining')
    },
    shufflePuzzles(arr1) {
      let ctr = arr1.length
      let index
      let array
      while(ctr > 0) {
          index = Math.floor(Math.random() * ctr)
          ctr --,
          array = [arr1[index], arr1[ctr]] = [arr1[ctr], arr1[index]]
      }
      return array
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
              this.loadCard(this.puzzlesArray[this.cardNumber])
          }
          else {
              this.gameOver()
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
          this.gameOver()
      }
    },
    gameOver() {
        // Accounts for array starting at 0
      if (this.timeRemaining === 0 || this.correctGuesses + 1 === this.puzzlesArrayCount || this.incorrectGuesses > 3) {
          this.$store.commit('isFirstGameBoolean')
          this.$store.commit('isGameStartedBoolean', { boolean: false })
          this.$store.commit('updateClassNameObject', { elementType: 'timerDisplay', classNameKey: 'running', classNameValue: false })
          this.$store.commit('updateClassNameObject', { elementType: 'timerDisplay', classNameKey: 'gameover', classNameValue: true })
          this.$store.commit('updateRhymusGame', { property: 'rhymeElementText', value: 'Game Over!' })                                              
          this.$store.commit('updateStylingObject', { elementType: 'timerDisplay', css: { background: 'var(--danger)' }})
          this.$store.commit('updateStylingObject', { elementType: 'cardBlock', css: { background: 'var(--danger)' }})
          this.$store.commit('updateStylingObject', { elementType: 'hint', css: { display: 'none' }})
      }
    }
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
      'isGameStartedBoolean', 
      'initializeCardNumber', 
      'setTimeRemaining', 
      'decrementTimeRemaining', 
      'initializeGuessValue', 
      'updateGuessValue',
      'initializeTotalCorrect',
      'incrementTotalCorrect',
      'initializeTotalWrong',
      'incrementTotalWrong',
      'isFirstGameBoolean',
      'initializeHintText',
      'updateHintText',
      'initializeWrongText',
      'updateWrongText',
      'isRestartButtonDisabledBoolean',
      'updateStylingObject',
      'updateClassNameObject',
      'updateRhymusGame',
      'initializeIncorrectGuesses',
      'incrementIncorrectGuesses',
      'initializeCorrectGuesses',
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
