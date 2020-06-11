import React from 'react';

const ProfilePage = (props) => (
  <div className='profile'>
    <h1>Profile</h1>
    <p>Here you can see and edit your profile</p>
    <p>This is a pages component.</p>
    <p>Your role: {props.role === true ? 'admin' : 'user'}</p>
  </div>
);

export default ProfilePage;
