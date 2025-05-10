'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'
import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer'
import axios from 'axios';


const ProductDefault = () => {
    const searchParams = useSearchParams()
    let productId = searchParams.get('id')

    console.log(" there is the id......"  , productId);

    if (productId === null) {
        
        productId = '1'
    }
    const [data, setData] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsResponse = await axios.get('http://localhost:3030/api/items');
                setData(itemsResponse.data);
                {console.log(itemsResponse.data)}
            } catch (err) {
                setError(err.message || 'Something went wrong');
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-white" />
                <BreadcrumbProduct data={data} productPage='default' productId={productId} />
            </div>
            {console.log("default",data)}
            <Default data={data} productId={productId} />
            <Footer />
        </>
    )
}

export default ProductDefault