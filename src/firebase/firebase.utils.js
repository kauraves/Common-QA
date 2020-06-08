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
var db = firebase.firestore();

// const editUser = async (props) => {
//   console.log('jeehee', props);
//   console.log(props);

//   // Find the user with the given uid (props)
//   const userRef = firestore.doc(`users/${props}`);
//   const snapShot = userRef.get().then(function (docs) {
//     console.log(docs);
//   });

//   //console.log(userRef);
//   //await userRef.get();
//   // try {
//   //   await userRef.set(
//   //     {
//   //       isAdmin: true,
//   //     },
//   //     { merge: true }
//   //   );
//   //   console.log('User updated');
//   // } catch (error) {
//   //   console.log('Error updating user', error.message);
//   // }
// };

export const showUserDocument = async (props) => {
  // Uid comes in as props, now we get the document with that uid
  let data = '';
  await db
    .collection('users')
    .doc(props)
    .get()
    .then(async function (doc) {
      if (doc.exists) {
        data = doc.data();
        console.log(data);
      } else {
        console.log('No such data');
      }
    });
  await console.log(data);
  return data;
};

export const findUserProfileDocument = async (email) => {
  let data = '';
  await firestore
    .collection(`users`)
    .where('email', '==', email)
    .get()
    .then(function (doc) {
      if (doc) {
        data = doc;
      } else console.log('No such user');
    });
  return data;
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // This gives us also exists property that tells us whether the record exists in the database or not
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // If there is no data based on uid, create new user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        // Each user is set to normal user by default. Admin status in admin panel
        isAdmin: false,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Standard set for Google Auth from Firebase (with a prompt)
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
