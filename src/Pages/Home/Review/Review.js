import React from 'react';
import Slider from "react-slick";

const Review = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='py-10 px-3 mx-auto products'>
            <h2 className='text-3xl font-semibold text-center text-primary pb-16'>Site Review</h2>
            <Slider {...settings}>
                <div>
                    <div className='flex justify-center items-center'>
                        <div>
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className='px-3 pl-7'>
                            <h3 className='font-bold text-lg mb-3'>ekramulhasan063@gmail.com</h3>
                            <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In alias ab debitis quaerat quam hic officiis, porro aperiam magni natus.</p>
                        </div>

                    </div>
                </div>
                <div>
                    <div className='flex justify-center items-center'>
                        <div>
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className='px-3'>
                            <h3 className='font-bold text-lg mb-3'>ekramulhasan063@gmail.com</h3>
                            <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In alias ab debitis quaerat quam hic officiis, porro aperiam magni natus.</p>
                        </div>

                    </div>
                </div>
                <div>
                    <div className='flex justify-center items-center'>
                        <div>
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg " />
                                </div>
                            </div>
                        </div>
                        <div className='px-3'>
                            <h3 className='font-bold text-lg mb-3'>ekramulhasan063@gmail.com</h3>
                            <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In alias ab debitis quaerat quam hic officiis, porro aperiam magni natus.</p>
                        </div>

                    </div>
                </div>


            </Slider>
        </div>
    );
};

export default Review;