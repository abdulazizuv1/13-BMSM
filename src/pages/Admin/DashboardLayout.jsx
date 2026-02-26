import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { FiUsers, FiFileText, FiBriefcase, FiLogOut, FiHome, FiStar, FiMap } from 'react-icons/fi';
import './Admin.css';

const DashboardLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (loading) {
        return <div className="admin-loading">Yuklanmoqda...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const menuItems = [
        { title: "Bosh Sahifa", path: "/admin", icon: <FiHome /> },
        { title: "O'qituvchilar", path: "/admin/teachers", icon: <FiUsers /> },
        { title: "Administratsiya", path: "/admin/administration", icon: <FiBriefcase /> },
        { title: "Yangiliklar", path: "/admin/news", icon: <FiFileText /> },
        { title: "Maktabimiz Faxrlari", path: "/admin/achievers", icon: <FiStar /> },
        { title: "Yo'nalishlar", path: "/admin/directions", icon: <FiMap /> },
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar islimi-bg">
                <div className="sidebar-header">
                    <h2>13-BMSM Admin</h2>
                    <p>{user.email}</p>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                            return (
                                <li key={index}>
                                    <Link to={item.path} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <FiLogOut /> Chiqish
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Boshqaruv Paneli</h1>
                    <Link to="/" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Saytga qaytish</Link>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
