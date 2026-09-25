/** Intl formats with (narrow) no-break spaces; replace them with plain spaces for comparisons */
export function plainSpaces(text: string | null | undefined): string {
  return (text ?? '').replace(/[\u00a0\u202f]/g, ' ')
}
