import React, { ChangeEvent, FC, useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import styles from './Layer.module.scss';
import {
  changeSelectedId,
  changeComponentTitle,
  toggleComponentLock,
  changeComponentHidden,
} from '../../../store/components';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Button, Input, Space, message } from 'antd';
import { LockOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Layer: FC = () => {
  const { componentList = [], selectedId } = useGetComponentInfo();
  const [changingTitleId, setChangingTitleId] = useState('');
  const dispatch = useDispatch();
  // click and change to selected component
  const handleSelectComponent = (fe_id: string) => {
    const curComp = componentList.find((item) => item.fe_id === fe_id);

    if (curComp && curComp.isHidden) {
      message.info('You need to show it before edit it');
      return;
    }

    dispatch(changeSelectedId(fe_id));

    if (changingTitleId === fe_id) return;
    // set changingTitleId to empty
    setChangingTitleId('');
  };

  // double click to set setChangingTitleId and show input element
  const handleChangingTitleId = () => {
    setChangingTitleId(selectedId);
  };

  // change title fn
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changeComponentTitle({ fe_id: changingTitleId, newTitle }));
  };

  // handle lock and unlock component fn
  const handleLockAndUnlock = (fe_id: string) => {
    dispatch(toggleComponentLock({ fe_id }));
  };

  //handle hide and show component fn
  const handleHideAndShow = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  };
  return (
    <div>
      {componentList.map((component) => {
        const { fe_id, title, isLocked, isHidden } = component;
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleSelectComponent(fe_id)}
              onDoubleClick={handleChangingTitleId}
            >
              {fe_id === changingTitleId && (
                <Input
                  value={title}
                  style={{ width: '70%' }}
                  onChange={handleTitleChange}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => console.log('change')}
                ></Input>
              )}
              {fe_id != changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  onClick={() => handleLockAndUnlock(fe_id)}
                  type={isLocked ? 'primary' : 'default'}
                ></Button>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  onClick={() => handleHideAndShow(fe_id, !isHidden)}
                  type={isHidden ? 'primary' : 'default'}
                ></Button>
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Layer;
