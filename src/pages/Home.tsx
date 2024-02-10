import { Button, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //fetch method
    // fetch('/api/test')
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    //axios method
    axios
      .get('/api/test')
      .then((res) => res.data)
      .then((data) => console.log(data));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>A NEW QUESTION FOR YOU</Title>
        <Paragraph>Created 100 questionnaires, published 90, received 1000 responses </Paragraph>
        <div>
          <Button type="primary" size="large" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
