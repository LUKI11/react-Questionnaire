import React, { FC, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Typography,
  Space,
  Input,
  Tooltip,
  message,
  QRCode,
  Popover,
} from 'antd';
import styles from './StatHeader.module.scss';
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate, useParams } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Title } = Typography;
const StatHeader: FC = () => {
  const { title } = useGetPageInfo();
  const navigate = useNavigate();
  const { id } = useParams();

  // link and QRCode element, middle part
  const genLinkAndQRCode = () => {
    const url = `http://localhost:3000/question/${id}`;
    const QRCodeElem = <QRCode value={url || '-'}></QRCode>;
    return (
      <Space>
        <Input value={url} style={{ width: '250px' }}></Input>
        <Tooltip title="Copy URL">
          <CopyToClipboard
            text={url}
            onCopy={() => {
              message.success('copy successfully');
            }}
          >
            <Button icon={<CopyOutlined />}></Button>
          </CopyToClipboard>
        </Tooltip>
        <Popover content={QRCodeElem} placement="bottom">
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  };

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
          {genLinkAndQRCode()}
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
