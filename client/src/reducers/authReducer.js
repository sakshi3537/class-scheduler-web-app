import { SIGN_IN,LOG_OUT,ERROR,CLEAR_ERROR } from "../constants/constants";


const authReducer = (state= { profileData:null,token:null,status:"" },action) => {
    switch(action.type){
        case SIGN_IN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {...state,profileData:action?.payload.result,token:action?.payload.token};
        case LOG_OUT:
            localStorage.clear();
            return {...state,profileData:null,token:null};    
        case ERROR:
            return {...state,profileData:null,token:null,status:action?.payload};
        case CLEAR_ERROR:
            return {...state,status:""};
        default:
            return state;
    }

}



export default authReducer;