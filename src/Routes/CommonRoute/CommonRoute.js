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


const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
        ]
    },
    {
        path:'/products',
        loader: async ({params}) => {
            return fetch('http://localhost:5000/products');
          },
        element:<Products></Products>
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
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard/add-product',
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path:'/dashboard/manage-seller',
                element:<ManageSellers></ManageSellers>,
            },
            {
                path:'/dashboard/add-category',
                element:<AddCategory></AddCategory>,
            },
        ]
    },
   

]) 

export default router;