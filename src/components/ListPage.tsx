import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
type PropType = {
  total: number;
};

const ListPage: FC<PropType> = (props: PropType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const location = useLocation();
  const navigate = useNavigate();
  // get page and page size from url
  const [searchParams] = useSearchParams();
  const { pathname } = location;
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParams]);

  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
      ></Pagination>
    </div>
  );
};

export default ListPage;
