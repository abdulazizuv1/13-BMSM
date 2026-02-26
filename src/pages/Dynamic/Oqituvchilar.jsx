import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Skeleton from '../../components/UI/Skeleton';
import './Oqituvchilar.css';

const Oqituvchilar = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachersCollectionRef = collection(db, 'teachers');
                const data = await getDocs(teachersCollectionRef);
                setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching teachers data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className="oqituvchilar-page" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="fade-in-manual">
                    <h1 className="page-title">O'qituvchi va xodimlar</h1>
                    <p className="page-subtitle">Maktabimizning tajribali, o'z kasbining ustalari bo'lgan ustozlar jamoasi</p>

                    {loading ? (
                        <div className="oqituvchilar-grid">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="oqituvchilar-card-skeleton">
                                    <Skeleton height="350px" />
                                    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        <Skeleton height="28px" width="80%" className="mb-2 mx-auto" style={{ margin: '0 auto' }} />
                                        <Skeleton height="20px" width="50%" className="mx-auto" style={{ margin: '0 auto' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="oqituvchilar-grid">
                            {teachers.length > 0 ? (
                                teachers.map((teacher) => (
                                    <div key={teacher.id} className="oqituvchilar-card">
                                        <div className="card-image-wrapper">
                                            {teacher.photoUrl ? (
                                                <img src={teacher.photoUrl} alt={teacher.name} className="card-image" />
                                            ) : (
                                                <div className="placeholder-image">Rasmsiz</div>
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{teacher.name}</h3>
                                            <p className="card-role">{teacher.subject}</p>
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

export default Oqituvchilar;
