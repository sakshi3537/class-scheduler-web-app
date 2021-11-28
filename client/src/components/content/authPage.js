import React, {useState,useRef, useEffect} from 'react'
import { Button, Header, Icon, Modal,Form, FormField } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {signIn,signUp} from '../../actions/authActions.js';
import { CLEAR_ERROR, SIGN_IN } from '../../constants/constants.js';


const AuthPage = ({authStatus,setAuthStatus}) => {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState('');
  const [alternateMessage,setAlternateMessege]=useState('');
  const [authDetails,setAuthDetails]=useState({name:'',email:'',password:'',confirmPassword:''});
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const error=useSelector((state) => state.authReducer.status);
  const [errorStatement,setErrorStatement]=useState(error);
  useEffect(()=>{
    setErrorStatement(error);
  },[error]);
  
  useEffect(()=>{
    if(authStatus!='')  
    {
      setOpen(true);
      setHeading(authStatus);
      if(authStatus==='Sign In')
      setAlternateMessege("Don't have an account? Sign Up" );
      else if(authStatus==='Sign Up')
      setAlternateMessege('Already have an account? Sign In');
    }
    else{
      setOpen(false);
    }
  },[authStatus]);

  const handleChange = async (e) => {
    setAuthDetails({...authDetails,[e.target.name]:e.target.value});
  }

  const handleSubmit = () => {
    dispatch({type:CLEAR_ERROR});
    if(authStatus==='Sign Up' && authDetails.name!='' && authDetails.email!='' && authDetails.password!='' && authDetails.confirmPassword!=''){
      dispatch(signUp(authDetails,navigate,authStatus,setAuthStatus));
      setAuthDetails({name:'',email:'',password:'',confirmPassword:''});
    }  
    else if(authStatus==='Sign In' && authDetails.email!='' && authDetails.password!=''){ 
      dispatch(signIn(authDetails,navigate,authStatus,setAuthStatus));
      setAuthDetails({email:'',password:''});
    
    }  
  }

  
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => {setOpen(false);setAuthStatus('');dispatch({type:CLEAR_ERROR});setAuthDetails({name:'',email:'',password:'',confirmPassword:''})}}
      onOpen={() => setOpen(true)}
    >
      <Header textAlign="center" content={heading} />
      <Modal.Content style={{textAlign:"center"}}>
      <Form>
            {
            (authStatus==='Sign Up') && (
            <Form.Field >
                <Form.Input label='Name' placeholder='Name' name='name' style={{width: "60%" }} required onChange = {handleChange} value={authDetails.name}/>
            </Form.Field> )
            }
            <Form.Field >
                <Form.Input label='Email' placeholder='Email' name='email' style={{width: "60%" }} required onChange = {handleChange} value={authDetails.email}/>
            </Form.Field>
            <Form.Field >
                <Form.Input label='Password' type='password' placeholder='Password' name='password' style={{width: "60%" }} required onChange = {handleChange} value={authDetails.password}/>
            </Form.Field>
            {
            (authStatus==='Sign Up') && (
            <Form.Field >
                <Form.Input label='Confirm Password' type='password' placeholder='Confirm Password'name='confirmPassword' style={{width: "60%" }} required onChange = {handleChange} value={authDetails.confirmPassword}/>
            </Form.Field> )
            }
            <Form.Field style={{color:"red"}}>
              {errorStatement}
            </Form.Field>
            <Form.Field >
                <Form.Button type='submit' style={{width: "60%" ,backgroundColor:"blue",color:"white"}} onClick={handleSubmit} >{heading}</Form.Button>
            </Form.Field>
            <Form.Field >
                <Form.Button style={{width: "60%",backgroundColor:"grey",color:"white" }} onClick={() => {(authStatus==='Sign In')? setAuthStatus('Sign Up') : setAuthStatus('Sign In');dispatch({type:CLEAR_ERROR});setAuthDetails({name:'',email:'',password:'',confirmPassword:''})}} >{alternateMessage}</Form.Button>
            </Form.Field>

     </Form>
      </Modal.Content>
    </Modal>
  )
}

export default AuthPage;



