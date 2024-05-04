import Image from '../../Assets/pizzaa.png';
import { Link } from 'react-router-dom';
import { MdFiberManualRecord } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
import { Main } from '../Main';
import './styles.css';

export const Home = () => {
    return (
        <Main className='home__main'>
            <div className='home__main-container'>
                <MdFiberManualRecord className='background-icon-text' />
                <div className="home__main__text-content">
                    <GiHotMeal className='logo-sm' />
                    <h1 className='home__main__heading'>Tasty Food <span className='colored'>Collections</span></h1>
                    <p>It is not just food, it is an experince.</p>
                    <p>We provide you delicious recipes from all over the world.</p>
                    <Link to='/recipes/recipelist' className='discover-btn'>Discover Now</Link>
                </div>
                <div className="home__main__img-content">
                    <img src={Image} alt='Pizza' />
                </div>
                <MdFiberManualRecord className='background-icon' />
            </div>
        </Main>
    )
}