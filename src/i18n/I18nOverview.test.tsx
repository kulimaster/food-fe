import { composeStories } from '@storybook/react-vite'
import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { i18n } from './index'
import * as stories from './I18nOverview.stories'

const { English, Czech } = composeStories(stories)

describe('i18n stories', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('English story shows English texts', async () => {
    await English.run()

    expect(screen.getByText('Protein')).toBeInTheDocument()
    expect(screen.getByText('3 items')).toBeInTheDocument()
  })

  it('Czech story switches to Czech via the locale global', async () => {
    await Czech.run()

    expect(await screen.findByText('Bílkoviny')).toBeInTheDocument()
    expect(screen.getByText('3 položky')).toBeInTheDocument()
  })
})
