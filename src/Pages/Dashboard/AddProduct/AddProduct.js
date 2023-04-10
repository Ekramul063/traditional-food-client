import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [price, setPrice] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [selectedDivison, setSelectedDivison] = useState('Dhaka');
    const [districts, setDistricts] = useState([]);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const discountPrice = (price * discount) / 100;
    let newPrice = Math.round(price - discountPrice);


    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            const res = await fetch('https://tradional-foodie-server.vercel.app/product-locations');
            const data = await res.json();
            return data;
        }
    })

    const handleSelectDistrict = (e) => {
        setSelectedDivison(e.target.value)
    }


    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/product-locations/${selectedDivison}`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data.districts)
            })
    }, [selectedDivison]);
    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/product-locations/${selectedDivison}`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data.districts)
            })
    }, [selectedDivison]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData.data.url)
                const productData = {
                    ...data, newPrice,
                    image: imgData.data.url,
                    seller: user?.email,
                }
                fetch('https://tradional-foodie-server.vercel.app/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(productData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success('Product added successfully')
                            reset();
                            setPrice(null)
                        }
                    })

            })

    }

    return (
        <div className='bg-gradient-to-r from-green-300 to-blue-300  flex justify-center items-center'>
            <Helmet><title> Add-Product |Traditional Foodie</title></Helmet>

            <div className='w-full lg:w-[70%] md:w-[70%] px-10 py-10 shadow-2xl rounded-md my-10 '>
                <h3 className='text-2xl font-bold text-center mb-5'>Add Product</h3>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="flex w-full justify-between flex-wrap">
                        <label className="label">
                            <span className="text-default label-text">Select Division</span>
                        </label>
                        <select className="select select-success w-full" onChange={(e) => handleSelectDistrict(e)}>
                            <option disabled selected>Dhaka</option>
                            {
                                locations.map(location => <option key={location._id}>{location.divison}</option>)
                            }
                        </select>
                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">District Famous For</span>
                            </label>
                            <select  {...register("district")} className="select select-success w-full">
                                {
                                    districts.map((district, i) => <option key={i}>{district}</option>)
                                }
                            </select>

                        </div>
                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Product Title</span>
                            </label>
                            <input {...register("title")} type="text" className="input input-bordered" />

                        </div>

                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Weight</span>
                            </label>
                            <input {...register("weight")} type="text" className="input input-bordered" />

                        </div>

                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Alternative of Weight</span>
                            </label>
                            <input {...register("alternativeAmount")} type="text" className="input input-bordered" />

                        </div>


                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Price</span>
                            </label>
                            <input {...register("price")} onBlur={(e) => { setPrice(e.target.value) }} type="number" className="input input-bordered" />

                        </div>
                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Discount %</span>
                            </label>
                            <input  {...register("discount")} onBlur={(e) => { setDiscount(e.target.value) }} type="text" className="input input-bordered" />

                        </div>
                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">New Price</span>
                            </label>
                            <input {...register("newPrice")}
                                defaultValue={price && discount &&
                                    newPrice}
                                type="text" disabled className="input input-bordered disabled:bg-slate-300 disabled:text-red-800 disabled:font-bold disabled:border-none" />
                        </div>

                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Brand</span>
                            </label>
                            <input {...register("brand")} type="text" className="input input-bordered" />

                        </div>


                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Product History</span>
                            </label>
                            <textarea {...register("productHistory")} type="text" className="textarea  textarea-bordered h-28" />

                        </div>
                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Description</span>
                            </label>
                            <textarea {...register("description")} type="text" className="textarea  textarea-bordered h-28" />

                        </div>
                        <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                            <label className="label">
                                <span className="text-default label-text">Product Image</span>
                            </label>
                            <input  {...register("image", { required: "Image field is required" })} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                            {errors.image && <span className='text-red-800'>{errors.image.message}</span>}

                        </div>


                    </div>

                    <div className="form-control mt-6 w-1/2 mx-auto">
                        <button type='submit' className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>


        </div >
    );
};

export default AddProduct;