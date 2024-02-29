/**
 * description Question Paragraph component
 */

import Component from './Component';
import { QuestionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';
export * from './interface';

// paragraph config
export default {
  title: 'Paragraph',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
