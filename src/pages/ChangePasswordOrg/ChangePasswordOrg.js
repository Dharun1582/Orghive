import React from 'react';
import { useState } from "react";
import styles from "../ChangePasswordCust/ChangePasswordCust.module.css";
import { apiUpdatePwOrg } from "../../auth/auth";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import ButtonOrg from '../../components/Button/ButtonOrg';
import {useNavigate} from 'react-router-dom';


function ChangePasswordOrg() {
    var navigate = useNavigate();
    let email = localStorage.getItem("ChnEmail");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const passwordchange = async () => {
        if (newPassword==reNewPassword) {
            var data = { email: email, password: newPassword };
            const res=await apiUpdatePwOrg(data);
            if (res.status >= 200 && res.status <= 299) {
                Store.addNotification({ ...toastNotification, message: res.data.message, type: res.data.flag });
                navigate('/loginOrganizer');
            }
            else {
                Store.addNotification({ ...toastNotification, message: res.data.message, type: res.data.flag })
            }
        }
        else {
            Store.addNotification({ ...toastNotification, message: "Passwords do no match!", type: "danger" })
        }

    }
      
  return (
    <div>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
      <div className={`${styles.card}`}>

        <h1 className={`${styles.head}`}>Update Password</h1>
        <div className={`${styles.content}`}>
          <label>Enter New Password : <br /><br /><input type='text' onChange={(event)=>{setNewPassword(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <label>Re-Enter Password : <br /><br /><input type='password' onChange={(event)=>{setReNewPassword(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <ButtonOrg text='Update' func={passwordchange} /><br/><br/>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordOrg;