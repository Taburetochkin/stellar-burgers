import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectorOrders,
  getProfileFeeds
} from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileFeeds());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
