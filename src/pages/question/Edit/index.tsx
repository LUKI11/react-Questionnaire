import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/components';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';

const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData();
  const { title } = useGetPageInfo();
  useTitle(`Edit - ${title}`);
  const dispatch = useDispatch();
  // clear component selected id
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''));
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <EditHeader></EditHeader>
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
