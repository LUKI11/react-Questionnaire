import Component from './Component';
import { QuestionInputPropsDefault } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

// Input config
export default {
  title: 'Input',
  type: 'questionInput',
  Component, // canvas component(mid)
  PropComponent, // info change component(right)
  defaultProps: QuestionInputPropsDefault,
};
