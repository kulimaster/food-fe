import themeCss from './theme.css?raw'

/**
 * Design tokens parsed from theme.css, so documentation (Storybook) can't drift from the source.
 * Values referencing another token (e.g. `var(--color-primary)`) are resolved.
 */

export interface Token {
  name: string
  value: string
  comment?: string
}

const declarationPattern = /--([\w-]+):\s*([^;]+);(?:[ \t]*\/\*\s*(.+?)\s*\*\/)?/g

const allVariables = new Map<string, Token>()
for (const [, name = '', rawValue = '', comment] of themeCss.matchAll(declarationPattern)) {
  const value = rawValue.trim()
  if (value !== 'initial') {
    allVariables.set(name, comment ? { name, value, comment } : { name, value })
  }
}

function resolve(value: string): string {
  const reference = /^var\(--([\w-]+)\)$/.exec(value)?.[1]
  const target = reference ? allVariables.get(reference) : undefined
  return target ? resolve(target.value) : value
}

/** Tokens of one namespace, e.g. `tokensOf('color')` → `{ name: 'primary', value: '#006c49' }` */
export function tokensOf(namespace: string): Token[] {
  const prefix = `${namespace}-`
  return [...allVariables.values()]
    .filter(({ name }) => name.startsWith(prefix) && !name.slice(prefix.length).includes('--'))
    .map((token) => ({
      ...token,
      name: token.name.slice(prefix.length),
      value: resolve(token.value),
    }))
}

/** Sub-properties of a token, e.g. `tokenProperties('text-body-md')` → `{ 'line-height': '24px' }` */
export function tokenProperties(name: string): Record<string, string> {
  const prefix = `${name}--`
  return Object.fromEntries(
    [...allVariables.values()]
      .filter((token) => token.name.startsWith(prefix))
      .map((token) => [token.name.slice(prefix.length), resolve(token.value)]),
  )
}
