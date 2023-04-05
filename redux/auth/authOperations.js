import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from '../../firebase/config';
import { authSlice } from "./authSlice";

export const authSignUpUser = ({name, email, password}) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name
    });

    const { displayName, uid } = auth.currentUser;

    dispatch(
      authSlice.actions.updateUserProfile({
        userId: uid,
        name: displayName
      })
    );
  } catch (error) {
    console.log("error.message", error.message);
  }
}

export const authSignIn = ({ email, password }) => async (dispatch) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    const { user } = response;
    dispatch(authActions.signInSuccess(user));
  } catch (error) {
    dispatch(authActions.signInFailure(error.message));
    // Display an alert message to the user
    alert("Error signing in: " + error.message);
    console.log("Error message:", error.message);
  }
};

export const authSignOut = () => async (dispatch) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
}

export const authStateChangeUser = () => 
  async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            name: user.displayName,
            email: user.email
          })
        );

        dispatch(
          authSlice.actions.authStateChange({
            stateChange: true,
          })
        )
      }
    })
  } catch (error) {
    throw error;
  }
}