import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../Components/Loading/Loading'
import ProductCard from './ProductCard';

const Products = () => {
    // const {products,count} = useLoaderData([]);
    const [size,setSize]=useState(10);
    const [page,setPage]=useState(0);
    
    const [products,setProducts]= useState([]);
    const [count,setCount]=useState(0);
    const pages = Math.ceil(count/size);
    const {data,isLoading} = useQuery({
        queryKey: [page,size],
        queryFn: async () => {
            const res = await fetch(`https://tradional-foodie-server.vercel.app/products?page=${page}&size=${size}`);
            const data = await res.json();
            setCount(data.count);
            setProducts(data.products);
            return data;
        }
    })

    
    const [activePage,setActivePage]=useState('btn-active');
    if(isLoading){
        return <Loading></Loading>
    }
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
            <div className='btn-group flex justify-center pt-10 pb-5 items-center'>
                {
                    
                   [...Array(pages).keys()].map(number => <button className={'btn border-emerald-[#000] text-black hover:text-white'} onClick={()=>setPage(number)} key={number} >{number+1}</button>)
                }
              <label className='ml-5'> Per page : 
                  <select className='ml-2' onChange={(event)=> setSize(event.target.value)}>
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={10} selected>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
              </label>
            </div>
        </div>
    );
};

export default Products;