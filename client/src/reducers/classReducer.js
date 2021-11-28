import { GET_TIMELINE,GET_MYCLASSES,CLEAR_ERROR_CLASS_SCHEDULING,ERROR_CLASS_SCHEDULING } from "../constants/constants";


const classReducer = (classData={myTimeline:[],myClasses:[]},action) => {
    switch(action.type){
        case GET_TIMELINE:
            return {...classData,myTimeline:action.payload};
        case GET_MYCLASSES:
            return {...classData,myClasses:action.payload};
        default:
            return classData;
    }

}



export default classReducer;