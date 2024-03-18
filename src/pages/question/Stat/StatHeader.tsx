import React, { FC } from 'react';
import { Row, Col, Button, Typography, Space } from 'antd';
import styles from './StatHeader.module.scss';
import { LeftOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate, useParams } from 'react-router';

const { Title } = Typography;
const StatHeader: FC = () => {
  const { title } = useGetPageInfo();
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className={styles['header-wrapper']}>
      <Row className={styles.header}>
        <Col className={styles.left} span={4}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <Title>{title}</Title>
          </Space>
        </Col>
        <Col className={styles.mid} span={16}>
          Middle
        </Col>
        <Col className={styles.right} span={4}>
          <Button type="primary" onClick={() => navigate(`/question/edit/${id}`)}>
            Edit
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StatHeader;
