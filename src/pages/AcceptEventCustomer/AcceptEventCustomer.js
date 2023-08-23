import { React , useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './AcceptEventCustomer.modules.css';
import { apiEventReqDetail } from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

var username = localStorage.getItem('userName');

function AcceptEventCustomer() {
    let navigate = useNavigate();
    var data = {USERNAME:username};
    const [ eventAvl , setEventAvl ] = useState(false);
    const [ eventData , setEventData ] = useState([]);

    useEffect(()=>{
        apiEventReqDetail(data).then((res)=>{
            if (res.status >= 200 && res.status <= 299) {
                setEventAvl(true);
                setEventData(res.data);
                // console.log(res.data);
            }
            else {
                Store.addNotification({ ...toastNotification, message: 'No events added!', type:"danger"});
                setEventAvl(false);
            }
        });    
    },[]);

    return (
        <div>
            <div className="headerAE">
                <Navbar /><br/>
                <h2>Hello {username}!</h2>
                <h1>Event Requests to be accepted</h1>
            </div>
            <div className="stars_1"></div>
            <div className="stars_2"></div>
            <div className="stars_3"></div>
            <div className={(eventAvl)?"eventCardHidden":"eventCard"}><h1>No event founds!</h1><br/>
            <button className="buttonAE" onClick={()=>navigate('/createEventCustomer')}>Add Event</button><br/></div>
            <div className='contentDiv'>
            {eventData.map((item,i)=>{
                return (eventAvl)?(
                <div className="eventCard">
                    <div style={{fontSize:"large",paddingLeft:10,paddingRight:10}}>
                        <div>Request from <b>{(item.ORGID)}</b></div>
                        <div>Proposal for your Event : <span style={{color:"#f51269"}}><b>{(item.EVENTNAME[0]).toUpperCase() + (item.EVENTNAME).slice(1)}</b></span> with Event-ID : <span style={{color:"#f51269"}}><b>{(item.EVENTID)}</b></span> has been accepted, with a proposed budget of Rs. <b>{(item.NEWBUDGET)}</b></div>
                        <div>Message from the Organizer : <b>{(item.REQDESCRIPTION)}</b></div>
                    </div><br/>
                    <button className="buttonAE" onClick={()=>navigate('/aec/'+item.ORGID+'$'+item.EVENTID)}>Show Details</button><br/>
                </div>
                ):<></>;
            })}
            </div>
            <Footer/>
        </div>
  );
}

export default AcceptEventCustomer