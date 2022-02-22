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
            v-for="(letter, x) in row"
            :key="letter.ID"
            @click="clickCell(x, y)"
            @mouseover="hoverCell(x, y)"
          >
            {{ letter }}
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
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      ],
      clicked: {
        x: -1,
        y: -1,
      },
      hover: {
        x: -1,
        y: -1,
      },
      selectedCells: [],
    };
  },
  methods: {
    clickCell: function (x, y) {
      if (this.clicked.x === -1) {
        this.clicked.x = x;
        this.clicked.y = y;
      }
      console.log("C", this.clicked);
    },
    hoverCell: function (x, y) {
      this.hover.x = x;
      this.hover.y = y;
      console.log("H", this.hover);
    },
    mouseLeave: function () {
      this.clicked.x = -1;
      this.clicked.y = -1;
      console.log("C", this.clicked);
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
td {
  border: 1px solid #333;
  height: 20px;
  width: 20px;
  user-select: none;
}
</style>
