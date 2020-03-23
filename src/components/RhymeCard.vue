<template>
      <div :class="classNameObject.cardBlock" class="rhyme_card" id="rhyme_card" :style="stylingObject.cardBlock">
        <div class="rhyme_count_container center">
          <div class="rhyme_count" id="rhyme_count">
            <span v-if="!isGameStarted && isFirstGame"></span>
              {{ (isGameStarted || !isFirstGame) ? `${cardNumber} of ${puzzlesArrayCount}` : null }}
            </div>
        </div>
        <p class="rhyme" id="rhyme">{{ (!isGameStarted) ? RhymusGame.rhymeElementText : RhymusGame.currentCard.sentence }}</p>
        <p class="rhyme" id="correct">{{ (!isFirstGame) ? `Correct guesses: ${totalCorrect}` : null }}</p>
        <p class="rhyme" id="wrong">{{ (!isFirstGame) ? `Incorrect guesses: ${totalWrong}` : null }}</p>
        <CardInfo :assignListeners="assignListeners"
                  :classNameObject="classNameObject"
                  v-on="$listeners"
                  />
      </div>
</template>

<script lang="ts">
import CardInfo from './CardInfo.vue'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'RhymeCard',
    props: ['assignListeners','RhymusGame','classNameObject'],
    components: {
        CardInfo
    },
    computed: {
      ...mapState([
        'cardNumber', 
        'isGameStarted', 
        'totalCorrect', 
        'totalWrong', 
        'isFirstGame', 
        'stylingObject'
      ]),
      ...mapGetters([
        'puzzlesArrayCount'
      ])
    }
}
</script>

<style scoped>

.rhyme_card {
  background: var(--primary-gradient);
  height: 350px;
  border-radius: var(--l-border-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 1s;
  box-shadow: var(--drop-shadow);
}

.rhyme_card.correct {
  transform: translate3d(0, 0, 0);
  background-color: lightgreen;
}

.rhyme_card.incorrect {
  animation: shake 0.52s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  background-color: var(--danger);
}

.rhyme {
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0 20px;
  color: var(--white)
}

.rhyme_count_container {
  width: 100%;
  transition: all 1s;
  justify-content: flex-end;
}

.rhyme_count {
  padding: 10px 20px;
  background-color: var(--white);
  border-top-right-radius: var(--l-border-radius);
  border-bottom-left-radius: var(--l-border-radius);
  color: var(--primary);
  font-weight: 500;
  font-style: italic;
  font-size: 12px;
}

.rhyme_count.correct {
  background-color: green;
}

.rhyme_count.incorrect {
  background-color: var(--danger);
  color: var(--white);
}

.rhyme_count span {
  margin-left: 10px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, -2px, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 3px, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, -3px, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 3px, 0);
  }
}


</style>