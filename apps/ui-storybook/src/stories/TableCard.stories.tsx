import type { Meta, StoryObj } from '@storybook/react';
import { TableCard, TableStatus } from '@tapas/ui/TableCard';

const meta = {
    title: 'Example/TableCard',
    component: TableCard,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  } satisfies Meta<typeof TableCard>;

  export default meta;
type Story = StoryObj<typeof meta>;

export const TableCardStory: Story = {
    args: {
        tableText: "N4",
        tags: ["Private room", "12-person"],
        status: TableStatus.Available,
        onChooseImage: function(e) {
            console.log(e);
        },
        src: "https://img0.baidu.com/it/u=3635909259,3397908297&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333"
    }
};
