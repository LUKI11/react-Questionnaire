import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { PageInfoType } from '../store/pageInfoReducer';

const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo) as PageInfoType;
  return pageInfo;
};

export default useGetPageInfo;
