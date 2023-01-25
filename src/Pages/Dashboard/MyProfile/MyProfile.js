import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import './MyProfile.css'

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const { data: dbUser } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch`https://tradional-foodie-server.vercel.app/users/${user.email}`;
            const data = await res.json();
            return data;
        }
    })
    console.log(dbUser)
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
                {
                    user?.displayName ?
                        <h2 className='font-bold text-center my-3 user_title'>{user?.displayName}
                        {
                             dbUser?.role ==='admin' && 
                             <span className='font-bold text-center my-3 text-secondary user_status'> <small>(Admin)</small></span>
                        }
                        {
                             dbUser?.role === 'admin' && dbUser?.seller === true &&
                             <span className='font-bold text-center my-3 text-red-500 user_status'> <small> + </small></span>

                        }
                        {
                            dbUser?.seller === true &&
                            <span className='font-bold text-center my-3 text-secondary'> <small>(Seller)</small> </span>
                        }</h2>
                        :
                        <h2 className='font-bold text-center my-3 user_title'>{user?.email}</h2>
                }




            </div>
            <div className="p-5 shadow-lg border-spacing-2 border-green-500 ">

                <div className="flex justify-center items-center">
                <button className='btn'>Add your address </button>
                </div>

            </div>

        </div>
    );
};

export default MyProfile;