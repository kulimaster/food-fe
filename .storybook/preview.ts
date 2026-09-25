import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        background: { name: 'Background', value: '#f8f9ff' },
        card: { name: 'Card (white)', value: '#ffffff' },
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile (390)',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        desktop: {
          name: 'Desktop (1280)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    a11y: {
      // Report accessibility violations as errors in the Storybook a11y panel
      test: 'error',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'background' },
  },
}

export default preview
