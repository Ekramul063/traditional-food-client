import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';

const BlogsDetails = () => {
    const blog = useLoaderData({});
    return (
        <div className='px-3 mx-auto pt-5  max-w-[900px]'>
            <Helmet><title> Blog-{blog.title} | Traditional Foodie</title></Helmet>

        <div className=' p-5 pb-10'>
            <img src={blog.image} alt="" className='w-full max-h-[350px]' />
            <h3 className='font-bold text-2xl text-primary my-2'>{blog.title}</h3>
            <p className='font-semibold text-justify'> {blog.content}</p>
        </div>
        
    </div>
    );
};

export default BlogsDetails;