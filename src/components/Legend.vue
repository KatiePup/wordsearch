<template>
  <div class="legend">
    <ul class="words">
      <li v-for="word in wordStates" :key="word.word">
        <span class="checkbox">
          {{ word.found ? '🗹' : '☐' }}
        </span>

        {{ word.word }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    wordStates: {
      type: Array,
    },
  },

  data() {
    return {}
  },
}
</script>

<style scoped>
.legend .words {
  border-radius: var(--border-roundy);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  margin: 0 1rem;
  min-width: 20vw;
  width: 12rem;
  /* height: 100%; */
  padding: 0;

  background: rgb(247, 245, 245);
  border: 1px var(--border) solid;
}

.legend .words li {
  display: flex;
  flex-grow: 1;
  border: 1px dashed var(--border);
  border-left: none;
  border-right: none;
  margin: -1px 0px;
  width: calc(100%);

  /* background: pink; */
  padding: 0.25rem;
  padding-left: 2.5rem;
  align-items: center;
  justify-items: stretch;
}

.legend .words li + li {
  margin-top: 1px;
}

.legend .words li > .checkbox {
  border-radius: var(--border-roundy);

  height: 2.5rem;
  width: 2.5rem;
  font-size: 2rem;
  line-height: 2rem;
  padding: 0rem;
  margin-top: -0.2rem;
  margin-bottom: -0.2rem;
  margin-left: -2.5rem;
  /* margin-right: 0.5rem; */
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
}
</style>