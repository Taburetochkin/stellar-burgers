import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
  orderInfo: TOrder | null;
  error?: string | null;
}

export const initialOrderState: OrderState = {
  isLoading: false,
  order: null,
  orderInfo: null,
  error: null
};

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id: number) => {
    const orderData = await getOrderByNumberApi(id);
    return orderData;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const orderData = await orderBurgerApi(ingredients);
    return orderData;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    removeFromOrder: (state) => {
      state.isLoading = false;
      state.order = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderInfo = action.payload.orders[0];
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      });
  },
  selectors: {
    selectorOrder: (state) => state.order,
    selectorOrderInfo: (state) => state.orderInfo,
    selectorOrderIsLoading: (state) => state.isLoading
  }
});
export const { removeFromOrder } = orderSlice.actions;
export const { selectorOrder, selectorOrderInfo, selectorOrderIsLoading } =
  orderSlice.selectors;
export default orderSlice.reducer;
