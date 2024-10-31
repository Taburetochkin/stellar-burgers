import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route';
import '../../index.css';
import styles from './app.module.css';

import { getIngredients } from '../../services/slices/ingredientSlice';
import { getUser } from '../../services/slices/userSlice';
import { getFeeds } from '../../services/slices/feedSlice';

import { useEffect } from 'react';
import { Route, Routes, useNavigate, useMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const feedOrderNumber = useMatch('/feed/:number')?.params.number;
  const userOrderNumber = useMatch('/profile/orders/:number')?.params.number;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
    dispatch(getFeeds());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={`#0${feedOrderNumber}`}
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route element={<ProtectedRoute Auth={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute Auth />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#0${userOrderNumber}`}
                onClose={() => {
                  navigate('/profile/orders');
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
