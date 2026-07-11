import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await loginUser(form);

            login(res.data.token, res.data.user);

            alert("Login Successful");

            if (res.data.user.role === "admin") {

                navigate("/dashboard");

            } else {

                navigate("/dashboard");

            }

        } catch (err) {

            alert(err.response?.data?.error || "Login Failed");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >

            <div>

                <h1>Task Management System</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <br /><br />

                    <button type="submit">

                        Login

                    </button>

                </form>

                <br />

                <p>

                    New User?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}