import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/components';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const EditToolBar: FC = () => {
  const dispatch = useDispatch();
  // get current seleted component
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  // delete selected component from component list
  const handleDelete = () => {
    dispatch(removeSelectedComponent());
  };
  // hidden selected componet
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  };
  // lock or unlock component
  const handleLocked = () => {
    dispatch(toggleComponentLock({ fe_id: selectedId }));
  };
  // copy a component
  const copy = () => {
    dispatch(copySelectedComponent());
  };
  // paste component
  const paster = () => {
    dispatch(pasteCopiedComponent());
  };
  return (
    <div>
      <Space>
        <Tooltip placement="bottom" title="Delete">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Hidden">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Locked">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLocked}
            type={isLocked ? 'primary' : 'default'}
          ></Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Copy">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Paste">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={paster}
            disabled={copiedComponent == null}
          ></Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Redo">
          <Button
            shape="circle"
            icon={<RedoOutlined />}
            onClick={() => dispatch(UndoActionCreators.redo())}
          ></Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Undo">
          <Button
            shape="circle"
            icon={<UndoOutlined />}
            onClick={() => dispatch(UndoActionCreators.undo())}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  );
};

export default EditToolBar;
