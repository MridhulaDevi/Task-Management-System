import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

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
        } catch (err) {
            console.log(err);
        }
    };

    const loadTasks = async () => {
        try {
            const res = await API.get("tasks/all/");
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "status completed";
            case "in progress":
                return "status progress";
            case "todo":
            case "pending":
                return "status pending";
            default:
                return "status";
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "priority high";
            case "medium":
                return "priority medium";
            case "low":
                return "priority low";
            default:
                return "priority";
        }
    };

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="brand">
                    <div className="brand-mark">TM</div>
                    <div>
                        <h2>Task Manager</h2>
                        <span>Workspace</span>
                    </div>
                </div>

                <nav className="navigation">

                    <Link to="/dashboard" className="nav-item active">
                        <span>▦</span>
                        Dashboard
                    </Link>

                    <Link to="/tasks" className="nav-item">
                        <span>✓</span>
                        Tasks
                    </Link>

                    <Link to="/notifications" className="nav-item">
                        <span>●</span>
                        Notifications
                    </Link>

                    <Link to="/profile" className="nav-item">
                        <span>○</span>
                        Profile
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <div className="user-mini">
                        <div className="avatar">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                            <strong>{user?.name}</strong>
                            <small>{user?.role}</small>
                        </div>
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}
            <main className="main-content">

                <header className="top-header">

                    <div>
                        <p className="page-label">DASHBOARD</p>

                        <h1>
                            Welcome back, {user?.name}
                        </h1>

                        <p className="sub-text">
                            Here's an overview of your tasks and activity.
                        </p>
                    </div>

                    <div className="header-actions">

                        <button
                            className="secondary-btn"
                            onClick={() => navigate("/notifications")}
                        >
                            Notifications
                        </button>

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/tasks")}
                        >
                            View Tasks
                        </button>

                    </div>

                </header>


                {/* Statistics */}
                <section className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-title">
                            Total Tasks
                        </div>

                        <div className="stat-value">
                            {stats.total_tasks}
                        </div>

                        <div className="stat-description">
                            Tasks assigned to you
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-title">
                            Completed
                        </div>

                        <div className="stat-value">
                            {stats.completed}
                        </div>

                        <div className="stat-description">
                            Successfully completed
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-title">
                            In Progress
                        </div>

                        <div className="stat-value">
                            {stats.in_progress}
                        </div>

                        <div className="stat-description">
                            Currently being worked on
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-title">
                            Pending
                        </div>

                        <div className="stat-value">
                            {stats.todo}
                        </div>

                        <div className="stat-description">
                            Waiting to be started
                        </div>
                    </div>

                </section>


                {/* Recent Tasks */}
                <section className="tasks-section">

                    <div className="section-header">

                        <div>
                            <h2>Recent Tasks</h2>
                            <p>Latest tasks in your workspace</p>
                        </div>

                        <Link to="/tasks" className="view-all">
                            View all →
                        </Link>

                    </div>


                    <div className="table-container">

                        {tasks.length === 0 ? (

                            <div className="empty-state">
                                <h3>No tasks available</h3>
                                <p>
                                    Tasks assigned to you will appear here.
                                </p>
                            </div>

                        ) : (

                            <table>

                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Assigned To</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {tasks.slice(0, 8).map((task) => (

                                        <tr key={task._id}>

                                            <td>
                                                <div className="task-name">
                                                    {task.title}
                                                </div>
                                            </td>

                                            <td>
                                                <span
                                                    className={getPriorityClass(
                                                        task.priority
                                                    )}
                                                >
                                                    {task.priority}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={getStatusClass(
                                                        task.status
                                                    )}
                                                >
                                                    {task.status}
                                                </span>
                                            </td>

                                            <td>
                                                {Array.isArray(task.assigned_to)
                                                    ? task.assigned_to.join(", ")
                                                    : task.assigned_to || "Unassigned"}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}
export default Dashboard;