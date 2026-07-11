import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "High",
        deadline: "",
        assigned_by: user.name,
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
                assigned_by: user.name,
                assigned_to: []
            });

            loadTasks();

        } catch (err) {

            alert(err.response?.data?.error || "Error");

        }

    };

    const updateStatus = async (id, status) => {

        await API.put(
            `tasks/status/${id}/`,
            {
                status
            }
        );

        loadTasks();

    };

    const deleteTask = async (id) => {

        if (!window.confirm("Delete this task?")) return;

        await API.delete(
            `tasks/delete/${id}/`
        );

        loadTasks();

    };
        return (

        <div style={{ padding: "30px" }}>

            <h1>Tasks</h1>

            <hr />

            {user.role === "admin" && (

                <>

                    <h2>Create Task</h2>

                    <input
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <textarea
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="date"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <br /><br />

                    <h4>Assign Task To</h4>

                    <select
                        multiple
                        onChange={handleAssign}
                        style={{
                            width: "250px",
                            height: "120px"
                        }}
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

                    <br />

                    <small>
                        Hold <b>Ctrl</b> (Windows) or <b>Cmd</b> (Mac) to select multiple users.
                    </small>

                    <br /><br />

                    <button onClick={createTask}>
                        Create Task
                    </button>

                    <hr />

                </>

            )}

            <h2>

                {user.role === "admin"
                    ? "All Tasks"
                    : "My Tasks"}

            </h2>

            {tasks.length === 0 ? (

                <p>No Tasks Found</p>

            ) : (

                tasks.map((task) => (

                    <div
                        key={task._id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "20px",
                            background: "#fafafa"
                        }}
                    >

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>

                            <b>Priority :</b> {task.priority}

                        </p>

                        <p>

                            <b>Deadline :</b> {task.deadline}

                        </p>

                        <p>

                            <b>Assigned By :</b> {task.assigned_by}

                        </p>

                        <p>

                            <b>Assigned To :</b>{" "}

                            {Array.isArray(task.assigned_to)
                                ? task.assigned_to.join(", ")
                                : task.assigned_to}

                        </p>

                        <p>

                            <b>Status :</b>

                        </p>

                        <select
                            value={task.status}
                            onChange={(e) =>
                                updateStatus(
                                    task._id,
                                    e.target.value
                                )
                            }
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

                        <br /><br />

                        {user.role === "admin" && (

                            <button
                                onClick={() =>
                                    deleteTask(task._id)
                                }
                            >

                                Delete Task

                            </button>

                        )}

                    </div>

                ))

            )}

        </div>

    );

}