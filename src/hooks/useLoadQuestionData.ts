import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  //   const [loading, setLoading] = useState(true);
  //   const [questionData, setQuestionData] = useState({});
  //   useEffect(() => {
  //     async function getData() {
  //       const data = await getQuestionService(id);
  //       setQuestionData(data);
  //       setLoading(false);
  //     }
  //     getData();
  //   }, []);

  async function getData() {
    const data = await getQuestionService(id);
    return data;
  }
  const { loading, data, error } = useRequest(getData);
  return { loading, data, error };
};

export default useLoadQuestionData;
