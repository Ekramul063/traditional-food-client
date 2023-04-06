import React from 'react';
import './HeaderSlider.css'
import { Link } from 'react-router-dom';


const HeaderSlider = () => {

    return (
        <div className='header relative'>
            <div className=' w-full h-full bg-[#00000071]'>
                    <div className='content_center text-center  w-3/4'>
                        <h3 className='leading-[70px] tracking-[4px] font-bold text-5xl text-h text-white'><i>Experience the Authentic Taste of Bangladeshi Food </i></h3>
                       <Link to={'/products'}> <button className='btn btn-primary text-white btn-xl hover:bg-[#014001] hover:text-secondary hover:font-black hover:border-none mt-7'>Shop Now!</button></Link>

                    </div>

            </div>
        </div>
    );
};

export default HeaderSlider;