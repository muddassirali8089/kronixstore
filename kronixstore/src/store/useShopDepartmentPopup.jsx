import { useState, useEffect, useCallback } from 'react';

const useShopDepartmentPopup = () => {
    const [openShopDepartmentPopup, setOpenShopDepartmentPopup] = useState(false)

    const handleShopDepartmentPopup = () => {
        setOpenShopDepartmentPopup((toggleOpen) => !toggleOpen)
    }

    // Check if the click event occurs outside the ShopDepartmentPopup.
    const handleClickOutsideShopDepartmentPopup = useCallback((event) => {
        // Cast event.target to Element to use the closest method.
        const targetElement = event.target;

        if (openShopDepartmentPopup && !targetElement.closest('.shop-department-popup')) {
            setOpenShopDepartmentPopup(false)
        }
    }, [openShopDepartmentPopup])

    useEffect(() => {
        // Add a global click event to track clicks outside the ShopDepartmentPopup.
        document.addEventListener('click', handleClickOutsideShopDepartmentPopup);

        // Cleanup to avoid memory leaks.
        return () => {
            document.removeEventListener('click', handleClickOutsideShopDepartmentPopup);
        };
    }, [handleClickOutsideShopDepartmentPopup, openShopDepartmentPopup])

    return {
        openShopDepartmentPopup,
        handleShopDepartmentPopup,
    }
}

export default useShopDepartmentPopup