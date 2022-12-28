
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    const {data:dbUser,isLoading} = useQuery({
        queryKey:['user'],
        queryFn:async()=>{
            const res = await fetch(`http://localhost:5000/sellers`);
            const data = await res.json();
            return data;
        }
    })
    
    if(loading || isLoading){
        return <Loading></Loading>
    }
    if(user&&dbUser.role==='admin'){
        return children
    }
    return<Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;