import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Skeleton from '../../components/UI/Skeleton';

const AchieversManager = () => {
    const [achievers, setAchievers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '', content: '', imageUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);

    const achieversCollectionRef = collection(db, 'achievers');

    const fetchAchievers = async () => {
        setLoading(true);
        try {
            const data = await getDocs(achieversCollectionRef);
            setAchievers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error fetching achievers", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievers();
    }, []);

    const handleOpenModal = (item = null) => {
        if (item) {
            setFormData({
                name: item.name,
                content: item.content,
                imageUrl: item.imageUrl
            });
            setEditingId(item.id);
        } else {
            setFormData({ name: '', content: '', imageUrl: '' });
            setEditingId(null);
        }
        setImageFile(null);
        setModalOpen(true);
    };

    const handleImageUpload = async () => {
        if (!imageFile) return formData.imageUrl;
        const imageRef = ref(storage, `achievers/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        return await getDownloadURL(imageRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let finalImageUrl = formData.imageUrl;
            if (imageFile) {
                finalImageUrl = await handleImageUpload();
            }

            if (editingId) {
                const itemDoc = doc(db, 'achievers', editingId);
                await updateDoc(itemDoc, { ...formData, imageUrl: finalImageUrl });
            } else {
                await addDoc(achieversCollectionRef, { ...formData, imageUrl: finalImageUrl });
            }
            setModalOpen(false);
            fetchAchievers();
        } catch (error) {
            console.error("Error submitting achiever", error);
            alert("Xatolik yuz berdi");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
            try {
                const itemDoc = doc(db, 'achievers', id);
                await deleteDoc(itemDoc);
                fetchAchievers();
            } catch (error) {
                console.error("Error deleting achiever", error);
            }
        }
    };

    return (
        <div className="manager-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2>Maktabimiz Faxrlari</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiPlus /> Yangi Qo'shish
                </button>
            </div>

            <div className="table-container">
                {loading ? (
                    <Skeleton height="200px" />
                ) : (
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Rasm</th>
                                <th>Ism / Sarlavha</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {achievers.map((n) => (
                                <tr key={n.id}>
                                    <td>
                                        {n.imageUrl ? <img src={n.imageUrl} alt={n.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /> : 'Yo\'q'}
                                    </td>
                                    <td>{n.name}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button onClick={() => handleOpenModal(n)} className="btn-icon btn-edit"><FiEdit /></button>
                                            <button onClick={() => handleDelete(n.id)} className="btn-icon btn-delete"><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {achievers.length === 0 && (
                                <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>Ma'lumot topilmadi</td></tr>
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
                                <label>O'quvchi Ismi yoki Sarlavha</label>
                                <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Yutuqlari (Matn)</label>
                                <textarea className="form-control" rows="5" required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Rasm yuklash</label>
                                <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn-primary" disabled={uploading}>{uploading ? 'Saqlanmoqda...' : 'Saqlash'}</button>
                                <button type="button" className="btn-outline" onClick={() => setModalOpen(false)}>Bekor qilish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AchieversManager;
