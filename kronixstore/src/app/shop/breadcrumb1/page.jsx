'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1'
import Footer from '@/components/Footer/Footer'
import axios from 'axios';

export default function BreadCrumb1() {
    const searchParams = useSearchParams()
    let [type, setType] = useState()
    let datatype = searchParams.get('type')
    let gender = searchParams.get('gender')
    let category = searchParams.get('category')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [data, setData] = useState([]);
    console.log("dfghjk");
    
    console.log(data);
    console.log("dfghjk");
    
    const [dataCat, setDataCat] = useState([]);
    useEffect(() => {
        setType(datatype);
    }, [datatype]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const [itemsResponse, categoriesResponse] = await Promise.all([
                axios.get('http://localhost:3030/api/items'),
                axios.get('http://localhost:3030/api/categories/query/name')
                // axios.get('https://api.kronixstore.com/api/categories/query/name')
            ]);

            console.log("✅ Fetched items:", itemsResponse.data);
            console.log("✅ Fetched categories (raw):", categoriesResponse.data);

            let cat = categoriesResponse.data.map(catg => catg.name);
            console.log("✅ Mapped category names:", cat);

            setData(itemsResponse.data);
            setDataCat(cat);
        } catch (err) {
            setError(err.message || 'Something went wrong');
            console.error("❌ Error fetching data:", err);
        }
    };

    fetchData();
}, []);


console.log("📦 Final data sent to ShopBreadCrumb1:", data);
console.log("📂 Final categories sent to ShopBreadCrumb1:", dataCat);

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
            </div>
            <ShopBreadCrumb1
                data={data}
                productPerPage={9}
                dataType={type}
                gender={gender}
                category={dataCat}        // ✅ all categories
                selectCategory={category} 

            />
            <Footer />
        </>
    )
}
