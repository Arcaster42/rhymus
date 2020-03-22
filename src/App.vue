<template>
  <div id="app">
    <section id="game_canvas">
      <Header :startGame="startGame" 
              :isRestartButtonDisabled="isRestartButtonDisabled"/>
      <RhymeCard :stylingObject="stylingObject"
                 :isGameStarted="isGameStarted"
                 :assignListeners="assignListeners"
                 :RhymusGame="RhymusGame"
                 :cardNumber="cardNumber"
                 :classNameObject="classNameObject"
                 :guessValue="guessValue"
                 :hintText="hintText"
                 :wrongText="wrongText"
                 :timeRemaining="timeRemaining"
                 @input="guessValueUpdate"
                 :totalWrong="totalWrong"
                 :totalCorrect="totalCorrect"
                 :isFirstGame="isFirstGame" />
    </section>
  </div>
</template>

<script>
import Header from './components/Header'
import RhymeCard from './components/RhymeCard'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    Header,
    RhymeCard,
  },
  data() {
          return {
            playTimeSeconds: 30,
            timeRemaining: null,
            cardNumber: 1,
            correctGuesses: 0,
            totalCorrect: 0,
            totalWrong: 0,
            isGameStarted: false,
            isRestartButtonDisabled: true,
            stylingObject: {
              guessElement: null,
              cardBlock: null,
              timerDisplay: null,
              hint: {}
            },
            RhymusGame: {
              currentCard: undefined,
              rhymeElementText: 'Press start to play!'
            },
            timer: null,
            classNameObject: {
              guessElement: {},
              cardBlock: {},
              timerDisplay: {
                center: true
              }
            },
            guessValue: '',
            hintText: '',
            incorrectGuesses: 0,
            wrongText: '',
            isCorrect: null,
            isFirstGame: true
          }
      },
  methods: {
    startGame(e) {      
      this.isGameStarted = true
      this.timeRemaining = this.playTimeSeconds
      this.isRestartButtonDisabled = false

      this.stylingObject.timerDisplay = (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null
      this.stylingObject.cardBlock = (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null
      this.$el.querySelector('#rhyme_guess').focus()
      this.loadCard(this.puzzlesArray[0])
      this.classNameObject.timerDisplay.running = (this.isGameStarted) ? true : null
      if (e.target.classList.contains('header_button_start')) {
        this.shufflePuzzles(this.puzzlesArray)
      }
      if (!this.isFirstGame) {
        this.cardNumber = 1
        this.correctGuesses = 0
        this.incorrectGuesses = 0
        this.totalCorrect = 0
        this.totalWrong = 0
      }
    },
    assignListeners(e) {
      if ((e.key === 'Enter') && this.isGameStarted) this.checkAnswer()
    },
    loadCard(nextCard) {
      this.RhymusGame.currentCard = nextCard
      this.guessValue = ''
      this.hintText = ''
      this.wrongText = ''
      this.incorrectGuesses = 0
      this.resetTimer()
    },
    resetTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(this.countDown, 1000)
    },
    countDown() {
      this.timeRemaining === 0 ? this.gameOver() : this.timeRemaining--
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
          this.isCorrect = true
          this.totalCorrect++
          this.correctAnswer()
          } else if (this.guessValue === '' || undefined) {
          alert('Please enter a guess!')
          } else {
          this.isCorrect = false
          this.totalWrong++
          this.incorrectAnswer()
      }
    },
    guessValueUpdate(val) {
      this.guessValue = val
    },
    correctAnswer() {
      this.classNameObject.cardBlock.correct = this.isCorrect ? true : null
      this.classNameObject.guessElement.correct = this.isCorrect ? true : null
      this.cardNumber++
      this.correctGuesses++
      setTimeout(() => {
          this.classNameObject.cardBlock.correct = false
          this.classNameObject.guessElement.correct = false
          if (this.cardNumber < this.puzzlesArrayCount) {
              this.loadCard(this.puzzlesArray[this.cardNumber])
          }
          else {
              this.gameOver()
          }
      }, 800)
    },
    incorrectAnswer() {
      this.classNameObject.cardBlock.incorrect = this.isCorrect ? null : true
      this.classNameObject.guessElement.incorrect = this.isCorrect ? null : true
      this.incorrectGuesses++
      this.guessValue = ''

      setTimeout(() => {
          this.classNameObject.cardBlock.incorrect = false
          this.classNameObject.guessElement.incorrect = false
      }, 500)
      this.wrongText = `incorrect guesses: ${this.incorrectGuesses}`
      //if there are more than 4 incorrect guesses on a single card the player loses
      if (this.incorrectGuesses > 1 && this.incorrectGuesses < 4) {
          this.stylingObject.hint.display = 'flex'
          this.hintText = 'Hint: ' + this.capitalizeFirstLetter
      } else {
          this.gameOver()
      }
    },
    gameOver() {
        // Accounts for array starting at 0
      if (this.timeRemaining === 0 || this.correctGuesses + 1 === this.puzzlesArrayCount || this.incorrectGuesses > 3) {
          this.isFirstGame = (this.isFirstGame) ? false : this.isFirstGame
          this.isGameStarted = false
          this.classNameObject.timerDisplay.running = false
          this.classNameObject.timerDisplay.gameover = true
          this.RhymusGame.rhymeElementText = 'Game Over!'
          this.stylingObject.timerDisplay.background = 'var(--danger)'
          this.stylingObject.cardBlock.background = 'var(--danger)'
          this.stylingObject.hint.display = 'none'
      }
    }
  },
  computed: {
    capitalizeFirstLetter() {
      return this.RhymusGame.currentCard.hint.charAt(0).toUpperCase() + this.RhymusGame.currentCard.hint.slice(1).toLowerCase()
    },
    ...mapState([
      'puzzlesArray'
    ]),
    ...mapGetters([
      'puzzlesArrayCount'
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
