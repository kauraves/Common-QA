import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { auth } from '../../firebase/firebase.utils';

import './sign-in-and-sign-up.styles.css';

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <div>
      <SignIn />
      <SignUp />
    </div>
    <div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  </div>
);

export default SignInAndSignUpPage;
