'use client'

// CompareContext.tsx
import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';




const CompareContext = createContext(undefined);

const CompareReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            const newItem = { ...action.payload };
            return {
                ...state,
                compareArray: [...state.compareArray, newItem],
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                compareArray: state.compareArray.filter((item) => item.id !== action.payload),
            };
        case 'LOAD_WISHLIST':
            return {
                ...state,
                compareArray: action.payload,
            };
        default:
            return state;
    }
};

export const CompareProvider = ({ children }) => {
    const [compareState, dispatch] = useReducer(CompareReducer, { compareArray: [] });

    const addToCompare = (item) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
    };

    const removeFromCompare = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemId });
    };

    return (
        <CompareContext.Provider value={{ compareState, addToCompare, removeFromCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
};
