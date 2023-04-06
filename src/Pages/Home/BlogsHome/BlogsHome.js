
import React from 'react';
import foodie from '../../../asets/header/foodie.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './BlogsHome.css'
const SeasonalProduct = () => {
   
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
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
          <h2 className='text-3xl font-semibold text-center text-primary pb-8'>Blogs</h2>
            <Slider {...settings}>
          <div className='p-4 border border-spacing-1'>
            <img src={foodie} alt="" className='w-full'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem obcaecati porro suscipit facilis nostrum. Tenetur nobis quisquam aliquam quas doloribus?....</p>
            <span className='btn btn-xs  mt-3 font-bold text-xs text-primary hover:text-secondary hover:bg-primary'>Read more</span>
          </div>
          <div className='p-4 border border-spacing-1'>
            <img src={foodie} alt="" className='w-full'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem obcaecati porro suscipit facilis nostrum. Tenetur nobis quisquam aliquam quas doloribus?....</p>
            <span className='btn btn-xs  mt-3 font-bold text-xs text-primary hover:text-secondary hover:bg-primary'>Read more</span>
          </div>
          <div className='p-4 border border-spacing-1'>
            <img src={foodie} alt="" className='w-full'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem obcaecati porro suscipit facilis nostrum. Tenetur nobis quisquam aliquam quas doloribus?....</p>
            <span className='btn btn-xs  mt-3 font-bold text-xs text-primary hover:text-secondary hover:bg-primary'>Read more</span>
          </div>
          <div className='p-4 border border-spacing-1'>
            <img src={foodie} alt="" className='w-full'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem obcaecati porro suscipit facilis nostrum. Tenetur nobis quisquam aliquam quas doloribus?....</p>
            <span className='btn btn-xs  mt-3 font-bold text-xs text-primary hover:text-secondary hover:bg-primary'>Read more</span>
          </div>
        </Slider>
        </div>
    );
};

export default SeasonalProduct;