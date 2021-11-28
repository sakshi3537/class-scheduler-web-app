import React, { Component, useEffect, useState } from 'react'
import { Input, Menu,Dropdown,Button,Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { logOut } from '../../actions/authActions';
import { CLEAR_SEARCH_RESULTS } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';


const TopNavBar = ({authStatus, setAuthStatus}) => {

    const [status, setStatus] = useState('home');
    const isLoggedIn= localStorage.getItem('profile');
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const location=useLocation();
    const [landingPageButtons,setLandingPageButtons]=useState(true);

    useEffect(()=>{
        if(location.pathname==='/home')
        setLandingPageButtons(false);
        else
        setLandingPageButtons(true);
    },[location])

    const handleItemClick =  (e, { name }) => {
        setStatus(name);
    }

    const handleSignInClick = () => {
          setAuthStatus('Sign In');
    }

    const handleSignUpClick = () => {
          setAuthStatus('Sign Up');
    }


    const handleLogOutClick = () => {
      dispatch(logOut(navigate));
      dispatch({type:CLEAR_SEARCH_RESULTS,payload:''});
    }

    const userLoggedIn= JSON.parse(localStorage.getItem('profile'))?.result?.name;

    return (
        <Menu secondary size='large' style={{margin:"0",width:"100%",backgroundColor:"#d4e4ff"}}>
          <Menu.Item style={{textAlign:"center",fontWeight:"bold",fontSize:"1.5rem"}}>
            <Icon name="calendar" />
            Scheduler
          </Menu.Item>
          {
          (landingPageButtons) && (
          <Menu.Item
            name='home'
            active={status === 'home'}
            onClick={handleItemClick}
          >
          <a href="" >Home</a>
          </Menu.Item>) 
          }
          {
          (landingPageButtons) && (
          <Menu.Item 
            name='about'
            active={status === 'about'}
            onClick={handleItemClick}
          >
          <a href="#about" >About</a>
          </Menu.Item>) 
          }
          <Menu.Menu position='right'>
            <Menu.Item>
              {
                (isLoggedIn)
                ?(<p style={{fontSize:"1.5rem",fontWeight:"bold"}}>{userLoggedIn}</p>)
                :(<Button primary  onClick={handleSignInClick}>Sign In</Button>)
              }
            </Menu.Item>
            <Menu.Item>
              {
                (isLoggedIn)
                ?(<Button primary  onClick={handleLogOutClick}>Log Out</Button>)
                :(<Button primary  onClick={handleSignUpClick}>Sign Up</Button>)
              }
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
}
export default TopNavBar;