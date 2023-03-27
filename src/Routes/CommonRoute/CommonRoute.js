import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout/DashboardLayout';
import Main from '../../Layouts/Main/Main';
import CreateAccount from '../../Pages/CreateAccount/CreateAccount';
import Home from '../../Pages/Home/Home';
import Products from '../../Pages/Products/Products';
import LogIn from '../../Pages/LogIn/LogIn';
import AddProduct from '../../Pages/Dashboard/AddProduct/AddProduct';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ManageSellers from '../../Pages/Dashboard/ManageSellers/ManageSellers';
import AddCategory from '../../Pages/Dashboard/AddCategory/AddCategory';
import MyProducts from '../../Pages/Dashboard/MyProducts/MyProducts';
import MyProfile from '../../Pages/Dashboard/MyProfile/MyProfile';
import ProductDetails from '../../Pages/ProductDetails/ProductDetails';
import AdminRoute from '../AdminRoute/AdminRoute';
import MyOrders from '../../Pages/Dashboard/MyOrders/MyOrders';
import Payment from '../../Pages/Payment/Payment';


const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/buy-products/:id',
                loader: async ({params}) => {
                    return fetch(`https://tradional-foodie-server.vercel.app/products-single/${params.id}`);
                  },
                element:<ProductDetails></ProductDetails>
            },
            {
                path:'/products',
                element:<Products></Products>
            },
            {
                path:'/products/:district',
                loader: async ({params}) => {
                    return fetch(`https://tradional-foodie-server.vercel.app/products/${params.district}`);
                  },
                element:<Products></Products>
            },
        ]
    },
    
    
    {
        path:'/create-account',
        element:<CreateAccount></CreateAccount>
    },
    {
        path:'/login',
        element:<LogIn></LogIn>
    },
    {
        path:'/payment',
        element:<Payment></Payment>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<MyProfile></MyProfile>
            },
            {
                path:'/dashboard/add-product',
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path:'/dashboard/manage-seller',
                element:<AdminRoute><ManageSellers></ManageSellers></AdminRoute>,
            },
            {
                path:'/dashboard/add-category',
                element:<AddCategory></AddCategory>,
            },
            {
                path:'/dashboard/my-products',
                element:<MyProducts></MyProducts>,
            },
            {
                path:'/dashboard/my-orders',
                element:<MyOrders></MyOrders>
            },
        ]
    },
   

]) 

export default router;