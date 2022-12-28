import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/CommonRoute/CommonRoute';

function App() {

  return (
    <HelmetProvider>
      <div className='max-w-[1500px] mx-auto text-default text-semibold'>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>

      </div>

    </HelmetProvider>

  );
}

export default App;
