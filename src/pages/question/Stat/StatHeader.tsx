import React, { FC, useRef } from 'react';
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
  InputRef,
} from 'antd';
import styles from './StatHeader.module.scss';
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate, useParams } from 'react-router';

const { Title } = Typography;
const StatHeader: FC = () => {
  const { title } = useGetPageInfo();
  const navigate = useNavigate();
  const { id } = useParams();

  // link and QRCode element, middle part
  const genLinkAndQRCode = () => {
    const url = `http://localhost:3000/question/${id}`;
    const QRCodeElem = <QRCode value={url || '-'}></QRCode>;
    const inputRef = useRef<InputRef>(null);
    const copyURL = () => {
      const inputEle = inputRef.current;
      if (inputEle == null) return;
      inputEle.select();
      document.execCommand('copy');
      message.success('Copy Successfully');
    };
    return (
      <Space>
        <Input value={url} style={{ width: '250px' }} ref={inputRef}></Input>
        <Tooltip title="Copy URL">
          <Button icon={<CopyOutlined />} onClick={copyURL}></Button>
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
