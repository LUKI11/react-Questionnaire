import React, { FC } from 'react';
import { componentConfigGroup, ComponentConfigType } from '../../../components/questionComponents';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../store/components';
import { nanoid } from '@reduxjs/toolkit';

const { Title } = Typography;

const ComponentLib: FC = () => {
  const dispatch = useDispatch();

  const genComponent = (component: ComponentConfigType) => {
    const { Component, title, type, defaultProps } = component;
    // add component to redux
    const handleClick = () => {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          type,
          title,
          isHidden: false,
          props: defaultProps,
        }),
      );
    };
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component></Component>
        </div>
      </div>
    );
  };

  return (
    <>
      {componentConfigGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId} style={{ marginTop: index > 0 ? '20px' : '' }}>
            <Title level={5}>{groupName}</Title>
            <div>{components.map((component) => genComponent(component))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
