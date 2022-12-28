import React from 'react';
import { Helmet } from 'react-helmet-async';

const AddCategory = () => {
    return (
        <div className='bg-gradient-to-r from-green-300 to-blue-300  flex justify-center'>
            <Helmet><title> Add-Category |Traditional Foodie</title></Helmet>
            <div className='w-[80%] lg:w-[38%] md:[38%] px-10 py-10 shadow-2xl rounded-md h-auto  mt-[10%]'>
                <form>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Category Name</span>
                        </label>
                        <input name='category' type="text" className="input input-bordered" />
                        <input className="btn btn-primary mt-5" type="submit" value='Add Category' />
                        
                    </div>            
                </form>
            </div>

        </div>
    );
};

export default AddCategory;