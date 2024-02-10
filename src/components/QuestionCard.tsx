import React, { FC, useState } from 'react';
import styles from './QuestionCard.module.scss';
import { Space, Button, Divider, Tag, Popconfirm, message, Modal } from 'antd';
import { updateQuestionService, duplicateQuestionService } from '../services/question';
import {
  StarOutlined,
  EditOutlined,
  CopyOutlined,
  BarChartOutlined,
  DeleteOutlined,
  StarFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
  isDeleted: boolean;
};

const { confirm } = Modal;

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createAt } = props;
  const navigate = useNavigate();

  // update star
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState }); // update to backend
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState); //update in the dom
        message.success('change star');
      },
    },
  );

  // duplcate questionnaire
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result: any) {
        message.success('copy successfully');
        navigate({
          pathname: `/question/edit/${result.id}`,
        });
      },
    },
  );

  // delete a questionnaire
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true);
        message.success('delete successfully');
      },
    },
  );
  const confirmDelete = () => {
    confirm({
      title: 'Delete this Questionnaire',
      icon: <ExclamationCircleFilled />,
      content: 'Do you confirm to delete this questionnaire?',
      okType: 'danger',
      okText: 'Yes',
      onOk: deleteQuestion,
    });
  };
  // if the card deleted, don't show
  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space size="middle">
            {isPublished ? <Tag color="green">Published</Tag> : <Tag> Not Published</Tag>}
            <span>Response: {answerCount}</span>
            <span>Date: {createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }}></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/question/edit/${_id}`)}
            >
              Edit Questionnairee
            </Button>
            <Button
              type="text"
              size="small"
              icon={<BarChartOutlined />}
              onClick={() => navigate(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              Data Analysis
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={isStarState ? <StarFilled /> : <StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? 'Unstar' : 'Star'}
            </Button>
            <Popconfirm
              title="Copy this Questionnaire"
              description="Do you confirm to copy this Questionnaire?"
              onConfirm={duplicate}
              okText="Yes"
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                Copy
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={confirmDelete}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
