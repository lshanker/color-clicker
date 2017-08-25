import React from 'react';

import './SignIn.css'
import {auth, googleProvider} from './base'

const SignIn = () => {

 const authenticateGoogle = () => {
        auth.signInWithPopup(googleProvider)
 }

 return(
     <div className = 'SignIn'>
         <div className = "signInTitle">
         <h1>Color<br/>Clicker.</h1>
         </div>
         <div className = "signInContainer">
          <button
            className = "SignIn"
            onClick = {authenticateGoogle}
        >
        <i className="fa fa-google" aria-hidden="true"></i> Sign In With Google
         </button>
        </div>

        <div className = "signInContainer">
          <button
            className = "SignIn"
            onClick = {authenticateGoogle}
        >
        <i className="fa fa-facebook" aria-hidden="true"></i> Sign In With Facebook
         </button>  
        </div>

        <div className = "signInContainer">
          <button
            className = "SignIn"
            onClick = {authenticateGoogle}
        >
        <i className="fa fa-github" aria-hidden="true"></i> Sign In With GitHub
         </button>
        </div>

        <div className = "signInContainer">
          <button
            className = "SignIn"
            onClick = {authenticateGoogle}
        >
        <i className="fa fa-envelope-o" aria-hidden="true"></i> Sign In With Email
         </button>
        </div>


       
    </div>
 )
      
}

export default SignIn