import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const DistrictProducts = () => {
    const products = useLoaderData([]);
    return (
        <div>
             <div className='p-8'>
                <Helmet><title>products | Traditional Foodie</title></Helmet>
                {
                   products.length < 1 &&
                   <p className='text-red font-black text-xl text-center text-red-800'>No Product available</p>
                }
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default DistrictProducts;