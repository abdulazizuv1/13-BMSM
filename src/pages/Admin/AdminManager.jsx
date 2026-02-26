import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Skeleton from '../../components/UI/Skeleton';

const AdminManager = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '', role: '', photoUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);

    const adminCollectionRef = collection(db, 'administration');

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const data = await getDocs(adminCollectionRef);
            setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error fetching administration data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleOpenModal = (admin = null) => {
        if (admin) {
            setFormData({ name: admin.name, role: admin.role, photoUrl: admin.photoUrl });
            setEditingId(admin.id);
        } else {
            setFormData({ name: '', role: '', photoUrl: '' });
            setEditingId(null);
        }
        setImageFile(null);
        setModalOpen(true);
    };

    const handleImageUpload = async () => {
        if (!imageFile) return formData.photoUrl;
        const imageRef = ref(storage, `administration/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        return await getDownloadURL(imageRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let finalPhotoUrl = formData.photoUrl;
            if (imageFile) {
                finalPhotoUrl = await handleImageUpload();
            }

            if (editingId) {
                const adminDoc = doc(db, 'administration', editingId);
                await updateDoc(adminDoc, { ...formData, photoUrl: finalPhotoUrl });
            } else {
                await addDoc(adminCollectionRef, { ...formData, photoUrl: finalPhotoUrl });
            }
            setModalOpen(false);
            fetchAdmins();
        } catch (error) {
            console.error("Error submitting administration data", error);
            alert("Xatolik yuz berdi");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
            try {
                const adminDoc = doc(db, 'administration', id);
                await deleteDoc(adminDoc);
                fetchAdmins();
            } catch (error) {
                console.error("Error deleting administration record", error);
            }
        }
    };

    return (
        <div className="manager-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2>Administratsiya</h2>
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
                                <th>F.I.SH</th>
                                <th>Lavozimi</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        {t.photoUrl ? <img src={t.photoUrl} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /> : 'Yo\'q'}
                                    </td>
                                    <td>{t.name}</td>
                                    <td>{t.role}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button onClick={() => handleOpenModal(t)} className="btn-icon btn-edit"><FiEdit /></button>
                                            <button onClick={() => handleDelete(t.id)} className="btn-icon btn-delete"><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {admins.length === 0 && (
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
                                <label>F.I.SH</label>
                                <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Lavozimi</label>
                                <input type="text" className="form-control" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Rasm yuklash</label>
                                <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                                {formData.photoUrl && !imageFile && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'green' }}>Eski rasm saqlangan</p>}
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

export default AdminManager;
