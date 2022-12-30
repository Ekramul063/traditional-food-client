import React from 'react';
import { Link } from 'react-router-dom';
import BuyProductModal from '../../SharedComponents/BuyProductModal/BuyProductModal';

const ProductCard = ({ product }) => {
    const { _id,title, image, description, discount, newPrice, weight, brand,price } = product;
    return (
        <div className="card w-full bg-base-100 shadow-xl relative">
            {discount &&
                <div className='top-2 right-3 bg-secondary flex justify-center items-center  font-bold rounded-full text-red-600 absolute w-[50px] h-[50px]'><p>{discount}%</p></div>
            }

            <figure><img className='w-full h-[250px]' src={image} alt="Product" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {discount &&
                    <p className='font-bold'>{newPrice} Taka
                        <del className='ml-5 text-red-700'>  {
                            price
                        }</del>
                    </p>}

                {!discount && <p className='font-bold'>{price} Taka</p>}
                {
                    weight >= 1000 ?
                    <p>Weight: {weight/1000} kg</p>
                    :
                    <p>Weight: {weight} gm</p>

                }

                {/* <p>{description}</p> */}
                <p>
                    { description.length > 100 ?
                    <p>{description.slice(0, 70)}......</p>
                    :
                    <p>{description.slice(0, 100)}</p>
                    }
                    </p>
                <div className="card-actions justify-end">
                    {/* The button to open modal */}
                   <Link to={`/buy-products/${_id}`}><button className="btn btn-primary">Buy Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;