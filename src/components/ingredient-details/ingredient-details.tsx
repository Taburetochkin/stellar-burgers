import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { selectorIngredients } from '../../services/slices/ingredientSlice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectorIngredients);
  const params = useParams();

  const ingredientData = ingredients?.find(
    (item: TIngredient) => item._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
