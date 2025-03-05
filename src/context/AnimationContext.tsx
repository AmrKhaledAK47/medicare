'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Direction = 'left' | 'right';

interface AnimationContextType {
    direction: Direction;
    setDirection: (direction: Direction) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error('useAnimation must be used within an AnimationProvider');
    }
    return context;
};

interface AnimationProviderProps {
    children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
    const [direction, setDirection] = useState<Direction>('right');

    return (
        <AnimationContext.Provider value={{ direction, setDirection }}>
            {children}
        </AnimationContext.Provider>
    );
};

export default AnimationContext; 