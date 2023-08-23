import React, { useEffect, useState } from 'react'
import styles from "./progressCustomer.module.css"
import { Navigate, useParams,useNavigate } from 'react-router-dom'
import { apiProgressCustomer,apiGetToDate,apiMakePayment } from '../../auth/auth';
import Navbar from '../../components/Navbar/Navbar';
import ButtonCust from "../../components/Button/ButtonCust";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import Rate from '../../components/Rating/Rating';
import Footer from '../../components/Footer/Footer';


//--
// import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
var x=0;

const Rate = (props) => {
//   const [rate, setRate] = useState(0);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                props.setRate(givenRating);
                alert(`Are you sure you want to give ${givenRating} stars ?`);
                
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < props.rate || givenRating === props.rate
                    ? "rgb(255,255,0)"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};
  
//==



function Progressitem(props) {

    return (
    <div className={`${styles.card}`}>
        <div className={`${styles.container}`} >
            <h3>{props.msg}</h3><br />
            <span className={`${styles.subhead}`}>DATE : </span>{props.date}<br />
            <span className={`${styles.subhead}`}>TIME : </span>{props.time}<br />
        </div>
 

    </div>
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

function ProgressCustomer() {
    const [rate, setRate] = useState(0);
    const options = {
        title: 'Warning!!',
        message: 'Are you sure you want to proceed',
        buttons: [
          {
            label: 'Yes',
            onClick: () => makepayment()
          },
          {
            label: 'No',
            onClick: () => alert('Transaction Failed')
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
      };
    let { eventid } = useParams();
    const [pdata,setpdata]=useState([]);
    const [showprog,setshowprog]=useState(false);
    const [showpay,setshowpay]=useState(false);
    const [mkp,setmkp]=useState(0);
    let navigate=useNavigate();
    var date=new Date();

    // console.log(date.toISOString().slice(0,10));
    var curdate=date.toISOString().slice(0,10);
    var findate;
    useEffect(() => {
        apiGetToDate({eventid:eventid}).then((data)=>{
            console.log(data.data.findate);
            findate=data.data.findate.slice(0,10);
            console.log(findate);
            findate='2021-01-01';
            if(curdate>=findate){
                 setshowpay(true);
            }
        })
        apiProgressCustomer({eventid:eventid}).then((data) => {
            // console.log(data);
            setpdata(data);
            setshowprog(true);
        })
    },[])

    function handlemkp(event){
        setmkp(event.target.value);
    }

    const makepayment=async () => {
        // Window.confirm('asd');
        
        // alert('asdee');
        const result1=await apiMakePayment({amt:mkp,eventid:eventid,rating:rate});
        console.log(result1);
        Store.addNotification({...toastNotification,message:result1.data.message,type:result1.data.flag})
        if(result1.status>=200 && result1.status<=299){
            navigate('/eventsComplete');
            // window.print();

        }else{
            navigate('/profile');
        }
    }
    console.log(rate);
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
        {showprog?<Progress pdata={pdata.data} />:<>No messages received from the Organizer yet</>}
        <br/><br/>
        {showpay?<>
            <h2 className={`${styles.rat}`} >Rating :</h2><h4 style={{color:'white'}}>How was your experience? Please rate on a scale of 5!</h4><Rate rate={rate} setRate={setRate} />
            <input className={`${styles.bo}`} type='button' value='Make Payment' onClick={()=>confirmAlert(options)} />
        </>:<></>}
        <br /><br/><br />
        <Footer/>
    </>      
  )
}

export default ProgressCustomer