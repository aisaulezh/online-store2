import {useEffect, useState} from "react";




export function useLocalStorageHook<T>(key: string, defaultValue: T | (() => T)) {

    const [value, setValue] =
        useState<T>(() => {
            const jsonValue = localStorage.getItem(key);
            if (jsonValue !== null) return JSON.parse(jsonValue);
            if (typeof defaultValue === 'function') {
                return (defaultValue as () => T)();
            } else {
                return defaultValue;
            }
        })

useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
}, [value, key]);

    return [value, setValue] as [typeof value, typeof setValue];

}