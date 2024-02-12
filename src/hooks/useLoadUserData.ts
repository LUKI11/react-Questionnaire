import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userReducer';

const useLoadUserData = () => {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { username } = useGetUserInfo();
  // ajax get user info
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });
  // check redux have user info or not
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username]);

  return { waitingUserData };
};

export default useLoadUserData;
