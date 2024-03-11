import type { Meta, StoryObj } from '@storybook/react';
import JoyThemeBuilder from './Themes.component';

const meta = {
    title: 'Example/JoyThemeBuilder',
    component: JoyThemeBuilder,
    parameters: {
    
      layout: 'fullscreen',
    },
    
    tags: ['autodocs'],
    
  } satisfies Meta<typeof JoyThemeBuilder>;

  export default meta;
type Story = StoryObj<typeof meta>;

export const ThemesStory: Story = {
    args: {}
};
