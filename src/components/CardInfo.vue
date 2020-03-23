<template>
    <div class="card_info_outer center">
        <div id="hint" class="center" :style="stylingObject.hint">{{ hintText }}</div>
        <div class="card_info center">
        <div id="incorrect">{{ wrongText }}</div>
        <div class="card_info_input center">
            <input
            type="text"
            id="rhyme_guess"
            name="rhyme_guess"
            placeholder="Write your guess here"
            @keydown="assignListeners"
            :value="guessValue"
            @input="updateGuessValue($event)"
            :class="classNameObject.guessElement"
            />
            <div id="timer" :class="classNameObject.timerDisplay" :style="stylingObject.timerDisplay">{{ formatTimer }}</div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CardInfo', 
    props: ['assignListeners', 'classNameObject','guessValue','hintText','wrongText','stylingObject'],
    computed: {
      formatTimer() {
         return (this.timeRemaining === null) ? null : this.timeRemaining.toString().padStart(2, '0')
      },
      ...mapState([
        'timeRemaining'
      ])
    },
    methods: {
      updateGuessValue(e) {
        this.$emit('input', e.target.value)
      }
    }
}
</script>

<style scoped>
#rhyme_guess {
  font-size: .9rem;
  text-align: center;
  border: none;
  outline: none;
  transition: all 1s;
}

#rhyme_guess::placeholder {
  color: var(--light-grey);
}

#rhyme_guess.correct {
  background-color: lightgreen;
}

#rhyme_guess.incorrect {
  background-color: var(--danger);
  color: var(--white);
}

.card_info_outer {
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: unset;
}

.card_info {
  background: var(--white);
  justify-content: space-evenly;
  flex-direction: column;
  height: 67px;
  position: relative;
  border-bottom-right-radius: var(--l-border-radius);
  border-bottom-left-radius: var(--l-border-radius);
}

.card_info_input {
  width: 100%;
  justify-content: space-around;
}

#incorrect {
  font-size: 15px;
  text-align: center;
  border: none;
  outline: none;
  color: var(--light-grey);
}

#hint {
  height: 25px;
  color: var(--primary);
  background-color: var(--hint-grey);
  font-size: 15px;
  text-align: center;
  border: none;
  outline: none;
  display: none;
}

#timer {
  width: 40px;
  height: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--primary);
  color: var(--white);
  border-top-left-radius: var(--l-border-radius);
  border-bottom-right-radius: var(--l-border-radius);
  font-weight: 500;
  font-style: italic;
  font-size: 12px;
}

/* #timer {
  font-size: 2.5rem;
  text-indent: 2rem;
  color: #fff;
  flex-grow: 1;
} */

#timer.running {
  color: lightgreen;
}

/* #timer.gameover {
  color: var(--danger);
} */
</style>