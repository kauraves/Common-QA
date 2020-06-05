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

const editUser = async (props) => {
  console.log('jeehee', props);
  console.log(props);

  const userRef = firestore.doc(`users/${props}`);
  const snapShot = await userRef.get();
  try {
    await userRef.set(
      {
        isAdmin: true,
      },
      { merge: true }
    );
    console.log('User updated');
  } catch (error) {
    console.log('Error updating user', error.message);
  }
};

export const findUserProfileDocument = async (email) => {
  let uid = '';
  const userRef = await firestore
    .collection(`users`)
    .where('email', '==', email);
  const snapShot = await userRef.get().then(function (docs) {
    uid = docs.docs[0].id;
    editUser(uid);
  });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // This should get replaced with the one for MongoDB
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  //this gives us also exists property that tells us whether the record exists in the database or not
  // if there is no data based on uid, create new user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        // each user is set to normal user by default. Admin status in admin panel
        isAdmin: false,
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

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
