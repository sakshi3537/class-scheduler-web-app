import { LOADING_TRUE, LOADING_FALSE } from '../constants/constants';

const loadingReducer = (isLoading=false,action) => {
    switch(action.type){
        case LOADING_TRUE:
            return true;
        case LOADING_FALSE:
            return false;
        default:
            return isLoading;
    }

}

export default loadingReducer;