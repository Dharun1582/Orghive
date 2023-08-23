import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiEventsCompleteCustomer } from "../../auth/auth";
import Navbar from '../../components/Navbar/Navbar';
import styles from "./EventsCompleteCustomer.module.css"
import Footer from '../../components/Footer/Footer';


function Eccitem(props) {
    let navigate=useNavigate();

    var x=false;
    if(props.tdate){
        var t=props.tdate;
        t=t.slice(0,10);
        x=true;
    }
    var s=props.fdate;
    s=s.slice(0,10);

    return (
    <div className={`${styles.card}`} >
        <div className={`${styles.container}`} >
            <h3>{props.eventname.toUpperCase()}</h3><br />
            <span className={`${styles.subhead}`}>Event Id : </span>{props.eventid}<br />
            <span className={`${styles.subhead}`}>Organizer Name : </span>{props.orgname}<br />
            {/* <span className={`${styles.subhead}`}>Description : </span>{props.description}<br /> */}

            <span className={`${styles.subhead}`}>{x?<>Start Date : </>:<>Date : </>} </span>{s}<br />
            
            {x?<><span className={`${styles.subhead}`}>To Date : </span>{t}<br /></>:<></>}
            <span className={`${styles.subhead}`}>Amount Paid : </span>{props.amtpaid}<br />

        </div>
 

    </div>
    )
}

function Ecc(props){
    var arr=props.eccdata;
    var newarr=arr.map((item,i) => {
        return <><Eccitem  eventname={item.EVENTNAME} eventid={item.EVENTID} orgname={item.NAME} description={item.DESCRIPTION}
                            amtpaid={item.BUDGET} fdate={item.FROMDATE} tdate={item.TODATE}
        /><br/></>
    })
    return(
        newarr
    )
}


function EventsCompleteCustomer(){
    const username=localStorage.getItem('userName');
    const [eccdata,seteccdata]=useState([]);
    const [showecc,setshowecc]=useState(false);
    
    useEffect(()=>{
        console.log(username);
        apiEventsCompleteCustomer({username:username}).then((data)=>{
            console.log(data.data.data);
            seteccdata(data.data.data);
            if ((data.data.data).length>0){
                setshowecc(true);
            }
        })
    },[])

    return (
        <>
        <div className={`${styles.headerEPC}`}>
            <Navbar />
            <h1>Events Completed</h1>
        </div>
        <div className="stars_1"></div>
        <div className="stars_2"></div>
        <div className="stars_3"></div>
        <br /><br />
        {showecc?<Ecc eccdata={eccdata}/>:<div className="eventCard"><h1>No Completed Event :)</h1></div>}
        <Footer/>
        
        </>  
    )
}
export default EventsCompleteCustomer;
