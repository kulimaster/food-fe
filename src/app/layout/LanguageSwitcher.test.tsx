import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { i18n } from '@/i18n'
import { languageStorageKey } from '@/i18n/config'
import { LanguageSwitcher } from './LanguageSwitcher'

describe('LanguageSwitcher', () => {
  afterEach(async () => {
    localStorage.clear()
    await i18n.changeLanguage('en')
  })

  it('is a labelled group with the current language selected', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByRole('group', { name: 'Language' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'English' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Čeština' })).not.toBeChecked()
  })

  it('switches the language, remembers it and updates <html lang>', async () => {
    render(<LanguageSwitcher />)

    await userEvent.click(screen.getByRole('radio', { name: 'Čeština' }))

    expect(await screen.findByRole('group', { name: 'Jazyk' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Čeština' })).toBeChecked()
    expect(localStorage.getItem(languageStorageKey)).toBe('cs')
    expect(document.documentElement.lang).toBe('cs')
  })

  it('works with the keyboard (arrow keys move between languages)', async () => {
    render(<LanguageSwitcher />)

    await userEvent.tab()
    expect(screen.getByRole('radio', { name: 'English' })).toHaveFocus()
    await userEvent.keyboard('{ArrowLeft}')

    expect(await screen.findByRole('radio', { name: 'Čeština' })).toBeChecked()
  })
})
