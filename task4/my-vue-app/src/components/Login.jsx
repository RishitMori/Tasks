

import { auth, signInWithGooglePopup } from "../utils/authLogin"

function Login() {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log("rishit", auth)
        console.log("prachi", response);
    }
    return (
        <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}
export default Login;
