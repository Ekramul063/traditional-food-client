import React, { useContext } from 'react';
import Navbar from '../../SharedComponents/Navbar/Navbar';
import Footer from '../../SharedComponents/Footer/Footer';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const { data: dbUser = {} } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex">
                <div className="sidebar">
                    <ul className="menu menu-compact bg-base-100 w-full font-bold ">
                        <li><Link>MyProfile</Link></li>
                        {dbUser.role === 'admin' &&
                            <li><Link to={'/dashboard/manage-seller'}>Sellers</Link></li>
                        }
                        {dbUser.role === 'admin' &&
                            <li><Link to={'/dashboard/add-category'}>Add Category</Link></li>
                        }
                        {dbUser.seller &&
                            <li><Link>Orders</Link></li>
                        }
                        {dbUser.seller &&
                            <li><Link to="/dashboard/add-product">Add Product</Link></li>
                        }
                        {dbUser.seller &&
                            <li><Link>My Product</Link></li>
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