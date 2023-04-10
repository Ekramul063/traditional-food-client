import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Slider from "react-slick";
import foodie from '../../../asets/header/foodie.png'
import './FeatureProduct.css'
import { Link } from 'react-router-dom';

const FeatureProduct = () => {
    const { data: featureProducts = [] } = useQuery({
        queryKey: ['featureProducts'],
        queryFn: async () => {
            const res = await fetch(`https://tradional-foodie-server.vercel.app/feature-products`);
            const data = await res.json();
            return data;
        }
    })
    const settings = {
        dots: true,
        arrows:false,
        autoplay:true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll:1,
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
              slidesToScroll: 1,
            }
          }
        ]
      };
    return (
        <div className='py-20 px-3 mx-auto'>
          <h2 className='text-3xl font-semibold text-center text-primary pb-10'>Feature Products</h2>
          <Slider {...settings}>

            {
              featureProducts.map(featureProduct=><Link key={featureProduct._id} to={`/buy-products/${featureProduct._id}`}> <div className='slide_item border border-spacing-2'>
              <img src={featureProduct.image} alt="image"  className='w-full h-[200px] md:h-[300px] lg:h-[350px]'/>
              <h4 className='feature_title'>{featureProduct.title}</h4>
          </div></Link>)
            }
           

          </Slider>
        </div>
    );
};

export default FeatureProduct;