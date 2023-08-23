import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AcceptEventOrg.modules.css';
import { apiEventDetail, apiDeleteReqOrg, apiAcceptReqOrg } from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

const orgId = localStorage.getItem('orgId');

function AcceptEventOrg() {
    let navigate = useNavigate();
    let { eventid } = useParams();
    const [events, setEvents] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [newBudget, setBudget] = useState(0);
    const [description, setDescription] = useState("");

    var data = { EVENTID: eventid };
    useEffect(() => {
        apiEventDetail(data).then((res) => {
            if (res.status >= 200 && res.status <= 299) {
                setEvents(res.data);
                setFetched(true);
                console.log(res.data);
                console.log(fetched);
                console.log(events);
            }
            else {
                console.log("hello");
            }
        });
    }, []);

    function handleBudget(event) {
        setBudget(event.target.value);
    }
    function handleDescription(event) {
        setDescription(event.target.value);
    }
    const acceptEvent = (async (evnt, usr) => {
        var evntdata = { USERNAME: usr, EVENTID: evnt, ORGID: orgId, BUDGET: newBudget, DESCRIPTION: description };
        const res = await apiAcceptReqOrg(evntdata);
        if (res.status >= 200 && res.status <= 299) {
            Store.addNotification({ ...toastNotification, type: "success", message: "Request accepted" });
            navigate('/AcceptEventsOrganizer');
        }
        else {
            Store.addNotification({ ...toastNotification, message: 'Error', flag: 'danger' });
        }
    });

    const rejectEvent = (async (evnt) => {
        var evntdata = { EVENTID: evnt, ORGID: orgId };
        const res = await apiDeleteReqOrg(evntdata);
        if (res.status >= 200 && res.status <= 299) {
            Store.addNotification({ ...toastNotification, type: "success", message: "Request rejected" });
            navigate('/AcceptEventsOrganizer');
        }
        else {
            Store.addNotification({ ...toastNotification, message: 'Error', flag: 'danger' });
        }
    });

    return (
        <div>
            <div className="headerA">
                <Navbar /><br />
                <h1>Event {eventid}</h1>
            </div>
            <div className="stars_1"></div>
            <div className="stars_2"></div>
            <div className="stars_3"></div>
            {events.map((item) => {
                return (fetched) ? (
                    <div>
                        <div className="eventCardAE">
                            <div>
                                <table className="table">
                                    <tr>
                                        <td>Date</td>
                                        <td>: {(item.FROMDATE).slice(0, 10)}</td>
                                    </tr>
                                    <tr>
                                        <td>Event</td>
                                        <td>: {(item.EVENTNAME[0]).toUpperCase() + (item.EVENTNAME).slice(1)}</td>
                                    </tr>
                                    <tr>
                                        <td>Expected Budget</td>
                                        <td>: {(item.BUDGET)}</td>
                                    </tr>
                                    <tr>
                                        <td>Location</td>
                                        <td>: {(item.PREFERREDLOCATION)}</td>
                                    </tr>
                                    <tr>
                                        <td>Food Arrangements</td>
                                        <td>: {(item.FOODPREFERENCE) ? "Required" : "Not Required"}</td>
                                    </tr>
                                    <tr>
                                        <td>Customer</td>
                                        <td>: {(item.FIRSTNAME) + " " + (item.LASTNAME) + " (" + (item.USERNAME) + ")"}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact</td>
                                        <td>: {(item.PHONE)}</td>
                                    </tr>
                                </table>
                            </div><br/><h4>
                            Enter the Budget with which you can complete the event : <br /><br />
                            <input className="inputfields" type="number" name="newBudget" onChange={handleBudget}></input><br />
                            <br />Description<br /><br />
                            <textarea className="inputfields" name="description" onChange={handleDescription} />
                            <br /></h4>
                            <button className="buttonAE" onClick={() => acceptEvent(item.EVENTID, item.USERNAME)}>Accept</button>
                            <button className="buttonAE" onClick={() => rejectEvent(item.EVENTID)}>Reject</button>
                        </div>
                    </div>)
                    : (<></>)
            })};
            <Footer />
        </div>
    );
}

export default AcceptEventOrg;