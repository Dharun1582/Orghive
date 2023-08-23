import React from "react"
import styles from "./Footer.modules.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return(
    <div className='Lfoot'>
        We are always there to serve you with love.<br /><br />
        <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} className="footerIcon" size="1.5x" /></a>
        <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} className="footerIcon" size="1.5x" /></a>
        <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} className="footerIcon" size="1.5x" /></a>
        <a href="mailto:customercare@orghive.org"><FontAwesomeIcon icon={faEnvelope} className="footerIcon" size="1.5x" /></a><br /><br />
        <div style={{ fontSize: '15px' }}>Ⓒ Copyright : OrgHive Inc. 2022</div>
    </div>
    );
}

export default Footer;