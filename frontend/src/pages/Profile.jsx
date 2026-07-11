export default function Profile(){

const user=JSON.parse(localStorage.getItem("user"));

return(

<div style={{padding:"40px"}}>

<h1>Profile</h1>

<hr/>

<h2>{user.name}</h2>

<p>{user.email}</p>

<p>{user.role}</p>

<button
onClick={()=>{

localStorage.clear();

window.location="/";

}}
>

Logout

</button>

</div>

);

}