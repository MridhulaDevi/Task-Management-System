import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "team_member"
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
            await registerUser(form);

            alert("Registered Successfully");

            navigate("/");
        }
        catch (err) {
            alert(err.response?.data?.error || "Registration Failed");
        }
    };

    return (

        <div style={styles.page}>

            {/* LEFT SIDE */}

            <div style={styles.leftPanel}>

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
                        Create your account and start managing
                        tasks, assignments and team activities
                        in one place.
                    </p>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div style={styles.rightPanel}>

                <div style={styles.formContainer}>

                    <div style={styles.heading}>
                        Create Account
                    </div>

                    <p style={styles.subtitle}>
                        Register to access your workspace
                    </p>


                    <form onSubmit={handleSubmit}>

                        {/* NAME */}

                        <label style={styles.label}>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />


                        {/* EMAIL */}

                        <label style={styles.label}>
                            Email Address
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


                        {/* PASSWORD */}

                        <label style={styles.label}>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />


                        {/* ROLE */}

                        <label style={styles.label}>
                            Account Role
                        </label>

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            style={styles.input}
                        >

                            <option value="team_member">
                                Team Member
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                        </select>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            style={styles.button}
                        >
                            Create Account
                        </button>

                    </form>


                    {/* LOGIN LINK */}

                    <div style={styles.loginText}>

                        Already have an account?{" "}

                        <Link
                            to="/"
                            style={styles.loginLink}
                        >
                            Sign in
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

    leftPanel: {
        width: "48%",
        minHeight: "100vh",
        background: "#2457d6",
        color: "#ffffff",
        padding: "42px 55px",
        display: "flex",
        flexDirection: "column"
    },

    brand: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },

    logo: {
        width: "42px",
        height: "42px",
        borderRadius: "7px",
        background: "#ffffff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "700"
    },

    brandName: {
        fontSize: "18px",
        fontWeight: "600"
    },

    brandSub: {
        fontSize: "12px",
        marginTop: "3px",
        opacity: "0.75"
    },

    leftContent: {
        marginTop: "190px",
        maxWidth: "480px"
    },

    leftTitle: {
        fontSize: "42px",
        lineHeight: "1.15",
        fontWeight: "600",
        marginBottom: "22px"
    },

    leftText: {
        fontSize: "16px",
        lineHeight: "1.7",
        opacity: "0.85",
        maxWidth: "430px"
    },

    rightPanel: {
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px"
    },

    formContainer: {
        width: "100%",
        maxWidth: "430px",
        background: "#ffffff",
        padding: "42px",
        border: "1px solid #e1e4e8",
        borderRadius: "10px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.05)"
    },

    heading: {
        fontSize: "28px",
        fontWeight: "600",
        color: "#20242a",
        marginBottom: "8px"
    },

    subtitle: {
        fontSize: "14px",
        color: "#656b74",
        marginBottom: "30px"
    },

    label: {
        display: "block",
        fontSize: "13px",
        fontWeight: "600",
        color: "#30343a",
        marginBottom: "7px",
        marginTop: "18px"
    },

    input: {
        width: "100%",
        height: "44px",
        padding: "0 12px",
        border: "1px solid #d9dde3",
        borderRadius: "6px",
        fontSize: "14px",
        color: "#20242a",
        background: "#ffffff",
        outline: "none"
    },

    button: {
        width: "100%",
        height: "44px",
        marginTop: "28px",
        border: "none",
        borderRadius: "6px",
        background: "#2457d6",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer"
    },

    loginText: {
        textAlign: "center",
        marginTop: "24px",
        fontSize: "13px",
        color: "#656b74"
    },

    loginLink: {
        color: "#2457d6",
        textDecoration: "none",
        fontWeight: "600"
    }

};