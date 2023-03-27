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