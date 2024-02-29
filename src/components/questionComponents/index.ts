import type { FC } from 'react';
import QuestionInputConfig, { QuestionInputPropsType } from './questionInput';
import QuestionTitleConfig, { QuestionTitlePropsType } from './questionTitle';
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './questionParagraph';
import QuestionInfoConfig, { QuestionInfoPropsType } from './questionInfo';
import QuestionTextareaConfig, { QuestionTextareaPropsType } from './questionTextarea';
import QuestionRadioConfig, { QuestionRadioPropsType } from './questionRadio';
import QuestionCheckboxConfig, { QuestionCheckboxPropsType } from './questionCheckbox';

// component type
export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

// components config props type
export type ComponentConfigType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

//combine all components config
const componentConfigList: ComponentConfigType[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
];

// group components for component Library(left size)
export const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: 'Text',
    components: [QuestionInfoConfig, QuestionTitleConfig, QuestionParagraphConfig],
  },
  {
    groupId: 'inputGroup',
    groupName: 'Input',
    components: [QuestionInputConfig, QuestionTextareaConfig],
  },
  {
    groupId: 'selectGroup',
    groupName: 'Select',
    components: [QuestionRadioConfig, QuestionCheckboxConfig],
  },
];

// fn for find correct component by type
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((c) => c.type === type);
}
