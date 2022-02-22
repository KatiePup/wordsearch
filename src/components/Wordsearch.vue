<template>
  <div>
    <table @mouseleave="stopSelection">
      <thead>
        <tr>
          <th colspan="10">Wordsearch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, y) in letterArray" :key="row.ID">
          <td
            class="cell"
            :class="{
              cellSelected: cell.selected === 1,
              cellFound: cell.selected === 2,
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
  data() {
    return {
      letterArray: [
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
        [
          { letter: "A", selected: 0 },
          { letter: "B", selected: 0 },
          { letter: "C", selected: 0 },
          { letter: "D", selected: 0 },
          { letter: "E", selected: 0 },
          { letter: "F", selected: 0 },
          { letter: "G", selected: 0 },
          { letter: "H", selected: 0 },
          { letter: "I", selected: 0 },
          { letter: "J", selected: 0 },
        ],
      ],
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
    clickCell: function (x, y) {
      if (this.coord.x1 === -1) {
        this.coord.x1 = x;
        this.coord.y1 = y;
      } else {
        this.select(2);
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
          if (cell.selected === 1) {
            cell.selected = 0;
          }
        })
      );
    },
    selection() {
      this.clearSelected();
      if (this.coord.x1 !== -1) {
        this.calculateSelected();
      }
      this.select(1);
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
    select(value) {
      for (let i = 0; i < this.polar.length; i++) {
        if (
          this.letterArray[this.coord.y1 + this.polar.y * i][
            this.coord.x1 + this.polar.x * i
          ] !== undefined &&
          this.letterArray[this.coord.y1 + this.polar.y * i][
            this.coord.x1 + this.polar.x * i
          ].selected !== 2
        ) {
          this.letterArray[this.coord.y1 + this.polar.y * i][
            this.coord.x1 + this.polar.x * i
          ].selected = value;
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
.cellFound {
  background-color: firebrick;
}
</style>
