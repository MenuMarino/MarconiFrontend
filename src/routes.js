import React from 'react';
import Login from './components/Login';
import Data from './components/Data';
import Pages from './components/Pages';

export const routes = [
  {
    path: '/',
    component: <Login />,
  },
  {
    path: '/data',
    component: <Pages />,
  },
  {
    path: '/data/:pageId',
    component: <Data />,
  },
];
