import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(initialValue); // Init with fallback value
  const [isClient, setIsClient] = useState(false); // Track if we're on the client

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsClient(true); // Now we’re on the client

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to read from localStorage', error);
    }
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Failed to write to localStorage', error);
    }
  };

  return [state, setValue, isClient];
};

export default useLocalStorage;
