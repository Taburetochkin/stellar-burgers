import { TIngredient } from "@utils-types";
import {
  initialIngredientsState,
  getIngredients,
  ingredientsSlice 
} from "../ingredientSlice";

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Пиво Светлое',
    type: 'string', 
    proteins: 100,
    fat: 200,
    carbohydrates: 300,
    calories: 40,
    price: 200,
    image: 'pivo_light.png',
    image_large: 'pivo_light_large.png',
    image_mobile: 'pivo_light_mobile.png'
  },
  {
    _id: '2',
    name: 'Пиво Темное',
    type: 'string', 
    proteins: 150,
    fat: 250,
    carbohydrates: 350,
    calories: 45,
    price: 250,
    image: 'pivo_dark.png',
    image_large: 'pivo_dark_large.png',
    image_mobile: 'pivo_dark_mobile.png'
  },
]

describe('Ingredients Slice Tests', () => {
  it('Set True during getIngredients.pending', () => {
    const testState = ingredientsSlice.reducer(initialIngredientsState, {type: getIngredients.pending.type});
    expect(testState.isLoading).toBe(true);
    expect(testState.error).toBe(null);
  });

  it('Set Error during getIngredients.rejected', () => {
    const testState = ingredientsSlice.reducer(initialIngredientsState,
      {
        type: getIngredients.rejected.type,
        error: { message: 'Error is present' }
      }
    );
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe('Error is present');
  });

  it('Set mockIngredients during getIngredients.fulfilled', () => {
    const testState = ingredientsSlice.reducer(initialIngredientsState,
      {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      }
    );
    expect(testState.isLoading).toBe(false);
    expect(testState.error).toBe(null);
    expect(testState.ingredients).toEqual(mockIngredients);
  })
})