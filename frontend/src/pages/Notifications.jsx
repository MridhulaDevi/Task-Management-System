import { useEffect, useState } from "react";

import API from "../services/api";

import {
    connectWebSocket,
    disconnectWebSocket
} from "../services/websocket";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

        connectWebSocket(() => {
            loadNotifications();
        });

        return () => disconnectWebSocket();

    }, []);


    const loadNotifications = async () => {

        try {

            const res = await API.get("notifications/");

            setNotifications(res.data);

        } catch (err) {

            console.log(err);

        }

    };


    const getInitial = (title) => {

        if (!title) return "N";

        return title.charAt(0).toUpperCase();

    };


    return (

        <div style={styles.page}>

            {/* Sidebar */}

            <aside style={styles.sidebar}>

                <div>

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


                    <nav style={styles.navigation}>

                        <a
                            href="/dashboard"
                            style={styles.navItem}
                        >
                            <span style={styles.navIcon}>▦</span>
                            Dashboard
                        </a>


                        <a
                            href="/tasks"
                            style={styles.navItem}
                        >
                            <span style={styles.navIcon}>✓</span>
                            Tasks
                        </a>


                        <a
                            href="/notifications"
                            style={{
                                ...styles.navItem,
                                ...styles.activeNav
                            }}
                        >
                            <span style={styles.navIcon}>●</span>
                            Notifications
                        </a>


                        <a
                            href="/profile"
                            style={styles.navItem}
                        >
                            <span style={styles.navIcon}>○</span>
                            Profile
                        </a>

                    </nav>

                </div>


                <div style={styles.sidebarBottom}>

                    <div style={styles.userSection}>

                        <div style={styles.avatar}>
                            N
                        </div>

                        <div>
                            <strong style={styles.userName}>
                                Account
                            </strong>

                            <span style={styles.userRole}>
                                User
                            </span>
                        </div>

                    </div>


                    <button
                        style={styles.logoutButton}
                        onClick={() => {

                            localStorage.clear();

                            window.location = "/";

                        }}
                    >
                        Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}

            <main style={styles.main}>

                <div style={styles.header}>

                    <div>

                        <div style={styles.pageLabel}>
                            ACTIVITY
                        </div>

                        <h1 style={styles.heading}>
                            Notifications
                        </h1>

                        <p style={styles.subHeading}>
                            Stay updated with your latest task activity.
                        </p>

                    </div>

                </div>


                <section style={styles.notificationSection}>

                    <div style={styles.sectionHeader}>

                        <div>

                            <h2 style={styles.sectionTitle}>
                                Recent notifications
                            </h2>

                            <p style={styles.sectionDescription}>
                                Updates related to your tasks and workspace.
                            </p>

                        </div>

                        <span style={styles.count}>
                            {notifications.length}
                        </span>

                    </div>


                    <div>

                        {notifications.length === 0 ? (

                            <div style={styles.emptyState}>

                                <div style={styles.emptyIcon}>
                                    ✓
                                </div>

                                <h3 style={styles.emptyTitle}>
                                    No notifications
                                </h3>

                                <p style={styles.emptyText}>
                                    You're all caught up. New updates will
                                    appear here.
                                </p>

                            </div>

                        ) : (

                            notifications.map((n) => (

                                <div
                                    key={n._id}
                                    style={styles.notification}
                                >

                                    <div style={styles.notificationIcon}>
                                        {getInitial(n.title)}
                                    </div>


                                    <div style={styles.notificationContent}>

                                        <h3 style={styles.notificationTitle}>
                                            {n.title}
                                        </h3>

                                        <p style={styles.notificationMessage}>
                                            {n.message}
                                        </p>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </section>

            </main>

        </div>

    );

}


const styles = {

    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        background: "#f5f6f8",
        color: "#20242a",
        fontFamily: "Arial, Helvetica, sans-serif"
    },


    /* SIDEBAR */

    sidebar: {
        width: "245px",
        minHeight: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #e1e4e8",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },


    brand: {
        display: "flex",
        alignItems: "center",
        gap: "11px",
        padding: "4px 10px 28px",
        borderBottom: "1px solid #eceef1"
    },


    logo: {
        width: "38px",
        height: "38px",
        background: "#2457d6",
        color: "#ffffff",
        borderRadius: "7px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "700"
    },


    brandName: {
        fontSize: "16px",
        fontWeight: "600"
    },


    brandSub: {
        fontSize: "12px",
        color: "#858b94",
        marginTop: "3px"
    },


    navigation: {
        marginTop: "24px"
    },


    navItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "11px 13px",
        marginBottom: "5px",
        borderRadius: "6px",
        textDecoration: "none",
        color: "#606771",
        fontSize: "14px"
    },


    activeNav: {
        background: "#edf2ff",
        color: "#2457d6",
        fontWeight: "600"
    },


    navIcon: {
        width: "18px",
        textAlign: "center",
        fontSize: "14px"
    },


    sidebarBottom: {
        marginTop: "auto"
    },


    userSection: {
        borderTop: "1px solid #eceef1",
        padding: "14px 8px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },


    avatar: {
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "#e9edf5",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "600"
    },


    userName: {
        display: "block",
        fontSize: "13px"
    },


    userRole: {
        display: "block",
        marginTop: "3px",
        color: "#858b94",
        fontSize: "11px"
    },


    logoutButton: {
        width: "100%",
        padding: "9px",
        border: "1px solid #dfe2e6",
        borderRadius: "5px",
        background: "#ffffff",
        color: "#555b64",
        fontSize: "13px",
        cursor: "pointer"
    },


    /* MAIN */

    main: {
        flex: "1",
        width: "100%",
        minWidth: "0",
        padding: "34px 42px"
    },


    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "30px"
    },


    pageLabel: {
        color: "#2457d6",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.8px",
        marginBottom: "7px"
    },


    heading: {
        margin: "0",
        fontSize: "27px",
        fontWeight: "600",
        color: "#20242a"
    },


    subHeading: {
        margin: "7px 0 0",
        color: "#747a83",
        fontSize: "14px"
    },


    /* NOTIFICATIONS */

    notificationSection: {
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "7px",
        overflow: "hidden",
        maxWidth: "950px"
    },


    sectionHeader: {
        padding: "20px 22px",
        borderBottom: "1px solid #e7e9ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },


    sectionTitle: {
        margin: "0",
        fontSize: "17px",
        fontWeight: "600",
        color: "#20242a"
    },


    sectionDescription: {
        margin: "5px 0 0",
        color: "#858b94",
        fontSize: "12px"
    },


    count: {
        minWidth: "28px",
        height: "28px",
        padding: "0 8px",
        borderRadius: "14px",
        background: "#edf2ff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "600"
    },


    notification: {
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        padding: "18px 22px",
        borderBottom: "1px solid #eef0f2"
    },


    notificationIcon: {
        width: "36px",
        height: "36px",
        flexShrink: "0",
        borderRadius: "50%",
        background: "#edf2ff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "600"
    },


    notificationContent: {
        flex: "1"
    },


    notificationTitle: {
        margin: "0 0 5px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#30353c"
    },


    notificationMessage: {
        margin: "0",
        fontSize: "13px",
        lineHeight: "1.5",
        color: "#707780"
    },


    emptyState: {
        padding: "65px 30px",
        textAlign: "center"
    },


    emptyIcon: {
        width: "42px",
        height: "42px",
        margin: "0 auto 13px",
        borderRadius: "50%",
        background: "#e8f5ed",
        color: "#277044",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "17px",
        fontWeight: "600"
    },


    emptyTitle: {
        margin: "0",
        fontSize: "15px",
        fontWeight: "600"
    },


    emptyText: {
        margin: "7px auto 0",
        maxWidth: "350px",
        fontSize: "13px",
        color: "#858b94",
        lineHeight: "1.5"
    }

};
