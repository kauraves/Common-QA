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

export const editUser = async (uid, isAdmin) => {
  // Find the user with the given uid (props)
  const userRef = firestore.doc(`users/${uid}`);

  try {
    if (isAdmin) {
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

      console.log('User has been given an admin status.');
      return true;
    }
  } catch (error) {
    console.log('Error updating user', error.message);
  }
};

export const showQuestionDocument = async (props) => {
  let data = '';
  await db
    .collection('questions')
    .doc(props)
    .get()
    .then(async function (doc) {
      if (doc.exists) {
        data = doc.data();
        //console.log(data);
      } else {
        console.log('No such data');
      }
    });
  //await console.log(data);
  return data;
};

export const showAnswerDocument = async (questionID, answerID) => {
  let data = '';
  await db
    .collection('questions')
    .doc(questionID)
    .collection('answers')
    .doc(answerID)
    .get()
    .then(async function (doc) {
      if (doc.exists) {
        data = doc.data();
      } else {
        console.log('No such data');
      }
    });
  return data;
};

export const editAnswerDocument = async (questionID, answerID, body) => {
  const userRef = firestore.doc(`questions/${questionID}/answers/${answerID}`);
  try {
    await userRef.set(
      {
        body: body,
      },
      { merge: true }
    );
    console.log('Answer updated succesfully.');
  } catch (error) {
    console.log('Error updating user', error.message);
  }
};

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
        //console.log(data);
      } else {
        console.log('No such data');
      }
    });
  //await console.log(data);
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

export const showAnswers = async (props) => {
  let data = [];
  await firebase
    .firestore()
    .collection('questions')
    .doc(props)
    .collection('answers')
    .get()
    .then(function (doc) {
      doc.forEach((item) => {
        getAnswerData(props, item.id).then(function (result) {
          data.push({ answer_id: item.id, question_id: props, ...result });
        });
      });
      //console.log(data);
      // querySnapshot.forEach(function (doc) {

      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, ' => ', doc.data());
      // });
    });
  return data;
};

export const getAnswerData = async (props, id) => {
  let data = [];
  await db
    .collection('questions')
    .doc(props)
    .collection('answers')
    .doc(id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        data = doc.data();
      } else {
        console.log('No such data');
      }
    });

  return data;
};

export const getAllQuestions = async () => {
  let data = [];
  await firebase
    .firestore()
    .collection('questions')
    .get()
    .then(function (doc) {
      doc.forEach((item) => {
        getQuestionData(item.id).then(function (result) {
          data.push({ post_id: item.id, ...result });
        });
      });
    });

  return data;
};

export const getQuestionData = async (id) => {
  let data = [];
  await db
    .collection('questions')
    .doc(id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        data = doc.data();
      } else {
        console.log('No such data');
      }
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

export const signInWithEmail = (email, password) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      auth.signInWithEmailAndPassword(email, password);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      return console.log('There was an error', errorCode, ' :', errorMessage);
    });
};

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
