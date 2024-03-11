import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mui/joy';

import MessageService, { MessageOption, Message } from '@tapas/ui/Message';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Message',
  component: Message,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (props) => {
    // const [val, setVal] = useState(value);
    const msg = props ?? {
      title: 'Order submitted',
      desc: 'LP1002420231220 | Dec 21, 2023 13:57',
      hasView: true,
      actionText: 'View'
    }

    return <div style={{paddingTop: '20px'}}>
      <p>点击按钮出现Message，位置与第一个Message一致</p>
      <Button onClick={() => {
        MessageService[props.type ?? 'success'](msg)
      }}>notice</Button>
    </div>
  }
} satisfies Meta<MessageOption>;

export default meta;
type Story = StoryObj<typeof meta>;


// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CenterStory: Story = {
  args: {
    title: 'Cash drawer opened',
    type: 'warn',
    position: 'top-center',
    duration: 5000,
    // desc: 'LP1002420231220 | Dec 21, 2023 13:57',
    // hasView: true,
    // actionText: 'View'
  },
};

export const LeftStory: Story = {
  args: {
    title: 'Order submitted',
    desc: 'LP1002420231220 | Dec 21, 2023 13:57',
    hasView: true,
    duration: 6000,
    position: 'top-left',
    actionText: 'View'
  },
};

export const RightStory: Story = {
  args: {
    title: 'Order cancelled',
    type: 'fail',
    desc: 'LP1002420231220 | Dec 21, 2023 13:57',
    hasView: true,
    position: 'top-right',
    actionText: 'View'
  },
};
