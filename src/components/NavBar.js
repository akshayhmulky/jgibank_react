import React from 'react';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem('auth_token');
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  return (
    <div className="nav_bar">
      <div className="logo">
        <NavLink to="/">JGIBank</NavLink>
      </div>

      <div className="menu">
        <ul>
          {/* {role !== 'ROLE_ADMIN' ? <></> : <></>} */}

          {(username !== 'admin' || role === 'ROLE_USER') && (
            <>
              <li>
                <NavLink to="/accounts">Account</NavLink>
              </li>
              <li>
                <NavLink to="/transaction">Transaction</NavLink>
              </li>
              <li>
                <NavLink to="/fund-transfer">Fund Transfer</NavLink>
              </li>
              <li>
                <NavLink to="/beneficiary">Beneficiary</NavLink>
              </li>
              <li>
                <NavLink to="/">Profile</NavLink>
              </li>
            </>
          )}
          {role === 'ROLE_ADMIN' && (
            <>
              <li>
                <NavLink to="/admin">Admin Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/change-role">Role Change</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="">
              <span onClick={(e) => logOut(e)}>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
