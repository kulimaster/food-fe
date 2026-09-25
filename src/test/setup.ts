import '@testing-library/jest-dom/vitest'
import { setProjectAnnotations } from '@storybook/react-vite'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import * as previewAnnotations from '../../.storybook/preview'

// Stories rendered in tests (composeStories) get the same global setup as in Storybook
setProjectAnnotations([previewAnnotations])

afterEach(() => {
  cleanup()
})
