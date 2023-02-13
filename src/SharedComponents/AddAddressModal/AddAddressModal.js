
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const AddAddressModal = ({setCloseModal,refetch}) => {
    const [selectedDivision, setSeletedDivision] = useState('');
    const [selectedDistrict, setSeletedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [allAreas, setAllAreas] = useState([]);
    const { user } = useContext(AuthContext);
    const [userAddress, setUserAddress] = useState(null);
    //fetch all division
    const { data: allDivisions=[], isLoading } = useQuery({
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

    //fetch all Upazila
    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/district-upazila?district=${selectedDistrict}`)
            .then(res => res.json())
            .then(data =>{ 
                setAllAreas(data.Upazilas);
                 console.log(data,'upozila')})
    }, [selectedDistrict]);

    console.log(allAreas,`https://tradional-foodie-server.vercel.app/district-upazila?district=${selectedDistrict}`);
     //fetch user address
     useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/users-address/${user?.email}`)
            .then(res => res.json())
            .then(data => setUserAddress(data))
    }, [user?.email])
   

    const handleSubmitUserAddress = event => {
        event.preventDefault();
        const form = event.target;
        const division = form.division.value;
        const district = form.district.value;
        const area = form.area.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const fullName = form.fullName.value;
        const fullAddress = { user: user.email,fullName, division, district, area, phone, address };
        fetch('https://tradional-foodie-server.vercel.app/user-address', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fullAddress)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Address added successfully');
                    setCloseModal(true);
                    refetch();
                    setSeletedDivision('');
                    setSeletedDistrict('');
                    setAllAreas([]);
                    form.reset();
                }
            })
    }
    const handleUpdateUserAddress = event =>{
        event.preventDefault();
        const form = event.target;
        const division = form.division.value;
        const district = form.district.value;
        const area = form.area.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const fullName = form.fullName.value;
        const fullAddress = { user: user.email,fullName, division, district, area, phone, address };
        fetch(`https://tradional-foodie-server.vercel.app/user-address/${user?.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fullAddress)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount>0) {
                    toast.success('Updated Address successfully');
                    setCloseModal(true);
                    refetch();
                    setSeletedDivision('');
                    setSeletedDistrict('');
                    setAllAreas([]);
                    form.reset();
                }
            })

    }

    return (
        <div>
            <input type="checkbox" id="AddAddressModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                <label htmlFor="AddAddressModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <form onSubmit={userAddress?handleUpdateUserAddress :handleSubmitUserAddress} className='pt-6'>
                        <select onChange={(e) => setSeletedDivision(e.target.value)} name='division' required className="select mb-3 select-primary w-full">
                        {userAddress ? <option disabled selected>{userAddress.division}</option> : <option disabled selected>Division</option>}
                            
                            {
                                allDivisions.map(location => <option key={location._id}>{location.divison}</option>)
                            }
                        </select>
                        <select onChange={(e) => setSeletedDistrict(e.target.value)} name='district' required className="select mb-3 select-primary w-full ">
                            {userAddress?<option disabled selected>{userAddress.district}</option>:<option disabled selected>City</option>}
                            {
                                districts && districts.map((district, i) => <option key={i}>{district}</option>)
                            }
                        </select>
                        <select name='area' required className="select mb-3 select-primary w-full">
                        {userAddress?<option disabled selected>{userAddress.area}</option>:<option disabled selected>Area</option>}
                            {

                                allAreas && allAreas.map((areas, i) => <option key={i}>{areas}</option>)
                            }
                        </select>

                        <div className="form-control w-full ">
                            <input defaultValue={userAddress&& userAddress.address} name='address' required type="text" placeholder="Address" className="input mb-3 border-primary input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <input defaultValue={userAddress&& userAddress.fullName} name='fullName' required type="text" placeholder="Your Full Name" className="input mb-3 input-bordered border-primary w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <input defaultValue={userAddress&& userAddress.phone} name='phone' required type="text" placeholder="Your Phone Number" className="input border-primary input-bordered w-full " />
                        </div>
                       {
                        userAddress ? <input className='btn mt-4  btn-secondary w-full' type="submit" value='Update'/>: <input className='btn mt-4  btn-secondary w-full' type="submit" />
                       }

                    </form>
                    {/* <div className="modal-action">
                        <label htmlFor="AddAddressModal" className="btn">Close</label>
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default AddAddressModal;