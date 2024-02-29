import React, { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import {
  getComponentConfigByType,
  ComponentPropsType,
} from '../../../components/questionComponents';
import { Typography } from 'antd';
import { changeComponentProps } from '../../../store/components';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

// if not component found
const NoProp: FC = () => {
  return <Title level={5}>Select one Element to change value</Title>;
};

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();
  if (selectedComponent == null) return <NoProp></NoProp>;
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return <NoProp></NoProp>;

  const changeProps = (newProps: ComponentPropsType) => {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  };

  const { PropComponent } = componentConfig;
  return (
    <div>
      <PropComponent
        {...props}
        onChange={changeProps}
        disabled={isLocked || isHidden}
      ></PropComponent>
    </div>
  );
};

export default ComponentProp;
