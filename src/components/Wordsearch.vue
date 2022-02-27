<template>
  <div class="wordsearch">
    <Legend :word-states="wordArray" />

    <table @mouseleave="stopSelection" class="grid">
      <tbody>
        <tr v-for="(row, y) in letterArray" :key="row.ID">
          <td
            class="cell"
            :class="{
              cellSelected: cell.selected,
              cellChecked: cell.checked,
            }"
            v-for="(cell, x) in row"
            :key="cell.ID"
            @click="clickCell(x, y)"
            @mouseover="hoverCell(x, y)"
          >
            {{ cell.letter }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Legend from './Legend.vue'

export default {
  components: {
    Legend,
  },

  props: {
    words: {
      type: Array,
      default: [],
    },
    size: {
      type: Object,
      default: () => {
        return {
          width: 10,
          height: 10,
        }
      },
    },
  },

  data(props) {
    const { size, words } = props
    const { width, height } = size

    console.log(words.length)

    const wordArray = this.generateWordsData(words)

    return {
      wordArray,
      letterArray: this.generateLetters(width, height, wordArray),

      coord: {
        x1: -1,
        y1: -1,
        x2: -1,
        y2: -1,
      },
      polar: {
        x: 0,
        y: 0,
        length: 0,
      },
    }
  },

  methods: {
    generateWordsData(words) {
      let wordArrayStructure = { x0: 0, y0: 0, xDir: 0, yDir: 0, found: false }

      return Array.from(words).map((word) => ({
        ...wordArrayStructure,
        word,
      }))
    },

    generateLetters: function (width, height, words) {
      let cellVal = { letter: '', selected: false, checked: false }

      let outArray = []
      let rowArray = []

      for (let i = 0; i < width; i++) {
        rowArray[i] = { ...cellVal }
      }

      for (let i = 0; i < height; i++) {
        outArray[i] = rowArray.map((row) => ({ ...row }))
      }

      let worditer = 0
      let wordlen = 0
      let word = ''

      let cell = Object

      let fail = false

      let rand = 0
      let x = 0
      let y = 0
      let x0 = 0
      let y0 = 0
      let xdir = 0
      let ydir = 0

      const alphabet = 'abcdefghijklmnopqrstuvwxyz'

      for (let i = 0; i < 100; i++) {
        word = words[worditer].word
        wordlen = word.length

        rand = Math.random()
        x0 = Math.floor(rand * width)

        rand = Math.random()
        y0 = Math.floor(rand * height)

        rand = Math.random()
        if (rand < 0.125) {
          xdir = 1
          ydir = 0
        } else if (rand < 0.25) {
          xdir = 1
          ydir = -1
        } else if (rand < 0.375) {
          xdir = 0
          ydir = -1
        } else if (rand < 0.5) {
          xdir = -1
          ydir = -1
        } else if (rand < 0.625) {
          xdir = -1
          ydir = 0
        } else if (rand < 0.75) {
          xdir = -1
          ydir = 1
        } else if (rand < 0.875) {
          xdir = 0
          ydir = 1
        } else {
          xdir = 1
          ydir = 1
        }

        fail = false
        for (let j = 0; j < wordlen; j++) {
          x = x0 + xdir * j
          y = y0 + ydir * j

          if (!(0 <= x && x < width && 0 <= y && y < height)) {
            fail = true
            break
          }

          if (
            !(
              outArray[y][x].letter === '' ||
              outArray[y][x].letter === word.slice(j, j + 1)
            )
          ) {
            fail = true
            break
          }
        }

        if (!fail) {
          for (let j = 0; j < wordlen; j++) {
            x = x0 + xdir * j
            y = y0 + ydir * j
            cell = outArray[y][x]

            cell.letter = word.slice(j, j + 1)
          }
          words[worditer].x0 = x0
          words[worditer].y0 = y0
          words[worditer].xDir = xdir
          words[worditer].yDir = ydir
          worditer++
        }

        if (worditer === words.length) {
          break
        }
      }

      outArray.forEach((row) =>
        row.forEach((cell) => {
          if (cell.letter === '') {
            cell.letter = alphabet[Math.floor(Math.random() * alphabet.length)]
          }
        })
      )

      return outArray
    },
    clickCell: function (x, y) {
      if (this.coord.x1 === -1) {
        this.coord.x1 = x
        this.coord.y1 = y
      } else {
        this.checkAttempt()
      }
      this.selection()
    },
    hoverCell: function (x, y) {
      this.coord.x2 = x
      this.coord.y2 = y
      this.selection()
    },
    stopSelection: function () {
      this.coord.x1 = -1
      this.coord.y1 = -1
      this.coord.x2 = -1
      this.coord.y2 = -1
      this.polar.length = 0
      this.selection()
    },
    clearSelected: function () {
      this.letterArray.forEach((row) =>
        row.forEach((cell) => {
          cell.selected = 0
        })
      )
    },
    checkAttempt: function () {
      for (let i = 0; i < this.wordArray.length; i++) {
        const word = this.wordArray[i]
        if (
          word.x0 === this.coord.x1 &&
          word.y0 === this.coord.y1 &&
          word.xDir === this.polar.x &&
          word.yDir === this.polar.y &&
          word.word.length === this.polar.length
        ) {
          this.select('checked')
          this.wordArray[i].found = true
          break
        }
      }
      this.stopSelection()
    },
    selection: function () {
      this.clearSelected()
      if (this.coord.x1 !== -1) {
        this.calculateSelected()
      }
      this.select('select')
    },
    calculateSelected: function () {
      let x0 = this.coord.x1
      let y0 = this.coord.y1

      let x = this.coord.x2 - x0
      let y = this.coord.y2 - y0

      let theta = Math.atan2(y, x)

      if (theta >= Math.PI / 8 && theta < (7 * Math.PI) / 8) {
        this.polar.y = 1
      } else if (theta >= (-7 * Math.PI) / 8 && theta < -Math.PI / 8) {
        this.polar.y = -1
      } else {
        this.polar.y = 0
      }
      if (theta >= (-3 * Math.PI) / 8 && theta <= (3 * Math.PI) / 8) {
        this.polar.x = 1
      } else if (theta >= (5 * Math.PI) / 8 || theta <= (-5 * Math.PI) / 8) {
        this.polar.x = -1
      } else {
        this.polar.x = 0
      }
      this.polar.length = Math.max(Math.abs(x), Math.abs(y)) + 1
    },
    select(selectType) {
      for (let i = 0; i < this.polar.length; i++) {
        const x = this.coord.x1 + this.polar.x * i
        const y = this.coord.y1 + this.polar.y * i
        let cell = this.letterArray[y][x]

        if (cell !== undefined) {
          if (selectType === 'select') {
            cell.selected = true
          } else if (selectType === 'checked') {
            cell.checked = true
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.wordsearch {
  --border: #1c1c1c;
  --border-roundy: 0.5rem;
  --color-highlight: pink;
  --color-good: lightgreen;
  --color-bad: orangered;

  /* @apply font-title; */

  display: flex;
  font-family: cursive;
  width: 100%;
  max-width: 80rem;
  height: 100%;
  align-items: flex-start;
}

/*
 * griddy grid.
 */
.grid {
  flex-grow: 1;
  min-width: 36rem;
  max-height: 4vh;
  aspect-ratio: 1;
}

.cell:before {
  content: '';
  float: left;
  padding-top: 100%;
}
.cell {
  border: 1px solid #333;
  border-radius: var(--border-roundy);
  font-size: 120%;
  height: 1.5rem;
  width: 1.5rem;
  vertical-align: bottom;
  text-align: center;
  user-select: none;

  background-color: white;
}
.cellSelected {
  background-color: var(--color-highlight);
}
.cellChecked {
  background-color: var(--color-good);
  color: white;
}
.cellSelected.cellChecked {
  background-color: red;
  color: white;
}
</style>
