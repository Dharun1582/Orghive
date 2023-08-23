import React from "react";
import styles from "./ButtonOrg.modules.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

function ButtonOrg(props){
        return (
        <button className="button-org" onClick={props.func}><FontAwesomeIcon icon={faUserTie} className="icon"/>{props.text}</button>
        );
}
export default ButtonOrg;