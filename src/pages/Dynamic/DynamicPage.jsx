import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '../../components/UI/Skeleton';
import { FiDownload } from 'react-icons/fi';

const DynamicPage = () => {
    const { category, slug } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching page data
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [category, slug]);

    const pageTitle = category === 'talim' && slug === 'reja'
        ? "O'quv reja"
        : category === 'hujjatlar' && slug === 'rasmiy'
            ? "Rasmiy hujjatlar"
            : `${category} ${slug}`.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="dynamic-page" style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                {loading ? (
                    <div>
                        <Skeleton height="40px" width="30%" className="mb-4" />
                        <Skeleton height="300px" className="mb-4" />
                        <Skeleton height="20px" className="mb-2" />
                        <Skeleton height="20px" className="mb-2" />
                        <Skeleton height="20px" className="mb-2" />
                        <Skeleton height="20px" width="80%" />
                    </div>
                ) : (
                    <div className="fade-in-manual">
                        <h1 style={{ color: 'var(--color-primary)', marginBottom: '2rem', textTransform: 'capitalize' }}>
                            {pageTitle}
                        </h1>

                        <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
                            {!(category === 'talim' && slug === 'reja') && !(category === 'hujjatlar' && slug === 'rasmiy') && !(category === 'maktab' && slug === 'haqida') && (
                                <img
                                    src="https://via.placeholder.com/800x400/3232c2/fff?text=Sahifa+Rasmi"
                                    alt="Placeholder"
                                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '2rem' }}
                                />
                            )}

                            {category === 'talim' && slug === 'reja' ? (
                                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Maktabning O'quv Rejasi</h2>
                                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                                        Musiqa va san'at maktabining tasdiqlangan o'quv rejasi bilan tanishib chiqing va yuklab oling.
                                    </p>
                                    <a
                                        href="https://firebasestorage.googleapis.com/v0/b/bmsm-49594.firebasestorage.app/o/o'quv%20reja%2F%D0%A3%CC%86%D2%9B%D1%83%D0%B2%20%D1%80%D0%B5%D0%B6%D0%B0%2030.12.2019%20%D0%B8%CC%86%D0%B8%D0%BB.PDF?alt=media&token=f4d87365-2060-4cd8-a710-25d520ac506c"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1.1rem', borderRadius: '8px' }}
                                    >
                                        <FiDownload size={20} /> O'quv rejani yuklab olish
                                    </a>
                                </div>
                            ) : category === 'hujjatlar' && slug === 'rasmiy' ? (
                                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Maktabning Rasmiy Hujjatlari</h2>
                                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                                        Maktabimizning asosiy pasporti va boshqa rasmiy elektron hujjatlari bilan tanishishingiz va yuklab olishingiz mumkin.
                                    </p>
                                    <a
                                        href="https://firebasestorage.googleapis.com/v0/b/bmsm-49594.firebasestorage.app/o/maktab%20passporti%2F13_%D0%91%D0%9C%D0%A1%D0%9C%20%D0%9F%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%82%20%2B2026-%D0%B8%CC%86%D0%B8%D0%BB.docx?alt=media&token=61a900d6-8378-4687-97af-14d29f358f49"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1.1rem', borderRadius: '8px' }}
                                    >
                                        <FiDownload size={20} /> Maktab passportini yuklab olish
                                    </a>
                                </div>
                            ) : category === 'maktab' && slug === 'haqida' ? (
                                <div style={{ padding: '0 1rem' }}>
                                    <p style={{ color: 'var(--color-text)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.05rem', textAlign: 'justify' }}>
                                        O‘zbekiston Respublikasi Madaniyat vazirligi tasarrufidagi Farg‘ona viloyati Quva tumani 13-son bolalar musiqa va san’at maktabi 1967-yilda tashkil etilgan bo‘lib, bugungi kunda hududdagi yetakchi madaniy-ta’lim muassasalaridan biri hisoblanadi.
                                    </p>
                                    <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid var(--color-primary)' }}>
                                        <p style={{ marginBottom: '0.5rem' }}>
                                            <strong>Maktab manzili:</strong>{' '}
                                            <a href="https://maps.app.goo.gl/wVuZjuUvhXGeXYMe6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                                                Farg‘ona viloyati, Quva tumani, So‘fi MFY, 55A-uy.
                                            </a>
                                        </p>
                                        <p style={{ margin: 0 }}><strong>Maktab direktori:</strong> Rahimova Shahnoza Toxirovna.</p>
                                    </div>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
                                        Maktab hududi 5279,5 kvadrat metrni tashkil etadi. Ta’lim muassasasi binosi 2013-yil sentabr oyida kapital rekonstruksiya qilinib, zamonaviy talablar asosida qayta jihozlangan. Rekonstruksiya ishlari uchun jami 1 milliard 849 million so‘m mablag‘ sarflangan. Bugungi kunda maktab zamonaviy o‘quv xonalari, qulay infratuzilma va barcha zarur sharoitlarga ega.
                                    </p>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
                                        Maktabning mavjud quvvati 150 o‘rinni tashkil etadi. Ta’lim jarayoni 1-sinfdan 7-sinfgacha bo‘lgan o‘quvchilarni qamrab oladi. Hozirgi kunda maktabda 224 nafar o‘quvchi tahsil olmoqda. Shundan 84 nafari o‘g‘il bolalar, 140 nafari esa qiz bolalardir.
                                    </p>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
                                        Maktabda 32 nafar malakali pedagog-o‘qituvchilar faoliyat yuritadi. Ularning 2 nafari oliy toifali, 5 nafari birinchi toifali, 7 nafari ikkinchi toifali mutaxassislardan iborat. O‘qituvchilarning katta qismi oliy va o‘rta maxsus ma’lumotga ega bo‘lib, ta’lim sifati va samaradorligini oshirish yo‘lida tinimsiz mehnat qilmoqda.
                                    </p>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
                                        Muassasada 150 o‘rinli faollar zali, keng va qulay kutubxona hamda 29 ta zamonaviy jihozlangan o‘quv xonasi mavjud. Maktab kutubxonasida 957 dan ortiq musiqiy adabiyotlar, nota to‘plamlari va o‘quv qo‘llanmalar jamlangan bo‘lib, o‘quvchilarning bilim va malakasini oshirishga xizmat qiladi.
                                    </p>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
                                        Maktabda o‘quvchilarning ijodiy qobiliyatlarini rivojlantirish, san’atga bo‘lgan qiziqishini kuchaytirish, milliy va jahon musiqa madaniyatiga hurmat ruhida tarbiyalashga alohida e’tibor qaratiladi. O‘quvchilar turli ko‘rik-tanlovlar, festivallar va madaniy tadbirlarda faol ishtirok etib, sovrinli o‘rinlarni qo‘lga kiritib kelmoqda.
                                    </p>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
                                        Turli yillarda ushbu maktabni tamomlagan bitiruvchilar orasidan taniqli san’at ustalari yetishib chiqqan. Jumladan, O‘zbekiston xalq hofizi Erkin Ro‘zmatov ushbu dargoh bitiruvchilaridan biridir.
                                    </p>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'justify' }}>
                                        13-son bolalar musiqa va san’at maktabi bugungi kunda yosh avlodning ijodiy salohiyatini rivojlantirish, iste’dodlarni kashf etish va qo‘llab-quvvatlash yo‘lida samarali faoliyat olib bormoqda.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Bu yerda {pageTitle} ma'lumotlari bo'ladi</h2>

                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>

                                    <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8' }}>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicPage;
