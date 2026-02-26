import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Skeleton from '../../components/UI/Skeleton';
import './Faxrlar.css';

const Faxrlar = () => {
    const [achievers, setAchievers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCards, setExpandedCards] = useState({});

    useEffect(() => {
        const fetchAchievers = async () => {
            try {
                const achieversCollectionRef = collection(db, 'achievers');
                const data = await getDocs(achieversCollectionRef);
                setAchievers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching achievers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievers();
    }, []);

    const toggleExpand = (id) => {
        setExpandedCards((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="faxrlar-page" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="fade-in-manual">
                    <h1 className="page-title">Maktabimiz Faxrlari</h1>
                    <p className="page-subtitle">Iqtidorli o'quvchilarimiz va ularning yutuqlari</p>

                    {loading ? (
                        <div className="faxrlar-grid">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="faxr-card-skeleton">
                                    <Skeleton height="250px" />
                                    <div style={{ padding: '1.5rem' }}>
                                        <Skeleton height="28px" width="60%" className="mb-2" />
                                        <Skeleton height="80px" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="faxrlar-grid">
                            {achievers.length > 0 ? (
                                achievers.map((achiever) => {
                                    const isExpanded = expandedCards[achiever.id];
                                    const needsExpansion = achiever.content && achiever.content.length > 150;

                                    return (
                                        <div key={achiever.id} className="faxr-card">
                                            <div className="card-image-wrapper">
                                                {achiever.imageUrl ? (
                                                    <img src={achiever.imageUrl} alt={achiever.name} className="card-image" />
                                                ) : (
                                                    <div className="placeholder-image">Rasmsiz</div>
                                                )}
                                            </div>
                                            <div className="card-content">
                                                <h3 className="card-title">{achiever.name}</h3>
                                                <div className="card-description-wrapper">
                                                    <p className={`card-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
                                                        {achiever.content}
                                                    </p>
                                                    {needsExpansion && (
                                                        <button
                                                            className="read-more-btn"
                                                            onClick={() => toggleExpand(achiever.id)}
                                                        >
                                                            {isExpanded ? 'Kamroq o\'qish' : 'Read more'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
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

export default Faxrlar;
