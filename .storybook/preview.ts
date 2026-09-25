import type { Preview } from '@storybook/react-vite'
import { isSupportedLanguage } from '../src/i18n/config'
import { i18n } from '../src/i18n'
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
  globalTypes: {
    locale: {
      description: 'UI language',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'cs', title: 'Čeština' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'background' },
    locale: 'en',
  },
  decorators: [
    // Follow the toolbar language (not persisted, unlike setLanguage in the app)
    (Story, { globals }) => {
      const locale: unknown = globals.locale
      if (isSupportedLanguage(locale) && i18n.language !== locale) {
        void i18n.changeLanguage(locale)
      }
      return Story()
    },
  ],
}

export default preview
