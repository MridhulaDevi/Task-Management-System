export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        window.location = "/";
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
                            style={styles.navItem}
                        >
                            <span style={styles.navIcon}>●</span>
                            Notifications
                        </a>


                        <a
                            href="/profile"
                            style={{
                                ...styles.navItem,
                                ...styles.activeNav
                            }}
                        >
                            <span style={styles.navIcon}>○</span>
                            Profile
                        </a>

                    </nav>

                </div>


                <div style={styles.sidebarBottom}>

                    <div style={styles.sidebarUser}>

                        <div style={styles.smallAvatar}>
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>

                            <strong style={styles.sidebarName}>
                                {user?.name || "User"}
                            </strong>

                            <span style={styles.sidebarRole}>
                                {user?.role || "Member"}
                            </span>

                        </div>

                    </div>


                    <button
                        onClick={logout}
                        style={styles.sidebarLogout}
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
                            ACCOUNT
                        </div>

                        <h1 style={styles.heading}>
                            Profile
                        </h1>

                        <p style={styles.subHeading}>
                            View your account information and role.
                        </p>

                    </div>

                </div>


                {/* Profile Card */}

                <section style={styles.profileCard}>

                    <div style={styles.profileTop}>

                        <div style={styles.avatar}>
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>

                            <h2 style={styles.name}>
                                {user?.name || "User"}
                            </h2>

                            <p style={styles.email}>
                                {user?.email || "No email available"}
                            </p>

                        </div>

                    </div>


                    <div style={styles.divider}></div>


                    <div style={styles.details}>

                        <div style={styles.detailItem}>

                            <span style={styles.detailLabel}>
                                Full Name
                            </span>

                            <span style={styles.detailValue}>
                                {user?.name || "Not available"}
                            </span>

                        </div>


                        <div style={styles.detailItem}>

                            <span style={styles.detailLabel}>
                                Email Address
                            </span>

                            <span style={styles.detailValue}>
                                {user?.email || "Not available"}
                            </span>

                        </div>


                        <div style={styles.detailItem}>

                            <span style={styles.detailLabel}>
                                Account Role
                            </span>

                            <span style={styles.roleBadge}>
                                {user?.role || "Member"}
                            </span>

                        </div>

                    </div>

                </section>


                {/* Account Actions */}

                <section style={styles.actionsCard}>

                    <div>

                        <h2 style={styles.actionsTitle}>
                            Account
                        </h2>

                        <p style={styles.actionsText}>
                            Sign out from your current Task Manager session.
                        </p>

                    </div>


                    <button
                        onClick={logout}
                        style={styles.logoutButton}
                    >
                        Logout
                    </button>

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


    sidebarUser: {
        borderTop: "1px solid #eceef1",
        padding: "14px 8px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },


    smallAvatar: {
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


    sidebarName: {
        display: "block",
        fontSize: "13px"
    },


    sidebarRole: {
        display: "block",
        marginTop: "3px",
        color: "#858b94",
        fontSize: "11px"
    },


    sidebarLogout: {
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


    /* PROFILE */

    profileCard: {
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "7px",
        maxWidth: "850px",
        padding: "28px"
    },


    profileTop: {
        display: "flex",
        alignItems: "center",
        gap: "17px"
    },


    avatar: {
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        background: "#edf2ff",
        color: "#2457d6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "23px",
        fontWeight: "600"
    },


    name: {
        margin: "0",
        fontSize: "20px",
        fontWeight: "600",
        color: "#20242a"
    },


    email: {
        margin: "6px 0 0",
        color: "#777d85",
        fontSize: "13px"
    },


    divider: {
        height: "1px",
        background: "#e7e9ec",
        margin: "26px 0"
    },


    details: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "25px"
    },


    detailItem: {
        display: "flex",
        flexDirection: "column",
        gap: "7px"
    },


    detailLabel: {
        color: "#858b94",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        fontWeight: "600"
    },


    detailValue: {
        color: "#30353c",
        fontSize: "14px"
    },


    roleBadge: {
        display: "inline-block",
        width: "fit-content",
        background: "#edf2ff",
        color: "#2457d6",
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        textTransform: "capitalize"
    },


    /* ACCOUNT ACTIONS */

    actionsCard: {
        maxWidth: "850px",
        marginTop: "18px",
        background: "#ffffff",
        border: "1px solid #e1e4e8",
        borderRadius: "7px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },


    actionsTitle: {
        margin: "0 0 5px",
        fontSize: "15px",
        fontWeight: "600"
    },


    actionsText: {
        margin: "0",
        color: "#858b94",
        fontSize: "12px"
    },


    logoutButton: {
        padding: "9px 17px",
        background: "#ffffff",
        color: "#a33d3d",
        border: "1px solid #e2bebe",
        borderRadius: "5px",
        fontSize: "13px",
        cursor: "pointer"
    }

};
