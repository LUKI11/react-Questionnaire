import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
const { Search } = Input;
const ListSearch: FC = () => {
  const [value, setValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = location;
  const handleSearch = (value: string) => {
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  useEffect(() => {
    const curVal = searchParams.get('keyword') || '';
    setValue(curVal);
  }, [searchParams]);
  return (
    <>
      <Search
        onSearch={handleSearch}
        onChange={handleChange}
        value={value}
        size="large"
        allowClear
        placeholder="Search Questionnaire"
        style={{ width: '300px' }}
        enterButton
      ></Search>
    </>
  );
};

export default ListSearch;
