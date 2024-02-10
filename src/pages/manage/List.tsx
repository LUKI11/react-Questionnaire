import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'react-use';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import { useSearchParams } from 'react-router-dom';
import { useDebounceFn, useRequest } from 'ahooks';
import { getQuestionListService } from '../../services/question';
import { LIST_PAGE_SIZE } from '../../constant';
import { LIST_SEARCH_PARAM_KEY } from '../../constant';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
const { Title } = Typography;

const List: FC = () => {
  useTitle('Questionnairee - My list');
  const [list, setList] = useState([]); // the data shown in the page
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false); // whether loading started
  const containerRef = useRef<HTMLDivElement>(null);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  // when use search, set params to initial state
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // check whether reach the max data
  // receive data from database
  const { loading, run: loadData } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: newList = [], total = 0 } = result;
        setList(list.concat(newList));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );
  // define loading more questions fn
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom < document.body.clientHeight) {
        loadData();
        setStarted(true);
      }
    },
    {
      wait: 500,
    },
  );

  // first time load
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // listen to the page scroll
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMoreData]);
  // loading element
  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin size="large"></Spin>;
    if (total === 0) return <Empty description="No Data"></Empty>;
    if (!haveMoreData) return <Title level={3}>No More Data</Title>;
    return <Spin size="large"></Spin>;
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>My List</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {/* QuestionCard */}
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q}></QuestionCard>;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>
          <LoadMoreContentElem />
        </div>
      </div>
    </div>
  );
};

export default List;
