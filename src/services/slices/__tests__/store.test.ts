import { rootReducer } from "../../store";
import { ingredientsSlice } from "../ingredientSlice";
import { burgerConstructorSlice } from "../burgerConstructorSlice";
import { userSlice } from "../userSlice";
import { feedSlice } from "../feedSlice";
import { orderSlice } from "../orderSlice";

const mockIntitalStates = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState()
};

describe('Root Reducer Test', () => {
  it('Add new state', () => {
    const testState = rootReducer(undefined, {
      type: 'UNKNOW_ACTION'
    });
    expect(testState).toEqual(mockIntitalStates);
  });
})