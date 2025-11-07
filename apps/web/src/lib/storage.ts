// Safe localStorage helpers with environment guards and robust error handling
// Use these for all preference persistence operations.

export const STORAGE_NAMESPACE = 'umay';

export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = `__${STORAGE_NAMESPACE}_ls_test__`;
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function lsGetItem(key: string): string | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function lsSetItem(key: string, value: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function lsRemoveItem(key: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // noop
  }
}

export type StorageChangeCallback = (args: {
  key: string | null;
  newValue: string | null;
  oldValue: string | null;
}) => void;

// Cross-tab storage change listener
export function onStorageChange(cb: StorageChangeCallback): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: StorageEvent) => {
    cb({ key: e.key, newValue: e.newValue, oldValue: e.oldValue });
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

// Utility to compute approximate size of a string in bytes
export function byteSize(str: string): number {
  try {
    return new Blob([str]).size;
  } catch {
    return str.length;
  }
}
