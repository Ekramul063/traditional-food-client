import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const Products = () => {
    const products = useLoaderData([]);
    return (
        <div>
        {/* <div className="lg:w-1/2 md:w-3/2 sm:w-full p-3 mx-auto">
          <input  type="text" placeholder="Search" className="input w-full input-border border-primary" />
          <button className='bg-primary border-primary mt-[-1] h-[47px] lg:w-[120px] md:w-[90px] sm:w-[90px] lg:ml-[-121px] md:ml-[-91px] sm:ml[-91px]'>Search</button>
        </div> */}
            <div className='p-8'>
                <Helmet><title>products | Traditional Foodie</title></Helmet>
                {
                   products.length < 1 &&
                   <p className='text-red font-black text-xl text-center text-red-800'>No Product available</p>
                }
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;