import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../../Components/Loading/Loading';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import ConfirmationModal from '../../../SharedComponents/ConfirmationModal/ConfirmationModal';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [deleteingOrder, setDeleteingOrder] = useState(null);
    const clocseModal = () => {
        setDeleteingOrder(null)
    }
    const { data: myOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['myOrders'],
        queryFn: async () => {
            const res = await fetch(`https://tradional-foodie-server.vercel.app/my-orders?buyer=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }


    const handleDelteingOrder = (order) => {
        fetch(`https://tradional-foodie-server.vercel.app/orders/${order._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    toast.success('Cancel order successfully');
                    setDeleteingOrder(null)
                    refetch();
                }
            })

    }
    return (
        <div>

            <div className='hidden lg:block md:block'>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='bg-gray-200'>product title</th>
                            <th className='bg-gray-200'>quantity</th>
                            <th className='bg-gray-200'>Price</th>
                            <th className='bg-gray-200'>Paid status</th>
                            <th className='bg-gray-200'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders && myOrders?.map(order =>
                                <tr key={order._id} >
                                    <td>
                                        <div className='flex justify-start items-center'>
                                            <img src={order.image} alt='product image' className='w-[100px] max-h-[80px]' />

                                            <div className='ml-3 font-bold'>
                                                {order.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td><button className='text-white font-bold btn btn-xs bg-green-600'>paynow</button></td>
                                    <td>
                                        <label htmlFor="confirmation-modal" onClick={() => setDeleteingOrder(order)} className='btn btn-xs text-white bg-red-800'> Cancel</label>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {myOrders?.map(order => <div className='lg:hidden md:hidden' key={order._id}>
                <div><img src={`${order.image}`} alt="" className='w-[100px] max-h-[80px] block mb-2' /></div>
                <h2 className='font-semibold'>{order.title}{console.log(order)}</h2>
                <p>Quantity: {order.quantity}</p>
                <p className='mb-1'>Price: {order.price}</p>
                <button className='text-white font-bold btn btn-xs bg-green-600 mr-2'>paynow</button>
                <label htmlFor="confirmation-modal" onClick={() => setDeleteingOrder(order)} className='btn btn-xs text-white bg-red-800'> Cancel</label>


            </div>
            )

            }

            {deleteingOrder &&
                <ConfirmationModal
                    message={'Are you sure you want to delete'}
                    name={deleteingOrder.title}
                    handleCloseModal={clocseModal}
                    handleDeleteingItem={handleDelteingOrder}
                    modalData={deleteingOrder}
                    successActionName={'delete'}
                    highlightsColor={'red-800'}
                >

                </ConfirmationModal>
            }

        </div>
    );
};

export default MyOrders;