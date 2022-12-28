import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken/useToken';

const CreateAccount = () => {
    const { createAccount, updateUserInfo } = useContext(AuthContext);
    const [createAccountError, setCreateAccountError] = useState('');
    const [createUserEmail,setCreateUserEmail] = useState('');
    const navigate = useNavigate();
    const [token] = useToken(createUserEmail);
    if(token){
       navigate('/')
       toast.success('Create account successfully')
    }
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleCreateAccount = data => {
        if (data.password !== data.confirmPassword) {
            setCreateAccountError('Passwords must match');
            return;
        }
        setCreateAccountError('');

        createAccount(data.email, data.password)
            .then(userCredential => {
                const user = userCredential.user;
                saveData(data.name,data.email,data.phone,data.seller);
            })
            .catch(error => setCreateAccountError(error.message));

            const saveData = (name,email,phone,seller)=>{
                const userInfo={
                    name,email,phone,seller
                }
                fetch('http://localhost:5000/users',{
                    method:'POST',
                    headers:{
                       'content-type':'application/json' 
                    },
                    body:JSON.stringify(userInfo)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        setCreateUserEmail(email);
                    }
                   
                  
                 
                })
            }
    }


    return (
        <div className='bg-gradient-to-r from-green-300 to-blue-300 h-full flex justify-center items-center'>
                        <Helmet><title>Create-Account | Traditional Foodie</title></Helmet>

            <div className='w-[80%] lg:w-[38%] md:[38%] px-10 py-10 shadow-2xl rounded-md'>
                <h3 className='text-2xl font-bold text-center mb-5'>Create Account</h3>
                <form onSubmit={handleSubmit(handleCreateAccount)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Full Name</span>
                        </label>
                        <input {...register("name", { required: "Name field is required" })} type="text" className="input input-bordered" />
                        {errors.name && <span className='text-red-800'>{errors.name?.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email field is required" })} type="text" className="input input-bordered" />
                        {errors.email && <span className='text-red-800'>{errors.email?.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Phone</span>
                        </label>
                        <input {...register("phone", { required: "Phone field is required" })} type="text" className="input input-bordered" />
                        {errors.phone && <span className='text-red-800'>{errors.phone?.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Pssword</span>
                        </label>
                        <input {...register("password",
                            {
                                required: "Password field is required",
                                minLength: {
                                    value: 6, message: 'password must be 6 characters or longer',
                                },
                                maxLength: {
                                    value: 12, message: 'password must be 12 characters or lower',
                                },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            }
                        )} 
                         type="Password" className="input input-bordered" />
                        {errors.password && <span className='text-red-800'>{errors.password.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Confirm Password</span>
                        </label>
                        <input  {...register("confirmPassword", { required: "Confirm Password field is required" })}
                         type="password" className="input input-bordered" />
                        {errors.confirmPassword && <span className='text-red-800'>{errors.confirmPassword.message}</span>}
                        {createAccountError &&
                            <p className='text-red-800'>{createAccountError}</p>
                        }
                    </div>
                    <div className="form-control mt-5">
                        <div className=" flex justify-between">
                            <span className="text-default">Seller</span>
                            <input {...register("seller")} type="checkbox" className="checkbox checkbox-primary cursor-pointer border-spacing-3" />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Create Account</button>
                    </div>

                    <p className='text-center font-semibold mt-3'>Have an account Traditional Foodie ?<Link to={'/Login'} className='underline text-blue-800 ml-2'> Login</Link></p>

                </form>


            </div>


        </div>
    );
};

export default CreateAccount;