import React, { Component, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './content.css'
import img1 from '../../images/IMAGE3.png';
import img2 from '../../images/IMAGE4.png';

const LandingPageContent = () => {
    return (
            <div style={{paddingBottom:"5%"}}>
                <div className="homeBackground">
                   
                </div>

                <div id="about" style={{border:"1rem blue solid",marginLeft:"20%",marginRight:"20%",marginTop:"5%",paddingLeft:"10%",paddingBottom:"2%"}}>
                    <h1 style={{marginTop:"5%",marginBottom:"3%",color:"blue"}}> About Scheduler </h1>
                    <p>
                        Scheduler is an online platform where teachers can schedule classes for the students.
                    </p>
                    <ul>
                        <li>A teacher can schedule a class and thus will be shown to all his/her students in their timeline.</li>
                        <li>A student can select to register for a class that comes in his/her timeline.</li>
                        <li>In case of class being full on its maximum capacity, student will see a message class is full.</li>
                        <li>A teacher or student can view his/her schedule and accordingly attend classes.</li>
                        <li>The schedule provides different views including month, day, week, work week and agenda</li>
                    </ul>
                </div>
            </div>
    );
}

export default LandingPageContent;
