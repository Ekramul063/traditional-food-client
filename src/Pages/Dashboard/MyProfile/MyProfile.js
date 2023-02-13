import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import AddAddressModal from '../../../SharedComponents/AddAddressModal/AddAddressModal';
import './MyProfile.css'

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [closeModal, setCloseModal] = useState(true);
    const [dbUser,setDbUser]= useState({});

    useEffect(()=>{
        fetch(`https://tradional-foodie-server.vercel.app/users/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setDbUser(data);
        })
    },[user?.email])

    const {data:userAddress,isLoading,refetch} = useQuery({
        queryKey:['userAddress'],
        queryFn:async()=>{
            const res = await fetch(`https://tradional-foodie-server.vercel.app/users-address/${user.email}`);
            const data = await res.json();
            return data;
        }
    })
    

    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 mx-auto'>
            <Helmet><title> My-Profile |Traditional Foodie</title></Helmet>
            <div className="p-5 shadow-lg border-spacing-2 border-green-500">

                {
                    dbUser.image?
                        <img src={dbUser.image} alt="profile" className='w-[150px] h-[150px] block mx-auto border border-gray-300' />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 block mx-auto border rounded-full p-2" >
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>


                }
                {
                    dbUser ?
                        <h2 className='font-bold text-center my-3 user_title'>
                            {
                                dbUser?.role === 'admin' &&
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
                    {userAddress?
                       <div>
                        <h3 className='text-xl mb-3'>DEFAULT SHIPPING ADDRESS <label htmlFor="AddAddressModal" className="btn btn-xs text-white bg-green-500" onClick={() => setCloseModal(false)}> Update<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-4">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                        </svg>
                                        </label>  </h3>
                        <h3 className='font-semibold text-lg'><span className='font-bold'>Name:</span> {userAddress.fullName}</h3>
                        <p className='font-semibold text-lg'><span className='font-bold'>Addresss:</span> {userAddress.division}, {userAddress.district}, {userAddress.area}</p>
                        <p className='font-semibold text-lg'>{userAddress.address}</p>
                        <p className='font-semibold text-lg'><span className='font-bold'>Phone:</span> {userAddress.phone}</p>
                       </div>
                        :
                        <label htmlFor="AddAddressModal" className="btn" onClick={() => setCloseModal(false)}>Add your address</label>
                    }
                </div>

            </div>

            {
                !closeModal &&
                <AddAddressModal setCloseModal={setCloseModal} refetch={refetch}></AddAddressModal>

            }

        </div>
    );
};

export default MyProfile;