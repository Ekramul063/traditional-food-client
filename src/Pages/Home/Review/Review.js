import {useQuery } from '@tanstack/react-query';
import React from 'react';
import Slider from "react-slick";
import AddReview from '../AddReview/AddReview';

const Review = () => {
    const hidden = false;

    const {data:reviews = [],refetch} =useQuery({
        queryKey: ['reviews'],
        queryFn: async () =>{
            const res = await fetch('https://tradional-foodie-server.vercel.app/reviews');
            const data = await res.json();
            return data;
         }
    })
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
        <div className='py-16 px-3 mx-auto products'>
            <h2 className='text-3xl font-semibold text-center text-primary pb-16'>Site Review</h2>
            <Slider {...settings}>
                {
                    reviews.map(review => <div key={review._id}>
                        <div className='flex justify-center items-center'>
                         <div>
                               { <div className="avatar">
                                    <div className=" text-center w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={review?.userProfile} alt='Profile'/>
                                    </div>
                                </div>}
                            </div>
                            <div className='px-3 pl-7'>
                               { review?.userEmail ?
                               <h3 className='font-bold text-lg mb-3'>{review.userEmail}</h3>:
                               <h3 className='font-bold text-lg mb-3'>{review.userName}</h3>
                            }
                                <p className='font-semibold'>{review.userReview}</p>
                            </div>
    
                        </div>
                    </div>)
                }
            </Slider>
            {hidden &&
            <AddReview refetch={refetch}></AddReview>
        }
        </div>

       
    );
};

export default Review;