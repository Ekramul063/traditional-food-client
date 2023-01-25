import React, { useRef } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const ProductDetails = () => {
    const product = useLoaderData({});
    const { user } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
   const [makeHidden,setMakeHidden] = useState('');
   const buttonRef = useRef(null);
  

    const handleBuyProduct = (product, price, quantity) => {
        buttonRef.current.disabled = false;
        const buyProduct = {
            image:product.image,
            title: product.title,
            price: price* quantity,
            quantity,
            buyer: user?.email,
            buyerCell:user?.phoneNumber,
            seller: product.seller,
        }
        fetch('https://tradional-foodie-server.vercel.app/orders',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(buyProduct)
        })
        .then(res=> res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Purchase product successfully')
            }
        });

    }

    useEffect(()=>{
        if (product.discount){
            setPrice(product.newPrice)
        } else {
            setPrice(product.price);
        }
    },[product])
    return (
        <div className='flex max-w-[1000px] mx-auto justify-between py-10 px-5 bg-slate-400'>
            <Helmet><title>buy-product || Traditional Foodie</title></Helmet>
            <div className='w-[38%]'>
                <img src={`${product.image}`} alt='product image' className='w-full' />
                <p className='mt-5 font-semibold text-red-900 text-justify'>{product.description}</p>
            </div>
            <div className='w-[57%]'>
                <h3 className='text-2xl font-bold pb-5 ' style={{ borderBottom: '1px solid' }} >{product.title}</h3>
                {product.discount &&
                    <p className='font-bold text-2xl'>{product.newPrice} Taka<br />
                        <del className=' text-red-700 text-xl'>  {
                            product.price
                        }</del><span className='text-xl'> - {product.discount}%</span>
                    </p>}
                {!product.discount && <p className='font-bold text-2xl'>{product.price} Taka</p>}

                <p className='mt-3'>{product.description}</p>

                <div>
                    <div className='flex mt-7'>
                        <h3 className='font-bold mr-2'>Quantity </h3>
                        {
                            quantity > 1 &&
                            <svg onClick={(e) => { setQuantity(quantity - 1) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 ml-3 h-6 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                            </svg>
                        }
                        <span className='px-10'>{quantity}</span>
                        <svg onClick={(e) => { setQuantity(quantity + 1) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </div>
                    <button ref={buttonRef} onClick={() => {handleBuyProduct(product, price, quantity); setMakeHidden('hidden')}} className={`btn btn-primary mt-5 w-[300px] ${makeHidden}`}>Buy Now</button>
                </div>

            </div>


        </div>
    );
};

export default ProductDetails;