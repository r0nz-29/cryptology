import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    value: [],
    isLoading: true,
  },
  coinList: {
    value: [],
    isLoading: true,
  },
  news: {
    value: [],
    isLoading: true,
  },
  coinDetails: {
    history: [],
    value: {},
    isLoading: true,
    fetchingHistory: true,
  },
  exchanges: {
    value: [],
    isLoading: true,
  },
  theme: {
    mode: "light",
  },
  showDrawer: false,
};

const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState,
  reducers: {
    toggle_theme: (state, action) => {
      state.theme.mode = action.payload;
    },
    update_stats: (state, action) => {
      state.stats.value = action.payload.stats;
      state.stats.isLoading = false;
    },
    update_coins: (state, action) => {
      state.coinList.value = action.payload.coins;
      state.coinList.isLoading = false;
    },
    update_news: (state, action) => {
      state.news.value = action.payload.news;
      state.news.isLoading = false;
    },
    update_coin: (state, action) => {
      state.coinDetails.value = action.payload.coin;
      state.coinDetails.isLoading = false;
    },
    update_history: (state, action) => {
      state.coinDetails.history = action.payload.coinHistory;
      state.coinDetails.fetchingHistory = false;
    },
    update_exchanges: (state, action) => {
      state.exchanges.value = action.payload.exchanges;
      state.exchanges.isLoading = false;
    },
    toggle_drawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
  },
});

export const {
  update_stats,
  update_coins,
  update_news,
  update_coin,
  update_history,
  update_exchanges,
  toggle_theme,
  toggle_drawer,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
