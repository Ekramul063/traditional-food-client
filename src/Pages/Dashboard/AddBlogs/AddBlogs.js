import React from 'react';
import { Helmet } from 'react-helmet-async';

const AddBlogs = () => {
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const handleAddblogs = (event)=>{
        event.preventDefault();
        const image = event.target.thumbnail.files[0];
        const title = event.target.title.value;
        const content = event.target.content.value;
        const blog ={image,title,content};
        console.log(image,'imgas');
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData =>{
            console.log(imgData)
        })
    }
    return (
        <div>
            <Helmet><title> Add-blogs |Traditional Foodie</title></Helmet>

            <form className='max-w-[600px] px-5 py-8 mx-auto mt-10' onSubmit={handleAddblogs}>
                <input name='title' type="text"  placeholder='Blog Title'  className='block border-spacing-3 border rounded-lg mb-3 p-2 w-full'/>
                <textarea name='content' type="text" placeholder='Write Here' className='block border-spacing-3 border mb-3 p-2 h-[150px] w-full'/>
                <input name='thumbnail' type="file" className='block mt-3' />
                <div className='flex justify-center mt-3'>
                <input type="submit" value='POST' className='btn bg-blue-800 mt-5 px-8 '/>
                </div>
            </form>
        </div>
    );
};

export default AddBlogs;