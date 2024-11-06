import { TOrder } from '@utils-types';
import {
  orderSlice,
  initialOrderState,
  getOrder,
  createOrder,
  removeFromOrder
} from '../orderSlice';

const mockOrders = {
  orders: [
    {
      _id: '1',
      status: 'gotovo',
      name: 'Бергер',
      createdAt: '12.12.12',
      updatedAt: '12.12.12',
      number: 1,
      ingredients: ['1', '2', '3'],
      owner: 'Zhesha1'
    },
    {
      _id: '2',
      status: 'gotovo',
      name: 'Бергер',
      createdAt: '12.12.12',
      updatedAt: '12.12.12',
      number: 1,
      ingredients: ['1', '2', '3'],
      owner: 'Zhesha1'
    },
    {
      _id: '3',
      status: 'gotovo',
      name: 'Бергер',
      createdAt: '12.12.12',
      updatedAt: '12.12.12',
      number: 1,
      ingredients: ['1', '2', '3'],
      owner: 'Zhesha1'
    }
  ]
};

const mockOrder = {
  order: {
    _id: '1',
    status: 'gotovo',
    name: 'Бергер',
    createdAt: '12.12.12',
    updatedAt: '12.12.12',
    number: 1,
    ingredients: ['1', '2', '3']
  }
};

describe('Order Slice Tests', () => {
  it('Test removeFromOrder', () => {
    const testState = orderSlice.reducer(
      {
        ...initialOrderState,
        order: mockOrder.order
      },
      removeFromOrder()
    );
    expect(testState).toEqual(initialOrderState);
  });

  it('Set True during getOrder.pending', () => {
    const testState = orderSlice.reducer(initialOrderState, {
      type: getOrder.pending.type
    });
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during getOrder.rejected', () => {
    const testState = orderSlice.reducer(initialOrderState, {
      type: getOrder.rejected.type,
      error: {
        message: 'Error is present'
      }
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set Order during getOrder.fulfilled', () => {
    const testState = orderSlice.reducer(initialOrderState, {
      type: getOrder.fulfilled.type,
      payload: mockOrders
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.orderInfo).toEqual(mockOrders.orders[0]);
  });

  it('Set True during createOrder.pending', () => {
    const testState = orderSlice.reducer(initialOrderState, {
      type: createOrder.pending.type
    });
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during createOrder.rejected', () => {
    const testState = orderSlice.reducer(initialOrderState, {
      type: createOrder.rejected.type,
      error: {
        message: 'Error is present'
      }
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set Order during createOrder.fulfilled', () => {
    const testState = orderSlice.reducer(initialOrderState, {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.order).toBe(mockOrder.order);
  });
});
