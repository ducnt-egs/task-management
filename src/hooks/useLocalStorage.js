import { useState, useEffect, useRef } from "react";

function useLocalStorage(key, initialValue) {
  // Track if component has been initialized
  const isFirstRender = useRef(true);

  // Load from localStorage on initialization
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Convert deadline strings back to Date objects
        if (Array.isArray(parsed)) {
          return parsed.map((task) => ({
            ...task,
            deadline: new Date(task.deadline),
          }));
        }
        return parsed;
      }
      // If localStorage is empty, use initialValue from data.js
      return initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever value changes (except on first render)
  useEffect(() => {
    // Skip first render to avoid overwriting localStorage with initialValue
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
