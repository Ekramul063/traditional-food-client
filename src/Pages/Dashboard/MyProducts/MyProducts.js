import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../../Components/Loading/Loading';
import ConfirmationModal from '../../../SharedComponents/ConfirmationModal/ConfirmationModal';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import EditProductModal from '../../../SharedComponents/EditProductModal/EditProductModal';



const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeleteingproduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const closeModal = () => {
        setDeleteingproduct(null);
    }

    const { data: myProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            const res = await fetch(`https://tradional-foodie-server.vercel.app/products/added-product/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    const handleDeletingProduct = (product) => {
        fetch(`https://tradional-foodie-server.vercel.app/products/delete/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    toast.success('product deleted successfully')
                    setDeleteingproduct(null);
                    refetch()
                }
            })

    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div>
                <Helmet>
                    <title>My-Products|Traditional Foodie</title>
                </Helmet>
                <div className=" hidden md:block lg:block">

                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className='bg-gray-200'>Product</th>
                                <th className='bg-gray-200'>Price</th>
                                <th className='bg-gray-200'>Discount</th>
                                <th className='bg-gray-200'>Edit Product</th>

                                <th className='bg-gray-200'>Delete product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myProducts < 1 &&
                                <h3>You have no product now</h3>

                            }
                            {
                                myProducts.map(product =>
                                    <tr key={product._id} >
                                        <td>
                                            <div className='flex justify-start items-center'>
                                                <img src={product?.image} alt='product image' className='w-[100px] max-h-[80px]' />

                                                <div className='ml-3 font-bold'>
                                                    {product.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                product.discount ?
                                                    product.newPrice
                                                    :
                                                    product.price
                                            }
                                        </td>
                                        <td>
                                            {product.discount}%
                                        </td>
                                        <td> <label htmlFor="editProduct-modal" className='btn btn-xs text-white bg-green-500' onClick={() => setEditingProduct(product)}>Edit <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-4">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                        </svg>
                                        </label></td>
                                        <td><label htmlFor="confirmation-modal" onClick={() => setDeleteingproduct(product)} className='btn btn-xs text-white bg-red-800'> delete <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                        </label></td>
                                    </tr>

                                )
                            }





                        </tbody>
                    </table>
                </div>
                {
                    myProducts.map(product =>
                        <div key={product._id} className="lg:hidden md:hidden py-4 px-5  w-full  border-spacing-2  mb-3 border">
                            <div>
                                <img src={`${product.image}`} alt="" className='w-[100px] max-h-[80px] block mb-2' />
                            </div>
                            <h2>{product.title}</h2>

                            <h3>
                                Price: {
                                    product.discount ?
                                        product.newPrice
                                        :
                                        product.price
                                }
                            </h3>
                            <h3 className='mb-1'>
                                Discount: {product.discount}%
                            </h3>

                            <div><button className='btn btn-xs text-white bg-green-500'> Edit <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-4">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                            </button>

                                <label htmlFor="confirmation-modal" onClick={() => setDeleteingproduct(product)} className='btn btn-xs ml-2 text-white bg-red-800'> delete <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>
                                </label>
                            </div>

                        </div>
                    )
                }

                {deletingProduct &&
                    <ConfirmationModal
                        message={'Are you sure you want to delete '}
                        name={deletingProduct.title}
                        handleCloseModal={closeModal}
                        handleDeleteingItem={handleDeletingProduct}
                        modalData={deletingProduct}
                        successActionName={'delete'}
                        highlightsColor={'red-800'}
                    >
                    </ConfirmationModal>}
                {
                    editingProduct &&
                    <EditProductModal
                        product={editingProduct}
                        setEditingProduct={setEditingProduct}
                        refetch={refetch}
                    >

                    </EditProductModal>
                }
            </div>

        </div>
    );
};

export default MyProducts;