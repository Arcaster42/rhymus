<template>
  <header>
      <ul>
          <button class="header_button header_button_start" v-on:click="startGame">Start</button>
          <button class="header_button header_button_restart header_button--danger" 
                  v-bind:disabled="isRestartButtonDisabled"
                  v-on:click="startGame">Restart</button>
      </ul>
  </header>
</template>

<script>
export default {
    name: 'Header',
    props: ['startGame', 'isRestartButtonDisabled']
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