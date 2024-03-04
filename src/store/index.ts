import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStateType } from './userReducer';
import componentReducer, { ComponentsStateType } from './components';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

const store = configureStore({
  reducer: {
    //user reducer
    user: userReducer,
    //component reducer
    components: undoable(componentReducer, {
      limit: 20, // limit undo 20
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/SelectPreviousComponent',
        'components/selectNextComponent',
      ]),
    }),
    // components: componentReducer,
    // pageinfo reducer
    pageInfo: pageInfoReducer,
  },
});

export default store;
