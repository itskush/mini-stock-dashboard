<script>
export default {
  name: "StockMenu",
  data() {
    return {
      selectedStock: 'IBM',
    }
  },
  methods: {
    async getStockData(stockName) {
      this.selectedStock = stockName;
      await this.$store.dispatch("getStockData", {
        stock: stockName,
      });
    }
  }
}
</script>
<template>
  <div>
    <nav class="navMenu">
      <a @click="getStockData('MSFT')" href="#" :class="[selectedStock  === 'MSFT' ? 'selected-active' : '' ]">MSFT</a>
      <a @click="getStockData('AAPL')" href="#" :class="[selectedStock === 'AAPL' ? 'selected-active' : '']">AAPL</a>
      <a @click="getStockData('NFLX')" href="#" :class="[selectedStock === 'NFLX' ? 'selected-active' : '']">NFLX</a>
      <a @click="getStockData('META')" href="#" :class="[selectedStock === 'META' ? 'selected-active' : '']">META</a>
      <a @click="getStockData('AMZN')" href="#" :class="[selectedStock === 'AMZN' ? 'selected-active' : '']">AMZN</a>
      <a @click="getStockData('IBM')" href="#" :class="[selectedStock === 'IBM' ? 'selected-active' : '']">IBM</a>
    </nav>
  </div>
</template>
<style scoped>
.navMenu {
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.navMenu a {
  color: #000000;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  width: 80px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.navMenu a:hover {
  color: yellow !important;
}

.selected-active {
  color: yellow !important;
  background: black;
}
</style>