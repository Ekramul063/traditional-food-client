
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom';

const Blogs = () => {
    
    const {data:blogs=[],isLoading}= useQuery({
         queryKey:['blogs'],
        queryFn:async()=>{
            const res = fetch('https://tradional-foodie-server.vercel.app/blogs');
            const data = (await res).json();
            return data;
        }}
    )
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='px-3 mx-auto mt-5'>
            <Helmet><title>Blogs | Traditional Foodie</title></Helmet>
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-5'>
                
               
            {
                    blogs.map(blog => <div key={blog._id} className='bg-white w-full flex py-3 border border-spacing-1 justify-between items-center mb-5 lg:flex-row md:flex-row flex-col '>
                    <div className='md:w-[38%] lg:w-[38%] w-full pt-3 px-3'>
                        <img src={blog.image} alt="thumbnail" className='w-full min-h-[220px]' />
                    </div>
                    <div className='md:w-[58%] lg:w-[60%] w-full pb-3 px-3 md:border-l-2 lg:border-l-2 lg:pl-5 md:pl-5'>
                        <h3 className='font-bold text-lg text-primary mb-2'>{blog.title}</h3>
                       {
                            blog.content.length < 100 ?
                            <p className='font-semibold text-sm'> {blog.content}</p>:
                            <p className='font-semibold text-sm'> {blog.content.slice(0,300)} .....</p>
                        }
                       <Link to={`/blogs/${blog._id}`}><span className='btn-xs btn mt-2'>read more</span></Link>
                    </div>

                </div>)
                }

            </div>
        </div>
    );
};

export default Blogs;