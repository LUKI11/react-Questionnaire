export type QuestionInfoPropsType = {
  title?: string;
  paragraph?: string;
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disabled?: boolean;
};

export const QuestionInfoPropsDefault: QuestionInfoPropsType = {
  title: 'Yout Title',
  paragraph: 'Your paragraph',
};
