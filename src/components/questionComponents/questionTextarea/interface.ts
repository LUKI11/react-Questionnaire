export type QuestionTextareaPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
  disabled?: boolean;
};

export const QuestionTextareaPropsDefault = {
  title: 'Title',
  placeholder: 'Write your message',
};
