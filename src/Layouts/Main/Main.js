import React from 'react';
import Navbar from '../../SharedComponents/Navbar/Navbar';
import Footer from '../../SharedComponents/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Main.css'

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="flex">
                {/* <div className="sidebar">
                    <ul className="menu menu-compact bg-base-100 w-full ">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div> */}
                <div className="content-area ">
                    <Outlet>

                    </Outlet>
                </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default Main;