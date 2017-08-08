import React, { Component } from 'react';

import {auth, googleProvider} from './base'

const SignIn = () => {

 const authenticateGoogle = () => {
        console.log(googleProvider)
        auth.signInWithPopup(googleProvider)
 }

 return(
     <div>
        <button
            className = "SignIn"
            onClick = {authenticateGoogle}
        >
            Sign In With Google
        </button>
    </div>
 )
      
}

export default SignIn