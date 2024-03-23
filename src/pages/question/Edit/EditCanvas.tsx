import React, { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { getComponentConfigByType } from '../../../components/questionComponents';
import { ComponentInfoType, changeSelectedId } from '../../../store/components';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';
import LoadingComponent from '../../../components/LoadingComponent';
type PropsType = {
  loading: boolean;
};

// find related component by type from redux
const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo;
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return null;
  const { Component } = componentConfig;
  return <Component {...props}></Component>;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch();
  // bind keyboard action
  useBindCanvasKeyPress();
  //get component list from redux
  const { componentList, selectedId } = useGetComponentInfo();
  // check which component is selected by id and change to this component
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  if (loading) return <LoadingComponent></LoadingComponent>;
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;
          const wrapperDefaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });

          return (
            <div key={fe_id} className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default EditCanvas;
