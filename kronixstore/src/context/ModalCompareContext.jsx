'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';



const ModalCompareContext = createContext(undefined);

export const useModalCompareContext = () => {
    const context = useContext(ModalCompareContext);
    if (!context) {
        throw new Error('useModalCompareContext must be used within a ModalCompareProvider');
    }
    return context;
};

export const ModalCompareProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModalCompare = () => {
        setIsModalOpen(true);
    };

    const closeModalCompare = () => {
        setIsModalOpen(false);
    };

    const contextValue = {
        isModalOpen,
        openModalCompare,
        closeModalCompare,
    };

    return (
        <ModalCompareContext.Provider value={contextValue}>
            {children}
        </ModalCompareContext.Provider>
    );
};
