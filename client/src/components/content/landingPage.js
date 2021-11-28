import React, {useState} from 'react';
import TopNavBar from '../header/topNavBar.js'
import LandingPageContent from './landingPageContent.js'
import SecondaryBar from '../header/secondaryBar.js'
import AuthPage from './authPage.js';

 const LandingPage = () => {
    const [authStatus,setAuthStatus]=useState('');
    return (
        <div>
            <TopNavBar authStatus={authStatus} setAuthStatus={setAuthStatus}/>
            <AuthPage authStatus={authStatus} setAuthStatus={setAuthStatus} />
            <SecondaryBar/>
            <LandingPageContent/>
        </div>
    );

 }

 export default LandingPage;