import { ComponentInfoType, ComponentsStateType } from '.';

const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const visibleComponents = componentList.filter((c) => !c.isHidden);
  const index = visibleComponents.findIndex((item) => item.fe_id === fe_id);
  if (index < 0) return '';
  if (index < visibleComponents.length - 1) {
    return visibleComponents[index + 1].fe_id;
  }
  return '';
};

/**
 * add new component
 * @param draft current state
 * @param newComponent added component
 */
const insertNewComponent = (draft: ComponentsStateType, newComponent: ComponentInfoType) => {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((item) => item.fe_id === selectedId);
  if (index < 0) {
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
};

export { getNextSelectedId, insertNewComponent };
