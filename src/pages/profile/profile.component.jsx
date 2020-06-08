import React from 'react';
import EditUsers from './../../components/edit-users/edit-users.component';

const ProfilePage = (props) => (
  <div className='profile'>
    <h1>Profile</h1>
    <p>Here you can see and edit your profile</p>
    <p>This is a pages component.</p>
    <p>Your role: {props.role === true ? 'admin' : 'user'}</p>
    <EditUsers />
  </div>
);

export default ProfilePage;
