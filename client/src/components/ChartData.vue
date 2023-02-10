<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      width: '100%',
      height: '600',
      type: 'candlestick',
      dataFormat: 'json',
      dataSource: {
        chart: {
          theme: "gammel",
          showVolumeChart: "1",
          caption: "",
          subcaption: "",
          numberprefix: "$",
          pyaxisname: "Price (USD)",
          plotPriceAs: "line"
        },
        categories: [
          {
            category: []
          }
        ],
        dataset: []
      },
    }
  },
  computed: mapState(['stockData', 'metaData']),
  async mounted() {
    await this.$store.dispatch("getStockData", {
      stock: 'IBM',
    });
  },
  watch: {
    stockData: function (newVal, oldVal) {
      if (newVal.msg) {
        this.$toast.error(newVal.msg);
      } else {
        this.convertData(newVal);
        this.extractCategories(newVal);
      }
    },
    metaData: function (newVal, oldVal) {
      this.setMetaData(newVal);
    }
  },
  methods: {
    setMetaData(meta) {
      this.dataSource.chart.caption = meta['2. Symbol'];
      this.dataSource.chart.subcaption = meta['1. Information'];
    },
    convertData(stockData) {
      let data = [];
      let count = 1;
      Object.entries(stockData).forEach(([key, value]) => {
        data.push({
          "open": value['1. open'],
          "high": value['2. high'],
          "low": value['3. low'],
          "close": value['4. close'],
          "x": count.toString(),
          "volume": value['5. volume']
        });
        count++;
      });
      this.dataSource.dataset = [];
      this.dataSource.dataset.push({ data });
    },
    extractCategories(stockData) {
      let result = [];
      let count = 1;
      Object.entries(stockData).forEach(([key, value]) => {
        result.push({
          "label": key,
          "x": count.toString(),
        });
        count++;
      });
      this.dataSource.categories[0].category = result;
    },
  },
};
</script>
<template>
  <div>
    <fusioncharts :width="width" :height="height" :type="type" :dataFormat="dataFormat" :dataSource="dataSource">
    </fusioncharts>
  </div>
</template>