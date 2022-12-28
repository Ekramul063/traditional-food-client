import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../../Components/Loading/Loading';
import ConfirmationModal from '../../../SharedComponents/ConfirmationModal/ConfirmationModal';


const ManageSellers = () => {
    const [deletingSeller,setDeleteingSeller] = useState(false);
   
    const { data: sellers=[], isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/sellers');
            const data = await res.json();
            return data;
        }
    })
    
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
                            <th className='bg-gray-400'>Name</th>
                            <th className='bg-gray-400'>Email</th>
                            <th className='bg-gray-400'>Phone</th>
                            <th className='bg-gray-400'>Make Admin</th>
                            <th className='bg-gray-400'>Delete Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map(seller =>
                                <tr key={seller._id} >
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.phone}</td>
                                    <td><button className='btn btn-xs text-white bg-green-600'> Make Admin</button></td>
                                    <td><button onClick={()=>setDeleteingSeller(true)} className='btn btn-xs text-white bg-red-800'> delete</button></td>
                                </tr>
                            )
                        }




                    </tbody>
                </table>
            </div>
            {
                sellers.map(seller =>
                    <div  key={seller._id} className="grid grid-cols-2 lg:hidden md:hidden py-3 border-spacing-2 border px-5 overflow-auto">

                    <div>Name</div>
                    <div>{seller.name}</div>
                    <div>Email</div>
                    <div>{seller.email}</div>
                    <div>Phone</div>
                    <div>{seller.phone}</div>
                    <div>Make Admin</div>
                    <div><button className='btn btn-xs text-white bg-green-600'> Make Admin</button></div>
                    <div>Action</div>
                    <div> <label onClick={()=>setDeleteingSeller(true)} htmlFor="confirmation-modal" className="btn btn-xs text-white bg-red-800">Delete</label></div>

                    </div>
                )
            }
            {console.log(deletingSeller)}
            {
                
                 deletingSeller &&
                 <ConfirmationModal></ConfirmationModal>
            }
        </div>
    );
};

export default ManageSellers;