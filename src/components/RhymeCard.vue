<template>
      <div class="rhyme_card" id="rhyme_card">
        <div class="rhyme_count_container center">
          <div class="rhyme_count" id="rhyme_count"><span></span></div>
        </div>
        <p class="rhyme" id="rhyme">{{ userMessage }}</p>
        <p class="rhyme" id="correct"></p>
        <p class="rhyme" id="wrong"></p>
        <CardInfo />
      </div>
</template>

<script lang="ts">
import CardInfo from './CardInfo.vue'

export default {
    name: 'RhymeCard',
    components: {
        CardInfo
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


</style>