import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Skeleton from '../../components/UI/Skeleton';

const NewsManager = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '', date: '', content: '', imageUrls: []
    });
    const [imageFiles, setImageFiles] = useState([]);

    const newsCollectionRef = collection(db, 'news');

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await getDocs(newsCollectionRef);
            setNewsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error fetching news", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleOpenModal = (newsItem = null) => {
        if (newsItem) {
            setFormData({
                title: newsItem.title,
                date: newsItem.date,
                content: newsItem.content,
                imageUrls: newsItem.imageUrls || (newsItem.imageUrl ? [newsItem.imageUrl] : [])
            });
            setEditingId(newsItem.id);
        } else {
            setFormData({ title: '', date: new Date().toISOString().split('T')[0], content: '', imageUrls: [] });
            setEditingId(null);
        }
        setImageFiles([]);
        setModalOpen(true);
    };

    const handleImageUpload = async () => {
        if (!imageFiles || imageFiles.length === 0) return formData.imageUrls;

        const uploadPromises = Array.from(imageFiles).map(async (file) => {
            const imageRef = ref(storage, `news/${Date.now()}_${file.name}`);
            await uploadBytes(imageRef, file);
            return await getDownloadURL(imageRef);
        });

        const urls = await Promise.all(uploadPromises);
        return urls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let finalImageUrls = formData.imageUrls;
            if (imageFiles && imageFiles.length > 0) {
                finalImageUrls = await handleImageUpload();
            }

            if (editingId) {
                const newsDoc = doc(db, 'news', editingId);
                await updateDoc(newsDoc, { ...formData, imageUrls: finalImageUrls });
            } else {
                await addDoc(newsCollectionRef, { ...formData, imageUrls: finalImageUrls });
            }
            setModalOpen(false);
            fetchNews();
        } catch (error) {
            console.error("Error submitting news", error);
            alert("Xatolik yuz berdi");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
            try {
                const newsDoc = doc(db, 'news', id);
                await deleteDoc(newsDoc);
                fetchNews();
            } catch (error) {
                console.error("Error deleting news", error);
            }
        }
    };

    return (
        <div className="manager-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2>Yangiliklar</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiPlus /> Yangi Qo'shish
                </button>
            </div>

            <div className="table-container">
                {loading ? (
                    <div style={{ padding: '2rem' }}>
                        <Skeleton height="40px" className="mb-2" />
                        <Skeleton height="40px" className="mb-2" />
                        <Skeleton height="40px" />
                    </div>
                ) : (
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Rasm</th>
                                <th>Sarlavha</th>
                                <th>Sana</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsList.map((n) => (
                                <tr key={n.id}>
                                    <td>
                                        {n.imageUrls && n.imageUrls.length > 0 ? (
                                            <img src={n.imageUrls[0]} alt={n.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ) : n.imageUrl ? (
                                            <img src={n.imageUrl} alt={n.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ) : 'Yo\'q'}
                                    </td>
                                    <td>{(n.title && n.title.length > 50) ? n.title.substring(0, 50) + '...' : (n.title || 'Sarlavhasiz')}</td>
                                    <td>{n.date}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button onClick={() => handleOpenModal(n)} className="btn-icon btn-edit"><FiEdit /></button>
                                            <button onClick={() => handleDelete(n.id)} className="btn-icon btn-delete"><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {newsList.length === 0 && (
                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Ma'lumot topilmadi</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? "Tahrirlash" : "Qo'shish"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Sarlavha</label>
                                <input type="text" className="form-control" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Sana</label>
                                <input type="date" className="form-control" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Maqola Matni</label>
                                <textarea className="form-control" rows="5" required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Rasmlar yuklash (Bir nechta tanlash mumkin)</label>
                                <input type="file" multiple className="form-control" accept="image/*" onChange={(e) => setImageFiles(e.target.files)} />
                                {(formData.imageUrls && formData.imageUrls.length > 0) && (!imageFiles || imageFiles.length === 0) && (
                                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'green' }}>{formData.imageUrls.length} ta eski rasm saqlangan</p>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn-primary" disabled={uploading}>
                                    {uploading ? 'Saqlanmoqda...' : 'Saqlash'}
                                </button>
                                <button type="button" className="btn-outline" onClick={() => setModalOpen(false)}>Bekor qilish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManager;
