import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import header1 from '../../../asets/header/header1.png'


const HeaderSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>

            <Slider {...settings}>
                <div>
                    <div className='relative'>
                        <img className=' w-full max-h-[450px]' src={header1} alt="" />
                        <div className="absolute left-10 bottom-10 max-w-[400px]">
                        <h2 className='text-6xl mb-10 font-bold py-2 px-4 bg-primary rounded-full inline-block'>50%</h2><span className='text-red-600 text-sm mt-4 inline-block font-semibold py-1 px-1 bg-secondary rounded-full '><small>Discount</small></span>
                        <h3 className='font-bold text-2xl text-white mb-2'>item name</h3>
                        <p className='font-semibold  text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure iste consectetur id quibusdam ea doloremque illum amet maiores itaque debitis.</p>
                        <button className='btn btn-primary mt-4'>Buy Now</button>

                    </div>
                    </div>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
};

export default HeaderSlider;