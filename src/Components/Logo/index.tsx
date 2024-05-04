import { Link } from 'react-router-dom';
import { GiHotMeal } from "react-icons/gi";
import './styles.css';

export const Logo = () => {
    return (
        <Link className='logo' to="/">RECIPES<GiHotMeal /></Link>
    )
}