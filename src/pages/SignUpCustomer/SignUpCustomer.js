import React from 'react';
import styles from "./SignUpCustomer.module.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import { apiSignUpCustomer } from '../../auth/auth';
import {useNavigate} from 'react-router-dom'
import ButtonCust from '../../components/Button/ButtonCust'
// import { Portal } from "react-overlays";

// const CalendarContainer = ({ children }) => {
//   const el = document.getElementById("calendar-portal");

//   return <Portal container={el}>{children}</Portal>;
// };

function SignUpCustomer() {
    // console.log("sldc")
    let navigate=useNavigate();
    const [signUpCustomerData,setSignUpCustomerData]=React.useState({
        firstName:"",
        lastName:"",
        userName:"",
        address:"",
        phone:"",
        email:"",
        dob:null,
        aadhar:"",
        password:""
    })

    const [dob,setdob]=React.useState(null);

    function handleChange(event){
        setSignUpCustomerData((prevData)=>{
            return{
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }

    function handleDate(event){
        setdob(event);
        console.log(event);
    }

    function formvalidate(data){
        var firstName=/^[A-Za-z]+$/;   //alpha characters without space and min 1 char
        var lastName=/^[A-Za-z]+$/;    //alpha characters without space and min 1 char
        var userName=/^[A-Za-z][A-Za-z0-9_]{7,29}$/;  //start with alpha,min 8 char,alphanum and _
        var address=/[A-Za-z0-9'\.\-\s\,]/;
        var phone=/[1-9]{1}[0-9]{9}/;  //10 digits
        var email=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        var aadhar=/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
        
        for(let key in data){
            console.log(key+" "+data[key]);
            switch(key){
                case "firstName":
                    if(!firstName.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "lastName":
                    if(!lastName.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "userName":
                    if(!userName.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "address":
                    if(!address.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "phone":
                    if(!phone.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "email":
                    if(!email.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "dob":
                    if(data[key]==null){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "aadhar":
                    if(!aadhar.test(data[key])){
                        Store.addNotification({...toastNotification,message:'Enter a valid '+key,flag:'danger'})
                        return false;
                    }
                    break;
                case "password":
                    if(data[key].length<8){
                        Store.addNotification({...toastNotification,message:'Password should be atleast 8 characters long',flag:'danger'})
                        return false;
                    }
                    break;
            }
        }
        return true;
    }

    const onSubmit= async() => {
        var data={...signUpCustomerData,dob:dob}
        console.log(data);
        var x=formvalidate(data);
        console.log(x);
        if(x){
            const res=await apiSignUpCustomer(data);
            console.log(res);
            if(res.status>=200 && res.status<=299){
                navigate('/');
            }
            Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})
            console.log(res.data);
        //   res.redirect('/loginCustomer')
        };
    }

  return (
    <div>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
    <div className={`${styles.card}`}>
    <div className={`${styles.cardchild}`}>
            <h1 className={`${styles.head}`}>SIGN UP</h1>
            <div className={`${styles.content}`}>
                <label>First Name :<br/><br/> <input type='text' name='firstName' onChange={handleChange} value={signUpCustomerData.firstName} className={`${styles.inputfields}`} /></label><br/><br/>
                <label>Last Name: <br/><br/><input type='text' name='lastName' onChange={handleChange} value={signUpCustomerData.lastName} className={`${styles.inputfields}`}/></label><br/><br/>
                <label>User Name: <br/><br/> <input type='text' name='userName' onChange={handleChange} value={signUpCustomerData.userName} className={`${styles.inputfields}`}/></label><br/><br/>
                <label>Address : <br/><br/><textarea name='address' onChange={handleChange} value={signUpCustomerData.address} className={`${styles.inputfields}`}/></label><br/><br/>
                <label>Contact Number: <br/><br/> <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={handleChange} value={signUpCustomerData.phone} className={`${styles.inputfields}`}/></label><br/><br/>
                <label>Mail ID :<br/> <br/><input type='email' name="email" onChange={handleChange} value={signUpCustomerData.email} className={`${styles.inputfields}`}/></label><br/><br/>
                <label>DOB : <br/><br/><DatePicker selected={dob} name='dob' onChange={handleDate} className={`${styles.inputfields}`}
                                 dateFormat='dd/MM/yyyy'
                                 maxDate={new Date()}
                                 showYearDropdown
                                 scrollableMonthYearDropdown
                                //  popperContainer={CalendarContainer}
                                 popperPlacement='top'
            /></label><br/><br/>
            <label>Aadhar Number : <br/><br/><input type='text' name="aadhar" onChange={handleChange} value={signUpCustomerData.aadhar} className={`${styles.inputfields}`} /></label><br/><br/>
            <label>Password : <br/><br/><input type='password' name='password' onChange={handleChange} val={signUpCustomerData.password} className={`${styles.inputfields}`} /></label><br/><br/>
            <ButtonCust text='Sign Up' func={onSubmit} /><br/><br/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpCustomer