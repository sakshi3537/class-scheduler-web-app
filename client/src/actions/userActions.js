import * as api from '../api/api.js';
import { SEARCH_USER,LOADING_TRUE,LOADING_FALSE,CLEAR_SEARCH_RESULTS, GET_TIMELINE } from "../constants/constants";
import { getTimeLine } from './classActions.js';

const searchUser = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        const {data} = await api.searchUser(searchQuery);
        const users=data;
        if(users.length===0) 
        dispatch({type: CLEAR_SEARCH_RESULTS, payload:'No User Found!!'});
        else
        dispatch({type : SEARCH_USER, payload : users});
        dispatch({type:LOADING_FALSE});
    } catch (error) {
        console.log(error);
    }
}

const follow = (id,isFollow) => async(dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        await api.follow(id);
        const data=JSON.parse(localStorage.getItem('profile'));
        let arr=data?.result?.following;
        if(isFollow===true)
        arr.push(id);
        else
        arr=arr.filter(ele=>ele!==id);
        const newData={...data,result:{...data.result,following:arr}};
        localStorage.setItem('profile',JSON.stringify(newData));
        dispatch({type:LOADING_FALSE});
        if(isFollow===true)
        dispatch({type:CLEAR_SEARCH_RESULTS,payload:'Following'});
        else
        dispatch({type:CLEAR_SEARCH_RESULTS,payload:'Unfollowed'});
        dispatch(getTimeLine());
    } catch (error) {
        console.log(error);
    }
}

export {follow,searchUser};