import { createContext, ReactNode, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
    children: ReactNode;
};

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        const storagedTheme = localStorage.getItem('theme')

        return (storagedTheme ?? 'light') as Theme;
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

    function toggleTheme() {
        //SE O TEMA ATUAL FOR IGUAL A 'LIGHT', SETAR PARA 'DARK', SE NÃO, SETAR PARA 'LIGHT'
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}