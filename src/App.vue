<template>
  <div>
    <Wordsearch :word="words" />
  </div>
</template>

<script>
import { Words } from './words'
import Wordsearch from './components/Wordsearch.vue'

export default {
  components: {
    Wordsearch,
  },

  data() {
    return {
      words: Words,
    }
  },
}
</script>
