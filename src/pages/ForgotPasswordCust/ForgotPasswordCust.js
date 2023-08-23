import React from 'react';
import { useState } from "react";
import styles from "./ForgotPasswordCust.module.css";
import {apiSendMailCust}  from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import {useNavigate} from 'react-router-dom';

function ForgotPasswordCust() {
    var navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [code,setCode]=useState(Math.floor(1000 + Math.random() * 9000));
    const [codeEntered,setCodeEntered]=useState("");
    const [isMailSent,setIsMailSent]=useState(false);
    const codecheck = () =>{
      if(code==codeEntered)
      {
        localStorage.clear();
        localStorage.setItem("ChnEmail",email);
        navigate('/ChangePasswordCust');
      }
      else
      {
        Store.addNotification({...toastNotification,message:"Codes do not match!",type:"danger"})
        console.log('Error');
      }
    }
    const sendemail = async () =>{
        var data={email:email,code:code};
        const res=await apiSendMailCust(data);
        if(res.status>=200 && res.status<=299){
            Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag});
            setIsMailSent(true);
        }
        else{
          Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag}) 
        }
    }
  return (
    <div>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
      <div className={`${styles.card}`}>

        <h1 className={`${styles.head}`}>Forgot Password</h1>
        <div className={`${styles.content}`}>
          <label>Enter Email : <br /><br /><input type='text' onChange={(event)=>{setEmail(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <ButtonCust text='Send Mail' func={sendemail} /><br/><br/>
          {(isMailSent)?<div>
          <label>Enter the Code : <br /><br /><input type='password' onChange={(event)=>{setCodeEntered(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <ButtonCust text='Verify Code' func={codecheck} /><br/><br/>
          </div>:<></>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordCust;