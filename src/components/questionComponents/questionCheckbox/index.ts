/**
 * Checkbox component file
 */

import Component from './Component';
import { QuestionCheckboxPropsDefault } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';

export * from './interface';

export default {
  title: 'Checkbox',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxPropsDefault,
  StatComponent,
};
