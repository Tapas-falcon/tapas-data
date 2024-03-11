import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@tapas/ui/Select';

const meta = {
    title: 'Example/Select',
    component: Select,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  } satisfies Meta<typeof Select>;

  export default meta;
type Story = StoryObj<typeof meta>;

export const SelectStory: Story = {
    args: {
        items: [
            {key: 'default', text: 'default'},
            {key: 'k-1', text: '1'},
            {key: 'k-2', text: '2'},
            {key: 'k-3', text: '3'},
        ]
    }
};
