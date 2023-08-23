import React, { useEffect, useState } from 'react';
import { apiGetOrganizerProfile } from '../../auth/auth';
import styles from "./ProfileOrganizer.module.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Prof(data) {

  return (
    <>
      <div style={{ position: "relative", zIndex: '1' }}>
        <Navbar />
      </div>
      <div className={`${styles.stars_1}`}></div>
      <div className={`${styles.stars_2}`}></div>
      <div className={`${styles.stars_3}`}></div>
      <div className={`${styles.card}`}>
        <h1 className={`${styles.head}`}>PROFILE</h1>
        <div className={`${styles.content}`} >
          <table className={`${styles.table}`}>
            <tr>
              <td>ORGID</td>
              <td>: {data.ORGID}</td>
            </tr>
            <tr>
              <td>NAME</td>
              <td>: {data.NAME}</td>
            </tr>
            <tr>
              <td>MANAGER</td>
              <td>: {data.MANAGER}</td>
            </tr>
            <tr>
              <td>GSTIN</td>
              <td>: {data.GSTIN}</td>
            </tr>
            <tr>
              <td>CONTACT 1</td>
              <td>: {data.CONTACT1}</td>
            </tr>
            <tr>
              <td>CONTACT 2</td>
              <td>: {data.CONTACT2}</td>
            </tr>
            <tr>
              <td>EMAIL</td>
              <td>: {data.EMAIL}</td>
            </tr>
            <tr>
              <td>ADDRESS</td>
              <td>: {data.ADDRESS}</td>
            </tr>
            <tr>
              <td>RATING</td>
              <td>: {data.RATING}</td>
            </tr>

            <tr>
              <td>WALLET BALANCE</td>
              <td>: Rs. {data.WALLET}</td>
            </tr>
          </table>
        </div>
      </div><br/><br/><br/><br/><br/>
      <Footer />
    </>
  )
}





function Profile() {

  const [gotdata, setgotdata] = useState(false);
  const [data, setdata] = useState({});

  useEffect(() => {
    const orgid = localStorage.getItem('orgId');
    console.log(orgid)
    apiGetOrganizerProfile({ orgid: orgid }).then((data) => {
      console.log(data.data);
      setdata(data.data);
      setgotdata(true);

    })
  }, [])

  return (

    <>
      {gotdata ? <Prof ORGID={data.ORGID} NAME={data.NAME} MANAGER={data.MANAGER} CONTACT1={data.CONTACT1} CONTACT2={data.CONTACT2} EMAIL={data.EMAIL} GSTIN={data.GSTIN} RATING={data.RATING} ADDRESS={data.ADDRESS} WALLET={data.WALLET} /> : <></>}
    </>

  )
}

export default Profile