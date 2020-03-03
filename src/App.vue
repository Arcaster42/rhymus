<template>
  <div id="app">
    <section id="game_canvas">
      <Header v-bind:startGame="startGame" 
              v-bind:isRestartButtonDisabled="isRestartButtonDisabled"/>
      <RhymeCard v-bind:stylingObject="stylingObject"
                 v-bind:isGameStarted="isGameStarted"
                 v-bind:assignListeners="assignListeners"
                 v-bind:RhymusGame="RhymusGame"
                 v-bind:puzzlesArray="puzzlesArray"
                 v-bind:cardNumber="cardNumber"
                 v-bind:classNameObject="classNameObject"
                 v-bind:guessValue="guessValue"
                 v-bind:hintText="hintText"
                 v-bind:wrongText="wrongText"
                 v-bind:timeRemaining="timeRemaining"
                 v-on:input="guessValueUpdate"/>
    </section>
  </div>
</template>

<script>
import Header from './components/Header'
import RhymeCard from './components/RhymeCard'
import puzzlesArray from '../src/puzzles'
import Hello from './components/HelloWorld'
export default {
  name: 'app',
  components: {
    Header,
    RhymeCard,
    Hello
  },
  data: function () {
          return {
            puzzlesArray: puzzlesArray,
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
            isCorrect: null
          }
      },
  methods: {
    startGame: function () {
      this.isGameStarted = true
      this.timeRemaining = this.playTimeSeconds
      this.isRestartButtonDisabled = false
    },
    assignListeners: function (e) {
      if (e.key === 'Enter') this.checkAnswer()
    },
    loadCard: function (nextCard) {
      this.RhymusGame.currentCard = nextCard
      this.guessValue = ''
      this.hintText = ''
      this.wrongText = ''
      this.incorrectGuesses = 0
      this.resetTimer()
    },
    resetTimer: function () {
      clearInterval(this.time)
      this.timer = setInterval(this.countDown, 1000)
    },
    countDown: function () {
      this.timeRemaining === 0 ? console.log('gameOver()') : this.timeRemaining--
    },
    shufflePuzzles: function (arr1) {
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
    checkAnswer: function () {
      console.log(this.guessValue)
      console.log(this.RhymusGame.currentCard.answer)
      if (this.guessValue === this.RhymusGame.currentCard.answer) {
          console.log('correctAnswer()')
          this.isCorrect = true
          this.totalCorrect++
          this.correctAnswer()
          } else if (this.guessValue === '' || undefined) {
          alert('Please enter a guess!')
          } else {
          console.log('incorrectAnswer()')
          this.isCorrect = false
          this.totalWrong++
          this.incorrectAnswer()
      }
    },
    guessValueUpdate: function (val) {
      this.guessValue = val
    },
    correctAnswer: function () {
      this.classNameObject.cardBlock.correct = this.isCorrect ? true : null
      this.classNameObject.guessElement.correct = this.isCorrect ? true : null
      this.cardNumber++
      this.correctGuesses++
      setTimeout(() => {
          this.classNameObject.cardBlock.correct = false
          this.classNameObject.guessElement.correct = false
          if (this.cardNumber < this.puzzlesArray.length) {
              this.loadCard(this.puzzlesArray[this.cardNumber])
          }
          else {
              console.log('gameOver()')
          }
      }, 800)
    },
    incorrectAnswer: function () {
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
          this.hintText = 'Hint: '
          //hint.textContent = 'Hint: ' + capitalizeFirstLetter()
      } else {
          console.log('gameOver()')
      }
    },
    capitalizeFirstLetter: function () {
      //return Game.currentCard.hint.charAt(0).toUpperCase() + Game.currentCard.hint.slice(1).toLowerCase()
    }
  },
  watch: {
    isGameStarted: function () {
      this.stylingObject.timerDisplay = (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null
      this.stylingObject.cardBlock = (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null
      this.$el.querySelector('#rhyme_guess').focus()
      this.loadCard(this.puzzlesArray[0])
      this.classNameObject.timerDisplay.running = (this.isGameStarted) ? true : null
      this.shufflePuzzles(puzzlesArray)
    }
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
