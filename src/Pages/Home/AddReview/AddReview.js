import React, { useContext, useEffect, useState } from 'react';
import './AddReview.css'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const AddReview = ({refetch}) => {
    const {user} = useContext(AuthContext);

    const [userProfile,setUserProfile] =useState(null);
    const [userName,setUserName] =useState(null);

    useEffect(()=>{
        fetch(`https://tradional-foodie-server.vercel.app/users/${user?.email}`)
        .then(res =>res.json())
        .then(data =>{
           if(data.image){
            setUserProfile(data.image);
            setUserName(data.name)
           }
        })
    },[user?.email]);

    const handeAddReview = e => {
        e.preventDefault();
        
        if(!user){
            return toast.error('Please SignIn First')
        }
        const userReview= e.target.review.value;
        const userEmail = user.email;
        const review ={userProfile,userName,userEmail,userReview};

        fetch('https://tradional-foodie-server.vercel.app/reviews',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(review)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.acknowledged){
                toast.success('Thank For Your Review');
                e.target.reset();
                refetch();
            }
        })
    }
    return (
        <div className='AddReview' py-10>
            <div className='bg-[rgba(0,0,0,0.5)] w-full h-full flex justify-center items-center flex-col'>

                {/* The button to open modal */}
                <h3 className='font-bold text-lg text-white mb-5 text-center'>Share your experience with Traditional Foodie </h3>
                <label htmlFor="my-modal-3" className="btn text-white">Review</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form onSubmit={handeAddReview}>
                            <textarea required name="review" type='text' className='border border-spacing-3 h-[200px] p-3 w-full mt-5' placeholder='Write here' />
                            <div className='flex justify-center mt-3'>
                                <input type="submit" value={'Done'} className='btn btn-primary' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddReview;