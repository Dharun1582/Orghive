import React, { useEffect, useState } from 'react'
import styles from "./progressOrganizer.module.css"
import { useParams } from 'react-router-dom'
import { apiProgressCustomer,apiAddProgressOrganizer } from '../../auth/auth';
import Navbar from '../../components/Navbar/Navbar';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import Footer from '../../components/Footer/Footer';

function Progressitem(props) {

    return (
    <>
    
    <div className={`${styles.card}`}>
        <div className={`${styles.container}`} >
            <h3>{props.msg}</h3><br />
            <span className={`${styles.subhead}`}>DATE : </span>{props.date}<br />
            <span className={`${styles.subhead}`}>TIME : </span>{props.time}<br />
        </div>
 

    </div>
    </>
    )
}

function Progress(props){
    var arr=props.pdata;
    // console.log(arr);

    var newarr=arr.map((item,i) => {
        return <><Progressitem msg={item.MSG} date={item.CREATEDAT.slice(0,10)} time={item.CREATEDAT.slice(11,19)} /><br/></>
    })
    return(
        newarr
    )
}

function ProgressOrganizer() {
    let { eventid } = useParams();
    const [pdata,setpdata]=useState([]);
    const [showprog,setshowprog]=useState(false);
    const [addprogress,setaddprogress]=useState("");
    const [afteraddchange,setafteraddchange]=useState(false);
    useEffect(() => {
        apiProgressCustomer({eventid:eventid}).then((data) => {
            // console.log(data);
            setpdata(data);
            setshowprog(true);
        })
    },[afteraddchange])

    function handleprog(event){
        setaddprogress(event.target.value);
    }

    const submitprog = async () => {
        if(addprogress==""){
            Store.addNotification({...toastNotification,message:'Please enter a valid value'});
            return;
        }
        const res=await apiAddProgressOrganizer({eventid:eventid,addprogress:addprogress});
        setafteraddchange(!afteraddchange);
        Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})

    }

  return (
    <>
        <div className={`${styles.headerPC}`}>
            <Navbar />
            <h1>EVENT ID : {eventid}</h1>
        </div>
        <div className="stars_1"></div>
        <div className="stars_2"></div>
        <div className="stars_3"></div>
        <br /><br />

        <textarea className={`${styles.txtar}`}  value={addprogress} onChange={handleprog} /><br />
        <input className={`${styles.bo}`} type='button' value='Add Progress' onClick={submitprog} /><br />

        <br />
        {showprog?<Progress pdata={pdata.data} />:<></>}
        <br /><br />
        <Footer />
    </>      
  )
}

export default ProgressOrganizer