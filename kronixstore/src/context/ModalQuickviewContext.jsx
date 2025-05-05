'use client'

// ModalQuickviewContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';






const ModalQuickviewContext = createContext(undefined);

export const ModalQuickviewProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openQuickview = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickview = () => {
        setSelectedProduct(null);
    };

    return (
        <ModalQuickviewContext.Provider value={{ selectedProduct, openQuickview, closeQuickview }}>
            {children}
        </ModalQuickviewContext.Provider>
    );
};

export const useModalQuickviewContext = () => {
    const context = useContext(ModalQuickviewContext);
    if (!context) {
        throw new Error('useModalQuickviewContext must be used within a ModalQuickviewProvider');
    }
    return context;
};
