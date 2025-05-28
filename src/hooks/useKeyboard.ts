import { useEffect, useCallback } from 'react';

type KeyboardHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/**
 * Hook for handling keyboard events with specific key combinations
 * @param key - The key or key combination (e.g., 'Escape', 'Control+s')
 * @param handler - Function to call when the key is pressed
 * @param options - Configuration options
 */
export function useKeyboard(
  key: string,
  handler: KeyboardHandler,
  options: UseKeyboardOptions = {}
): void {
  const { 
    enabled = true, 
    preventDefault = true, 
    stopPropagation = false 
  } = options;

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Parse key combination
    const keys = key.toLowerCase().split('+');
    const targetKey = keys[keys.length - 1];
    const hasCtrl = keys.includes('control') || keys.includes('ctrl');
    const hasAlt = keys.includes('alt');
    const hasShift = keys.includes('shift');
    const hasMeta = keys.includes('meta') || keys.includes('cmd');

    // Check if all modifiers match
    const modifiersMatch = 
      event.ctrlKey === hasCtrl &&
      event.altKey === hasAlt &&
      event.shiftKey === hasShift &&
      event.metaKey === hasMeta;

    // Check if the key matches
    const keyMatches = event.key.toLowerCase() === targetKey;

    if (modifiersMatch && keyMatches) {
      if (preventDefault) {
        event.preventDefault();
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
      handler(event);
    }
  }, [enabled, key, handler, preventDefault, stopPropagation]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled, handleKeyPress]);
}