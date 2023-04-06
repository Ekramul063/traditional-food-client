import React from 'react';
import { FaCreditCard, FaMoneyBill, FaShippingFast } from 'react-icons/fa';
const Services = () => {
    return (
        <div className='pb-10 px-3 mx-auto py-10 bg-gray-300'>
            <div className=' max-w-[1150px] mx-auto'><h2 className='text-3xl font-semibold text-center text-primary pb-10'>Services</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-14 py-10 ">
                <div>
                  <div className="w-full">  <FaShippingFast className='text-6xl block mx-auto text-red-900'></FaShippingFast></div>
                    <h3 className="font-bold text-center text-2xl pt-3 pb-2">Free Shipping</h3>
                    <p className='text-center font-semibold'>If you buy out products for 50$, you will get free shipping.</p>
                </div>
                <div>
                  <div className="w-full">  <FaCreditCard className='text-6xl block mx-auto text-red-900'></FaCreditCard> </div>
                    <h3 className="font-bold text-center text-2xl pt-3 pb-2">Payment Methods</h3>
                    <p className='text-center font-semibold'>Cards, Pay letter, Giropay, Paypal, Pass-through digital wallets, other.</p>
                </div>
                <div>
                  <div className="w-full"> <FaMoneyBill className='text-6xl block mx-auto text-red-900'></FaMoneyBill> </div>
                    <h3 className="font-bold text-center text-2xl pt-3 pb-2">100% Money Back</h3>
                    <p className='text-center font-semibold'>If you do not like our products we will refund your money.</p>
                </div>

            </div>
            </div>
        </div>
    );
};

export default Services;