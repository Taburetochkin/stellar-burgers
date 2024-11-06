import { TConstructorIngredient } from '@utils-types';
import {
  initialBurgerConstructorState,
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerConstructor
} from '../burgerConstructorSlice';
const mockIngredients: TConstructorIngredient[] = [
  {
    id: '1',
    _id: '1',
    name: 'Пиво Темное',
    type: 'bun',
    proteins: 150,
    fat: 250,
    carbohydrates: 350,
    calories: 45,
    price: 250,
    image: 'pivo_dark.png',
    image_large: 'pivo_dark_large.png',
    image_mobile: 'pivo_dark_mobile.png'
  },
  {
    id: '2',
    _id: '2',
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
    id: '3',
    _id: '3',
    name: 'Пиво Белое',
    type: 'string',
    proteins: 120,
    fat: 240,
    carbohydrates: 310,
    calories: 51,
    price: 320,
    image: 'pivo_white.png',
    image_large: 'pivo_white_large.png',
    image_mobile: 'pivo_white_mobile.png'
  }
];

describe('Burger Constructor Slice Tests', () => {
  it('Add ingredient to constructor', () => {
    const testState = burgerConstructorSlice.reducer(
      initialBurgerConstructorState,
      addIngredient(mockIngredients[1])
    );
    expect(testState.ingredients.length).toBe(1);
  });

  it('Add bun to constructor', () => {
    const testState = burgerConstructorSlice.reducer(
      initialBurgerConstructorState,
      addIngredient(mockIngredients[0])
    );
    expect(testState.bun?._id).toBe('1');
  });

  it('Remove from constructor', () => {
    const testState = burgerConstructorSlice.reducer(
      {
        bun: mockIngredients[0],
        ingredients: [
          {
            ...mockIngredients[1]
          }
        ]
      },
      removeIngredient(mockIngredients[1].id)
    );
    expect(testState.ingredients.length).toBe(0);
  });

  it('Move ingredient up', () => {
    const testState = burgerConstructorSlice.reducer(
      {
        bun: mockIngredients[0],
        ingredients: [
          {
            ...mockIngredients[1]
          },
          {
            ...mockIngredients[2]
          }
        ]
      },
      moveIngredientUp(1)
    );
    expect(testState.ingredients[0].id).toBe('3');
    expect(testState.ingredients[1].id).toBe('2');
  });

  it('Move ingredient up', () => {
    const testState = burgerConstructorSlice.reducer(
      {
        bun: mockIngredients[0],
        ingredients: [
          {
            ...mockIngredients[1]
          },
          {
            ...mockIngredients[2]
          }
        ]
      },
      moveIngredientDown(0)
    );
    expect(testState.ingredients[0].id).toBe('3');
    expect(testState.ingredients[1].id).toBe('2');
  });

  it('Clear Constructor', () => {
    const testState = burgerConstructorSlice.reducer(
      {
        bun: mockIngredients[0],
        ingredients: [
          {
            ...mockIngredients[1]
          },
          {
            ...mockIngredients[2]
          }
        ]
      },
      clearBurgerConstructor()
    );
    expect(testState.bun).toBe(null);
    expect(testState.ingredients.length).toBe(0);
  });
});
