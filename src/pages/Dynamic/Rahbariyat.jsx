import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Skeleton from '../../components/UI/Skeleton';
import './Rahbariyat.css';

const Rahbariyat = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const adminCollectionRef = collection(db, 'administration');
                const data = await getDocs(adminCollectionRef);
                setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching administration data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    return (
        <div className="rahbariyat-page" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="fade-in-manual">
                    <h1 className="page-title">Rahbariyat</h1>
                    <p className="page-subtitle">Maktabimizning tajribali va jonkuyar rahbarlari</p>

                    {loading ? (
                        <div className="rahbariyat-grid">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="rahbariyat-card-skeleton">
                                    <Skeleton height="350px" />
                                    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        <Skeleton height="28px" width="80%" className="mb-2 mx-auto" style={{ margin: '0 auto' }} />
                                        <Skeleton height="20px" width="50%" className="mx-auto" style={{ margin: '0 auto' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rahbariyat-grid">
                            {admins.length > 0 ? (
                                admins.map((admin) => (
                                    <div key={admin.id} className="rahbariyat-card">
                                        <div className="card-image-wrapper">
                                            {admin.photoUrl ? (
                                                <img src={admin.photoUrl} alt={admin.name} className="card-image" />
                                            ) : (
                                                <div className="placeholder-image">Rasmsiz</div>
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{admin.name}</h3>
                                            <p className="card-role">{admin.role}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', width: '100%', color: 'var(--color-text-light)' }}>
                                    Hozircha ma'lumot qo'shilmagan.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rahbariyat;
