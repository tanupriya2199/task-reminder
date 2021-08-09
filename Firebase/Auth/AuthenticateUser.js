import {firebaseAuth} from '../firebaseconfig';

const AuthenticateUser = async (email, password) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    return err;
  }
};

export default AuthenticateUser;
