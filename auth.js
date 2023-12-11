import { auth, app, firestore } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const signOut = async () => {
  try {
    await auth.signOut();
    // User signed out
  } catch (error) {
    // Handle errors
    console.error(error.message);
  }
};

const handleUserRegistration = async (user) => {
  await setDoc(doc(firestore, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    approved: false, // Set to true when manually approved by admin
    avatar: user.photoURL,
  });
};

export { signInWithGoogle, signOut, handleUserRegistration };
