import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { _id, title, image, description, discount, newPrice, weight, brand, price } = product;
    const productDescription = [description];
    return (
        <div className="card w-full bg-base-100 shadow-xl relative " style={{ flex: 'none' }}>
            {discount &&
                <div className='top-2 right-3 bg-primary flex justify-center items-center font-black rounded-full text-secondary absolute w-[42px] h-[42px] text-sm'><p>-{discount}%</p></div>
            }

            <Link to={`/buy-products/${_id}`}>  <figure><img className='w-full h-[150px]' src={image} alt="Product" /></figure></Link>
            <div className="card-body py-2 px-3" style={{ flex: 'none' }}>
                <Link to={`/buy-products/${_id}`}><h2 className=" text-sm lg:text-lg md:text-lg">{title}</h2></Link>
                {discount &&
                    <p className='font-bold text-[12px] lg:text-lg md:text-lg'>{newPrice} Taka
                        <del className='ml-5 text-secondary'>  {
                            price
                        }</del>
                    </p>}

                {!discount && <p className='font-bold text-[12px] lg:text-lg md:text-lg'>{price} Taka</p>}
                {
                    weight >= 1000 ?
                        <p className=' text-[12px] lg:text-lg md:text-lg'>Weight: {weight / 1000} kg</p>
                        :
                        <p className=' text-[12px] lg:text-lg md:text-lg'>Weight: {weight} gm</p>

                }
            </div>
        </div>
    )
};

export default ProductCard;