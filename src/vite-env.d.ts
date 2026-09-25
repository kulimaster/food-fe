/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// Raw types of VITE_* variables; use the validated `env` from '@/env' in app code.
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
