import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData();
  return (
    <div>
      <p>Stat Page</p>
      {loading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Stat;
