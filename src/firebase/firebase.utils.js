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
//app.auth().setPersistence(app.auth.Auth.Persistence.SESSION);

var db = firebase.firestore();

export const editUser = async (uid, isAdmin) => {
  // Find the user with the given uid (props)
  const userRef = firestore.doc(`users/${uid}`);
  console.log(userRef);
  try {
    if (isAdmin) {
      console.log('is already admin');
      console.log(userRef);
      await userRef.set(
        {
          isAdmin: false,
        },
        { merge: true }
      );
      console.log('User updated, admin status removed');
      return false;
    } else {
      await userRef.set(
        {
          isAdmin: true,
        },
        { merge: true }
      );
      console.log(userRef);
      console.log('User has been given an admin status.');
      return true;
    }
  } catch (error) {
    console.log('Error updating user', error.message);
  }
};
//);

// console.log(userRef);
// await userRef.get();
//};

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

export const getAllQuestions = async () => {
  const snapshot = await firebase.firestore().collection('questions').get();
  //console.log(snapshot.docs.map((doc) => doc.data()));
  return snapshot.docs.map((doc) => doc.data());
  //return snapshot.docs.map((doc) => doc.data());
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

// // Standard set for Google Auth from Firebase (with a prompt) (old way)
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithGoogle = () =>
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      return firebase.auth().signInWithPopup(provider);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      return console.log('There was an error', errorCode, ' :', errorMessage);
    });

export default firebase;
