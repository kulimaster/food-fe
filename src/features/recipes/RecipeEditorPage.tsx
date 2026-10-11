import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { Page } from '@/components/Page'

/** Recipe builder: creates a recipe at /recipes/new, edits one at /recipes/:recipeId */
export function RecipeEditorPage() {
  const { t } = useTranslation()
  const { recipeId } = useParams()

  return (
    <Page title={recipeId ? t('nav.editRecipe') : t('nav.newRecipe')}>
      <p className="text-body-md text-on-surface-variant">{t('app.comingSoon')}</p>
    </Page>
  )
}
