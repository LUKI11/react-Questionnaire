import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionInfoPropsDefault } from './interface';
export * from './interface';

export default {
  title: 'Info',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoPropsDefault,
};
