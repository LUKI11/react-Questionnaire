/**
 * Radio component file
 */

import Component from './Component';
import { QuestionRadioPropsDefault } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

// title config
export default {
  title: 'Radio',
  type: 'questionRadio',
  Component, // canvas component(mid)
  PropComponent, // info change component(right)
  defaultProps: QuestionRadioPropsDefault,
};
