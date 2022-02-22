<template>
  <div>
    <table @mouseleave="mouseLeave">
      <thead>
        <tr>
          <th colspan="10">Wordsearch</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, y) in letterArray" :key="row.ID">
          <td
            class="cell"
            :class="{ cellSelected: cell.selected }"
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
      clicked: {
        x: -1,
        y: -1,
      },
      hover: {
        x: -1,
        y: -1,
      },
      direction: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    clickCell: function (x, y) {
      if (this.clicked.x === -1) {
        this.clicked.x = x;
        this.clicked.y = y;
      }
      this.calculateSelected();
    },
    hoverCell: function (x, y) {
      this.hover.x = x;
      this.hover.y = y;
      this.calculateSelected();
    },
    mouseLeave: function () {
      this.clicked.x = -1;
      this.clicked.y = -1;
      this.calculateSelected();
    },
    clearSelected: function () {
      this.letterArray.forEach((row) =>
        row.forEach((cell) => {
          cell.selected = 0;
        })
      );
    },
    calculateSelected: function () {
      this.clearSelected();
      if (this.clicked.x !== -1) {
        let x0 = this.clicked.x;
        let y0 = this.clicked.y;

        let x = this.hover.x - x0;
        let y = this.hover.y - y0;

        let theta = Math.atan2(y, x);

        if (theta >= Math.PI / 8 && theta < (7 * Math.PI) / 8) {
          this.direction.y = 1;
        } else if (theta >= (-7 * Math.PI) / 8 && theta < -Math.PI / 8) {
          this.direction.y = -1;
        } else {
          this.direction.y = 0;
        }
        if (theta >= (-3 * Math.PI) / 8 && theta <= (3 * Math.PI) / 8) {
          this.direction.x = 1;
        } else if (theta >= (5 * Math.PI) / 8 || theta <= (-5 * Math.PI) / 8) {
          this.direction.x = -1;
        } else {
          this.direction.x = 0;
        }

        let len = Math.max(Math.abs(x), Math.abs(y)) + 1;

        for (let i = 0; i < Math.max(len, 1); i++) {
          if (
            this.letterArray[y0 + this.direction.y * i][
              x0 + this.direction.x * i
            ] !== undefined
          ) {
            this.letterArray[y0 + this.direction.y * i][
              x0 + this.direction.x * i
            ].selected = 1;
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
</style>
