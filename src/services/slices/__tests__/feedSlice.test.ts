import {
  feedSlice,
  initialFeedState,
  getFeeds,
  getProfileFeeds
} from '../feedSlice';

const mockFeeds = {
  orders: [
    {
      id: '1'
    },
    {
      id: '2'
    },
    {
      id: '3'
    }
  ],
  total: 231,
  totalToday: 3
};

describe('Feed Slice Tests', () => {
  it('Set True during getFeeds.pending', () => {
    const testState = feedSlice.reducer(initialFeedState, {
      type: getFeeds.pending.type
    });
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during getFeeds.rejected', () => {
    const testState = feedSlice.reducer(initialFeedState, {
      type: getFeeds.rejected.type,
      error: {
        message: 'Не удалось загрузить ленту заказов'
      }
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Не удалось загрузить ленту заказов');
  });

  it('Set orders during getFeeds.fulfilled', () => {
    const testState = feedSlice.reducer(initialFeedState, {
      type: getFeeds.fulfilled.type,
      payload: mockFeeds
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.orders).toBe(mockFeeds.orders);
    expect(testState.total).toBe(mockFeeds.total);
    expect(testState.totalToday).toBe(mockFeeds.totalToday);
  });

  it('Set True during getProfileFeeds.pending', () => {
    const testState = feedSlice.reducer(initialFeedState, {
      type: getProfileFeeds.pending.type
    });
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during getProfileFeeds.rejected', () => {
    const testState = feedSlice.reducer(initialFeedState, {
      type: getProfileFeeds.rejected.type,
      error: {
        message: 'Не удалось загрузить ленту заказов'
      }
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Не удалось загрузить ленту заказов');
  });

  it('Set orders during getProfileFeeds.fulfilled', () => {
    const testState = feedSlice.reducer(initialFeedState, {
      type: getProfileFeeds.fulfilled.type,
      payload: mockFeeds.orders
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.orders).toBe(mockFeeds.orders);
    expect(testState.error).toBe(null);
  });
});
