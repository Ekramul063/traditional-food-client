import React, { useContext, useState } from 'react';
import Navbar from '../../SharedComponents/Navbar/Navbar';
import Footer from '../../SharedComponents/Footer/Footer';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useEffect } from 'react';
const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const { data: dbUser = {} } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(`https://tradional-foodie-server.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex">
                <div className="sidebar w-[230px] px-5 bg-[#4c4a4a] h-[100vh]">
                    <ul className="menu menu-compact bg-black-500 w-full font-bold text-[#ffffffe8]">
                        <li><Link to={'/dashboard'}>MyProfile</Link></li>
                        {dbUser.role === 'admin' &&
                            <li><Link to={'/dashboard/manage-seller'}>Sellers</Link></li>
                        }
                        {dbUser.seller &&
                            <li><Link to={'/dashboard/my-orders'}>My Orders</Link></li>
                        }
                        {dbUser.seller &&
                            <li><Link to="/dashboard/add-product">Add Product</Link></li>
                        }
                        {dbUser.seller &&
                            <li><Link to={'/dashboard/my-products'}>My Product</Link></li>
                        }
                        {
                            dbUser.role !== 'admin' && dbUser.seller === false &&
                            <li><Link>My Orders</Link></li>
                        }
                        {
                            dbUser.role !== 'admin' && dbUser.seller === false &&
                            <li><Link>My Review</Link></li>
                        }

                    </ul>
                </div>
                <div className="content-area">
                    <Outlet>

                    </Outlet>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;