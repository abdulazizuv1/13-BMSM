import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Skeleton from '../../components/UI/Skeleton';
import './Yonalishlar.css';

const Yonalishlar = () => {
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDirections = async () => {
            try {
                const directionsCollectionRef = collection(db, 'directions');
                const data = await getDocs(directionsCollectionRef);
                setDirections(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching directions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDirections();
    }, []);

    return (
        <div className="yonalishlar-page" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="fade-in-manual">
                    <h1 className="page-title">Yo'nalishlar</h1>
                    <p className="page-subtitle">Maktabimizdagi mavjud yo'nalishlar bilan tanishing</p>

                    {loading ? (
                        <div className="directions-grid">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="direction-card-skeleton">
                                    <Skeleton height="200px" />
                                    <div style={{ padding: '1.5rem' }}>
                                        <Skeleton height="28px" width="70%" className="mb-2" />
                                        <Skeleton height="60px" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="directions-grid">
                            {directions.length > 0 ? (
                                directions.map((direction) => (
                                    <div key={direction.id} className="direction-card">
                                        <div className="card-image-wrapper">
                                            {direction.imageUrl ? (
                                                <img src={direction.imageUrl} alt={direction.title} className="card-image" />
                                            ) : (
                                                <div className="placeholder-image">Rasmsiz</div>
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{direction.title}</h3>
                                            <p className="card-description">{direction.content}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', width: '100%', color: 'var(--color-text-light)' }}>
                                    Hozircha yo'nalishlar qo'shilmagan.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Yonalishlar;
