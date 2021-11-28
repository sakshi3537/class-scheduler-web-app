import { CLEAR_SEARCH_RESULTS, SEARCH_USER,CLEAR_FRIEND_STATUS,CLEAR_FOLLOW_STATUS } from "../constants/constants";


const userReducer = (userData={users:[],status:''},action) => {
    switch(action.type){ 
        case SEARCH_USER:
            return {...userData,users:action.payload};
        case CLEAR_SEARCH_RESULTS:
            return {...userData,users:[],status:action.payload};
        case CLEAR_FOLLOW_STATUS:
            return {...userData,status:''}
        default:
            return userData;
    }

}



export default userReducer;