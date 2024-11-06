import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';

export interface FeedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error?: string | null;
}

export const initialFeedState: FeedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeeds = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const getProfileFeeds = createAsyncThunk(
  'feed/getProfileFeed',
  async () => await getOrdersApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState: initialFeedState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getProfileFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message;
      })
      .addCase(getProfileFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      });
  },
  selectors: {
    selectorFeedState: (state) => state,
    selectorOrders: (state) => state.orders,
    selectorFeedLoading: (state) => state.isLoading
  }
});

export const { selectorFeedState, selectorOrders, selectorFeedLoading } =
  feedSlice.selectors;
export default feedSlice.reducer;
