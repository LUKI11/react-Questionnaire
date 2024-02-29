import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/questionComponents';
import { produce } from 'immer';
import { getNextSelectedId, insertNewComponent } from './utils';
import cloneDeep from 'lodash.clonedeep';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  componentList: ComponentInfoType[];
  selectedId: string;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
};

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // reset all components
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload;
    },
    // change selected Id
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    // add new component
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload;
        const { selectedId, componentList } = draft;
        insertNewComponent(draft, newComponent);
      },
    ),
    //change component props
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload;
        const currentCom = draft.componentList.find((item) => item.fe_id === fe_id);
        if (currentCom) {
          currentCom.props = { ...currentCom.props, ...newProps };
        }
      },
    ),
    // delete component from a questionnaire
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = draft;
      const index = componentList.findIndex((item) => item.fe_id === removeId);
      const newSelectedId = getNextSelectedId(removeId, componentList);
      draft.selectedId = newSelectedId;
      componentList.splice(index, 1);
    }),
    // hide and show component
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { fe_id, isHidden } = action.payload;
        const { componentList } = draft;

        // change selectedId after hidden or shown
        let newSelectedId = '';
        if (isHidden) {
          // hide component
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          //show component
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const currentCom = componentList.find((item) => item.fe_id === fe_id);
        if (currentCom) currentCom.isHidden = isHidden;
      },
    ),
    // lock and unlock component
    toggleComponentLock: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;
        const { componentList } = draft;
        const currentCom = componentList.find((item) => item.fe_id === fe_id);
        if (currentCom) {
          currentCom.isLocked = !currentCom.isLocked;
        }
      },
    ),
    // copy current component
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;
      const currentCom = componentList.find((item) => item.fe_id === selectedId);
      if (currentCom == null) return;
      draft.copiedComponent = cloneDeep(currentCom);
    }),
    //paste component
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;
      copiedComponent.fe_id = nanoid();
      insertNewComponent(draft, copiedComponent);
    }),
    // select the previous component
    SelectPreviousComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((item) => item.fe_id === selectedId);
      // no select component
      if (index < 0) return;
      // select the first component
      if (index <= 0) return;

      draft.selectedId = componentList[index - 1].fe_id;
    }),
    // select the next component
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((item) => item.fe_id === selectedId);
      if (index < 0) return;
      if (index >= componentList.length - 1) return;
      draft.selectedId = componentList[index + 1].fe_id;
    }),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  SelectPreviousComponent,
  selectNextComponent,
} = componentSlice.actions;

export default componentSlice.reducer;
