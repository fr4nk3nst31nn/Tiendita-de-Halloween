import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage'; 

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('debe usar el valor inicial si no hay nada en localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('debe obtener el valor guardado de localStorage', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored value');
  });

  it('debe actualizar el valor en localStorage cuando el estado cambia', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(JSON.parse(window.localStorage.getItem('test-key'))).toBe('new value');
  });

  it('debe usar valor por defecto cuando localStorage.getItem falla', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const originalLocalStorage = window.localStorage;
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => {
          throw new Error('Storage error');
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
        removeItem: jest.fn(),
        key: jest.fn(),
        length: 0,
      },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useLocalStorage('test-key-error', 'default'));
    expect(result.current[0]).toBe('default');
    expect(consoleErrorSpy).toHaveBeenCalled();

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
    consoleErrorSpy.mockRestore();
  });

  it('debe seguir funcionando cuando setItem falla', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const originalSetItem = window.localStorage.setItem;
    let callCount = 0;
    
    window.localStorage.setItem = jest.fn((key, value) => {
      callCount++;
      if (callCount >= 2) {
        throw new Error('Storage error');
      }
      originalSetItem.call(window.localStorage, key, value);
    });

    const { result } = renderHook(() => useLocalStorage('test-key-write-error', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });
    
    act(() => {
      result.current[1]('another value');
    });

    expect(result.current[0]).toBe('another value');

    window.localStorage.setItem = originalSetItem;
    console.error.mockRestore();
  });
});
