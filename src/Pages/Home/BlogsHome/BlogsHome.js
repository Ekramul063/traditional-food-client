import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BlogsHome.css'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ComponentLoading from '../../../Components/ComponentLoading/ComponentLoading';
const SeasonalProduct = () => {
  const {data:blogs=[],isLoading} = useQuery({
    queryKey:['blogs'],
    queryFn:async()=>{
      const res = fetch('https://tradional-foodie-server.vercel.app/blogs-home');
      const data = (await res).json();
      return data;
    }
  })
if(isLoading){
  return <ComponentLoading></ComponentLoading>
}
  return (
    
    <div className='py-16 px-3 mx-auto products bg-red-100'>
      <h2 className='text-3xl font-semibold text-center text-primary pb-8'>Blogs</h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5'>
        {
          blogs.map(blog => <div className='p-4 border border-spacing-1'>
          <img src={blog.image} alt="" className='w-full' />
          <h3 className='font-bold text-lg text-primary my-2'>{blog.title}</h3>
                       {
                            blog.content.length < 100 ?
                            <p className='font-semibold text-sm'> {blog.content}</p>:
                            <p className='font-semibold text-sm'> {blog.content.slice(0,300)} .....</p>
                        }
           <Link to={`/blogs/${blog._id}`}><span className='btn btn-xs  mt-3 font-bold text-xs text-primary hover:text-secondary hover:bg-primary'>read more</span></Link>
        </div>)
        }
       
      </div>
      <div className='flex justify-center mt-10'>
        <Link to={'/blogs'}><button className='btn btn-primary text-white hover:text-red-700'>See All Blogs</button></Link>
      </div>
    </div>
  );
};

export default SeasonalProduct;