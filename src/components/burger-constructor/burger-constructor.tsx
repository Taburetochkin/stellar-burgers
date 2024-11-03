import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  selectorBurgerConstructor,
  clearBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import {
  selectorOrder,
  selectorOrderIsLoading,
  createOrder,
  removeFromOrder
} from '../../services/slices/orderSlice';
import { selectorUserAuthorized } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectorBurgerConstructor);

  const orderRequest = useSelector(selectorOrderIsLoading);

  const orderModalData = useSelector(selectorOrder);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(selectorUserAuthorized);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (constructorItems.bun && !isAuthorized) return navigate('/login');
    if (constructorItems.bun && isAuthorized) {
      const bunId = constructorItems.bun._id;
      const ingredientsId = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const orderData = [bunId, ...ingredientsId, bunId];
      dispatch(createOrder(orderData));
    }
  };
  const closeOrderModal = () => {
    dispatch(removeFromOrder());
    dispatch(clearBurgerConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
