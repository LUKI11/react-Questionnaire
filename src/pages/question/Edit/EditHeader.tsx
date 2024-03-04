import React, { ChangeEvent, FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, Space, Typography, message } from 'antd';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EditToolBar from './EditToolBar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changeTitle } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useKeyPress, useRequest, useDebounceEffect } from 'ahooks';
import { updateQuestionService } from '../../../services/question';

const { Title } = Typography;

// component for the title in header
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const dispatch = useDispatch();

  // change title in redux
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    if (!newTitle) return;
    dispatch(changeTitle(newTitle));
  };
  return (
    <Space>
      {isEditTitle ? (
        <Input
          value={title}
          onChange={handleTitleChange}
          onPressEnter={() => setIsEditTitle(false)}
          onBlur={() => setIsEditTitle(false)}
        ></Input>
      ) : (
        <Title>{title}</Title>
      )}
      <EditOutlined style={{ cursor: 'pointer' }} onClick={() => setIsEditTitle(true)} />
    </Space>
  );
};

//component for save
const SaveButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();

  // update info to database
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
    },
  );

  // fast save
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  // auto save
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    {
      // after 2s, auto save
      wait: 2000,
    },
  );
  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      Save
    </Button>
  );
};

// component for publish
const PublishButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();
  const navigate = useNavigate();
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Publish sucessfully');
        // navigate({
        //   pathname: `/question/stat/${id}`,
        // });
        navigate(`/question/stat/${id}`);
      },
    },
  );
  return (
    <Button type="primary" disabled={loading} onClick={() => publish()}>
      Publish
    </Button>
  );
};
const EditHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar></EditToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
