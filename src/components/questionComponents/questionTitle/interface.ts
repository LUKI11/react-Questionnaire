export type QuestionTitlePropsType = {
  text?: string;
  level?: number;
  isCenter?: boolean;
  onChange?: (newProps: QuestionTitlePropsType) => void;
  disabled?: boolean;
};

export const QuestionTitleDefaultProps = {
  text: 'Title',
  level: 1,
  isCenter: false,
};
