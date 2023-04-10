import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
       <div className='px-3 mx-auto  bg-green-300'>
         <div className=' flex justify-center items-center py-20'>
            <Helmet><title>About | Traditional Foodie</title></Helmet>
            <div className='max-w-[650px] text-justify rounded-lg p-5 border-spacing-[5px] border-red-700 border  text-red-700 font-bold text-lg'>
                <p>
                It is an online food shopping website. It is made keeping in mind the traditional food of Bangladesh. Here users can easily filter the famous food of 64 districts of Bangladesh. Users can Buy products from this site now and users can add shipping addresses. They can change addresses from the dashboard at any time. Users also can write blogs and reviews. If anybody wants to become a seller on this site  can create seller account also, seller can upload, edit, delete, of his products from dashboard and seller also can see all his product on dashboard. Admin can remove the seller from admin-dashboard.
                </p>
            </div>
            
        </div>
       </div>
    );
};

export default About;