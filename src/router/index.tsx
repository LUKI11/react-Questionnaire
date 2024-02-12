import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import ManageLayout from '../layouts/ManageLayout';
import List from '../pages/manage/List';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import QuestionLayout from '../layouts/QuestionLayout';
import Edit from '../pages/question/Edit';
import Stat from '../pages/question/Stat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home></Home> },
      { path: 'login', element: <Login></Login> },
      { path: 'register', element: <Register></Register> },
      {
        path: 'manage',
        element: <ManageLayout></ManageLayout>,
        children: [
          { path: 'list', element: <List></List> },
          { path: 'star', element: <Star></Star> },
          { path: 'trash', element: <Trash></Trash> },
        ],
      },
      { path: '*', element: <NotFound></NotFound> },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      { path: 'edit/:id', element: <Edit></Edit> },
      { path: 'stat/:id', element: <Stat></Stat> },
    ],
  },
]);

export default router;

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME].includes(pathname)) return true;
  return false;
}
