import React from 'react'
import styles from "./LoginCustomer.module.css"
import {apiLoginCustomer}  from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {useNavigate} from 'react-router-dom';
import ButtonCust from '../../components/Button/ButtonCust'

function Login() {
  let navigate=useNavigate();
  const [loginCustomerData,setLoginCustomerData]=React.useState({
    userName:"",
    password:""
  })

  function handleChange(event){
    setLoginCustomerData((prevData)=>{
        return{
            ...prevData,
            [event.target.name]:event.target.value
        }
    })
  }

  const onSubmit = async() =>{      
      var data=loginCustomerData;
      const res=await apiLoginCustomer(data);
      console.log(res.data);
      // console.log(res.status)
      if(res.status>=200 && res.status<=299){
        localStorage.clear();
        localStorage.setItem('userName',data.userName);
        localStorage.setItem('loginState',3);
        // window.location.href='/';
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
          <label>User Name : <br /><br /><input type='text' name='userName' onChange={handleChange} value={loginCustomerData.userName} className={`${styles.inputfields}`} /></label><br /><br />
          <label>Password : <br /><br /><input type='password' name='password' onChange={handleChange} value={loginCustomerData.password} className={`${styles.inputfields}`} /></label><br /><br />
          <ButtonCust text='Login' func={onSubmit} /><br/><br/>
          <a style={{color:"#1492cc",textDecoration:'none'}} href='/ForgotPasswordCust'>Forgot Password</a>
          <br/><br/>
          Don't have an account? <a style={{color:"#1492cc",textDecoration:'none'}} href='/SignUpCustomer'>Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default Login