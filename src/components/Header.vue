<template>
  <header>
      <ul>
          <button class="header_button header_button_start" @click="startGame($event)">Start</button>
          <button class="header_button header_button_restart header_button--danger" 
                  :disabled="isRestartButtonDisabled"
                  @click="startGame($event)">Restart</button>
      </ul>
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Header',
    computed: {
      ...mapState([
        'isRestartButtonDisabled',
        'playTimeSeconds',
        'isGameStarted',
        'puzzlesArray',
        'isFirstGame'
      ]),
      ...mapMutations([
        'isGameStartedBoolean', 
        'setTimeRemaining', 
        'isRestartButtonDisabledBoolean',
        'updateStylingObject',
        'updateClassNameObject',
        'initializeCardNumber', 
        'initializeCorrectGuesses',
        'initializeIncorrectGuesses',
        'initializeTotalCorrect',
        'initializeTotalWrong'
      ])
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
      this.$store.dispatch('loadCard', this.puzzlesArray[0])
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
    ...mapActions([
      'loadCard',
    ])
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

header {
  width: 100%;
  margin-bottom: 20px;
}

.header_button {
  background: var(--primary-gradient);
  width: 110px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--s-border-radius);
  color: white;
  border: 0;
  font-size: 0.9rem;
}

.header_button_start {
  box-shadow: var(--drop-shadow);
}

.header_button:hover {
  cursor: pointer;
  background-color: var(--light-grey);
}

.header_button:active {
  background-color: var(--primary);
}

.header_button--danger {
  color: var(--danger);
  background: none;
}

.header_button--danger:hover {
  background: var(--danger);
  color: var(--white);
}

.header_button:disabled {
  background: var(--light-grey);
  box-shadow: none;
  transition: all 1s;
}
</style>