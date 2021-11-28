import React from 'react';
import { Card, Icon,Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { registerForClass } from '../../actions/classActions.js';


const Class = ({class_,openForAlertRegistered,setOpenForAlertRegistered}) => {
    const dispatch= useDispatch();
    const header_val= "Topic: "+ class_.topic;
    const organizerName_val = "Organizer Name: "+ class_.organizerName;
    const availableSeats_val = "Available Seats: "+ class_.availableSeats;
    const handleRegister = () => {
      dispatch(registerForClass(class_._id));
      setOpenForAlertRegistered(true);
    }
    const extra = (
        <div>
          {
              (class_.availableSeats===0)
              ?(<Button style={{backgroundColor:"grey",color:"white",width:"60%"}} >Class is full</Button>)
              :(<Button style={{backgroundColor:"blue",color:"white",width:"60%"}} onClick={handleRegister}>Register For Class</Button>)
          }
        </div>
      );
    return (
        <Card fluid
            header= {header_val}
            meta= {organizerName_val}
            description={availableSeats_val}
            color="teal"
            extra={extra}
        
        />
    );
}

export default Class;