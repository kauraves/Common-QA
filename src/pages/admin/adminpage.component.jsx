import React from 'react';
import EditUsers from '../../components/edit-users/edit-users.component';

const AdminPage = () => (
  <div className='admin'>
    <h1>Admin tools</h1>
    <p>Here you do admin things</p>
    <p>This is a pages component.</p>
    <EditUsers />
  </div>
);

export default AdminPage;
