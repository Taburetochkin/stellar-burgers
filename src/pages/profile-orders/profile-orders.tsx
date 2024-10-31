import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectorOrders,
  getProfileFeeds
} from '../../services/slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProfileFeeds());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
