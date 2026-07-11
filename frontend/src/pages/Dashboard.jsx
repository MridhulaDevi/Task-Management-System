import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [stats, setStats] = useState({
        total_tasks: 0,
        completed: 0,
        in_progress: 0,
        todo: 0
    });

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadDashboard();

        loadTasks();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await API.get("dashboard/");

            setStats(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const loadTasks = async () => {

        try {

            const res = await API.get("tasks/all/");

            setTasks(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const logout = () => {

        localStorage.clear();

        window.location = "/";

    };

    return (

        <div style={{ padding: "30px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div>

                    <h1>

                        Welcome {user.name}

                    </h1>

                    <p>

                        Role : {user.role}

                    </p>

                </div>

                <button onClick={logout}>

                    Logout

                </button>

            </div>

            <hr />

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "20px"
                }}
            >

                <div style={card}>
                    <h3>Total Tasks</h3>
                    <h1>{stats.total_tasks}</h1>
                </div>

                <div style={card}>
                    <h3>Completed</h3>
                    <h1>{stats.completed}</h1>
                </div>

                <div style={card}>
                    <h3>In Progress</h3>
                    <h1>{stats.in_progress}</h1>
                </div>

                <div style={card}>
                    <h3>Pending</h3>
                    <h1>{stats.todo}</h1>
                </div>

            </div>

            <br />

            <Link to="/tasks">

                <button>

                    Go To Tasks

                </button>

            </Link>

            <Link to="/notifications">

                <button style={{ marginLeft: "10px" }}>

                    Notifications

                </button>

            </Link>

            <Link to="/profile">

                <button style={{ marginLeft: "10px" }}>

                    Profile

                </button>

            </Link>

            <hr />

            <h2>

                Recent Tasks

            </h2>

            <table
                border="1"
                cellPadding="10"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Assigned To</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        tasks.map((task) => (

                            <tr key={task._id}>

                                <td>{task.title}</td>

                                <td>{task.priority}</td>

                                <td>{task.status}</td>

                                <td>

                                    {

                                        Array.isArray(task.assigned_to)

                                            ? task.assigned_to.join(", ")

                                            : task.assigned_to

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

const card = {

    border: "1px solid grey",

    borderRadius: "10px",

    padding: "20px",

    width: "220px",

    textAlign: "center"

};