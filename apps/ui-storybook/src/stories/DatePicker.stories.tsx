import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@tapas/ui/DatePicker";
import ThemeProvider from "./ThemeProvider";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/DatePicker",
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  render: (props) => {
    return (
      <ThemeProvider>
        <div>selectd: <span id="res"></span></div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <DatePicker {...props} />
        </div>
      </ThemeProvider>
    );
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ViewsStory: Story = {
  args: {
    views: ["year", "month", "day"],
    value: "2024-01-01",
    
    customRange: true,
    doneFn: (date) => console.log(date),
  },
};

export const FooterStory: Story = {
  args: {
    views: ["year", "month", "day"],
    footer: false,
  },
};

export const RangeStory: Story = {
  args: {
    views: ["year", "month", "day"],
    mode: "range",
    customRange: true,
    fields: [
      { key: "createdTime", label: "Created Time" },
      { key: "checkoutTime", label: "Checkout Time" },
    ],
    doneFn: (date) => console.log(date),
  },
};

export const TabsModeStory: Story = {
  args: {
    views: ["year", "month", "day"],
    mode: "tabs",
    fields: [
      { key: "createdTime", label: "Created Time" },
      { key: "checkoutTime", label: "Checkout Time" },
    ],
    doneFn: (date) => console.log(date),
  },
};
