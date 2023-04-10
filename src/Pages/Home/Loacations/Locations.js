import React, { useEffect, useState } from 'react';
import ComponentLoading from '../../../Components/ComponentLoading/ComponentLoading';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Locations = () => {
    const [allDistricts, setAllDistricts] = useState([]);
    const [selectedDivison, setSelectedDivison] = useState('Dhaka')
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/districts`)
            .then(res => res.json())
            .then(data => {
                setAllDistricts(data.districts)
            })
    }, []);
    const { data: locations=[],isLoading } = useQuery({
        queryKey: ['locations'],
        queryFn: async () => {
            const res = await fetch('https://tradional-foodie-server.vercel.app/product-locations');
            const data = await res.json();
            return data;
        }
    })

    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/product-locations/${selectedDivison}`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data.districts)
            })
    }, [selectedDivison]);

    const handleSelectDistrict = (e) => {
        setSelectedDivison(e.target.value)
    }
    useEffect(() => {
        if (selectedDivison === 'all') {
            setSelectedDivison(null)
        }
    }, [selectedDivison])

    if(isLoading.length < 1){
        return <ComponentLoading></ComponentLoading>
    }
    if(districts.length < 1){
        return <ComponentLoading></ComponentLoading>
    }
    if(allDistricts.length < 1){
        return <ComponentLoading></ComponentLoading>
    }
    return (
        <div className='px-3 mx-auto pt-16 pb-10'>
                <h2 className='text-3xl font-semibold text-center text-primary'>Find your favorite Food in Bangladesh</h2>
                <div className="py-10 w-full lg:w-[60%] mx-auto">

                    <select className="select select-success w-full text-primary font-bold text-lg" onChange={(e) => handleSelectDistrict(e)}>
                        <option selected value={'all'} >Select Division</option>
                        {
                            locations.map(location => <option key={location._id}>{location.divison}</option>)
                        }
                    </select>
                </div>

                <div className="pb-10">
                    {!selectedDivison &&
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-8">
                            {
                                allDistricts.map((district, i) => <div key={i}><Link to={`/products/${district}`}><h3 className=' text-secondary font-bold cursor-pointer hover:shadow-lg hover:bg-primary border flex justify-center items-center p-5 '>{district}</h3></Link></div>)
                            }

                        </div>}
                    <div className="grid grid-cols-2 md:grid-cols-4  gap-5 px-8">
                        {
                            districts.map((district, i) => <div key={i}><Link to={`/products/${district}`}><h3 className=' text-red-800 font-black cursor-pointer hover:shadow-lg hover:bg-primary border flex justify-center items-center p-5 '>{district}</h3></Link></div>)
                        }

                    </div>
                </div>

            </div>
    );
};

export default Locations;