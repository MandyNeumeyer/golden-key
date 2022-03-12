import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { UserDataContext } from '../../UserDataProvider';

import './Header.scss';

export default function Header()
{
    const { user, setUser } = useContext(UserDataContext);
    
    const navigate = useNavigate();

    const handleLogout = async (e) =>
    {
        e.preventDefault();

        await setUser({ data: { }, loggedIn: false });
        await Cookies.remove('access_token');
        await navigate('/');
    };

    return (
        <ul id="Header">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {
                !user.loggedIn &&
                <>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup">Register</NavLink>
                    </li>   
                </>
            }
            {
                user.loggedIn &&
                <>
                    <li className="right">
                        <a href="/logout" onClick={ (e) => handleLogout(e) }>Logout</a>
                    </li>
                    <li className="right">
                        <NavLink to="/dashboard">{ user.username }</NavLink>
                    </li>
                </>
            }
        </ul>
    );
}
