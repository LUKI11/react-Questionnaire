import { useKeyPress } from 'ahooks';
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  SelectPreviousComponent,
  selectNextComponent,
} from '../store/components';
import { useDispatch } from 'react-redux';

// check the active element is form element or not
function isActiveElementValid() {
  const activeElement = document.activeElement;
  if (activeElement === document.body) return true;
  return false;
}

// bind all fns from toolbar with keyboard
const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch();
  // delete fn by keyboard
  useKeyPress(['delete', 'backspace'], () => {
    if (isActiveElementValid()) {
      dispatch(removeSelectedComponent());
    }
  });

  //copy element by keyboard
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copySelectedComponent());
    }
  });

  //paste element by keyboard
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteCopiedComponent());
    }
  });

  //change current component to previous component by uparrow
  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid()) {
      dispatch(SelectPreviousComponent());
    }
  });

  //change current component to the next component by downarrow
  useKeyPress('downarrow', () => {
    dispatch(selectNextComponent());
  });
};

export default useBindCanvasKeyPress;
