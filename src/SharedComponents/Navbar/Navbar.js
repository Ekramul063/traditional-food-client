import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asets/logo.png'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
const [search,setSearch] = useState('');
  const searchRef = useRef();
  const handleSearch = ()=>{
  setSearch(search.current.value)
  }
 
  const handleLogOut = ()=>{
    logOut()
    .then(()=>{})
    .catch(error=>console.error( error))
  }
 
const {data:dbUser={}}= useQuery({
  queryKey:[user?.email],
  queryFn:async()=>{
    const res = await fetch(`http://localhost:5000/users/${user?.email}`);
    const data = await res.json();
    return data;
  }
})

  const navMenuItem =
    <React.Fragment> 
      <li><Link to={'/'}>Home</Link> </li>
      <li><Link to={'/products'}>Products</Link> </li>
      {
       dbUser.role === 'admin'||dbUser.seller===true?
      <li><Link to={'/dashboard'}>Dashboard</Link></li>
      :
      ''
     }
      {
        dbUser.role !== 'admin' && dbUser.seller === false &&
      <li><Link to={'/dashboard'}>My Account</Link></li>
     }
     {user?.uid?
          <Link onClick={handleLogOut}><button className='btn-sm btn-primary font-semibold text-white'>SignOut</button></Link> 
          :
          <Link  to={'/login'}><button className='btn-sm btn-primary font-semibold text-white'>SignIn</button></Link>
     }
     
    </React.Fragment>
  return (
    <div>
      <div className="navbar bg-secondary">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
             {navMenuItem}
            </ul>
          </div>

         <div className='max-w-[120px]'>
         <Link to={'/'}><img className='w-full' src={logo}/></Link>
         </div>
        </div>

        <div className="navbar-center">
        <input ref={searchRef} type="text" placeholder="Search" className="input w-[250px] lg:w-[500px]  md:w-[400px]  border-none" />
        <button onClick={handleSearch} className='btn btn-primary ml-[-86px] lg:ml-[-83px] rounded-none rounded-r-md'>Search</button>
        </div>

        <div className="navbar-end hidden lg:flex md:flex">
        <ul className="menu menu-horizontal px-1 text-white items-center">
        {navMenuItem}
       </ul>

        </div>
        
      </div>

    </div>
  );
};

export default Navbar;