import {
  SettingsSchema,
  DEFAULT_SETTINGS,
  type Settings,
} from '@/lib/settings.schema';
import {
  isLocalStorageAvailable,
  lsGetItem,
  lsSetItem,
  onStorageChange,
  byteSize,
  STORAGE_NAMESPACE,
} from '@/lib/storage';

const SETTINGS_KEY = `${STORAGE_NAMESPACE}:settings:v1`;
const MAX_SETTINGS_BYTES = 100 * 1024; // 100KB safety cap
let memorySettings: Settings | null = null;

export type SettingPath =
  | 'theme'
  | 'language'
  | 'direction'
  | 'font'
  | 'layout.collapsible'
  | 'layout.variant';

type ChangeListener = (settings: Settings) => void;
const listeners = new Set<ChangeListener>();

function readRaw(): Settings {
  if (!isLocalStorageAvailable()) return memorySettings ?? DEFAULT_SETTINGS;
  const raw = lsGetItem(SETTINGS_KEY);
  if (!raw) return memorySettings ?? DEFAULT_SETTINGS;
  try {
    const parsed = JSON.parse(raw);
    const result = SettingsSchema.safeParse(parsed);
    if (!result.success) return memorySettings ?? DEFAULT_SETTINGS;
    return result.data;
  } catch {
    return memorySettings ?? DEFAULT_SETTINGS;
  }
}

function writeRaw(next: Settings): void {
  const json = JSON.stringify(next);
  if (byteSize(json) > MAX_SETTINGS_BYTES) {
    // Prevent oversizing localStorage entry
    throw new Error('Settings size exceeds safe limit');
  }
  memorySettings = next;
  lsSetItem(SETTINGS_KEY, json);
  // Notify subscribers synchronously
  listeners.forEach((fn) => {
    try {
      fn(next);
    } catch {}
  });
}

function getDefaultAt(path: SettingPath) {
  switch (path) {
    case 'theme':
      return DEFAULT_SETTINGS.theme;
    case 'language':
      return DEFAULT_SETTINGS.language;
    case 'direction':
      return DEFAULT_SETTINGS.direction;
    case 'font':
      return DEFAULT_SETTINGS.font;
    case 'layout.collapsible':
      return DEFAULT_SETTINGS.layout.collapsible;
    case 'layout.variant':
      return DEFAULT_SETTINGS.layout.variant;
  }
}

function getAt(path: SettingPath, from: Settings) {
  switch (path) {
    case 'theme':
      return from.theme;
    case 'language':
      return from.language;
    case 'direction':
      return from.direction;
    case 'font':
      return from.font;
    case 'layout.collapsible':
      return from.layout.collapsible;
    case 'layout.variant':
      return from.layout.variant;
  }
}

function setAt(path: SettingPath, value: unknown, into: Settings): Settings {
  const next: Settings = JSON.parse(JSON.stringify(into));
  switch (path) {
    case 'theme':
      next.theme = value as Settings['theme'];
      break;
    case 'language':
      next.language = value as Settings['language'];
      break;
    case 'direction':
      next.direction = value as Settings['direction'];
      break;
    case 'font':
      next.font = value as Settings['font'];
      break;
    case 'layout.collapsible':
      next.layout.collapsible = value as Settings['layout']['collapsible'];
      break;
    case 'layout.variant':
      next.layout.variant = value as Settings['layout']['variant'];
      break;
  }
  return next;
}

function validate(next: Settings): Settings {
  const parsed = SettingsSchema.parse(next);
  return parsed;
}

export const SettingsManager = {
  init() {
    if (!isLocalStorageAvailable()) return;
    // Ensure an initial valid settings object exists only when missing or invalid
    const raw = lsGetItem(SETTINGS_KEY);
    if (!raw) {
      writeRaw(validate(readRaw()));
    } else {
      try {
        const parsed = JSON.parse(raw);
        const result = SettingsSchema.safeParse(parsed);
        if (!result.success) {
          writeRaw(validate(readRaw()));
        }
      } catch {
        writeRaw(validate(readRaw()));
      }
    }
    // Listen for native storage changes to re-emit as app-level events
    onStorageChange(({ key }) => {
      if (key === SETTINGS_KEY) {
        const latest = readRaw();
        listeners.forEach((fn) => {
          try {
            fn(latest);
          } catch {}
        });
      }
    });
  },

  getAll(): Settings {
    return readRaw();
  },

  get<T = unknown>(path: SettingPath): T {
    const s = readRaw();
    return getAt(path, s) as T;
  },

  set(path: SettingPath, value: unknown): Settings {
    const next = setAt(path, value, readRaw());
    const validated = validate(next);
    writeRaw(validated);
    return validated;
  },

  reset(path: SettingPath): Settings {
    const next = setAt(path, getDefaultAt(path), readRaw());
    const validated = validate(next);
    writeRaw(validated);
    return validated;
  },

  subscribe(listener: ChangeListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

// Initialize early when module is imported in the app entry
if (typeof window !== 'undefined') {
  SettingsManager.init();
}
