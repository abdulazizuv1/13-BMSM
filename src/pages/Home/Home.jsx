import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare, FiShield, FiUsers, FiBook, FiAward } from 'react-icons/fi';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Skeleton from '../../components/UI/Skeleton';
import './Home.css';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [bgLoaded, setBgLoaded] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const q = query(collection(db, 'news'), orderBy('date', 'desc'), limit(5));
                const data = await getDocs(q);
                setNews(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        const bgUrl = 'https://firebasestorage.googleapis.com/v0/b/bmsm-49594.firebasestorage.app/o/hero_bg%2Fbg.png?alt=media&token=588be05f-9f14-4b3b-858e-3593dd1afe7c';
        const img = new Image();
        img.src = bgUrl;
        img.onload = () => {
            setBgLoaded(true);
        };
    }, []);

    return (
        <div className="home-page">
            {!bgLoaded && (
                <div className="full-page-loader">
                    <img src="/images/logo.png" alt="Loading Logo" className="loader-logo" />
                </div>
            )}
            {/* Hero Section */}
            <section className="hero islimi-bg">
                <div className="container hero-content">
                    <motion.h1
                        data-aos="fade-up"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-title"
                    >
                        Farg'ona viloyati Quva tumani <br />
                        <span className="text-secondary">13-sonli musiqa va san'at maktabi</span>
                    </motion.h1>
                    <motion.p
                        data-aos="fade-up" data-aos-delay="200"
                        className="hero-subtitle"
                    >
                        Iste'dodli yoshlarni kashf etamiz va ularning san'at olamidagi ilk qadamlarini qo'llab-quvvatlaymiz!
                    </motion.p>
                    <motion.div data-aos="fade-up" data-aos-delay="400" className="hero-buttons">
                        <Link to="/page/maktab/haqida" className="btn-primary">Maktab haqida</Link>
                        <button className="btn-outline" onClick={() => {
                            const footer = document.getElementById('contact');
                            if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                        }}>Bog'lanish</button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card" data-aos="zoom-in" data-aos-delay="0">
                            <h2 className="stat-number">2013</h2>
                            <p className="stat-label">Rekonstruksiya qilingan yil</p>
                        </div>
                        <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
                            <h2 className="stat-number">150</h2>
                            <p className="stat-label">Maktab sig'imi (o'rin)</p>
                        </div>
                        <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
                            <h2 className="stat-number">224</h2>
                            <p className="stat-label">Hozirgi o'quvchilar soni</p>
                        </div>
                        <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
                            <h2 className="stat-number">11</h2>
                            <p className="stat-label">Mavjud yo'nalishlar</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content" data-aos="fade-right">
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Biz Haqimizda</h2>
                            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1.05rem', textAlign: 'justify' }}>
                                O‘zbekiston Respublikasi Madaniyat vazirligi tasarrufidagi Farg‘ona viloyati Quva tumani 13-son bolalar musiqa va san’at maktabi 1967-yilda tashkil etilgan bo‘lib, bugungi kunda hududdagi yetakchi madaniy-ta’lim muassasalaridan biri hisoblanadi.
                            </p>
                            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.05rem', textAlign: 'justify' }}>
                                Maktabda o‘quvchilarning ijodiy qobiliyatlarini rivojlantirish, san’atga bo‘lgan qiziqishini kuchaytirish, milliy va jahon musiqa madaniyatiga hurmat ruhida tarbiyalashga alohida e’tibor qaratiladi.
                            </p>
                            <Link to="/page/maktab/haqida" className="btn-primary" style={{ display: 'inline-block' }}>Batafsil ma'lumot</Link>
                        </div>
                        <div className="about-image-wrapper" data-aos="fade-left">
                            <div className="about-image-inner">
                                <img src="https://firebasestorage.googleapis.com/v0/b/bmsm-49594.firebasestorage.app/o/about_us%2Fabout_us.png?alt=media&token=a8297ac2-3e83-43f7-8400-fa3aac772702" alt="13-BMSM Maktab binosi" />
                            </div>
                            <div className="about-experience-badge">
                                <span className="years">55+</span>
                                <span className="text">yillik tajriba</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section bg-light">
                <div className="container">
                    <h2 className="section-title text-center" data-aos="fade-up">Bizning Afzalliklarimiz</h2>
                    <div className="features-grid">
                        {[
                            { title: "Zamonaviy jihozlar", desc: "Eng so'nggi rusumdagi musiqa asboblari va qulay darsxonalar.", icon: <FiShield size={24} color="#3232c2" /> },
                            { title: "Malakali ustozlar", desc: "Respublika va xalqaro ko'riklarda g'olib bo'lgan tajribali mutaxassislar.", icon: <FiUsers size={24} color="#3232c2" /> },
                            { title: "Boy kutubxona", desc: "Noyob notalar va san'atga oid ixtisoslashtirilgan adabiyotlar.", icon: <FiBook size={24} color="#3232c2" /> },
                            { title: "Musobaqalar", desc: "O'quvchilarimiz muntazam ravishda turli tanlov va festivallarda ishtirok etishadi.", icon: <FiAward size={24} color="#3232c2" /> }
                        ].map((feature, i) => (
                            <div key={i} className="feature-card glass" data-aos="fade-up" data-aos-delay={i * 100}>
                                <div className="feature-icon-placeholder" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                    <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(255, 217, 0, 0.4)' }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Preview Section */}
            <section className="news-preview">
                <div className="container">
                    <div className="section-header flex-between" data-aos="fade-right">
                        <h2 className="section-title">So'nggi Yangiliklar</h2>
                    </div>

                    <div className="news-slider-wrapper" style={{ padding: '1rem 0 3rem 0' }}>
                        {loading ? (
                            <div className="news-grid">
                                {/* Skeleton Loaders */}
                                {Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="news-card">
                                        <Skeleton height="200px" />
                                        <div className="news-content">
                                            <Skeleton height="15px" width="40%" className="mb-2" />
                                            <Skeleton height="25px" className="mb-2" />
                                            <Skeleton height="60px" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : news.length > 0 ? (
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000 }}
                                breakpoints={{
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 }
                                }}
                                style={{ paddingBottom: '3rem' }}
                            >
                                {news.map((item, i) => {
                                    const image = (item.imageUrls && item.imageUrls.length > 0) ? item.imageUrls[0] : (item.imageUrl || `https://via.placeholder.com/400x250/1A1B41/fff?text=Yangilik`);
                                    return (
                                        <SwiperSlide key={item.id} style={{ height: 'auto' }}>
                                            <div className="news-card fade-in-manual" style={{ animationDelay: `${i * 100}ms`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <div className="news-image">
                                                    <img src={image} alt={item.title} />
                                                </div>
                                                <div className="news-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <div className="news-date">{item.date}</div>
                                                    <h3 className="news-title">{item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title}</h3>
                                                    <p className="news-excerpt" style={{ flexGrow: 1 }}>
                                                        {item.content.length > 80 ? item.content.substring(0, 80) + '...' : item.content}
                                                    </p>
                                                    <Link to={`/news/${item.id}`} className="btn-outline" style={{ display: 'inline-block', marginTop: '1.5rem', alignSelf: 'flex-start', padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                                                        Batafsil
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        ) : (
                            <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>Hozircha yangiliklar yo'q.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-section" id="contact" style={{ padding: '5rem 0', backgroundColor: 'var(--color-white)' }}>
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info-side" data-aos="fade-right">
                            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Biz Bilan Bog'laning</h2>
                            <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                                Dasturlar, qabul va hamkorlik haqida ma'lumot olish uchun biz bilan bog'laning.
                            </p>

                            <div className="contact-card">
                                <div className="contact-icon-wrapper"><FiMail /></div>
                                <div>
                                    <h4>Email Manzil</h4>
                                    <p>quva13bmsm@umail.uz</p>
                                </div>
                            </div>
                            <div className="contact-card">
                                <div className="contact-icon-wrapper"><FiPhone /></div>
                                <div>
                                    <h4>Telefon Raqam</h4>
                                    <p><a href="tel:+998913276301" style={{ color: 'inherit', textDecoration: 'none' }}>+998 (91) 327 63 01</a></p>
                                </div>
                            </div>
                            <div className="contact-card">
                                <div className="contact-icon-wrapper"><FiMapPin /></div>
                                <div>
                                    <h4>Bizning Manzil</h4>
                                    <p>
                                        <a href="https://maps.app.goo.gl/wVuZjuUvhXGeXYMe6" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                            Farg‘ona viloyati, Quva tumani, So‘fi MFY, 55A-uy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-side" data-aos="fade-left">
                            <div className="form-wrapper">
                                <h3 className="text-center" style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '1.8rem' }}>Xabar Yuboring</h3>
                                <p className="text-center" style={{ color: 'var(--color-text-light)', marginBottom: '2rem', fontSize: '0.95rem' }}>Sizning fikr-mulohazalaringiz biz uchun muhim</p>

                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const text = `
Yangi Xabar:
Ism: ${formData.get('name')}
Telefon: ${formData.get('phone')}
Email: ${formData.get('email')}
Xabar: ${formData.get('message')}
                                    `;

                                    const botToken = '8571003959:AAEHDP9kdglW3IB6cX-WlpBY8N9Ec6OxlPw';
                                    const chatId = '1351499476';

                                    try {
                                        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                chat_id: chatId,
                                                text: text,
                                            }),
                                        });

                                        if (response.ok) {
                                            alert("Xabaringiz yuborildi!");
                                            e.target.reset();
                                        } else {
                                            alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
                                        }
                                    } catch (error) {
                                        console.error("Telegram xato:", error);
                                        alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
                                    }
                                }}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label><FiUser /> Ismingiz</label>
                                            <input type="text" name="name" className="form-control" placeholder="Ismingizni kiriting" required />
                                        </div>
                                        <div className="form-group">
                                            <label><FiPhone /> Telefon</label>
                                            <input type="tel" name="phone" className="form-control" placeholder="+998 (__) ___-__-__" required />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <label><FiMail /> Email</label>
                                        <input type="email" name="email" className="form-control" placeholder="sizning@email.uz" required />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <label><FiMessageSquare /> Xabar</label>
                                        <textarea className="form-control" name="message" rows="4" placeholder="Xabaringizni yozing..." required></textarea>
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}>
                                        Yuborish
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
