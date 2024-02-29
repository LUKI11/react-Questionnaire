/**
 * Checkbox component file
 */

import Component from './Component';
import { QuestionCheckboxPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
  title: 'Checkbox',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxPropsDefault,
};
