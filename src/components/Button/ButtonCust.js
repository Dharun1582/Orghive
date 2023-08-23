import React from "react";
import styles from "./ButtonCust.modules.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

function ButtonCust(props){
        return (
        <button className="button-cust" onClick={props.func}><FontAwesomeIcon icon={faAddressCard} className="icon"/>{props.text}</button>
        );
}
export default ButtonCust;