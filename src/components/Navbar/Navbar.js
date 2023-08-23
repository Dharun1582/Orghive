import React, { useEffect } from "react"
import { useState } from "react";
import styles from "./Navbar.modules.css"
import {useNavigate} from 'react-router-dom';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';

export default function Navbar(props) {
    let navigate=useNavigate();
    const [x,setx]=useState(false)
    useEffect(() => {
      // console.log(localStorage.getItem('loginState'))
      if(localStorage.getItem('loginState')==1){
        setx(false);
      }else{
        setx(true);
      }
      // console.log(x);
    },[])

    const logout = async () => {
      console.log('skcjb');
      localStorage.clear();
      localStorage.setItem('loginState',1);
      Store.addNotification({...toastNotification,message:'Logged Out Successfully',type:'success'});
      setx(!x)
      props.sety(1);
      navigate('/')
    }

    const [ isExpanded , setIsExpanded ] = useState(false);
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          <img src="../images/org-logo.png" alt='logo'/>
        </a>
        <button className="hamburger" 
        onClick={()=>{
              setIsExpanded(!isExpanded);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={(isExpanded)?"navigation-menu expanded":"navigation-menu"}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="mailto:orghive@gmail.com">Contact</a>
            </li>
            {x?<li><a href="/profile">Profile</a></li>:<></>}
            {x?<li onClick={logout}><a>Logout</a></li>:<></>}
          </ul>
        </div>
      </nav>
    );
  }