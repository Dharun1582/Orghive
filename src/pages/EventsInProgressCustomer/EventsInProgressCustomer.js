import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiEventsInProgressCustomer } from "../../auth/auth";
import Navbar from '../../components/Navbar/Navbar';
import styles from "./EventsInProgressCustomer.module.css"
import Footer from '../../components/Footer/Footer';


function Epcitem(props) {
    let navigate=useNavigate();
    function redir (eventid){
        navigate('/progress/'+eventid);
    }
    var flag=props.todate==null?true:false;
    var sd=props.startdate.toString().slice(0,10);
    var x;
    x=flag?'':props.todate.toString().slice(0,10);
    return (
    <div className={`${styles.card}`} onClick={()=>redir(props.eventid)} >
        <div className={`${styles.container}`} >
            <h3>{props.eventname.toUpperCase()}</h3><br />
            <span className={`${styles.subhead}`}>Event Id : </span>{props.eventid}<br />
            <span className={`${styles.subhead}`}>Organizer Name : </span>{props.orgname}<br />
            <span className={`${styles.subhead}`}>Description : </span>{props.description}<br />
            <span className={`${styles.subhead}`}>{flag?<>Date : </>:<>FromDate : </>}</span>{sd}<br />
            {flag?<></>:<><span className={`${styles.subhead}`}>ToDate : </span>{x}<br /></>}

        </div>
 

    </div>
    )
}

function Epc(props){
    var arr=props.epcdata;
    var newarr=arr.map((item,i) => {
        return <><Epcitem  eventname={item.EVENTNAME} eventid={item.EVENTID} orgname={item.NAME} description={item.DESCRIPTION}
                            startdate={item.FROMDATE} todate={item.TODATE}
        /><br/></>
    })
    return(
        newarr
    )
}


function EventsinProgressCustomer(){
    const username=localStorage.getItem('userName');
    const [epcdata,setepcdata]=useState([]);
    const [showepc,setshowepc]=useState(false);
    useEffect(()=>{
        console.log(username);
        apiEventsInProgressCustomer({username:username}).then((data)=>{
            setepcdata(data.data.data);
            if ((data.data.data).length>0){
                setshowepc(true);
            }
        })
    },[])

    return (
        <>
        <div className={`${styles.headerEPC}`}>
            <Navbar />
            <h1>Events In Progress</h1>
        </div>
        <div className={`${styles.stars_1}`}></div>
        <div className={`${styles.stars_2}`}></div>
        <div className={`${styles.stars_3}`}></div>
        <br /><br />
        {showepc?<Epc epcdata={epcdata}/>:<div className="eventCard"><h1>No event in progress :)</h1></div>}

        <Footer />
        </>  
    )
}
export default EventsinProgressCustomer;
