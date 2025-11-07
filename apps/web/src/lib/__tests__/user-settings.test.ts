import { describe, it, expect, beforeEach } from 'vitest';
import { DEFAULT_SETTINGS } from '@/lib/settings.schema';
import { SettingsManager } from '@/lib/user-settings';

describe('SettingsManager (localStorage only)', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
    SettingsManager.init();
  });

  it('initializes with defaults when storage empty', () => {
    const all = SettingsManager.getAll();
    expect(all).toEqual(DEFAULT_SETTINGS);
  });

  it('sets and gets theme', () => {
    SettingsManager.set('theme', 'dark');
    expect(SettingsManager.get<'dark' | 'light' | 'system'>('theme')).toBe(
      'dark',
    );
  });

  it('resets theme to default', () => {
    SettingsManager.set('theme', 'dark');
    SettingsManager.reset('theme');
    expect(SettingsManager.get('theme')).toBe(DEFAULT_SETTINGS.theme);
  });

  it('emits change events to subscribers', async () => {
    let received: typeof DEFAULT_SETTINGS | null = null;
    const unsubscribe = SettingsManager.subscribe((settings) => {
      received = settings;
    });
    SettingsManager.set('language', 'en');
    expect(received?.language).toBe('en');
    unsubscribe();
  });
});
