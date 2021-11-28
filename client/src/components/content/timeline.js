import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { useSelector} from 'react-redux'
import Class from './class.js';


const Timeline = ({openForAlertRegistered,setOpenForAlertRegistered}) => {
    const classes = useSelector((state) => state.classReducer.myTimeline);
    return(
      <div>
        <h2 style={{textAlign:"center",fontWeight:"bold"}}>TIMELINE</h2>
        <Grid divided style={{textAlign:"center"}}>
            <Grid.Column width={16}>
              <ul style={{height:"100vh",overflow:"auto"}}>
               {classes.map((class_) => (
                  <li style={{listStyleType:"none",marginTop:"1rem",marginRight:"5%",marginBottom:"1rem"}}>
                    <Class class_={class_} openForAlertRegistered={openForAlertRegistered} setOpenForAlertRegistered={setOpenForAlertRegistered}/>
                  </li>
                ))}
              </ul>
            </Grid.Column>
        </Grid>
        </div>
      );
}

export default Timeline;