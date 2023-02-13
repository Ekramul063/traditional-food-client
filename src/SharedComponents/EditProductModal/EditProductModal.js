import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const EditProductModal = ({ product, setEditingProduct, refetch }) => {
    const [price, setPrice] = useState(product.price);
    const [discount, setDiscount] = useState(product.discount);
    const [selectedDivision, setSeletedDivision] = useState('');
    const [districts, setDistricts] = useState([]);
    const [newPrice, setNewPrice] = useState(null);
    // const [newPrice,setNewPrice] = useState();
    const discountPrice = (price * discount) / 100;
    useEffect(() => {
        let newPrice = Math.round(price - discountPrice);
        setNewPrice(newPrice);
    }, [price, discountPrice]);


    // let newPrice = Math.round(price - discountPrice);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    //fetch all division
    const { data: allDivisions = [], isLoading } = useQuery({
        queryKey: 'divisons',
        queryFn: async () => {
            const res = await fetch('https://tradional-foodie-server.vercel.app/product-locations');
            const data = await res.json();
            return data;
        }
    })
    //fetch all district
    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/product-locations/${selectedDivision}`)
            .then(res => res.json())
            .then(data => setDistricts(data.districts))
    }, [selectedDivision]);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const handleUpdateProduct = (data) => {
        let updatedProduct = {
            ...data,
            newPrice
        }
        if (data.image.length > 0) {
            const image = data.image[0];
            const formData = new FormData();
            formData.append('image', image);
            fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imageData => {
                    const productNew = {
                        ...updatedProduct,
                    }
                    productNew.image = imageData.data.url;
                    updatedProduct = productNew;
                    fetch(`https://tradional-foodie-server.vercel.app/products/${product._id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.modifiedCount > 0) {
                                toast.success('Updated Product successfully');
                                reset();
                                setEditingProduct(null)
                                refetch()
                            }
                        })
                })

        } else {
            updatedProduct = {
                ...updatedProduct,
                image: product.image
            }
        }
        fetch(`https://tradional-foodie-server.vercel.app/products/${product._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Updated Product successfully');
                    reset();
                    setEditingProduct(null)
                    refetch()
                }
            })
    }
    return (
        <div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="editProduct-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative max-w-[50rem]">
                    <label htmlFor="editProduct-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className='w-full  px-5 py-5 shadow-2xl rounded-md my-10 mx-auto '>
                        <h3 className='text-2xl font-bold text-center mb-5'>Add Product</h3>
                        <form onSubmit={handleSubmit(handleUpdateProduct)}>
                            <div className="flex w-full justify-between flex-wrap">
                                <select onChange={(e) => setSeletedDivision(e.target.value)} className="select select-success w-full">
                                    <option disabled selected>Division</option>
                                    {
                                        allDivisions.map(location => <option key={location._id}>{location.divison}</option>)
                                    }
                                </select>
                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">District Famous For</span>
                                    </label>
                                    <select  {...register("district")} className="select select-success w-full">
                                        <option disabled selected>{product.district}</option>
                                        {
                                            districts && districts.map((district, i) => <option key={i}>{district}</option>)
                                        }
                                    </select>

                                </div>
                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Product Title</span>
                                    </label>
                                    <input defaultValue={product.title} {...register("title")} type="text" className="input input-bordered" />

                                </div>

                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Weight</span>
                                    </label>
                                    <input defaultValue={product.weight} {...register("weight")} type="text" className="input input-bordered" />

                                </div>

                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Price</span>
                                    </label>
                                    <input defaultValue={product.price} {...register("price")} onBlur={(e) => { setPrice(e.target.value) }} type="number" className="input input-bordered" />

                                </div>
                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Discount %</span>
                                    </label>
                                    <input defaultValue={product.discount}  {...register("discount")} onBlur={(e) => { setDiscount(e.target.value) }} type="text" className="input input-bordered" />

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
                                    <input defaultValue={product.brand} {...register("brand")} type="text" className="input input-bordered" />

                                </div>

                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Product Image</span>
                                    </label>
                                    <input  {...register("image", { required: "Image field is required" })} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                                    {errors.image && <span className='text-red-800'>{errors.image.message}</span>}

                                </div>

                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Product History</span>
                                    </label>
                                    <textarea defaultValue={product.productHistory} {...register("productHistory")} type="text" className="textarea  textarea-bordered h-28" />

                                </div>
                                <div className="form-control  w-full md:w-[49%] lg:w-[49%]">
                                    <label className="label">
                                        <span className="text-default label-text">Description</span>
                                    </label>
                                    <textarea defaultValue={product.description} {...register("description")} type="text" className="textarea  textarea-bordered h-28" />

                                </div>


                            </div>

                            <div className="form-control mt-6 w-1/2 mx-auto">
                                <button type='submit' className="btn btn-primary">Add Product</button>
                            </div>
                        </form>
                    </div>



                </div>
            </div>

        </div>
    );
};

export default EditProductModal;