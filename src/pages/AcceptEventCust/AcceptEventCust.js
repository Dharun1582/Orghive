import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AcceptEventCust.modules.css';
import { apiEventOrgDetail, apiDeleteReqCust, apiAcceptReqCust } from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

var username = localStorage.getItem('userName');

function AcceptEventOrg() {
    let navigate = useNavigate();
    let { urldata } = useParams();
    const orgId = urldata.slice(0, 10);
    const eventid = urldata.slice(11);
    const [events, setEvents] = useState([]);
    const [fetched, setFetched] = useState(false);

    var data = { EVENTID: eventid, ORGID: orgId };
    useEffect(() => {
        apiEventOrgDetail(data).then((res) => {
            if (res.status >= 200 && res.status <= 299) {
                setEvents(res.data);
                setFetched(true);
                console.log(res.data);
                // console.log(fetched);
                // console.log(events);
            }
            else {
                // console.log("hello");
            }
        });
    }, []);

    const acceptEvent = (async (evnt, usr, orgid) => {
        var evntdata = { USERNAME: usr, EVENTID: evnt, ORGID: orgid };
        const res = await apiAcceptReqCust(evntdata);
        if (res.status >= 200 && res.status <= 299) {
            Store.addNotification({ ...toastNotification, type: "success", message: "Request accepted" });
            navigate('/eventsinprogress');
        }
        else {
            Store.addNotification({ ...toastNotification, message: 'Error', flag: 'danger' });
        }
    });

    const rejectEvent = (async (evnt, org) => {
        var evntdata = { EVENTID: evnt, ORGID: org };
        const res = await apiDeleteReqCust(evntdata);
        if (res.status >= 200 && res.status <= 299) {
            Store.addNotification({ ...toastNotification, type: "success", message: "Request rejected" });
            navigate('/eventsinprogress');
        }
        else {
            Store.addNotification({ ...toastNotification, message: 'Error', flag: 'danger' });
        }
    });

    return (
        <div>
            <div className="headerA">
                <Navbar /><br />
                <h1>Event {eventid} : Organizer {orgId}</h1>
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
                                        <td>Organizer-ID :</td>
                                        <td>: {(item.ORGID).slice(0, 10)}</td>
                                    </tr>
                                    <tr>
                                        <td>Organizer Name</td>
                                        <td>: {(item.NAME).toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                        <td>Manager</td>
                                        <td>: {(item.MANAGER)}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>: {(item.EMAIL)}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact-1</td>
                                        <td>: {(item.CONTACT1)}</td>
                                    </tr>
                                    <tr>
                                        <td>Rating </td>
                                        <td>: 4.6</td>
                                    </tr>
                                    <tr>
                                        <td>Budget Proposed </td>
                                        <td>: {(item.NEWBUDGET)}</td>
                                    </tr>
                                </table>
                                </div>
                            <br />
                            <button className="buttonAE" onClick={() => acceptEvent(item.EVENTID, item.USERNAME, item.ORGID)}>Accept</button>
                            <button className="buttonAE" onClick={() => rejectEvent(item.EVENTID, item.ORGID)}>Reject</button>
                        </div>
                    </div>)
                    : (<></>)
            })};
            <Footer />
        </div>
    );
}

export default AcceptEventOrg;