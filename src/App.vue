<template>
  <div id="app">
    <section id="game_canvas">
      <input />
      <Header v-bind:startGame="startGame" 
              v-bind:isRestartButtonDisabled="isRestartButtonDisabled"/>
      <RhymeCard v-bind:isGameStarted="stylingCardBackground"
                 v-bind:assignListeners="(isGameStarted) ? assignListeners : null"
                 v-bind:RhymusGame="RhymusGame"
                 v-bind:puzzlesArray="puzzlesArray"
                 v-bind:cardNumber="cardNumber"
                 v-bind:timerStyling="timerStyling"
                 v-bind:guessValue="guessValue"
                 v-bind:hintText="hintText"
                 v-bind:wrongText="wrongText"
                 v-bind:timeRemaining="timeRemaining"/>
    </section>
  </div>
</template>

<script>
import Header from './components/Header'
import RhymeCard from './components/RhymeCard'
import puzzlesArray from '../src/puzzles'
export default {
  name: 'app',
  components: {
    Header,
    RhymeCard
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
            stylingCardBackground: null,
            RhymusGame: {
              currentCard: undefined,
              rhymeElementText: 'Press start to play!'
            },
            timer: null,
            timerStyling: {
              center: true,
              'running': false
            },
            guessValue: '',
            hintText: '',
            incorrectGuesses: Number,
            wrongText: ''
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
      // if (guessElement.value === Game.currentCard.answer) {
      //     correctAnswer()
      //     totalCorrect++
      //     } else if (guessElement.value === '' || undefined) {
      //     alert('Please enter a guess!')
      //     } else {
      //     incorrectAnswer()
      //     totalWrong++
      // }
    }
  },
  watch: {
    isGameStarted: function () {
      this.stylingCardBackground = (this.isGameStarted) ? { background: 'var(--primary-gradient)' } : null
      this.$el.querySelector('#rhyme_guess').focus()
      this.loadCard(this.puzzlesArray[0])
      this.timerStyling.running = (this.isGameStarted) ? true : null
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
