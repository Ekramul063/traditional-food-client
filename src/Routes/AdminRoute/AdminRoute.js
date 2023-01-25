import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loading from '../../Components/Loading/Loading'
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const {data: dbUser = {},isLoading } = useQuery({
        queryKey:['user'],
        queryFn:async()=>{
            const res = await fetch(`https://tradional-foodie-server.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    const location = useLocation();
    if(loading || isLoading){
        return <Loading></Loading>
    }
    if(dbUser.role !== 'admin'){
        return <Navigate to='/login' state={{from:location}} replace></Navigate>
    }
    return children;
};


export default AdminRoute;