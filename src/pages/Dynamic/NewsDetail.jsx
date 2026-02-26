import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiCalendar, FiUser, FiTag, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Skeleton from '../../components/UI/Skeleton';

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, 'news', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNews({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching news detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '4rem' }}>
                <Skeleton height="30px" width="200px" className="mb-4" />
                <Skeleton height="60px" width="80%" className="mb-4" />
                <Skeleton height="20px" width="300px" className="mb-4" />
                <Skeleton height="500px" className="mb-4" />
                <Skeleton height="20px" className="mb-2" />
                <Skeleton height="20px" className="mb-2" />
                <Skeleton height="20px" className="mb-2" />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="container" style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--color-primary)' }}>Yangilik topilmadi</h2>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>Asosiy sahifaga qaytish</Link>
            </div>
        );
    }

    // Combine imageUrls and fallback to old imageUrl if exists
    const allImages = news.imageUrls && news.imageUrls.length > 0
        ? news.imageUrls
        : (news.imageUrl ? [news.imageUrl] : []);

    const mainImage = allImages.length > 0 ? allImages[0] : 'https://via.placeholder.com/800x500/1A1B41/fff?text=Rasm+Yoq';

    return (
        <div className="news-detail-page" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '5rem', backgroundColor: 'var(--color-bg)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                {/* Breadcrumbs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)' }}>
                        <FiArrowLeft /> Bosh sahifa
                    </Link>
                    <span>/</span>
                    <span>Yangiliklar</span>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>{news.title.length > 30 ? news.title.substring(0, 30) + '...' : news.title}</span>
                </div>

                <div className="news-content-box" style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '3rem', boxShadow: 'var(--shadow-md)' }}>

                    {/* Header */}
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', lineHeight: '1.3' }}>
                        {news.title}
                    </h1>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCalendar /> {news.date}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiUser /> Admin</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiTag /> Yangilik</span>
                    </div>

                    {/* Main Image */}
                    <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={mainImage} alt={news.title} style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', display: 'block' }} />
                    </div>

                    {/* Carousel for Extra Images */}
                    {allImages.length > 1 && (
                        <div style={{ marginBottom: '3rem' }}>
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={15}
                                slidesPerView={2}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 }
                                }}
                                style={{ paddingBottom: '40px' }}
                            >
                                {allImages.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div style={{ height: '150px', borderRadius: '8px', overflow: 'hidden', border: '2px solid transparent', cursor: 'pointer' }} className="carousel-img-hover">
                                            <img src={img} alt={`Slide ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {/* Content text */}
                    <div className="news-body-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>
                        {news.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
