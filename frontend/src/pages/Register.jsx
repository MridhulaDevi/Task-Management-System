import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        role:"team_member"
    });

    const handleChange=(e)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    }

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await registerUser(form);

            alert("Registered Successfully");

            navigate("/");

        }

        catch(err){

            alert(err.response.data.error);

        }

    }

    return(

        <div style={{padding:"40px"}}>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br/><br/>

                <select
                    name="role"
                    onChange={handleChange}
                >

                    <option value="team_member">

                        Team Member

                    </option>

                    <option value="admin">

                        Admin

                    </option>

                </select>

                <br/><br/>

                <button>

                    Register

                </button>

            </form>

        </div>

    );

}