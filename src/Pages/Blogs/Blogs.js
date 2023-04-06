import React from 'react';
import foodie from '../../asets/header/foodie.png'

const Blogs = () => {
    return (
        <div className='px-3 mx-auto mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-5'>
                <div className='bg-white w-full flex py-3 border border-spacing-1 justify-between items-center mb-5 lg:flex-row md:flex-row flex-col '>
                    <div className='md:w-[38%] lg:w-[38%] w-full pt-3 px-3'>
                        <img src={foodie} alt="thumbnail" className='w-full min-h-[220px]' />
                    </div>
                    <div className='md:w-[58%] lg:w-[60%] w-full pb-3 px-3 md:border-l-2 lg:border-l-2 lg:pl-5 md:pl-5'>
                        <h3 className='font-bold text-lg text-primary mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <p className='font-semibold text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur aperiam asperiores ratione, provident excepturi dolore impedit quidem corporis accusamus, repellendus perspiciatis odit non nemo similique amet nostrum possimus culpa illo?</p>
                        <span className='btn-xs btn mt-2'>read more</span>
                    </div>

                </div>
                <div className='bg-white w-full flex py-3 border border-spacing-1 justify-between items-center mb-5 lg:flex-row md:flex-row flex-col '>
                    <div className='md:w-[38%] lg:w-[38%] w-full pt-3 px-3'>
                        <img src={foodie} alt="thumbnail" className='w-full min-h-[220px]' />
                    </div>
                    <div className='md:w-[58%] lg:w-[60%] w-full pb-3 px-3 md:border-l-2 lg:border-l-2 lg:pl-5 md:pl-5'>
                        <h3 className='font-bold text-lg text-primary mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <p className='font-semibold text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur aperiam asperiores ratione, provident excepturi dolore impedit quidem corporis accusamus, repellendus perspiciatis odit non nemo similique amet nostrum possimus culpa illo?</p>
                        <span className='btn-xs btn mt-2'>read more</span>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Blogs;