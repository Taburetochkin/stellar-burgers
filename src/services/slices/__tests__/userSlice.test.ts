import {
  userSlice,
  initialUserState,
  getUser,
  loginUser,
  updateUser,
  logoutUser
} from "../userSlice";

const mockUser = {
  user: {
    email: '123@gmail.com',
    name: 'Zhesha'
  }
}

describe('User Slice tests', () => {
  it('Set True during getUser.pending', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: getUser.pending.type
    })
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
    expect(testState.isAuthorized).toBe(false);
    expect(testState.user).toBe(null);
  });

  it('Set Error during getUser.rejected', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: getUser.rejected.type,
      error: {
        message: 'Error is present'
      }
    })
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set user during getUser.fulfilled', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: getUser.fulfilled.type,
      payload: mockUser
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.isAuthorized).toBe(true);
    expect(testState.user).toBe(mockUser.user);
  });

  it('Set True during loginUser.pending', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: loginUser.pending.type
    })
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during loginUser.rejected', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: loginUser.rejected.type,
      error: {
        message: 'Error is present'
      }
    })
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set user during loginUser.fulfilled', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: loginUser.fulfilled.type,
      payload: mockUser.user
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.isAuthorized).toBe(true);
    expect(testState.user?.email).toBe(mockUser.user.email);
    expect(testState.user?.name).toBe(mockUser.user.name);
  });

  it('Set True during updateUser.pending', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: updateUser.pending.type
    })
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during updateUser.rejected', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: updateUser.rejected.type,
      error: {
        message: 'Error is present'
      }
    })
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set user during updateUser.fulfilled', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: updateUser.fulfilled.type,
      payload: mockUser.user
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.user?.email).toBe(mockUser.user.email);
    expect(testState.user?.name).toBe(mockUser.user.name);
  });

  it('Set True during logoutUser.pending', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: logoutUser.pending.type
    })
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during logoutUser.rejected', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: logoutUser.rejected.type,
      error: {
        message: 'Error is present'
      }
    })
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set user during logoutUser.fulfilled', () => {
    const testState = userSlice.reducer(initialUserState, {
      type: logoutUser.fulfilled.type,
    });
    expect(testState.isLoading).toBe(false);
    expect(testState.isAuthorized).toBe(false);
    expect(testState.user).toBe(null);
  });
})