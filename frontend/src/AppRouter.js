import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutContainer from './containers/LayoutContainer';
import { useGetUserRoleQuery } from './redux/api';
import { setUserRole } from './redux/user/userSlice';
import { publicRoutes, clientRoutes, cleanerRoutes } from './routes';
import { Spin } from 'antd';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetUserRoleQuery();
  const userRole = useSelector((state) => state.user.userRole);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserRole(data?.name));
    }
    if (isError) {
      dispatch(setUserRole('unauthorized'));
    }
  }, [data, isSuccess, isError]);

  return (
    <BrowserRouter>
      <LayoutContainer>
        {isLoading ? (<Spin size='large' />) :  (
          <Routes>
            {userRole === 'unauthorized' && (publicRoutes.map(route => <Route key={route} path={route.path} element={route.element} /> ))}
            {userRole === 'user' && (clientRoutes.map(route => <Route key={route} path={route.path} element={route.element} /> ))}
            {userRole === 'cleaner' && (cleanerRoutes.map(route => <Route key={route} path={route.path} element={route.element} /> ))}
          </Routes>)
        }
      </LayoutContainer>
    </BrowserRouter>
  );
};

export default AppRouter;