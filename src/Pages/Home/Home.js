import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Home = () => {
    const [allDistricts, setAllDistricts] = useState([]);
    const [selectedDivison, setSelectedDivison] = useState(null)
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetch(`https://tradional-foodie-server.vercel.app/districts`)
            .then(res => res.json())
            .then(data => {
                setAllDistricts(data.districts)
            })
    }, []);
    const { data: locations = [] } = useQuery({
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
    useEffect(()=>{
        if(selectedDivison === 'all'){
            setSelectedDivison(null)
        }
    },[selectedDivison])
    console.log(selectedDivison);
    return (
        <div className='px-3'>
            <Helmet><title>Home | Traditional Foodie</title></Helmet>

            <div className="py-10 w-full lg:w-[60%] mx-auto">

                <select className="select select-success w-full" onChange={(e) => handleSelectDistrict(e)}>
                    <option selected value={'all'}>Find location of your favorite Food in Bangladesh</option>
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
                        districts.map((district, i) => <div key={i}><Link to={`/products/${district}`}><h3 className=' text-secondary font-bold cursor-pointer hover:shadow-lg hover:bg-primary border flex justify-center items-center p-5 '>{district}</h3></Link></div>)
                    }

                </div>
            </div>

        </div>
    );
};

export default Home;