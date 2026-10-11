import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '@/i18n'
import { supportedLanguages } from '@/i18n/config'
import { cx } from '@/lib/cx'

/**
 * Segmented "Čeština | English" control. Native radios: arrow keys work and screen readers
 * announce it as a choice. The choice is remembered (see setLanguage).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const name = useId()
  const current = i18n.resolvedLanguage

  return (
    <fieldset className={cx('flex flex-col gap-xs', className)}>
      <legend className="mb-xs px-xs text-label-sm text-on-surface-variant">
        {t('language.label')}
      </legend>
      <div className="flex rounded-lg bg-surface-container p-xs">
        {supportedLanguages.map((language) => (
          <label
            key={language}
            className={cx(
              'flex flex-1 cursor-pointer items-center justify-center rounded-md px-sm py-xs text-label-md transition-colors',
              'has-focus-visible:outline-2 has-focus-visible:outline-offset-1 has-focus-visible:outline-primary',
              current === language
                ? 'bg-surface-container-lowest text-primary shadow-card'
                : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            <input
              type="radio"
              name={name}
              value={language}
              checked={current === language}
              onChange={() => {
                void setLanguage(language)
              }}
              className="sr-only"
            />
            <span lang={language}>{t(`language.${language}`)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
