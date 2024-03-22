import React, { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const ComponentList: FC = () => {
  const { componentList } = useGetComponentInfo();
  console.log(componentList);
  return <div>ComponentList</div>;
};

export default ComponentList;
