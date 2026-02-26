import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="dashboard-content">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Xush kelibsiz!</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                Bu paneldan veb-saytdagi barcha ma'lumotlarni boshqarishingiz mumkin.
            </p>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="dashboard-card">
                    <h3 style={{ color: 'var(--color-text)' }}>O'qituvchilar</h3>
                    <p style={{ margin: '1rem 0', color: 'var(--color-text-light)' }}>O'qituvchilar ro'yxatini tahrirlash</p>
                    <Link to="/admin/teachers" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>Boshqarish</Link>
                </div>
                <div className="dashboard-card">
                    <h3 style={{ color: 'var(--color-text)' }}>Administratsiya</h3>
                    <p style={{ margin: '1rem 0', color: 'var(--color-text-light)' }}>Rahbariyat ro'yxatini tahrirlash</p>
                    <Link to="/admin/administration" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>Boshqarish</Link>
                </div>
                <div className="dashboard-card">
                    <h3 style={{ color: 'var(--color-text)' }}>Yangiliklar</h3>
                    <p style={{ margin: '1rem 0', color: 'var(--color-text-light)' }}>Saytga yangilik qo'shish</p>
                    <Link to="/admin/news" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>Boshqarish</Link>
                </div>
                <div className="dashboard-card">
                    <h3 style={{ color: 'var(--color-text)' }}>Maktabimiz Faxrlari</h3>
                    <p style={{ margin: '1rem 0', color: 'var(--color-text-light)' }}>Iqtidorli o'quvchilarni tahrirlash</p>
                    <Link to="/admin/achievers" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>Boshqarish</Link>
                </div>
                <div className="dashboard-card">
                    <h3 style={{ color: 'var(--color-text)' }}>Yo'nalishlar</h3>
                    <p style={{ margin: '1rem 0', color: 'var(--color-text-light)' }}>Ta'lim yo'nalishlarini boshqarish</p>
                    <Link to="/admin/directions" className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>Boshqarish</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
