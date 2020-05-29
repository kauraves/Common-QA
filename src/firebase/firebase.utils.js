import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDwpoNIc-Bpbd-CXKfn_nqDIapHt9L3aE4',
  authDomain: 'common-qa-3f235.firebaseapp.com',
  databaseURL: 'https://common-qa-3f235.firebaseio.com',
  projectId: 'common-qa-3f235',
  storageBucket: 'common-qa-3f235.appspot.com',
  messagingSenderId: '322844869603',
  appId: '1:322844869603:web:9ee6a84a30373c6e7416d6',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
