<template>
  <div>
    <table @mouseleave="stopSelection">
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
// import func from "../../vue-temp/vue-editor-bridge";
export default {
  name: "Wordsearch",
  props: {
    words: {
      default: () => [
        { word: "harold" },
        { word: "pandy" },
        { word: "daddy" },
        { word: "jamie" },
        { word: "rosie" },
      ],
    },
    size: {
      type: Object,
      default: () => {
        return {
          width: 10,
          height: 10,
        };
      },
    },
  },
  data(props) {
    const { size } = props;
    const { width, height } = size;

    const words = this.generateWords();

    return {
      wordArray: words,
      letterArray: this.generateLetters(width, height, words),
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
    };
  },
  methods: {
    generateWords: function () {
      let wordArrayStructure = { x0: 0, y0: 0, xDir: 0, yDir: 0, found: false };
      return this.words.map((word) => ({
        ...word,
        ...wordArrayStructure,
      }));
    },
    generateLetters: function (width, height, words) {
      console.log("1");
      // let width = this.size.width;
      // let height = this.size.height;
      console.log("2");

      let cellVal = { letter: "", selected: false, checked: false };

      let outArray = [];
      let rowArray = [];

      for (let i = 0; i < width; i++) {
        rowArray[i] = { ...cellVal };
      }
      console.log("3");
      for (let i = 0; i < height; i++) {
        outArray[i] = rowArray.map((row) => ({ ...row }));
      }
      console.log("4");
      let worditer = 0;
      let wordlen = 0;
      let word = "";

      let cell = Object;

      let fail = false;

      let rand = 0;
      let x = 0;
      let y = 0;
      let x0 = 0;
      let y0 = 0;
      let xdir = 0;
      let ydir = 0;

      const alphabet = "abcdefghijklmnopqrstuvwxyz";

      for (let i = 0; i < 100; i++) {
        console.log("A");
        console.log(words);
        word = words[worditer].word;
        wordlen = word.length;

        rand = Math.random();
        x0 = Math.floor(rand * width);

        rand = Math.random();
        y0 = Math.floor(rand * height);
        console.log("B");
        rand = Math.random();
        if (rand < 0.125) {
          xdir = 1;
          ydir = 0;
        } else if (rand < 0.25) {
          xdir = 1;
          ydir = -1;
        } else if (rand < 0.375) {
          xdir = 0;
          ydir = -1;
        } else if (rand < 0.5) {
          xdir = -1;
          ydir = -1;
        } else if (rand < 0.625) {
          xdir = -1;
          ydir = 0;
        } else if (rand < 0.75) {
          xdir = -1;
          ydir = 1;
        } else if (rand < 0.875) {
          xdir = 0;
          ydir = 1;
        } else {
          xdir = 1;
          ydir = 1;
        }

        fail = false;
        console.log("C");
        for (let j = 0; j < wordlen; j++) {
          x = x0 + xdir * j;
          y = y0 + ydir * j;

          if (!(0 <= x && x < width && 0 <= y && y < height)) {
            fail = true;
            break;
          }

          if (
            !(
              outArray[y][x].letter === "" ||
              outArray[y][x].letter === word.slice(j, j + 1)
            )
          ) {
            fail = true;
            break;
          }
        }
        console.log("D");
        if (!fail) {
          for (let j = 0; j < wordlen; j++) {
            x = x0 + xdir * j;
            y = y0 + ydir * j;
            cell = outArray[y][x];

            cell.letter = word.slice(j, j + 1);
          }
          words[worditer].x0 = x0;
          words[worditer].y0 = y0;
          words[worditer].xDir = xdir;
          words[worditer].yDir = ydir;
          worditer++;
        }
        console.log("E");
        if (worditer === words.length) {
          break;
        }
      }
      console.log("5");
      outArray.forEach((row) =>
        row.forEach((cell) => {
          if (cell.letter === "") {
            cell.letter = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        })
      );
      console.log("6");
      return outArray;
    },
    clickCell: function (x, y) {
      if (this.coord.x1 === -1) {
        this.coord.x1 = x;
        this.coord.y1 = y;
      } else {
        this.checkAttempt();
      }
      this.selection();
    },
    hoverCell: function (x, y) {
      this.coord.x2 = x;
      this.coord.y2 = y;
      this.selection();
    },
    stopSelection: function () {
      this.coord.x1 = -1;
      this.coord.y1 = -1;
      this.coord.x2 = -1;
      this.coord.y2 = -1;
      this.polar.length = 0;
      this.selection();
    },
    clearSelected: function () {
      this.letterArray.forEach((row) =>
        row.forEach((cell) => {
          cell.selected = 0;
        })
      );
    },
    checkAttempt: function () {
      console.log("A");
      console.log(this.wordArray);

      for (let i = 0; i < this.wordArray.length; i++) {
        const word = this.wordArray[i];
        if (
          word.x0 === this.coord.x1 &&
          word.y0 === this.coord.y1 &&
          word.xDir === this.polar.x &&
          word.yDir === this.polar.y &&
          word.word.length === this.polar.length
        ) {
          console.log(this.wordArray[i]);
          this.select("checked");
          this.wordArray[i].found = true;
          break;
        }
      }

      this.stopSelection();
    },
    selection: function () {
      this.clearSelected();
      if (this.coord.x1 !== -1) {
        this.calculateSelected();
      }
      this.select("select");
    },
    calculateSelected: function () {
      let x0 = this.coord.x1;
      let y0 = this.coord.y1;

      let x = this.coord.x2 - x0;
      let y = this.coord.y2 - y0;

      let theta = Math.atan2(y, x);

      if (theta >= Math.PI / 8 && theta < (7 * Math.PI) / 8) {
        this.polar.y = 1;
      } else if (theta >= (-7 * Math.PI) / 8 && theta < -Math.PI / 8) {
        this.polar.y = -1;
      } else {
        this.polar.y = 0;
      }
      if (theta >= (-3 * Math.PI) / 8 && theta <= (3 * Math.PI) / 8) {
        this.polar.x = 1;
      } else if (theta >= (5 * Math.PI) / 8 || theta <= (-5 * Math.PI) / 8) {
        this.polar.x = -1;
      } else {
        this.polar.x = 0;
      }
      this.polar.length = Math.max(Math.abs(x), Math.abs(y)) + 1;
    },
    select(selectType) {
      for (let i = 0; i < this.polar.length; i++) {
        const x = this.coord.x1 + this.polar.x * i;
        const y = this.coord.y1 + this.polar.y * i;
        let cell = this.letterArray[y][x];

        if (cell !== undefined) {
          if (selectType === "select") {
            cell.selected = true;
          } else if (selectType === "checked") {
            cell.checked = true;
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cell {
  border: 1px solid #333;
  height: 20px;
  width: 20px;
  user-select: none;

  background-color: white;
}
.cellSelected {
  background-color: pink;
}
.cellChecked {
  background-color: firebrick;
  color: white;
}
.cellSelected.cellChecked {
  background-color: red;
  color: white;
}
</style>
