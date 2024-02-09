import { getAuth, GoogleAuthProvider, signInWithPopup, browserLocalPersistence } from "firebase/auth";

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = async () => {

    await auth.setPersistence(browserLocalPersistence)
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            console.log("error occured ", error)
        });
}   
