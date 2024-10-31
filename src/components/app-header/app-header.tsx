import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectorUserData } from '../../services/slices/userSlice';
import { useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const user = useSelector(selectorUserData);
  return <AppHeaderUI userName={user?.name} />;
};
