import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Button, Header, Icon, Modal,Form,Grid,Message } from 'semantic-ui-react'
import { scheduleClass,getTimeLine,getMyClasses } from '../../actions/classActions';
import TopNavBar from '../header/topNavBar';
import Timeline from './timeline.js';
import { CLEAR_FOLLOW_STATUS } from '../../constants/constants';
import { follow } from '../../actions/userActions.js';
import SearchBar from './searchBar.js';
import { Navigate, useNavigate } from 'react-router';
import { Inject,ScheduleComponent,Day, Month, Week, WorkWeek,Agenda,EventSettingsModel } from '@syncfusion/ej2-react-schedule';

const Home = () => {
  const myClasses = useSelector((state)=>(state.classReducer.myClasses));
  const myClassesForScheduler = myClasses.map((class_)=>({
        EndTime: class_.endTime,
        StartTime:class_.startTime,
        Subject: class_.topic,
        ClassLink: class_.classLink
  }));
  const localData : EventSettingsModel = {
    dataSource : myClassesForScheduler,
                 fields : {
                  description : { name: 'ClassLink' }
                 }
  };

  const [openForScheduleClass, setOpenForScheduleClass] = useState(false);
  const [openForViewUpcomingClasses,setOpenForViewUpcomingClasses] = useState(false);
  const [classDetails,setClassDetails]=useState({topic:'',organizerId:JSON.parse(localStorage.getItem('profile'))?.result?._id, organizerName:JSON.parse(localStorage.getItem('profile'))?.result?.name,availableSeats:'',startTime:'',endTime:'',classLink:''});
  const dispatch=useDispatch();
  const [openForAlert,setOpenForAlert]=useState(false);
  const [openForAlertRegistered,setOpenForAlertRegistered]=useState(false);
  const handleChange = async (e) => {
    setClassDetails({...classDetails,[e.target.name]:e.target.value});
  }
  const handleScheduleClass = (e) => {
        if(classDetails.topic!='' && classDetails.availableSeats!='' && classDetails.startTime!='' &&classDetails.endTime!=''){
        dispatch(scheduleClass(classDetails));
        setClassDetails({topic:'',organizerId:JSON.parse(localStorage.getItem('profile'))?.result?._id, organizerName:JSON.parse(localStorage.getItem('profile'))?.result?.name,availableSeats:'',startTime:'',endTime:'',classLink:''});
        setOpenForScheduleClass(false);
        setOpenForAlert(true);
        }
  }

  const handleViewUpcomingClasses = () => {
    dispatch(getMyClasses());
  }

  const followStatus=useSelector((state)=>state.userReducer.status);
  const users = useSelector((state) => state.userReducer.users);
  const isLoggedIn= localStorage.getItem('profile');
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(getTimeLine());
  },[])
  useEffect(()=>{
    if(!isLoggedIn)
    navigate('/');
  },[isLoggedIn])
  useEffect(()=>{
      if(followStatus!='')
      {
        setTimeout(()=>{
          dispatch({type:CLEAR_FOLLOW_STATUS})
        },2000);
      }
  },[followStatus])

  const [searchQuery,setSearchQuery]=useState('');
  return (
      <div>
        <TopNavBar/>
        <Modal
          centered={false}
          open={openForAlert}
          onClose={() => setOpenForAlert(false)}
          onOpen={() => setOpenForAlert(true)}
        >
          <Modal.Header style={{color:"green"}}>You have succesfully scheduled the class!</Modal.Header>
          <Modal.Actions>
            <Button onClick={() => setOpenForAlert(false)}>OK</Button>
          </Modal.Actions>
        </Modal>
        <Modal
          centered={false}
          open={openForAlertRegistered}
          onClose={() => setOpenForAlertRegistered(false)}
          onOpen={() => setOpenForAlertRegistered(true)}
        >
          <Modal.Header style={{color:"green"}}>You have succesfully registered for the class!</Modal.Header>
          <Modal.Actions>
            <Button onClick={() => setOpenForAlertRegistered(false)}>OK</Button>
          </Modal.Actions>
        </Modal>
        <Grid style={{marginTop:"2%"}} divided>
          <Grid.Column width={4}>
            <Modal
              closeIcon
              open={openForScheduleClass}
              trigger={<Button style={{backgroundColor:"#17e61e",marginLeft:"5%",width:"75%",color:"white"}}><Icon name="calendar plus" />Schedule a Class</Button>}
              onClose={() => {setOpenForScheduleClass(false);setClassDetails({topic:'',organizerId:JSON.parse(localStorage.getItem('profile'))?.result?._id, organizerName:JSON.parse(localStorage.getItem('profile'))?.result?.name,availableSeats:'',startTime:'',endTime:'',classLink:''});}}
              onOpen={() => setOpenForScheduleClass(true)}
            >
              <Modal.Header style={{textAlign:"center"}} content='Schedule a Class' />
              <Modal.Content style={{textAlign:"center"}}>
                <Form>
                      <Form.Field >
                          <Form.Input label='Topic' type='text' placeholder='Topic' name='topic' style={{width: "60%" }} required onChange = {handleChange} value={classDetails.topic}/>
                      </Form.Field>
                      <Form.Field >
                          <Form.Input label='Available Seats' type='text' placeholder='Available Seats' name='availableSeats' style={{width: "60%" }} required onChange = {handleChange} value={classDetails.availableSeats}/>
                      </Form.Field>
                      <Form.Field >
                          <Form.Input label='Start time' type='datetime-local' placeholder='Start time' name='startTime' style={{width: "60%" }} required onChange = {handleChange} value={classDetails.startTime} />
                      </Form.Field>
                      <Form.Field >
                          <Form.Input label='End time' type='datetime-local' placeholder='End time' name='endTime' style={{width: "60%" }} required onChange = {handleChange} value={classDetails.endTime}/>
                      </Form.Field>
                      <Form.Field >
                          <Form.Input label='Class Link' type='text' placeholder='Class Link' name='classLink' style={{width: "60%" }} required onChange = {handleChange} value={classDetails.classLink}/>
                      </Form.Field>
                      <Form.Field style={{color:"red"}}>
                        {(new Date(classDetails.startTime)<new Date()) && (<p> Please specify a valid Start Time</p>)}
                      </Form.Field>
                      <Form.Field style={{color:"red"}}>
                        {(new Date(classDetails.endTime)<new Date(classDetails.startTime)) && (<p> Please specify a valid End Time</p>)}
                      </Form.Field>
                      <Form.Field>
                          <Form.Button  type='submit'  style={{width: "60%",backgroundColor:"#17e61e",color:"white" }} onClick={handleScheduleClass}>Schedule a Class</Form.Button>
                      </Form.Field>
                </Form>
              </Modal.Content>
      
            </Modal>
            <br/>
            <Modal
              closeIcon
              open={openForViewUpcomingClasses}
              trigger={<Button onClick={() => handleViewUpcomingClasses()} style={{backgroundColor:"#17e61e",marginLeft:"5%",marginTop:"2%",width:"75%",color:"white"}}><Icon name="calendar" />View Upcoming Classes</Button>}
              onClose={() => setOpenForViewUpcomingClasses(false)}
              onOpen={() => setOpenForViewUpcomingClasses(true)}
            >
              <Modal.Header content='View Upcoming Classes' />
              <Modal.Content>
                <ScheduleComponent eventSettings={localData}>
                    <Inject services={[Day,Week,Month,WorkWeek,Agenda]} />
                </ScheduleComponent>
              </Modal.Content>
            </Modal>
          </Grid.Column>
          <Grid.Column width={8}>
            <Timeline openForAlertRegistered={openForAlertRegistered} setOpenForAlertRegistered={setOpenForAlertRegistered}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            {
              (followStatus==='Following')?
              (<Message success header={followStatus} style={{width:"60%"}}/>):
              (
                (followStatus==='Unfollowed') ?
                (<Message negative header={followStatus}  style={{width:"60%"}}/>):
                (
                  (followStatus==='No User Found!!') &&
                  (<Message header={followStatus}  style={{width:"60%"}}/>)
                )
              )
            }
            {
            users.map((user) => (
              <li style={{listStyleType:"none",marginTop:"2%",marginBottom:"2%",marginRight:"4%",paddingLeft:"2%",outline:".1rem solid blue"}}>
                {user.name} 
                <Button style={{backgroundColor:"white",color:"blue"}} onClick={() => {
                  (JSON.parse(localStorage.getItem('profile'))?.result?.following.includes(user._id))
                  ?(dispatch(follow(user._id,false)))
                  :(dispatch(follow(user._id,true)));setSearchQuery('');}}>
                  {(JSON.parse(localStorage.getItem('profile'))?.result?.following.includes(user._id))
                  ?"Unfollow": "Follow"}
                </Button>
              </li>
            ))
            }

          </Grid.Column>
        </Grid>
      </div>
  );
}

export default Home;


  

