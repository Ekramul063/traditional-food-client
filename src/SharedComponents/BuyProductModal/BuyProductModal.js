import React from 'react';

const BuyProductModal = ({ product }) => {
    const { title, image, description, discount, newPrice, weight, brand, price } = product;

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="buy-product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="card w-full bg-base-100 shadow-xl relative">
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

                            <p>{description}</p>

                            <div className="modal-action">
                                <label htmlFor="buy-product-modal" className="btn btn-primary">Buy Now</label>
                                <label htmlFor="buy-product-modal" className="btn bg-secondary text-primary">close</label>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default BuyProductModal;