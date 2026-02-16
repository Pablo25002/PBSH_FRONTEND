import React, { useState, useEffect } from 'react';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../../services/supplierService';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({ 
        nombre: '', contacto: '', telefono: '', correo: '', direccion: '', estado: 'Activo' 
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { loadSuppliers(); }, []);

    const loadSuppliers = async () => {
        try { const data = await getSuppliers(); setSuppliers(data); } 
        catch (err) { setError('No se pudieron cargar los proveedores'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) { await updateSupplier(editingId, formData); } 
            else { await createSupplier(formData); }
            resetForm();
            loadSuppliers();
        } catch (err) { setError(err.msg || 'Error al procesar proveedor'); }
    };

    const resetForm = () => {
        setFormData({ nombre: '', contacto: '', telefono: '', correo: '', direccion: '', estado: 'Activo' });
        setEditingId(null);
        setError(null);
    };

    const handleEdit = (s) => {
        setEditingId(s._id);
        setFormData({ 
            nombre: s.nombre, contacto: s.contacto, telefono: s.telefono, 
            correo: s.correo || '', direccion: s.direccion || '', estado: s.estado 
        });
    };

    const inputStyle = {
        width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px',
        backgroundColor: '#ffffff', color: '#000000', marginTop: '5px'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ marginBottom: '25px', color: '#1e293b', fontWeight: 'bold' }}>Gestión de Proveedores</h2>

            {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ 
                background: 'white', padding: '30px', borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '40px' 
            }}>
                <h3 style={{ marginBottom: '20px', color: '#334155', fontSize: '1.1rem' }}>
                    {editingId ? '📝 Editar Proveedor' : '🏢 Nuevo Proveedor'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Nombre Empresa:</label>
                        <input style={inputStyle} value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Persona de Contacto:</label>
                        <input style={inputStyle} value={formData.contacto} onChange={e => setFormData({...formData, contacto: e.target.value})} required />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Teléfono:</label>
                        <input style={inputStyle} value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} required />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Correo:</label>
                        <input style={inputStyle} type="email" value={formData.correo} onChange={e => setFormData({...formData, correo: e.target.value})} />
                    </div>
                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Estado:</label>
                        <select style={inputStyle} value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Dirección:</label>
                        <input style={inputStyle} value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} />
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="submit" style={{ padding: '12px 25px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {editingId ? '💾 Actualizar' : '➕ Guardar Proveedor'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} style={{ marginLeft: '10px', background: '#94a3b8', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer' }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Empresa</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Contacto</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Teléfono</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>Estado</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(s => (
                            <tr key={s._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px', fontWeight: '600' }}>{s.nombre}</td>
                                <td style={{ padding: '15px' }}>{s.contacto}</td>
                                <td style={{ padding: '15px' }}>{s.telefono}</td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', background: s.estado === 'Activo' ? '#dcfce7' : '#fee2e2', color: s.estado === 'Activo' ? '#166534' : '#991b1b' }}>
                                        {s.estado}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button onClick={() => handleEdit(s)} style={{ marginRight: '15px', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>✏️</button>
                                    <button onClick={async () => { if(window.confirm('¿Eliminar?')) { await deleteSupplier(s._id); loadSuppliers(); } }} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Suppliers;