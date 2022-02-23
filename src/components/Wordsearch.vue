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
export default {
  name: "Wordsearch",
  props: {
    wordArray: {
      default: () => [
        { word: "Harold", x0: 0, y0: 0, xDir: 0, yDir: 0, found: false },
        { word: "Pandy", x0: 0, y0: 0, xDir: 0, yDir: 0, found: false },
        { word: "Daddy", x0: 0, y0: 0, xDir: 0, yDir: 0, found: false },
        { word: "Jamie", x0: 0, y0: 0, xDir: 0, yDir: 0, found: false },
        { word: "Rosie", x0: 0, y0: 0, xDir: 0, yDir: 0, found: false },
      ],
    },
    size: {
      default: () => [
        {
          width: 10,
          height: 10,
        },
      ],
    },
  },
  data() {
    // console.log(this.wordArray);
    return {
      letterArray: this.generateLetters(),
      // [
      //   [{ letter: "", selected: false, checked: false }, size.width],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      //   [
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //     { letter: "", selected: false, checked: false },
      //   ],
      // ],
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
    generateLetters: function () {
      let cellVal = { letter: "a", selected: false, checked: false };
      let outArray = [];
      let rowArray = [];

      for (let i = 0; i < this.size[0].width; i++) {
        rowArray[i] = { ...cellVal };
      }

      for (let i = 0; i < this.size[0].height; i++) {
        outArray[i] = rowArray.map((row) => ({ ...row }));
      }

      console.log(outArray);

      return outArray;
    },
    clickCell: function (x, y) {
      if (this.coord.x1 === -1) {
        this.coord.x1 = x;
        this.coord.y1 = y;
      } else {
        this.select("checked");
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
    selection() {
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

      if (selectType === "checked") {
        this.stopSelection();
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
}
.cellSelected.cellChecked {
  background-color: red;
}
</style>
