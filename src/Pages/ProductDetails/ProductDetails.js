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
    const[loading,setLoading]= useState('');
    const buttonRef = useRef(null);


    const handleBuyProduct = (product, price, quantity, productHistory) => {
        setLoading(true)
        if(!user?.uid){
            setLoading(false);
            return toast.error('Please log in first');


        }
        buttonRef.current.disabled = false;
        const buyProduct = {
            image: product.image,
            title: product.title,
            price: price * quantity,
            quantity,
            buyer: user?.email,
            buyerCell: user?.phoneNumber,
            seller: product.seller,
        }
        fetch('https://tradional-foodie-server.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(buyProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Purchase product successfully');
                    setLoading(false);
                    
                }
            });

    }

    useEffect(() => {
        if (product.discount) {
            setPrice(product.newPrice)
        } else {
            setPrice(product.price);
        }
    }, [product])
    return (
        <div className='px-3 py-5 max-w-[800px] mx-auto'>
            <Helmet><title>buy-product || Traditional Foodie</title></Helmet>
            <div className="card lg:card-side">
                <div className='max-w-300px flex h-[100vh] max-h-[300px] p-[32px] pr-0'><img className='w-[250px] lg:w-[300px]' src={`${product.image}`} alt="Album" /></div>
                <div className="card-body max-w-[500px]">
                    <h2 className="card-title">{product.title}</h2>
                    {product.discount &&
                        <p className='font-bold text-2xl'>{product.newPrice} Taka<br />
                            <del className=' text-red-700 text-xl'>  {
                                product.price
                            }</del><span className='text-xl'> - {product.discount}%</span>
                        </p>}
                    {!product.discount && <p className='font-bold text-2xl'>{product.price} Taka</p>}


                    <div className='flex mt-5 '>
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
                    <div className="card-actions py-3">
                        <button  disabled={loading} ref={buttonRef}  className={`btn btn-primary w-[210px] disabled:opacity-[0.6]`}  onClick={() => {handleBuyProduct(product, price, quantity)}}>Buy Now</button>
                    </div>
                </div>
            </div>
            <p>{product.description}</p>
            {product.productHistory &&
                 <p className='mt-5 font-semibold text-red-900 text-justify'> <span className='font bold text-red-700 text-lg block underline'>History of this Food</span>{ product.productHistory}</p>
            }
        </div>
       
    );
};

export default ProductDetails;