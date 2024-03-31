export type ListType = {
  value: string;
  text: string;
  isChecked: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: ListType[];
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
export const QuestionCheckboxPropsDefault: QuestionCheckboxPropsType = {
  title: 'Checkbox',
  isVertical: false,
  list: [
    { value: 'item1', text: 'option 1', isChecked: false },
    { value: 'item2', text: 'option 2', isChecked: false },
    { value: 'item3', text: 'option 3', isChecked: false },
  ],
};
