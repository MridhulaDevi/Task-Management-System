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

            alert(
                err.response?.data?.error ||
                "Login Failed"
            );

        }

    };

    return (

        <div style={styles.page}>

            {/* Left Section */}

            <div style={styles.leftSection}>

                <div style={styles.brand}>
                    <div style={styles.logo}>
                        TM
                    </div>

                    <div>
                        <div style={styles.brandName}>
                            Task Manager
                        </div>

                        <div style={styles.brandSub}>
                            Workspace
                        </div>
                    </div>
                </div>


                <div style={styles.leftContent}>

                    <h1 style={styles.leftTitle}>
                        Organize work.<br />
                        Get things done.
                    </h1>

                    <p style={styles.leftText}>
                        Manage tasks, collaborate with your team,
                        and keep track of your work from one place.
                    </p>

                </div>


                <div style={styles.footerText}>
                    Task Management System
                </div>

            </div>


            {/* Login Section */}

            <div style={styles.rightSection}>

                <div style={styles.loginBox}>

                    <div style={styles.mobileLogo}>
                        TM
                    </div>

                    <h2 style={styles.title}>
                        Welcome back
                    </h2>

                    <p style={styles.subtitle}>
                        Sign in to continue to your workspace.
                    </p>


                    <form onSubmit={handleSubmit}>

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />

                        </div>


                        <div style={styles.field}>

                            <label style={styles.label}>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />

                        </div>


                        <button
                            type="submit"
                            style={styles.loginButton}
                        >
                            Sign In
                        </button>

                    </form>


                    <div style={styles.registerText}>

                        <span>
                            Don't have an account?
                        </span>

                        <Link
                            to="/register"
                            style={styles.registerLink}
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
}


const styles = {

    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background: "#f5f6f8",
        fontFamily: "Arial, Helvetica, sans-serif"
    },


    leftSection: {
        width: "48%",
        minHeight: "100vh",
        background: "#2457d6",
        color: "#ffffff",
        padding: "38px 55px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },


    brand: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },


    logo: {
        width: "40px",
        height: "40px",
        borderRadius: "7px",
        background: "#ffffff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "13px"
    },


    brandName: {
        fontSize: "17px",
        fontWeight: "600"
    },


    brandSub: {
        fontSize: "12px",
        marginTop: "3px",
        opacity: 0.75
    },


    leftContent: {
        maxWidth: "450px",
        marginTop: "-80px"
    },


    leftTitle: {
        fontSize: "42px",
        lineHeight: "1.15",
        fontWeight: "600",
        margin: "0 0 20px"
    },


    leftText: {
        fontSize: "15px",
        lineHeight: "1.7",
        opacity: 0.85,
        maxWidth: "400px"
    },


    footerText: {
        fontSize: "12px",
        opacity: 0.65
    },


    rightSection: {
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px"
    },


    loginBox: {
        width: "100%",
        maxWidth: "390px"
    },


    mobileLogo: {
        display: "none"
    },


    title: {
        margin: "0 0 8px",
        fontSize: "28px",
        fontWeight: "600",
        color: "#20242a"
    },


    subtitle: {
        margin: "0 0 30px",
        color: "#777d85",
        fontSize: "14px"
    },


    field: {
        marginBottom: "19px"
    },


    label: {
        display: "block",
        marginBottom: "7px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#444a52"
    },


    input: {
        width: "100%",
        height: "45px",
        padding: "0 13px",
        border: "1px solid #d8dce1",
        borderRadius: "5px",
        background: "#ffffff",
        color: "#20242a",
        fontSize: "14px",
        outline: "none"
    },


    loginButton: {
        width: "100%",
        height: "45px",
        marginTop: "8px",
        border: "none",
        borderRadius: "5px",
        background: "#2457d6",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer"
    },


    registerText: {
        marginTop: "24px",
        textAlign: "center",
        fontSize: "13px",
        color: "#777d85"
    },


    registerLink: {
        marginLeft: "5px",
        color: "#2457d6",
        fontWeight: "600",
        textDecoration: "none"
    }

};
