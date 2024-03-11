import type { Meta, StoryObj } from '@storybook/react';

import { KeyboardDisplayBox, DialKeyboard } from '@tapas/ui/NumberKeyboard';
import { useState } from 'react';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/NumberKeyboard',
    component: KeyboardDisplayBox,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    render: ({ value, label='', type }) => {
        const [val, setVal] = useState(value);
        const displayBoxType: 'input'|'display' = type!=='input' ? 'display' : 'input';

        return <div style={{ paddingTop: '20px' }}>
            <KeyboardDisplayBox value={val} onChange={v => setVal(v)} label={label} type={displayBoxType} />
            <DialKeyboard value={val} onChange={v => setVal(v)} />
        </div>
    }
} satisfies Meta<typeof KeyboardDisplayBox>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InputBoxWithDialKeyboardStory: Story = {
    args: {
        value: '123',
        label: 'label',
        type: 'input',
        onChange: (val) => {
            console.log(val)
        }
    },
};

