import { create } from "zustand";

const stores = new Map<string, any>();

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  if (!stores.has(key)) {
    stores.set(
      key,
      create((set: any) => {
        try {
          const item = window.localStorage.getItem(key);
          return {
            storedValue: item ? (JSON.parse(item) as T) : initialValue,
            setValue: (value: T) => {
              try {
                window.localStorage.setItem(key, JSON.stringify(value));
                set({ storedValue: value });
              } catch (error) {
                console.error(error);
              }
            },
          };
        } catch (error) {
          console.error(error);
          return { storedValue: initialValue, setValue: () => {} };
        }
      })
    );
  }

  const store = stores.get(key)();
  return [store.storedValue, store.setValue];
};
