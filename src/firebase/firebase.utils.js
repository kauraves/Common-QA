import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  //this gives us also exists property that tells us whether the record exists in the database or not
  //console.log(snapShot);

  // if there is no data based on uid, create new user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  // now this has registered the user to firebase based on the uid
  // userRef returns all the user object references
  // i.e. userRef.id will return the id it is registered with
  // This id could be used to pull userdata from mongoDB
  //console.log(userRef);
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//console.log(firestore.collection('users').doc('gdjs25Yb8IaZAEk8XwIK'));

//console.log(firestore.doc('users').doc('gdjs25Yb8IaZAEk8XwIK'));

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
