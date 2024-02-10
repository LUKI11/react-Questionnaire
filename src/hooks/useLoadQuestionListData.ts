import { useRequest } from 'ahooks';
import { getQuestionListService } from '../services/question';
import { useSearchParams } from 'react-router-dom';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};
const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const getData = async () => {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });
    return data;
  };
  const { loading, data, error, refresh } = useRequest(getData, {
    refreshDeps: [searchParams],
  });
  return { loading, data, error, refresh };
};

export default useLoadQuestionListData;
