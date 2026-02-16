import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '', estado: 'Activo' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { loadCategories(); }, []);

    const loadCategories = async () => {
        try { const data = await getCategories(); setCategories(data); } 
        catch (err) { setError('Error al cargar datos'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) { await updateCategory(editingId, formData); } 
            else { await createCategory(formData); }
            setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
            setEditingId(null);
            loadCategories();
        } catch (err) { setError(err.msg || 'Error al procesar'); }
    };

    const handleEdit = (cat) => {
        setEditingId(cat._id);
        setFormData({ nombre: cat.nombre, descripcion: cat.descripcion || '', estado: cat.estado });
    };

    // Estilo para asegurar legibilidad (Negro sobre Blanco)
    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        color: '#000000',
        marginTop: '5px'
    };

    return (
        /* CONTENEDOR CENTRADO IGUAL QUE CLIENTES Y PRODUCTOS */
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            
            <h2 style={{ marginBottom: '25px', color: '#1e293b', fontWeight: 'bold' }}>
                Gestión de Categorías
            </h2>
            
            {error && <div style={{ color: 'white', background: '#ef4444', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                marginBottom: '40px' 
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Nombre:</label>
                        <input 
                            style={inputStyle} 
                            value={formData.nombre} 
                            onChange={e => setFormData({...formData, nombre: e.target.value})} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Estado:</label>
                        <select 
                            style={inputStyle} 
                            value={formData.estado} 
                            onChange={e => setFormData({...formData, estado: e.target.value})}
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Descripción:</label>
                        <textarea 
                            style={{ ...inputStyle, height: '80px' }} 
                            value={formData.descripcion} 
                            onChange={e => setFormData({...formData, descripcion: e.target.value})} 
                        />
                    </div>
                </div>
                <button type="submit" style={{ 
                    marginTop: '20px', 
                    padding: '12px 25px', 
                    background: '#10b981', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }}>
                    {editingId ? '💾 Actualizar Categoría' : '➕ Crear Categoría'}
                </button>
                {editingId && (
                    <button 
                        type="button"
                        onClick={() => { setEditingId(null); setFormData({ nombre: '', descripcion: '', estado: 'Activo' }); }}
                        style={{ marginLeft: '10px', background: '#94a3b8', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Nombre</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Estado</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px', fontWeight: '500' }}>{cat.nombre}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '5px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '12px', 
                                        fontWeight: 'bold',
                                        background: cat.estado === 'Activo' ? '#dcfce7' : '#fee2e2', 
                                        color: cat.estado === 'Activo' ? '#166534' : '#991b1b' 
                                    }}>
                                        {cat.estado}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button onClick={() => handleEdit(cat)} style={{ marginRight: '15px', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>✏️</button>
                                    <button onClick={async () => { if(window.confirm('¿Eliminar categoría?')) { await deleteCategory(cat._id); loadCategories(); } }} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;