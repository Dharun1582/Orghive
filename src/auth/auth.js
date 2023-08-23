import axios from 'axios';

const api =axios.create({
    baseURL: "http://localhost:3001"
});

export const apiSignUpCustomer = async (SignUpCustomerData) => {
    try {
      const response = await api.post("SignUpCustomer", SignUpCustomerData);
      return response;
    } 
    catch (error) {
      return error.response;
    }
};

export const apiLoginCustomer = async (loginCustomerData) => {
    try{
        const response=await api.post("loginCustomer",loginCustomerData);
        return response;
    }
    catch(error){
        return error.response;
    }
};

export const apiSignUpOrganizer = async (SignUpOrganizerData) => {
  try {
    const response = await api.post("SignUpOrganizer", SignUpOrganizerData);
    return response;
  } 
  catch (error) {
    return error.response;
  }
};
 
export const apiLoginOrganizer = async (loginOrganizerData) => {
  try{
      const response=await api.post("loginOrganizer",loginOrganizerData);
      return response;
  }
  catch(error){
      return error.response;
  }
};

export const apiCreateEventCustomer = async (eventdata)=>{
  try{
    const response=await api.post('createEventCustomer',eventdata);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiGetOrganizerDataCreateEventCustomer=async (eventname) =>{
  try{
    const response=await api.post('getOrganizerDataCreateEventCustomer',{eventname:eventname});
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiGetCustomerProfile=async (username) => {
  try{
    const response=await api.post('getCustomerProfile',username);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiGetOrganizerProfile=async (orgid) => {
  try{
    const response=await api.post('getOrganizerProfile',orgid);
    // console.log(response);
    return response;
  }
  catch(error){
    return error.response;
  }
}
export const apiGetEventDetails=async (orgid) => {
  try{
    const response=await api.post('getEventDetails',orgid);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiAddWallet=async (amount) => {
  try{

    const response =await api.post('addWallet',amount);
    // console.log('asd');

    // console.log(response);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiDeleteReqOrg = async (eventid) => {
  try{
    const response=await api.post('deleteReqOrg',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiProgressCustomer = async (eventid) => {

  try{
    const response=await api.post('progressCustomer',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }

}


export const apiAddProgressOrganizer = async (data) => {
  try{
    const response=await api.post('addProgressOrganizer',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}
export const apiEventDetail = async (eventid) => {
  try{
    const response=await api.post('eventDetail',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }
}


export const apiEventsInProgressCustomer = async (data) => {
  try{
    const response=await api.post('eventsInProgressCustomer',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiAcceptReqOrg = async (eventid) => {
  try{
    const response=await api.post('acceptReqOrg',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiEventsCompleteCustomer = async (data) => {
  try{
    const response=await api.post('eventsCompleteCustomer',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiEventReqDetail = async (usr) => {
  try{
    const response=await api.post('eventReqDetail',usr);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiEventsInProgressOrganizer = async (data) => {
  try{
    const response=await api.post('eventsInProgressOrganizer',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}
export const apiEventOrgDetail = async (usr) => {
  try{
    const response=await api.post('eventOrgDetail',usr);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiEventsCompleteOrganizer = async (data) => {
  try{
    const response=await api.post('eventsCompleteOrganizer',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}
export const apiDeleteReqCust = async (eventid) => {
  try{
    const response=await api.post('deleteReqCust',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiAcceptReqCust = async (eventid) => {
  try{
    const response=await api.post('acceptReqCust',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiGetToDate =async (eventid) => {
  try{
    const response=await api.post('getToDate',eventid);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiMakePayment = async(amt) => {
  try{
    const response =await api.post('makePayment',amt);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiSendMailCust = async(data) => {
  try{
    const response =await api.post('sendMailCust',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiUpdatePwCust = async(data) => {
  try{
    const response =await api.post('updatePwCust',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiSendMailOrg = async(data) => {
  try{
    const response =await api.post('sendMailOrg',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiUpdatePwOrg = async(data) => {
  try{
    const response =await api.post('updatePwOrg',data);
    return response;
  }
  catch(error){
    return error.response;
  }
}