"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DemoContextType {
    isDemoLoading: boolean;
    setIsDemoLoading: (loading: boolean) => void;
    shouldRedirect: boolean;
    setShouldRedirect: (redirect: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemoContext = () => {
    const context = useContext(DemoContext);
    if (!context) {
        // Return default values instead of throwing error to prevent SSR issues
        return {
            isDemoLoading: false,
            setIsDemoLoading: () => {},
            shouldRedirect: false,
            setShouldRedirect: () => {}
        };
    }
    return context;
};

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDemoLoading, setIsDemoLoading] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    return (
        <DemoContext.Provider value={{ 
            isDemoLoading, 
            setIsDemoLoading, 
            shouldRedirect, 
            setShouldRedirect 
        }}>
            {children}
        </DemoContext.Provider>
    );
};