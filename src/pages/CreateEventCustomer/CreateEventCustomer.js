import React, { useEffect, useRef } from 'react';
import styles from "./CreateEventCustomer.module.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import { apiCreateEventCustomer, apiGetOrganizerDataCreateEventCustomer } from '../../auth/auth';
import cryptoRandomString from 'crypto-random-string';
import Navbar from '../../components/Navbar/Navbar';
import ButtonCust from '../../components/Button/ButtonCust'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';



function Organizer(props) {
  var rating = parseFloat(props.rating);
  const [isSent, setisSent] = React.useState(false);

  function addorg(orgid) {
    var arr = props.orgdata;
    arr.push({
      orgid: orgid,
      username: localStorage.getItem('userName')
    })
    props.setorgdata(arr);
    setisSent(!isSent)
  }

  async function removeorg(orgid) {
    var arr = props.orgdata;
    var newarr = arr.filter((orgd) => {
      return orgd.orgid != orgid
    })
    await props.setorgdata(newarr);
    setisSent(!isSent)

  }
  console.log(props.orgid+' looo');

  return (
    <div className={`${styles.cardOrg}`} >
      <h1 className={`${styles.head}`}>{props.name}</h1>
      <div className={`${styles.content}`}>
        <table className={`${styles.table}`}>
          <tr>
            <td>Organization ID</td>
            <td>: {props.orgid}</td>
          </tr>
          <tr>
            <td>Manager Name</td>
            <td>: {props.manager}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: {props.email}</td>
          </tr>
          <tr>
            <td>Contact-1</td>
            <td>: {props.contact1}</td>
          </tr>
          <tr>
            <td>Contact-2</td>
            <td>: {props.contact2 == '' ? 'NA' : props.contact2}</td>
          </tr>
          <tr>
            <td>Rating </td>
            <td>: {rating == 0.0 ? 'Not available' : rating}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center' }}><input type='button' className={`${styles.buttonAE}`} value={isSent ? 'Selected' : 'Select'} onClick={isSent ? () => removeorg(props.orgid) : () => addorg(props.orgid)}></input></td>
          </tr>
        </table>
      </div>
    </div>
  );
}



function Organizers(props) {
  const [orgcomp, setorgcomp] = React.useState([]);
  useEffect(() => {
    var x = props.eventname;
    apiGetOrganizerDataCreateEventCustomer(x).then((data) => {
      setorgcomp(data.data);
    }
    )
  }, [props.eventname]);
  var orgc = orgcomp.map((item, i) => {
    return <Organizer orgid={item.ORGID} name={item.NAME} manager={item.MANAGER} email={item.EMAIL} contact1={item.CONTACT1}
      contact2={item.CONTACT2} address={item.ADDRESS} rating={item.RATING} orgdata={props.orgdata} setorgdata={props.setorgdata} />
  })
  return (orgc);
};


