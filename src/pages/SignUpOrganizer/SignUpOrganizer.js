import { React , useState } from 'react';
import styles from "./SignUpOrganizer.module.css";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { toastNotification } from "../../components/Notifications/toast";
import { apiSignUpOrganizer } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import cryptoRandomString from 'crypto-random-string';
import ButtonOrg from '../../components/Button/ButtonOrg';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function SignUpOrganizer() {
  var navigate = useNavigate();
  const [ signUpOrganizerData, setSignUpOrganizerData ] = useState({
      name:"",
      manager:"",
      contact1:"",
      contact2:"",
      email:"",
      address:"",
      gstin:"",
      password:""
  });
  const [ events , setEvents ] = useState({
    birthday:false,
    wedding:false,
    party:false,
    official:false,
    culturals:false,
    conferences:false,
    exhibition:false,
    openings:false,
    promotion:false,
    launch:false,
    musical:false,
    tournaments:false,
    stageshow:false,
    political:false,
    others:false
  });


  function handleChange(event){
    setSignUpOrganizerData((prevData)=>{
      return {
        ...prevData,
        [event.target.name]:event.target.value
      }
    });
  }
  function handleEvent(event){
      setEvents((prevData)=>{
        return {
          ...prevData,
          [event.target.name]:(event.target.checked)
        }
      });
  }

  function formValidate(data,eventData){
    var name=/[a-zA-Z]/;
    var manager=/[a-zA-Z]/;
    var contact1=/[1-9]{1}[0-9]{9}/;
    var contact2=/[1-9]{1}[0-9]{9}/;
    var email=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var address=/[a-zA-Z0-9'\.\-\s\,]/;
    var gstin=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/;

    for (let key in data){
      console.log(key+" "+data[key]);
      switch(key){
        case "name":
          if (!name.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "manager":
          if (!manager.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "contact1":
          if (!contact1.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "contact2":
          if (data.contact2!==""){
            if (!contact2.test(data[key])){
              Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
              return false;
            }
          }
          break;
        case "email":
          if (!email.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "address":
          if (!address.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "gstin":
          if (!gstin.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "password":
          if(data[key].length<8){
              Store.addNotification({...toastNotification,message:'Password should atleast be 8 characters long',flag:'danger'})
              return false;
          }
          break;
      }
    }
    var count=0;
    for (let key in eventData){
      if (eventData[key]) count++;
    }
    if (count===0){
      Store.addNotification({...toastNotification,message:'Select atleast one Event you organize!',flag:'danger'})
      return false;
    }
    return true;
  }

  const onSubmit = async () => {
    var data = {...signUpOrganizerData};
    var eventData = {...events};
    console.log(eventData);
    var x = formValidate(data,eventData);
    
    var orgID = 'ORG'+cryptoRandomString({length:5, type:'alphanumeric'})+cryptoRandomString({length:2, type:'numeric'});
    data = {...signUpOrganizerData,eventsdata:eventData,orgId : orgID};
    // console.log(data);
    if (x){
      const res = await apiSignUpOrganizer(data);
      if (res.status>=200 && res.status<=299){
        navigate('/');
        const options = {
          title: 'NOTE:',
          message: res.data.message+'\n\n\nPlease make note of the Organizer ID for future login!',
          buttons: [
            {
              label: 'Done',
              onClick: () => navigate('/')
            }
          ],
          closeOnEscape: true,
          closeOnClickOutside: true,
          keyCodeForClose: [8, 32],
          willUnmount: () => {},
          afterClose: () => {Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag,dismiss: {
            duration: 10000,
            onScreen: true
          }});},
          onClickOutside: () => {},
          onKeypress: () => {},
          onKeypressEscape: () => {},
          overlayClassName: "overlay-custom-class-name"
        };
        confirmAlert(options);
      }
      // console.log(res.data.message,+res.data.flag);
      // Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag,dismiss: {
      //   duration: 10000,
      //   onScreen: true
      // }});
    };  
  }

  return (
    <div>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
    <div className={`${styles.card}`} >
    <div className={`${styles.cardchild}`}>
      <h1 className={`${styles.head}`}>SIGN UP</h1>
        <div className={`${styles.content}`}>
        <label>Organization Name : <br/><br/><input type='text' name='name' onChange={handleChange} value={signUpOrganizerData.name} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Manager Name: <br/><br/><input type='text' name='manager' onChange={handleChange} value={signUpOrganizerData.manager} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Contact Number 1: <br/><br/><input type='text' name='contact1' onChange={handleChange} value={signUpOrganizerData.contact1} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Contact Number 2: <br/><br/><input type='text' name='contact2' onChange={handleChange} value={signUpOrganizerData.contact2} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Mail ID : <br/><br/><input type='email' name="email" onChange={handleChange} value={signUpOrganizerData.email} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>Address : <br/><br/><textarea name='address' onChange={handleChange} value={signUpOrganizerData.address} className={`${styles.inputfields}`}/></label><br/><br/>
        <label>GSTIN : <br/><br/><input type='text' name="gstin" onChange={handleChange} value={signUpOrganizerData.gstin} className={`${styles.inputfields}`} /></label><br/><br/>
        <label>Password : <br/><br/><input type='password' name='password' onChange={handleChange} value={signUpOrganizerData.password} className={`${styles.inputfields}`} /></label><br/><br/>
        <div className={`${styles.evnt}`}>
        <label>Events you organize: <br/><br/></label>
        <input type='checkbox' name="birthday" value={events.birthday} checked={events.birthday} onChange={handleEvent} />Birthday<br/>
        <input type='checkbox' name="wedding" value={events.wedding} checked={events.wedding} onChange={handleEvent} />Wedding<br/>
        <input type='checkbox' name="party" value={events.party} checked={events.party} onChange={handleEvent} />Parties<br/>
        <input type='checkbox' name="official" value={events.official} checked={events.official} onChange={handleEvent} />Official meetings<br/>
        <input type='checkbox' name="culturals" value={events.culturals} checked={events.culturals} onChange={handleEvent} />Culturals<br/>
        <input type='checkbox' name="conferences" value={events.conferences} checked={events.conferences} onChange={handleEvent} />Conferences<br/>
        <input type='checkbox' name="exhibition" value={events.exhibition} checked={events.exhibition} onChange={handleEvent} />Exhibitions<br/>
        <input type='checkbox' name="openings" value={events.openings} checked={events.openings} onChange={handleEvent} />Openings<br/>
        <input type='checkbox' name="promotion" value={events.promotion} checked={events.promotion} onChange={handleEvent} />Brand Promotions<br/>
        <input type='checkbox' name="launch" value={events.launch} checked={events.launch} onChange={handleEvent} />Product Launch<br/>
        <input type='checkbox' name="musical" value={events.musical} checked={events.musical} onChange={handleEvent} />Musical<br/>
        <input type='checkbox' name="tournaments" value={events.tournaments} checked={events.tournaments} onChange={handleEvent} />Sports Tournaments<br/>
        <input type='checkbox' name="stageshow" value={events.stageshow} checked={events.stageshow} onChange={handleEvent} />Stage Shows<br/>
        <input type='checkbox' name="political" value={events.political} checked={events.political} onChange={handleEvent} />Political Conventions<br/>
        <input type='checkbox' name="others" value={events.others} checked={events.others} onChange={handleEvent} />Others<br/><br/>
        </div>
        <ButtonOrg text='Sign Up' func={onSubmit} /><br/><br/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpOrganizer;