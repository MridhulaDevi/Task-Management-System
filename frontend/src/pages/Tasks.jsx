import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Tasks() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "High",
        deadline: "",
        assigned_by: user?.name || "",
        assigned_to: []
    });

    useEffect(() => {
        loadTasks();
        loadUsers();
    }, []);

    const loadTasks = async () => {
        try {
            const res = await API.get("tasks/all/");
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadUsers = async () => {
        try {
            const res = await API.get("users/");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAssign = (e) => {

        const selectedUsers = Array.from(
            e.target.selectedOptions,
            option => option.value
        );

        setForm({
            ...form,
            assigned_to: selectedUsers
        });
    };

    const createTask = async () => {

        try {

            await API.post("tasks/", form);

            alert("Task Created Successfully");

            setForm({
                title: "",
                description: "",
                priority: "High",
                deadline: "",
                assigned_by: user?.name || "",
                assigned_to: []
            });

            loadTasks();

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Error creating task"
            );

        }
    };

    const updateStatus = async (id, status) => {

        try {

            await API.put(
                `tasks/status/${id}/`,
                {
                    status: status
                }
            );

            loadTasks();

        } catch (err) {
            console.log(err);
        }
    };

    const deleteTask = async (id) => {

        if (!window.confirm("Delete this task?")) {
            return;
        }

        try {

            await API.delete(
                `tasks/delete/${id}/`
            );

            loadTasks();

        } catch (err) {
            console.log(err);
        }
    };

    const getPriorityStyle = (priority) => {

        if (priority === "High") {
            return {
                background: "#fdecec",
                color: "#b42318"
            };
        }

        if (priority === "Medium") {
            return {
                background: "#fff4d6",
                color: "#9a6700"
            };
        }

        return {
            background: "#e9f7ef",
            color: "#237a45"
        };
    };

    const getStatusStyle = (status) => {

        if (status === "Completed") {
            return {
                background: "#e8f6ed",
                color: "#237a45"
            };
        }

        if (status === "In Progress") {
            return {
                background: "#eaf1ff",
                color: "#2457d6"
            };
        }

        return {
            background: "#f1f2f4",
            color: "#5f6670"
        };
    };

    return (

        <div style={styles.page}>

            {/* SIDEBAR */}

            <aside style={styles.sidebar}>

                <div style={styles.brandArea}>

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

                <nav style={styles.nav}>

                    <Link
                        to="/dashboard"
                        style={styles.navItem}
                    >
                        <span style={styles.navIcon}>
                            ▦
                        </span>

                        Dashboard
                    </Link>

                    <Link
                        to="/tasks"
                        style={{
                            ...styles.navItem,
                            ...styles.activeNav
                        }}
                    >
                        <span style={styles.navIcon}>
                            ✓
                        </span>

                        Tasks
                    </Link>

                    <Link
                        to="/notifications"
                        style={styles.navItem}
                    >
                        <span style={styles.navIcon}>
                            ●
                        </span>

                        Notifications
                    </Link>

                    <Link
                        to="/profile"
                        style={styles.navItem}
                    >
                        <span style={styles.navIcon}>
                            ○
                        </span>

                        Profile
                    </Link>

                </nav>

                {/* USER AREA */}

                <div style={styles.sidebarBottom}>

                    <div style={styles.userBox}>

                        <div style={styles.avatar}>
                            {user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                        </div>

                        <div style={{ minWidth: 0 }}>

                            <div style={styles.userName}>
                                {user?.name || "User"}
                            </div>

                            <div style={styles.userRole}>
                                {user?.role === "admin"
                                    ? "Administrator"
                                    : "Team Member"}
                            </div>

                        </div>

                    </div>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location = "/";
                        }}
                        style={styles.logout}
                    >
                        Logout
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}

            <main style={styles.main}>

                {/* HEADER */}

                <div style={styles.header}>

                    <div>

                        <div style={styles.pageLabel}>
                            WORKSPACE
                        </div>

                        <h1 style={styles.title}>
                            Tasks
                        </h1>

                        <p style={styles.subtitle}>
                            {user?.role === "admin"
                                ? "Create and manage tasks for your team."
                                : "View and manage your assigned tasks."}
                        </p>

                    </div>


                    <div style={styles.taskCount}>

                        <strong
                            style={styles.taskCountNumber}
                        >
                            {tasks.length}
                        </strong>

                        <span
                            style={styles.taskCountLabel}
                        >
                            Total Tasks
                        </span>

                    </div>

                </div>


                {/* CREATE TASK */}

                {user?.role === "admin" && (

                    <section style={styles.createCard}>

                        <div style={styles.createHeader}>

                            <div>

                                <h2 style={styles.sectionTitle}>
                                    Create New Task
                                </h2>

                                <p style={styles.sectionSub}>
                                    Add a task and assign it to
                                    one or more team members.
                                </p>

                            </div>

                            <div style={styles.addIcon}>
                                +
                            </div>

                        </div>


                        <div style={styles.formGrid}>

                            {/* TITLE */}

                            <div style={styles.field}>

                                <label style={styles.label}>
                                    Task Title
                                </label>

                                <input
                                    name="title"
                                    placeholder="Enter task title"
                                    value={form.title}
                                    onChange={handleChange}
                                    style={styles.input}
                                />

                            </div>


                            {/* DEADLINE */}

                            <div style={styles.field}>

                                <label style={styles.label}>
                                    Deadline
                                </label>

                                <input
                                    type="date"
                                    name="deadline"
                                    value={form.deadline}
                                    onChange={handleChange}
                                    style={styles.input}
                                />

                            </div>


                            {/* PRIORITY */}

                            <div style={styles.field}>

                                <label style={styles.label}>
                                    Priority
                                </label>

                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                    style={styles.input}
                                >

                                    <option value="High">
                                        High
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="Low">
                                        Low
                                    </option>

                                </select>

                            </div>


                            {/* ASSIGN TO */}

                            <div style={styles.field}>

                                <label style={styles.label}>
                                    Assign To
                                </label>

                                <select
                                    multiple
                                    value={form.assigned_to}
                                    onChange={handleAssign}
                                    style={styles.multiSelect}
                                >

                                    {users.map((u) => (

                                        <option
                                            key={u._id}
                                            value={u.name}
                                        >
                                            {u.name}
                                        </option>

                                    ))}

                                </select>

                                <small style={styles.helper}>
                                    Hold Ctrl to select multiple members.
                                </small>

                            </div>


                            {/* DESCRIPTION */}

                            <div
                                style={{
                                    ...styles.field,
                                    gridColumn: "1 / -1"
                                }}
                            >

                                <label style={styles.label}>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Describe the task..."
                                    value={form.description}
                                    onChange={handleChange}
                                    style={styles.textarea}
                                />

                            </div>

                        </div>


                        <div style={styles.createFooter}>

                            <button
                                onClick={createTask}
                                style={styles.createButton}
                            >
                                + Create Task
                            </button>

                        </div>

                    </section>

                )}


                {/* TASK LIST */}

                <section style={styles.taskSection}>

                    <div style={styles.taskHeader}>

                        <div>

                            <h2 style={styles.sectionTitle}>
                                {user?.role === "admin"
                                    ? "All Tasks"
                                    : "My Tasks"}
                            </h2>

                            <p style={styles.sectionSub}>

                                {tasks.length === 0
                                    ? "No tasks available."
                                    : `${tasks.length} task${
                                        tasks.length !== 1
                                            ? "s"
                                            : ""
                                    } available`
                                }

                            </p>

                        </div>

                    </div>


                    {/* EMPTY STATE */}

                    {tasks.length === 0 ? (

                        <div style={styles.emptyState}>

                            <div style={styles.emptyIcon}>
                                ✓
                            </div>

                            <h3 style={styles.emptyTitle}>
                                No Tasks Found
                            </h3>

                            <p style={styles.emptyText}>
                                There are currently no tasks to display.
                            </p>

                        </div>

                    ) : (

                        <div style={styles.taskList}>

                            {tasks.map((task) => (

                                <div
                                    key={task._id}
                                    style={styles.taskCard}
                                >

                                    {/* TASK HEADER */}

                                    <div style={styles.taskTop}>

                                        <div style={{ flex: 1 }}>

                                            <h3 style={styles.taskTitle}>
                                                {task.title}
                                            </h3>

                                            <p style={styles.taskDescription}>
                                                {task.description ||
                                                    "No description provided."}
                                            </p>

                                        </div>


                                        <span
                                            style={{
                                                ...styles.badge,
                                                ...getPriorityStyle(
                                                    task.priority
                                                )
                                            }}
                                        >
                                            {task.priority}
                                        </span>

                                    </div>


                                    {/* TASK DETAILS */}

                                    <div style={styles.detailsGrid}>

                                        <div style={styles.detailItem}>

                                            <span style={styles.detailLabel}>
                                                Deadline
                                            </span>

                                            <span style={styles.detailValue}>
                                                {task.deadline ||
                                                    "Not set"}
                                            </span>

                                        </div>


                                        <div style={styles.detailItem}>

                                            <span style={styles.detailLabel}>
                                                Assigned By
                                            </span>

                                            <span style={styles.detailValue}>
                                                {task.assigned_by ||
                                                    "Not available"}
                                            </span>

                                        </div>


                                        <div
                                            style={{
                                                ...styles.detailItem,
                                                gridColumn: "1 / -1"
                                            }}
                                        >

                                            <span style={styles.detailLabel}>
                                                Assigned To
                                            </span>

                                            <span style={styles.detailValue}>

                                                {Array.isArray(
                                                    task.assigned_to
                                                )
                                                    ? task.assigned_to.join(", ")
                                                    : task.assigned_to ||
                                                      "Not assigned"}

                                            </span>

                                        </div>

                                    </div>


                                    {/* TASK FOOTER */}

                                    <div style={styles.taskBottom}>

                                        <div>

                                            <span style={styles.statusLabel}>
                                                Status
                                            </span>

                                            <select
                                                value={
                                                    task.status || "To Do"
                                                }
                                                onChange={(e) =>
                                                    updateStatus(
                                                        task._id,
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    ...styles.statusSelect,
                                                    ...getStatusStyle(
                                                        task.status
                                                    )
                                                }}
                                            >

                                                <option value="To Do">
                                                    To Do
                                                </option>

                                                <option value="In Progress">
                                                    In Progress
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>

                                            </select>

                                        </div>


                                        {user?.role === "admin" && (

                                            <button
                                                onClick={() =>
                                                    deleteTask(
                                                        task._id
                                                    )
                                                }
                                                style={styles.deleteButton}
                                            >
                                                Delete Task
                                            </button>

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}


const styles = {

    /* PAGE */

    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background: "#f4f6f9",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#20242a"
    },


    /* SIDEBAR */

    sidebar: {
        width: "240px",
        minHeight: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #e1e4e8",
        display: "flex",
        flexDirection: "column",
        padding: "25px 16px"
    },

    brandArea: {
        display: "flex",
        alignItems: "center",
        gap: "11px",
        padding: "0 9px 30px"
    },

    logo: {
        width: "38px",
        height: "38px",
        borderRadius: "7px",
        background: "#2457d6",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "13px"
    },

    brandName: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#20242a"
    },

    brandSub: {
        fontSize: "11px",
        color: "#858b94",
        marginTop: "2px"
    },

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "5px"
    },

    navItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "11px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        color: "#656b74",
        fontSize: "14px",
        fontWeight: "500"
    },

    activeNav: {
        background: "#eaf1ff",
        color: "#2457d6",
        fontWeight: "600"
    },

    navIcon: {
        width: "20px",
        textAlign: "center",
        fontSize: "14px"
    },

    sidebarBottom: {
        marginTop: "auto"
    },

    userBox: {
        borderTop: "1px solid #eceef1",
        padding: "18px 8px 15px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },

    avatar: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#eaf1ff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "700"
    },

    userName: {
        fontSize: "13px",
        fontWeight: "600",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "145px"
    },

    userRole: {
        fontSize: "11px",
        color: "#858b94",
        marginTop: "2px"
    },

    logout: {
        width: "100%",
        height: "36px",
        border: "1px solid #e1e4e8",
        borderRadius: "6px",
        background: "#ffffff",
        color: "#656b74",
        fontSize: "12px",
        cursor: "pointer"
    },


    /* MAIN */

    main: {
        flex: 1,
        minWidth: 0,
        padding: "34px 42px"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    },

    pageLabel: {
        fontSize: "11px",
        color: "#2457d6",
        fontWeight: "700",
        letterSpacing: "0.7px",
        marginBottom: "7px"
    },

    title: {
        fontSize: "30px",
        margin: "0 0 7px",
        fontWeight: "600",
        color: "#20242a"
    },

    subtitle: {
        margin: 0,
        fontSize: "14px",
        color: "#656b74"
    },

    taskCount: {
        minWidth: "105px",
        padding: "13px 18px",
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "7px",
        textAlign: "center"
    },

    taskCountNumber: {
        display: "block",
        fontSize: "21px",
        color: "#2457d6",
        fontWeight: "700"
    },

    taskCountLabel: {
        display: "block",
        fontSize: "11px",
        color: "#858b94",
        marginTop: "3px"
    },


    /* CREATE TASK */

    createCard: {
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "9px",
        padding: "25px",
        marginBottom: "30px"
    },

    createHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "23px"
    },

    sectionTitle: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "600",
        color: "#20242a"
    },

    sectionSub: {
        margin: "6px 0 0",
        fontSize: "13px",
        color: "#858b94"
    },

    addIcon: {
        width: "35px",
        height: "35px",
        borderRadius: "6px",
        background: "#eaf1ff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "21px",
        fontWeight: "400"
    },

    formGrid: {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 0.8fr 1.2fr",
        gap: "18px"
    },

    field: {
        display: "flex",
        flexDirection: "column"
    },

    label: {
        fontSize: "12px",
        fontWeight: "600",
        color: "#454b53",
        marginBottom: "7px"
    },

    input: {
        height: "40px",
        border: "1px solid #d9dde3",
        borderRadius: "5px",
        padding: "0 11px",
        fontSize: "13px",
        outline: "none",
        background: "#ffffff",
        color: "#20242a"
    },

    textarea: {
        minHeight: "80px",
        resize: "vertical",
        border: "1px solid #d9dde3",
        borderRadius: "5px",
        padding: "10px 11px",
        fontSize: "13px",
        outline: "none",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#20242a"
    },

    multiSelect: {
        minHeight: "40px",
        border: "1px solid #d9dde3",
        borderRadius: "5px",
        padding: "7px",
        fontSize: "13px",
        background: "#ffffff",
        color: "#20242a"
    },

    helper: {
        fontSize: "10px",
        color: "#858b94",
        marginTop: "5px"
    },

    createFooter: {
        marginTop: "20px",
        paddingTop: "18px",
        borderTop: "1px solid #eceef1"
    },

    createButton: {
        background: "#2457d6",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 18px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer"
    },


    /* TASK LIST */

    taskSection: {
        marginTop: "5px"
    },

    taskHeader: {
        marginBottom: "16px"
    },

    taskList: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fill, minmax(360px, 1fr))",
        gap: "18px"
    },

    taskCard: {
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "8px",
        padding: "21px"
    },

    taskTop: {
        display: "flex",
        gap: "15px",
        alignItems: "flex-start",
        marginBottom: "20px"
    },

    taskTitle: {
        margin: "0 0 7px",
        fontSize: "16px",
        fontWeight: "600",
        color: "#20242a"
    },

    taskDescription: {
        margin: 0,
        fontSize: "13px",
        color: "#656b74",
        lineHeight: "1.5"
    },

    badge: {
        flexShrink: 0,
        padding: "5px 9px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600"
    },

    detailsGrid: {
        borderTop: "1px solid #eceef1",
        borderBottom: "1px solid #eceef1",
        padding: "15px 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px"
    },

    detailItem: {
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },

    detailLabel: {
        fontSize: "10px",
        color: "#858b94",
        textTransform: "uppercase",
        letterSpacing: "0.4px"
    },

    detailValue: {
        fontSize: "12px",
        color: "#30343a",
        lineHeight: "1.4"
    },

    taskBottom: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "16px"
    },

    statusLabel: {
        fontSize: "11px",
        color: "#858b94",
        marginRight: "8px"
    },

    statusSelect: {
        border: "none",
        borderRadius: "4px",
        padding: "6px 9px",
        fontSize: "11px",
        fontWeight: "600",
        outline: "none",
        cursor: "pointer"
    },

    deleteButton: {
        border: "1px solid #e5bcbc",
        background: "#fff7f7",
        color: "#b42318",
        borderRadius: "5px",
        padding: "7px 11px",
        fontSize: "11px",
        cursor: "pointer"
    },


    /* EMPTY STATE */

    emptyState: {
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "8px",
        padding: "60px 20px",
        textAlign: "center"
    },

    emptyIcon: {
        width: "44px",
        height: "44px",
        margin: "0 auto 14px",
        borderRadius: "50%",
        background: "#eaf1ff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "600"
    },

    emptyTitle: {
        margin: "0 0 6px",
        fontSize: "16px",
        fontWeight: "600"
    },

    emptyText: {
        margin: 0,
        fontSize: "13px",
        color: "#858b94"
    }

};