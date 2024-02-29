export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;
  // for props transfer between Component and PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: 'Your Paragraph',
  isCenter: false,
};
