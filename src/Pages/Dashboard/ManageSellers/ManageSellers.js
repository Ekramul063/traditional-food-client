import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import ConfirmationModal from '../../../SharedComponents/ConfirmationModal/ConfirmationModal';


const ManageSellers = () => {
    const [deletingSeller, setDeleteingSeller] = useState(null);
    const {user} = useContext(AuthContext);
    const handleCloseModal = () => {
        setDeleteingSeller(null)
    }
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://tradional-foodie-server.vercel.app/sellers',{
                headers:{
                    'authorization':`bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteSeller = (seller) => {
        fetch(`https://tradional-foodie-server.vercel.app/users-delete/${seller._id}`, {
            method: 'DELETE',
            headers:{
                'authorization':`bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    toast.success('deleted seller successfully');
                    setDeleteingSeller(null);
                    refetch();
                }
            })
    }
 
    const handleMakeAdmin = (id)=>{
        // fetch(`https://tradional-foodie-server.vercel.app/sellers/${id}`,{
        //     method:'PATCH',
        //     headers:{
        //         'content-type':'application/json',
        //         'authorization':`bearer ${localStorage.getItem('accessToken')}`
        //     },
        //     body:JSON.stringify({role:'admin'})
        // })
        // .then(res=> res.json())
        // .then(data =>{
        //    if(data.modifiedCount > 0){
        //     toast.success('make admin successfully')
        //    }
        // })
        
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>Mange-Seller|Traditional Foodie</title>
            </Helmet>
            <div className="overflow-x-auto hidden md:block lg:block">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='bg-gray-200'>Profile</th>
                            <th className='bg-gray-200'>Email</th>
                            <th className='bg-gray-200'>Phone</th>
                            <th className='bg-gray-200'>Make Admin</th>
                            <th className='bg-gray-200'>Delete Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map(seller =>
                                <tr key={seller._id} >
                                    <td>
                                        <img src={`${seller.image}`} alt=""  className='w-12 w-13'/>
                                        {seller.name}
                                    </td>
                                    <td>{seller.email}</td>
                                    <td>{seller.phone}</td>
                                    <td>{seller.role !== 'admin' && <button onClick={()=>handleMakeAdmin(seller._id)} className='btn btn-xs text-white bg-green-600'> Make Admin</button>}</td>
                                    <td>
                                        <label htmlFor="confirmation-modal" onClick={() => setDeleteingSeller(seller)} className='btn btn-xs text-white bg-red-800'> delete</label>
                                    </td>
                                </tr>
                            )
                        }




                    </tbody>
                </table>
            </div>
            {
                sellers.map(seller =>
                    <div key={seller._id} className="lg:hidden md:hidden py-3 flex flex-col  border-spacing-2 border px-5 overflow-scroll">
                        <div><img src={`${seller.image}`} alt=""  className='w-12 w-13 block'/>{seller.name}</div>
                        <div>{seller.email}</div>
                        <div>{seller.phone}</div>
                       {<div>
                        {seller.role !== 'admin' &&<button className='btn btn-xs text-white bg-green-600'> Make Admin</button>}   
                       <label htmlFor="confirmation-modal" onClick={() => setDeleteingSeller(seller)} className='btn btn-xs text-white bg-red-800'> delete</label></div>}

                    </div>
                )
            }
            {

                deletingSeller &&
                <ConfirmationModal
                    message={'Are you sure you want to delete'}
                    name={deletingSeller.name}
                    handleCloseModal={handleCloseModal}
                    handleDeleteingItem={handleDeleteSeller}
                    modalData={deletingSeller}
                    successActionName={'delete'}
                    highlightsColor={'red-800'}

                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageSellers;