
import { Helmet } from 'react-helmet-async';
import HeaderSlider from './HeaderSlider/HeaderSlider'
import BlogsHome from './BlogsHome/BlogsHome';
import Services from './Services/Services';
import FeatureProduct from './FeatureProduct/FeatureProduct';
import Review from './Review/Review';
import AddReview from './AddReview/AddReview';
import Locations from './Loacations/Locations';
const Home = () => {
  
    return (
        <div className=' overflow-hidden'>
            <Helmet><title>Home | Traditional Foodie</title></Helmet>
            <HeaderSlider></HeaderSlider>
            <Locations></Locations>
            <Services></Services>
            <FeatureProduct></FeatureProduct>
            <BlogsHome></BlogsHome>
            <Review></Review>
            <AddReview></AddReview>
        </div>
    );
};

export default Home;