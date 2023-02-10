
import { createStore } from 'vuex'

export default createStore({
  id: 'stock',
  state: () => {
    return {
      stockData: [],
      metaData: [],
      hasChanged: true,
    }
  },
  mutations: {
    SET_STOCK(state, payload) {
      state.stockData = payload;
    },
    
    SET_METADATA(state, payload) {
      state.metaData = payload;
    },
  },
  actions: {
    async getStockData({ commit }, data) {
      try {
        const response = await fetch(
          `http://localhost:3000/getStock/${data.stock}`,
          {
            method: "GET",
          }
        );
        const json = await response.json();
        this.commit("SET_STOCK", json.stock);
        this.commit("SET_METADATA", json.metadata);
      } catch (err) {
        console.log(err);
      }
    },
  },
})
