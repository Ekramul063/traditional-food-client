import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';

const AddBlogs = () => {
    const [makeDisable,setMakedDisable]=useState(false);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const handleAddblogs = (event)=>{
        event.preventDefault();
        setMakedDisable(true);
        const image = event.target.thumbnail.files[0];
        const title = event.target.title.value;
        const content = event.target.content.value;
        const blogs ={title,content};
        if(image){
            const formData = new FormData();
            formData.append('image', image);
    
            fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(imgData =>{
                const blog ={
                    ...blogs,image:imgData.data.url
                }
                fetch('https://tradional-foodie-server.vercel.app/blogs',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(blog)
                })
                .then(res=>res.json())
                .then(data =>{
                    if(data.acknowledged){
                        event.target.reset();
                        setMakedDisable(false);
                        toast.success('Blog published successfully');
                        
    
                    }
                })
            })
            
        }

        if(!image){
            fetch('https://tradional-foodie-server.vercel.app/blogs',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(blogs)
            })
            .then(res=>res.json())
            .then(data =>{
                if(data.acknowledged){
                    event.target.reset();
                    setMakedDisable(false);
                    toast.success('Blog published successfully');
                    
    
                }
            })

        }

       
       
    }
    return (
        <div>
            <Helmet><title> Add-blogs |Traditional Foodie</title></Helmet>

            <form className='max-w-[600px] px-5 py-8 mx-auto mt-10' onSubmit={handleAddblogs}>
                <input required name='title' type="text"  placeholder='Blog Title'  className='block border-spacing-3 border rounded-lg mb-3 p-2 w-full'/>
                <textarea required name='content' type="text" placeholder='Write Here' className='block border-spacing-3 border mb-3 p-2 h-[150px] w-full'/>
                <input required name='thumbnail' type="file" className='block mt-3' />
                <div className='flex justify-center mt-3'>
                <input disabled={makeDisable} type="submit" value='POST' className=' btn bg-blue-900 mt-5 px-8 disable:opacity-[0.6]'/>
                </div>
            </form>
        </div>
    );
};

export default AddBlogs;