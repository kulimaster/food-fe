import '@testing-library/jest-dom/vitest'
import { setProjectAnnotations } from '@storybook/react-vite'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { i18n } from '@/i18n'
import * as previewAnnotations from '../../.storybook/preview'

// Stories rendered in tests (composeStories) get the same global setup as in Storybook
setProjectAnnotations([previewAnnotations])

afterEach(async () => {
  cleanup()
  // Stories mounted with `Story.run()` aren't tracked by Testing Library's cleanup
  document.body.innerHTML = ''
  // Every test starts in English with no remembered settings
  localStorage.clear()
  await i18n.changeLanguage('en')
})
