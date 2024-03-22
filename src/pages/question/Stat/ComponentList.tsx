import React, { FC } from 'react';
import styles from './ComponentList.module.scss';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType } from '../../../store/components';
import { getComponentConfigByType } from '../../../components/questionComponents';
import { Space } from 'antd';
import classNames from 'classnames';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { componentList } = useGetComponentInfo();
  return (
    <Space.Compact block={true} direction="vertical">
      {componentList
        .filter((c: ComponentInfoType) => !c.isHidden)
        .map((c: ComponentInfoType) => {
          const { fe_id, type, props } = c;
          const wrapperClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const componentConfig = getComponentConfigByType(type);
          if (componentConfig == null) return;
          const { Component } = componentConfig;
          const componentClassName = classNames({
            [wrapperClassName]: true,
            [selectedClassName]: fe_id == selectedComponentId,
          });
          return (
            <div
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
              className={componentClassName}
            >
              <div className={styles.component}>
                <Component {...props}></Component>
              </div>
            </div>
          );
        })}
    </Space.Compact>
  );
};

export default ComponentList;
