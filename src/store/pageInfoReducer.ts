import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

export type PageInfoType = {
  title: string;
  desc?: string;
  css?: string;
  js?: string;
  isPublished?: boolean;
};
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  css: '',
  js: '',
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload;
    },
    changeTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload;
    }),
  },
});

export const { resetPageInfo, changeTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
