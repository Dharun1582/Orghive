import React, { useEffect, useState } from 'react';
import styles from "./ProfileCustomer.module.css";
import { apiGetCustomerProfile, apiAddWallet } from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import ButtonCust from "../../components/Button/ButtonCust";
import Footer from '../../components/Footer/Footer';


function Prof(data) {
  let navigate = useNavigate();
  const [amt, setamt] = useState(0);

  function handleChange(event) {
    setamt(event.target.value);
  }

  const submit = async () => {
    const res = await apiAddWallet({ amt: amt, username: data.USERNAME });
    //  console.log(res);
    if (res.status >= 200 && res.status <= 299) {
      Store.addNotification({ ...toastNotification, message: res.data.message, type: res.data.flag });
      // navigate('/profile');
      data.setx(data.x + 1);
      // window.location='/profile';
    }
  }

  return (
    <div>
    <div style={{position:"relative",zIndex:'1'}}>
    <Navbar/>
    </div>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
    <div className={`${styles.card}`}>
      <h1 className={`${styles.head}`}>PROFILE</h1>
      <div className={`${styles.content}`} >
        <table className={`${styles.table}`}>
          <tr>
            <td>USERNAME</td>
            <td>: {data.USERNAME}</td>
          </tr>
          <tr>
            <td>FIRST NAME</td>
            <td>: {data.FIRSTNAME}</td>
          </tr>
          <tr>
            <td>LAST NAME</td>
            <td>: {data.LASTNAME}</td>
          </tr>
          <tr>
            <td>PHONE</td>
            <td>: {data.PHONE}</td>
          </tr>
          <tr>
            <td>EMAIL</td>
            <td>: {data.EMAIL}</td>
          </tr>
          <tr>
            <td>AADHAR</td>
            <td>: {data.AADHAR}</td>
          </tr>
          <tr>
            <td>DATE OF BIRTH</td>
            <td>: {data.DOB.slice(0, 10)}</td>
          </tr>
          <tr>
            <td>ADDRESS</td>
            <td>: {data.ADDRESS}</td>
          </tr>
          <tr>
            <td>WALLET BALANCE</td>
            <td>: Rs. {data.WALLET}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{textAlign:'center'}}>Add Amount to wallet : <br/><br/><input className={`${styles.inputfields}`} value={amt} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td colSpan={2} style={{textAlign:'center'}}><ButtonCust type='button' func={submit} text='Add to wallet' /></td>
          </tr>
        </table>
      </div>
      </div>
      <Footer/>
    </div>
  )
}



function Profile() {
  const [gotdata, setgotdata] = useState(false);
  const [data, setdata] = useState({});
  const [x, setx] = useState(0);
  // const [addamount,setaddamount]=useState(0);

  // function handleChange(){
  //   // setaddamount(event.target.value);
  //   console.log('add');
  // }

  useEffect(() => {
    const username = localStorage.getItem('userName');
    apiGetCustomerProfile({ username: username }).then((data) => {
      // console.log(data.data);
      setdata(data.data);
      setgotdata(true);
    })
  }, [x])




  return (
    // <>anjadncjakn</>
    <div>
      {gotdata ? <Prof x={x} setx={setx} USERNAME={data.USERNAME} FIRSTNAME={data.FIRSTNAME} LASTNAME={data.LASTNAME} PHONE={data.PHONE} EMAIL={data.EMAIL} AADHAR={data.AADHAR} DOB={data.DOB} ADDRESS={data.ADDRESS} WALLET={data.WALLET} /> : <></>}
    </div>
  )
}

export default Profile