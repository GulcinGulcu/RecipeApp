import { Link } from 'react-router-dom';
import { USER_ACTIONS, useUser, useUserDispatch } from '../../modules/user/UserProvider';
import './styles.css'

interface NavBarProps {
    open: boolean;
}

export const Navbar = ({open}: NavBarProps) => {
    const user = useUser();
    const dispatch = useUserDispatch();
    
    return (
        <nav>
            <ul className={open ? 'navbar__links open' : 'navbar__links'}>
                {user?.isLoggedIn ?
                    (<>
                        <li className='navbar__link-item colored' onClick={() => dispatch({type: USER_ACTIONS.logOut})}><Link to="/" className='navbar__link colored'>Log out</Link></li>
                        <li className='navbar__link-item'><Link to="/" className='navbar__link'>Home</Link></li>
                        <li className='navbar__link-item'><Link className='navbar__link' to="/recipes/new">New recipe</Link></li>
                        <li className='navbar__link-item'><Link to="/admin/settings" className='navbar__link'>Settings</Link></li>
                    </>)
                    : (<>
                        <li className='navbar__link-item colored'><Link className='navbar__link colored' to="/user/login">Log in</Link></li>
                        <li className='navbar__link-item'><Link to="/user/register" className='navbar__link'>Sign Up</Link></li>
                        <li className='navbar__link-item'><Link to="/" className='navbar__link'>Home</Link></li>
                    </>)
                }
            </ul>
        </nav>
    )
}