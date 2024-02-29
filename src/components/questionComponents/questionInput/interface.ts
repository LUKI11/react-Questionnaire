export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionInputPropsType) => void;
  disabled?: boolean;
};

export const QuestionInputPropsDefault = {
  title: 'Input Title',
  placeholder: 'Your message',
};
