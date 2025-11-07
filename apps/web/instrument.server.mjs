import * as Sentry from '@sentry/tanstackstart-react'
// Support both Vite (import.meta.env) and Node (process.env) when imported via NODE_OPTIONS
const dsn = (import.meta?.env?.VITE_SENTRY_DSN ?? process.env?.VITE_SENTRY_DSN)
Sentry.init({
  dsn,
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
})
