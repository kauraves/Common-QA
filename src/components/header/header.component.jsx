import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link to='/'>HOME </Link>
    {currentUser ? (
      <button onClick={() => auth.signOut()}>SIGN OUT</button>
    ) : (
      <Link to='/login'>SIGN IN</Link>
    )}
  </div>
);

export default Header;
