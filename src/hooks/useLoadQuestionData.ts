import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/components';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  //retrive a question data by id from backend
  const getData = async (id: string) => {
    if (!id) throw new Error('no id for question');
    const data = await getQuestionService(id);
    return data;
  };
  const { loading, data, error, run } = useRequest(getData, {
    manual: true,
  });

  //check whether id change
  useEffect(() => {
    run(id);
  }, [id]);

  // send the component of a question data to redux and save on redux store
  useEffect(() => {
    if (!data) return;
    const { componentList = [] } = data;
    let selectedId = '';
    if (componentList.length > 0) selectedId = componentList[0].fe_id; // default selected the first component
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
  }, [data]);

  return { loading, error, data };
};

export default useLoadQuestionData;
