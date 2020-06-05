import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.css';
import logo from '../../assets/logo192.png';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <img src={logo} className='logo' alt='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/'>
        HOME{' '}
      </Link>
      {currentUser ? (
        <React.Fragment>
          <Link className='option' to='/profile'>
            YOUR PROFILE
          </Link>
          <Link to='/' className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </Link>
        </React.Fragment>
      ) : (
        <Link className='option' to='/login'>
          SIGN IN
          {console.log(currentUser)}
        </Link>
      )}
    </div>
  </div>
);

export default Header;
