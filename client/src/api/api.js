import axios from 'axios';

//URLs
const USER_URL = "https://class-scheduler-web-app.herokuapp.com/user";
const CLASS_URL = "https://class-scheduler-web-app.herokuapp.com/class";
const AUTH_URL = "https://class-scheduler-web-app.herokuapp.com/auth";

axios.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`;
    }
  
    return req;
});


//AUTH APIs
const signIn = (authData) => axios.post(`${AUTH_URL}/signIn`,authData);
const signUp = (authData) => axios.post(`${AUTH_URL}/signUp`,authData);

//CLASS APIs
const getMyClasses = () => axios.get(`${CLASS_URL}/myClasses`);
const getTimeLine = () => axios.get(`${CLASS_URL}/getTimeline`);
const scheduleClass = (classDetails) => axios.post(`${CLASS_URL}/schedule`,classDetails);
const registerForClass = (id) => axios.patch(`${CLASS_URL}/register/${id}`);

//USER APIs
const follow = (id) => axios.patch(`${USER_URL}/follow/${id}`);
const searchUser = (searchQuery) => axios.get(`${USER_URL}/${searchQuery}`);

export {signIn,signUp,getMyClasses,getTimeLine,scheduleClass,registerForClass,follow,searchUser};