import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Products from '../Products/Products';
import HeaderSlider from './HeaderSlider/HeaderSlider';

const Home = () => {
    const [selectedDivison,setSelectedDivison] = useState(null)

    const handleSelectDistrict = (e)=>{
        setSelectedDivison(e.target.value)
    }
    const district = "Dhaka,Narsingdi,Gazipur,Shariatpur,Narayanganj,Tangail,Kishoreganj,Manikganj,Munshiganj,Rajbari,Madaripur,Gopalganj,Faridpur,Comilla,Feni,Brahmanbaria,Rangamati,Noakhali,Chandpur,Laxmipur, Chittagong,Cox's Bazar,Khagrachari,Bandarban,Sirajganj,Pabna,Bogura,Rajshahi,Natore,Joypurhat, Chapainawabganj,Naogaon,Jessore,Satkhira,Meherpur,Narail,Chuadanga,Kushtia,Magura,Khulna,Bagerhat, Jhenaidah,Jhalkathi,Patuakhali, Pirojpur, Barisal, Bhola, Barguna,Sylhet, Moulvibazar,Habiganj, Sunamganj,Panchagarh,Dinajpur,Lalmonirhat, Nilphamari, Gaibandha, Thakurgaon,Rangpur,Kurigram,Sherpur, Mymensingh,Jamalpur,Netrakona";
    const singleDisctrict =district.split(',');
    return (
        <div>
            <Helmet><title>Home | Traditional Foodie</title></Helmet>
            {/* <HeaderSlider></HeaderSlider> */}

            <div className="py-10 w-full lg:w-[60%] mx-auto">
                <select className="select select-success w-full" onChange={(e)=>handleSelectDistrict(e)}>
                    <option disabled selected>Find location of your favorite Traditional Food</option>
                    <option>Dhaka</option>
                    <option>Rajshahi</option>
                    <option>sylet</option>
                    <option>Attack on Titan</option>
                    <option>Bleach</option>
                    <option>Fullmetal Alchemist</option>
                    <option>Jojo's Bizarre Adventure</option>
                </select>
            </div>

            <div className="grid grid-cols-5 gap-5 px-8">
                {
                    singleDisctrict.map((district,i) =><div key={i}><Link to={`/products/${district}`}><h3 className=' text-secondary font-bold cursor-pointer hover:shadow-lg hover:bg-primary border flex justify-center items-center p-5 '>{district}</h3></Link></div>)
                }

            </div>

        </div>
    );
};

export default Home;