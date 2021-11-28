import * as api from '../api/api.js';
import { LOADING_FALSE,LOADING_TRUE,GET_TIMELINE,GET_MYCLASSES, ERROR } from "../constants/constants";

const getTimeLine = () => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        const {data} = await api.getTimeLine();
        const classes=data;
        dispatch({type : GET_TIMELINE, payload : classes});
        dispatch({type:LOADING_FALSE});
    } catch (error) {
        console.log(error);
    }
}

const getMyClasses = () => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        const {data} = await api.getMyClasses();
        const classes=data;
        dispatch({type : GET_MYCLASSES, payload : classes});
        dispatch({type:LOADING_FALSE});
    } catch (error) {
        console.log(error);
    }
}



const scheduleClass = (classDetails) => async (dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        await api.scheduleClass(classDetails);
        dispatch({type:LOADING_FALSE});
        dispatch(getTimeLine());
    } catch (error) {
        console.log(error);
    }
}

const registerForClass = (id) => async(dispatch) => {
    try {
        dispatch({type:LOADING_TRUE});
        await api.registerForClass(id);
        dispatch({type:LOADING_FALSE});
        dispatch(getTimeLine());
    } catch (error) {
        console.log(error);
    }
}



export {scheduleClass,registerForClass,getMyClasses,getTimeLine};