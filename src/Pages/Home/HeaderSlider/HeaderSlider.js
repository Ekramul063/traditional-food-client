import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HeaderSlider.css'

import slider1 from '../../../asets/header/slider1.jpg'
import { Link } from 'react-router-dom';


const HeaderSlider = () => {
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };

    return (
        <div className='header relative'>
            <div className=' w-full h-full bg-[#00000071]'>
                    <div className='content_center text-center  w-3/4'>
                        <h3 className='leading-[70px] tracking-[4px] font-bold text-5xl text-h text-white'><i>Experience the Authentic Taste of Bangladeshi Food </i></h3>
                       <Link to={'/products'}> <button className='btn btn-primary text-white btn-xl hover:bg-[#014001] hover:text-secondary hover:font-black hover:border-none mt-7'>Shop Now!</button></Link>

                    </div>

            </div>

            {/* <Slider {...settings}>
                <div>
                    <div className='relative'>
                        <img className=' w-full max-h-[500px]' src={slider1} alt="" />
                        <div className="content_center text-center">
                            <h3 className='font-bold text-4xl text-white mb-2'>item name</h3>
                            <p className='font-semibold  text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure iste consectetur id quibusdam ea doloremque illum amet maiores itaque debitis.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
            </Slider> */}
        </div>
    );
};

export default HeaderSlider;