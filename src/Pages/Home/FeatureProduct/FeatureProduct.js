import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Slider from "react-slick";
import foodie from '../../../asets/header/foodie.png'
import './FeatureProduct.css'

const FeatureProduct = () => {
    const { data: seasonalProducts = [] } = useQuery({
        queryKey: ['seasonalProducts'],
        queryFn: async () => {
            const res = await fetch(`https://tradional-foodie-server.vercel.app/products`);
            const data = await res.json();
            return data;
        }
    })
    const products = seasonalProducts.products;
    const settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
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
              slidesToScroll: 2,
            }
          }
        ]
      };
    return (
        <div className='py-10 px-3 mx-auto'>
          <h2 className='text-3xl font-semibold text-center text-primary pb-8'>Feature Products</h2>
          <Slider {...settings}>
            <div className='slide_item' id='slideItem'>
                <img src={foodie} alt="image"  className='w-full'/>
                <h4 className='feature_title'>Bogurar Doi</h4>
            </div>
            <div className='slide_item'>
                <img src={foodie} alt="image"  className='w-full featureImage'/>
                <h4 className='feature_title'>Bogurar Doi</h4>
            </div>
            <div className='slide_item'>
                <img src={foodie} alt="image"  className='w-full featureImage'/>
                <h4 className='feature_title'>Bogurar Doi</h4>
            </div>
           

          </Slider>
        </div>
    );
};

export default FeatureProduct;