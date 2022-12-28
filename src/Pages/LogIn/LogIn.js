import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken/useToken';

const LogIn = () => {
    const [logInError,setLogInError] = useState('');
    const navigate = useNavigate();
    const {logIn} = useContext(AuthContext);
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    // const [createUserEmail,setCreateUserEmail] = useState('');
    // const [token] = useToken(createUserEmail);
    const handleSignIn = data =>{
        logIn(data.email,data.password)
        .then(result =>{
            navigate('/')
            toast('Welcome to Tradition Foodie world');
            // setCreateUserEmail(data.email);
        })
        .catch(error => setLogInError(error.message))
    }

    return (
        <div className='bg-gradient-to-r from-green-300 to-blue-300 h-[100vh] flex justify-center items-center'>
                        <Helmet><title>Traditional/Login</title></Helmet>

            <div className='w-[80%] lg:w-[38%] md:[38%] px-10 py-10 shadow-2xl rounded-md'>
                <h3 className='text-2xl font-bold text-center mb-5'>Sign In</h3>
                <form onSubmit={handleSubmit(handleSignIn)}>
                   
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email field is required" })} type="text" className="input input-bordered" />
                        {errors.email && <span className='text-red-800'>{errors.email?.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-default label-text">Pssword</span>
                        </label>
                        <input {...register("password",
                            {
                                required: "Password field is required"}
                        )} type="Password" className="input input-bordered" />
                        {errors.password && <span className='text-red-800'>{errors.password.message}</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">SignIn</button>
                    </div>
                    {
                        logInError &&
                        <p className='text-red-800 font-semibold'>{logInError}</p>
                    }

                    <p className='text-center font-semibold mt-3'>Don't Have an account Traditional Foodie ?<Link to={'/create-account'} className='underline text-blue-800 ml-2'> Create Account</Link></p>

                </form>


            </div>


        </div>
    );
};

export default LogIn;