import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asets/logo.png'

const Footer = () => {
  return (
    <div>
      <footer className="p-10 bg-base-200 text-base-content grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5">
        <div className=''>
          <div className='max-w-[120px] mb-5'>
            <Link to={'/'}><img className='w-full' src={logo} /></Link>
          </div>
          <p className='font-bold'>Experience the Authentic Taste of <br /> Bangladeshi Food</p>
        </div>
        <div className='flex flex-col'>
          <span className="footer-title">Links</span>
          <li className='list-none'><Link to={'/'}>Home</Link> </li>
          <li className='list-none'><Link to={'/products'}>Shop</Link> </li>
          <li className='list-none'><Link to={'/blogs'}>Blogs</Link> </li>
          <li className='list-none'><Link to={'/about'}>About</Link> </li>
        </div>
        <div className='flex flex-col'>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>

      </footer>
    </div>
  );
};

export default Footer;