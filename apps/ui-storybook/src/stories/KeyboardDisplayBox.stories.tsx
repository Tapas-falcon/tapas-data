import type { Meta, StoryObj } from '@storybook/react';

import { KeyboardDisplayBox } from '@tapas/ui/NumberKeyboard';
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
    render: ({ value, label, type, visible }) => {
        const [val, setVal] = useState(value);

        return <div style={{ paddingTop: '20px' }}>
            <KeyboardDisplayBox value={val} onChange={v => setVal(v)} visible={visible} label={label} type={type} />
        </div>
    }
} satisfies Meta<typeof KeyboardDisplayBox>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InputBoxStory: Story = {
    args: {
        value: '123',
        label: 'label',
        type: 'input',
        visible: true,
        onChange: (val) => {
            console.log(val)
        }
    },
};

export const DisplayBoxStory: Story = {
    args: {
        value: '123',
        label: 'label',
        type: 'display',
        visible: true,
        onChange: (val) => {
            console.log(val)
        }
    },
};

