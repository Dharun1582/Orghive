import React,{useContext, useEffect, useState} from 'react'
// import styles from "./Landing.module.css"
// import React from "react";
import styles from "./Landing-style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../../components/Navbar/Navbar";
import ButtonCust from "../../components/Button/ButtonCust";
import ButtonOrg from "../../components/Button/ButtonOrg";
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faHandshake } from '@fortawesome/free-regular-svg-icons';
import Footer from '../../components/Footer/Footer';
function Landing(){

    const [x,setx]=useState(1);
    useEffect(()=>{
        if(localStorage.getItem('loginState')==1){
            setx(1);
          }else if(localStorage.getItem('loginState')==2){
            setx(2);
          }else{
              setx(3);
          }
    },[])

   
    return(
        <div>
            <div className="header">
                 <Navbar y={x} sety={setx}/>

                <div className="headerText">
                    <h1>Want to make your events more special? <br/> Then you're at the right place!</h1><br/>
                    <h4>A Site with more than 100+ Professional Event Organisers</h4>
                </div>
                <div className="button">
                {x==1?<>
                <a href="/loginCustomer"><ButtonCust text="Login as Customer"/></a>
                <a href="/loginOrganizer"><ButtonOrg text="Login as Organizer"/></a>
                </>:<></>}
                {x==2?<>
                <a href="/AcceptEventsOrganizer"><ButtonOrg text="Requests"/></a>
                <a href="/eventsinprogress"><ButtonOrg text="Events In Progress"/></a>
                <a href="/eventsComplete"><ButtonOrg text="Events Completed"/></a>
                </>:<></>}
                {x==3?<>
                {/* <a href="/profile"><ButtonCust text="View Profile"/></a> */}
                <a href="/createEventCustomer"><ButtonCust text="Create Event"/></a>
                <a href="/AcceptEventCustomer"><ButtonCust text="Your Requests"/></a>
                <a href="/eventsinprogress"><ButtonCust text="Events In Progress"/></a>
                <a href="/eventsComplete"><ButtonCust text="Events Completed"/></a>

                
                </>:<></>}

                </div>
            </div>
            <div className="features-container">
                <div className='features'>
                    <div>
                        <FontAwesomeIcon icon={faCircleCheck} className="icons" size="2x" />
                        <h2>We make it Facile</h2>
                        Gives you an easy way to organize your events being in the comfort of your home with the Industry experts 
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faHandshake} className="icons" size="2x" />
                        <h2>Customer Friendly</h2>
                        Plan and organize events with attention to financial and time constraints
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBusinessTime} className="icons" size="2x" />
                        <h2>Systematic Updates</h2>
                        Offer solutions to resolve problems in a timely manner and
                        Evaluate event's success and submit reports
                    </div>
                </div>
            </div>
            <div className='image'>
                <img src="http://localhost:3000/images/events.jpg" alt='img' ></img>
                <div className='imageContent'>
                    "Our expertise in event management has reached a global scale through innovative experiences. We continue to be trusted event planning partners for many people."<br/><br/>
                    <div className='certificate'>
                        A trusted site with more than hundreds of Organizers certified from renowed institutions.<br/><br/>
                        <img src="http://localhost:3000/images/cert-1.png" alt='img'></img>
                        <img src="http://localhost:3000/images/cert-2.png" alt='img'></img>
                        <img src="http://localhost:3000/images/cert-3.png" alt='img'></img>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                Gallery 
                <div className='galleryInDiv'>
                    <div><img src="http://localhost:3000/images/img1.jpeg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img2.jpg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img3.jpg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img4.jpeg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img5.jpg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img6.jpg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img7.jpg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img8.jpg" alt="gallery-img"></img></div>
                    <div><img src="http://localhost:3000/images/img9.jpg" alt="gallery-img"></img></div>
                </div>
            </div>
            <Footer/>
            
        </div>
    );
}

export default Landing;