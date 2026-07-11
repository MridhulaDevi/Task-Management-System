import {useEffect,useState} from "react";

import API from "../services/api";

import {connectWebSocket,disconnectWebSocket} from "../services/websocket";

export default function Notifications(){

const[notifications,setNotifications]=useState([]);

useEffect(()=>{

loadNotifications();

connectWebSocket(()=>{

loadNotifications();

});

return()=>disconnectWebSocket();

},[]);

const loadNotifications=async()=>{

const res=await API.get("notifications/");

setNotifications(res.data);

}

return(

<div style={{padding:"30px"}}>

<h1>Notifications</h1>

{

notifications.map((n)=>(

<div
key={n._id}
style={{
padding:"15px",
marginBottom:"15px",
border:"1px solid grey",
borderRadius:"10px"
}}
>

<h3>{n.title}</h3>

<p>{n.message}</p>

</div>

))

}

</div>

);

}