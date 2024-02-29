import Component from './Component';
import { QuestionTitleDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

// title config
export default {
  title: 'Title',
  type: 'questionTitle',
  Component, // canvas component(mid)
  PropComponent, // info change component(right)
  defaultProps: QuestionTitleDefaultProps,
};
