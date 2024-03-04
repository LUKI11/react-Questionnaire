import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Stat: FC = () => {
  const { loading, error } = useLoadQuestionData();

  return (
    <div>
      <p>Stat Page</p>
      {loading ? <p>Loading</p> : <p></p>}
    </div>
  );
};

export default Stat;
