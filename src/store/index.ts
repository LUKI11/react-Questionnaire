import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentReducer, { ComponentsStateType } from './components';

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
};

const store = configureStore({
  reducer: {
    //user reducer
    user: userReducer,
    //component reducer
    components: componentReducer,
  },
});

export default store;
