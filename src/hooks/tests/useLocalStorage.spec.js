<<<<<<< HEAD
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage'; 
=======
import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../hooks/useLocalStorage'; 
>>>>>>> 1d31a5c861817128d3fc37e1575ef9406e4c06da

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
});
