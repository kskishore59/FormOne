import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import config from '../config/config';

const Firebase = firebase.initializeApp(config.firebaseConfig);

export const auth = firebase.auth()

export default Firebase;
