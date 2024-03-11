import { NoData } from '@tapas/ui/NoData'
import { EmoticonDownIcon } from "@tapas/ui/icons";
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Example/NoData',
    component: NoData,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    render: ({title, description, icon, className}) => {
        return <div style={{height: '100vh', width:'3.5rem', fontSize: '16px', position: 'relative', whiteSpace: 'nowrap'}}>
            <NoData title={title} description={description} icon={icon} className={className} />
        </div>
    
    }
} satisfies Meta<typeof NoData>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoDataStory: Story = {
    args: {
        title: 'No Data',
        description: 'Woops! There is no data to show.',
        // icon is optional
        icon: <EmoticonDownIcon style={{
            "--Icon-fontSize": "3.5rem",
            width: '3.5rem',
            height: '3.5rem'
        }} />,
        // className is optional
        className: 'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
    },
};