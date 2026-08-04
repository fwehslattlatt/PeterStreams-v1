// src/api/base44Client.js
// Lightweight wrapper to provide a safe `base44` export even when the
// Base44 proxy / configuration isn't present in the build environment.

import * as base44Module from '@base44/sdk'

// If the SDK uses a default export, use it; otherwise use the named exports object.
const base44Sdk = base44Module && base44Module.default ? base44Module.default : base44Module

const isConfigured = Boolean(import.meta.env.VITE_BASE44_APP_BASE_URL)

const noop = {
  auth: {
    // PageNotFound expects base44.auth.me() to be callable and handles errors.
    me: async () => {
      // Return a rejected promise so callers that expect try/catch behave the same.
      return Promise.reject(new Error('Base44 proxy not enabled (VITE_BASE44_APP_BASE_URL not set)'))
    }
  },
  // Add other expected namespaces/methods here if you encounter runtime errors.
}

export const base44 = isConfigured ? base44Sdk : noop
