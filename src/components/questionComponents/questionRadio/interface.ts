export type OptionType = {
  value: string;
  text: string;
};

// radio question props type
export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

// radio stat props type
export type QuestionRadioStatPropsType = {
  stat: { name: string; count: number }[];
};

export const QuestionRadioPropsDefault: QuestionRadioPropsType = {
  title: 'Radio selection',
  isVertical: false,
  options: [
    { value: 'item1', text: 'option 1' },
    { value: 'item2', text: 'option 2' },
    { value: 'item3', text: 'option 3' },
  ],
  value: '',
};
