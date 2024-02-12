import { useEffect } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '../router';

const useNavPage = (waitingUserData: boolean) => {
  const { username, nickname } = useGetUserInfo();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // still waiting ajax get user info
    if (waitingUserData) return;

    // have already login
    if (username) {
      if (isLoginOrRegister(pathname)) {
        navigate({
          pathname: MANAGE_INDEX_PATHNAME,
        });
      }
      return;
    }

    // not login or logout
    if (isNoNeedUserInfo(pathname)) {
      return;
      // need user info jump to login
    } else {
      navigate(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
};
export default useNavPage;