function CreateEventCustomer() {
  const myRef = useRef(null);
  let navigate = useNavigate();
  const [orgdata, setorgdata] = React.useState([]);
  const [org, setorg] = React.useState(false);
  const [eventdata, seteventdata] = React.useState({
    eventID: "",
    username: localStorage.getItem('userName'),
    eventname: "",
    fromdate: null,
    todate: null,
    preferredlocation: "",
    budget: 0,
    food: false,
    description: ""
  });
  const [fromdate, setfromdate] = React.useState(null);
  const [todate, settodate] = React.useState(null);
  const [food, setfood] = React.useState(false);
  function handleChange(event) {
    setorg(false);
    seteventdata((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    });
  }

  function handlefromDate(event) {
    setorg(false);
    setfromdate(event);
  }
  function handletoDate(event) {
    setorg(false);
    settodate(event);
  }

  function handlefood(event) {
    setorg(false);
    setfood(!food);
  }

  function formvalidate(data) {
    if (data.eventname == "") {
      Store.addNotification({ ...toastNotification, message: 'Enter a valid event name' })
      return false;
    }
    if (data.fromdate == null) {
      Store.addNotification({ ...toastNotification, message: 'Enter a valid start date' })
      return false;
    }
    if (data.description == "") {
      Store.addNotification({ ...toastNotification, message: `Description can't be empty` })
      return false;
    }
    return true;
  }

  const onSubmit = async () => {

    var str = 'E' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
    var data = { ...eventdata, fromdate: fromdate, todate: todate, food: food, eventID: str }

    var x = formvalidate(data);
    if (x) {
      setorgdata([]);
      await setorg(true);
    };

  }

  const submitpage = async () => {
    const data = { ...eventdata, fromdate: fromdate, todate: todate, food: food, eventID: 'E' + cryptoRandomString({ length: 6, type: 'alphanumeric' }), orgdata: orgdata };
    const res = await apiCreateEventCustomer(data);
    console.log(res);
    if (res.status >= 200 && res.status <= 299) {
      Store.addNotification({ ...toastNotification, message: res.data.message, type: res.data.flag });
      navigate('/');
    } else {
      Store.addNotification({ ...toastNotification, message: 'Error..' });
    }
  }


  return (
    <>
      <div style={{ position: "relative", zIndex: '1' }}>
        <Navbar />
      </div>
      <div className={`${styles.outercard}`}>
        <div className={`${styles.stars_1}`}></div>
        <div className={`${styles.stars_2}`}></div>
        <div className={`${styles.stars_3}`}></div>
        <div className={`${styles.card}`}>
          <h1 className={`${styles.head}`}>POST EVENT</h1>
          <div className={`${styles.content}`} >
            <label>Event Name : *<br /><br />
              <select name="eventname" onChange={handleChange} className={`${styles.inputfields2}`}>
                <option value=""> -</option>
                <option value="birthday"> Birthday</option>
                <option value="wedding"> Wedding</option>
                <option value="party"> Party</option>
                <option value="official"> Official</option>
                <option value="culturals"> Culturals</option>
                <option value="conferences"> Conferences</option>
                <option value="exhibition"> Exhibition</option>
                <option value="openings"> Openings</option>
                <option value="promotion"> Promotion</option>
                <option value="launch"> Product Launch</option>
                <option value="musical"> Musical</option>
                <option value="tournaments"> Tournaments</option>
                <option value="stageshow"> Stageshow</option>
                <option value="political"> Political Gathering</option>
                <option value="others"> Others</option>

              </select>
            </label><br /><br />
            <label>Preferred Location : *  <br /><br /><input type='text' name='preferredlocation' onChange={handleChange} value={eventdata.preferredlocation} className={`${styles.inputfields}`} /></label><br />
            <br />
            <label>Event Description : * <br /><br /><textarea name='description' onChange={handleChange} value={eventdata.description} className={`${styles.inputfields}`} /></label><br /><br />
            <label>Budget : *  <br /><br /><input type="number" name="budget" onChange={handleChange} value={eventdata.budget} className={`${styles.inputfields}`} /></label><br /><br />
            <label>Start Date : *  <br /><br /><DatePicker selected={fromdate} name='fromdate' onChange={handlefromDate} className={`${styles.inputfields}`}
              dateFormat='dd/MM/yyyy'
              showYearDropdown
              scrollableMonthYearDropdown
              //  popperContainer={CalendarContainer}
              popperPlacement='top'
            /></label><br /><br />

            <label>End Date :  <br /><br /><DatePicker selected={todate} name='todate' onChange={handletoDate} className={`${styles.inputfields}`}
              dateFormat='dd/MM/yyyy'

              showYearDropdown
              scrollableMonthYearDropdown
              //  popperContainer={CalendarContainer}
              popperPlacement='top'
              isClearable
            /></label><br /><br />
            <label className={`${styles.container}`}>Food Required : *  <input type='checkbox' name="food" onChange={handlefood} checked={food} /><span className={`${styles.mark}`}></span></label><br /><br />
            <ButtonCust text='Show Organizers' func={onSubmit} /><br />

          </div>
          <div style={{ color: "white" }}><br />Fields with * are to be filled compulsorily.<br /></div>
        </div>
        <div ref={myRef}>
          {org ? <div><h2 style={{color:"white"}}>Organizers Available :</h2>
          <Organizers eventname={eventdata.eventname} orgdata={orgdata} setorgdata={setorgdata} /></div> : <div style={{color:"white",fontSize:"larger"}}>No organizers available!</div>}
        </div>
        <br />
        {org ? <div style={{marginBottom:30}}><ButtonCust text='Submit' func={submitpage} /></div> : <></>}
        <Footer />

      </div>
    </>
  )
}

export default CreateEventCustomer