import React from 'react'
import styles from "./LoginOrganizer.module.css"
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {useNavigate} from 'react-router-dom';
import ButtonOrg from "../../components/Button/ButtonOrg"
import { apiLoginOrganizer } from '../../auth/auth';

function Login() {
  let navigate=useNavigate();
  const [loginOrganizerData,setLoginOrganizerData]=React.useState({
    orgId:"",
    password:""
  })

  function handleChange(event){
    setLoginOrganizerData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }

  const onSubmit = async() =>{      
      var data=loginOrganizerData;
      // console.log(data);
      const res=await apiLoginOrganizer(data);
      if(res.status>=200 && res.status<=299){
        localStorage.clear();
        localStorage.setItem('orgId',data.orgId);
        localStorage.setItem('loginState',2);
        navigate('/');
      }
      Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})

  }

  return (
    <div>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
      <div className={`${styles.card}`}>
      <h1 className={`${styles.head}`}>LOGIN</h1>
        <div className={`${styles.content}`}>
        <label>Organizer-ID : <br/><br/><input type='text' name='orgId' onChange={handleChange} value={loginOrganizerData.orgId} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Password : <br/><br/><input type='password' name='password' onChange={handleChange} value={loginOrganizerData.password} className={`${styles.inputfields}`}/></label><br/><br/>
        <ButtonOrg text='Login' func={onSubmit} /><br/><br/>
        <a style={{color:"#f51269",textDecoration:'none'}} href='/ForgotPasswordOrg'>Forgot Password / Org. ID</a>
          <br/><br/>
          Don't have an account? <a style={{color:"#f51269",textDecoration:'none'}} href='/SignUpOrganizer'>Sign Up</a>
        </div>
      </div>
  </div>
  )
}

export default Login