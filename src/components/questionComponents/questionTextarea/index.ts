import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTextareaPropsDefault } from './interface';
export * from './interface';

export default {
  title: 'Textarea',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaPropsDefault,
};
