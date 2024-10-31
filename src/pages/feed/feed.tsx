import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import {
  selectorOrders,
  selectorFeedLoading
} from '../../services/slices/feedSlice';
import { getFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(selectorOrders);
  const isLoading: boolean = useSelector(selectorFeedLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
