import React from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 mx-auto'>
            <Helmet><title> My-Profile |Traditional Foodie</title></Helmet>
            <div className="p-5 shadow-lg border-spacing-2 border-green-500">
                {
                    user?.photoURL ?
                        <img src={user?.photoURL} alt="profile" className='w-[150px] h-[150px] block mx-auto border border-gray-300' />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 block mx-auto border rounded-full p-2" >
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>


                }
                <h2 className='font-bold text-center my-3'>{user?.email}</h2>

            </div>
            <div className="p-5 shadow-lg border-spacing-2 border-green-500">

            </div>

        </div>
    );
};

export default MyProfile;