import type { Meta, StoryObj } from '@storybook/react';

import { NumberKeyboard } from '@tapas/ui/NumberKeyboard';
import { useState } from 'react';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/NumberKeyboard',
  component: NumberKeyboard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: ({value, label, keyboard, backAsButton}) => {
    const [val, setVal] = useState(value);

    return <div style={{paddingTop: '20px'}}>
      <NumberKeyboard value={val} keyboard={keyboard} backAsButton={backAsButton} label={label} onChange={setVal} />
    </div>
  }
} satisfies Meta<typeof NumberKeyboard>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PasswordKeyboardStory: Story = {
  args: {
    value: '',
    label: 'label',
    keyboard: "1,2,3,4,5,6,7,8,9,_,0",
    backAsButton: false,
    onChange: () => {}
  },
};

export const NumberKeyboardStory: Story = {
  args: {
    value: '',
    label: 'label2',
    keyboard: "7,8,9,4,5,6,1,2,3,0,.",
    backAsButton: true,
    onChange: () => {}
  },
};
