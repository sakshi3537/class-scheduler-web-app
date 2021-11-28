import * as api from '../api/api.js';
import { SIGN_IN,LOADING_FALSE,LOADING_TRUE,LOG_OUT, ERROR} from "../constants/constants";

const signIn = (authData,navigate,authStatus,setAuthStatus) => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        const {data} = await api.signIn(authData);
        if(typeof data==='string'){
            dispatch({type:ERROR,payload:data});
            dispatch({type:LOADING_FALSE});
        }
        else{
            dispatch({type: SIGN_IN, payload:data});
            dispatch({type:LOADING_FALSE});
            setAuthStatus('');
            navigate('/home');
        }

    } catch (error) {
        console.log(error);
    }
}

const signUp = (authData,navigate,authStatus,setAuthStatus) => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        const {data}= await api.signUp(authData);
        if(typeof data==='string'){
            dispatch({type:ERROR,payload:data});
            dispatch({type:LOADING_FALSE});
        }
        else{
            dispatch({type: SIGN_IN, payload : data})
            dispatch({type:LOADING_FALSE});
            setAuthStatus('');
            navigate('/home');
        } 
    } catch (error) {
        console.log(error);
    }
}


const logOut = (navigate) => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        dispatch({type: LOG_OUT})
        dispatch({type:LOADING_FALSE});
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}
 export {signIn, signUp, logOut};