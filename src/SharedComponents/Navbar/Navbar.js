import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asets/logo.png'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Navbar = ({setOpenSidebar,openSidebar}) => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.error(error))
  }

  const { data: dbUser = {} } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await fetch(`https://tradional-foodie-server.vercel.app/users/${user?.email}`);
      const data = await res.json();
      return data;
    }
  })
  const navMenuItem =
    <React.Fragment>
      <li><Link to={'/'}>Home</Link> </li>
      <li><Link to={'/products'}>Shop</Link> </li>
      <li><Link to={'/blogs'}>Blogs</Link> </li>
      <li><Link to={'/blogs'}>About</Link> </li>
      {
        dbUser.role === 'admin' || dbUser.seller === true ?
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
          :
          ''
      }
      {
         dbUser.role !== 'admin' && dbUser.seller === false &&
        <li><Link to={'/dashboard'}>My Account</Link></li>
       
      }
      {user?.uid ?
        <Link onClick={handleLogOut}><button className='btn-sm  rounded-md bg-[#000] font-semibold text-white text-sm '>SignOut</button></Link>
        :
        <Link to={'/login'}><button className='btn-sm bg-[#000] rounded-md font-semibold text-white mx-4 text-sm'>SignIn</button></Link>
      }

    </React.Fragment>
  return (
    <div>
      <div className="navbar bg-[#014001] py-3">
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
            <Link to={'/'}><img className='w-full' src={logo} /></Link>
          </div>
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