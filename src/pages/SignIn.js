import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react';
import './signin.css';
import self_auth from "../firebase/firebase";

function SignIn() {

    useEffect(() => {

        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(self_auth);
        const uiConfig = {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],

            signInFlow: 'popup', signInSuccessUrl: '/home',
        };

        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);

    return (
        <>
            <div className="sign_in_box">
                <h1>Login Page</h1>
                <div id="firebaseui-auth-container"></div>
                <div></div>
            </div>
        </>
    )
}

export default SignIn;
