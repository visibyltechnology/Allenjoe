// ============================================================
//  FIREBASE DISABLED — restore original config to re-enable
// ============================================================

// Stub exports so every file that imports from here still compiles.
// All Firestore / Auth / Storage calls will fail gracefully at runtime
// because the stubs are null — each consumer already has its own
// try/catch error handling.

export const auth = null;
export const db = null;
export const storage = null;
export const analytics = null;
