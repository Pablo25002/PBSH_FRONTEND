import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../services/customerService';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', estado: 'Activo' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (err) {
            setError('No se pudieron cargar los clientes');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCustomer(editingId, formData);
            } else {
                await createCustomer(formData);
            }
            setFormData({ nombre: '', correo: '', telefono: '', estado: 'Activo' });
            setEditingId(null);
            loadCustomers();
        } catch (err) {
            setError(err.errores ? err.errores.join(', ') : 'Error al guardar');
        }
    };

    const handleEdit = (c) => {
        setEditingId(c._id);
        setFormData({ nombre: c.nombre, correo: c.correo, telefono: c.telefono, estado: c.estado });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este cliente?')) {
            await deleteCustomer(id);
            loadCustomers();
        }
    };

    // Estilo unificado para asegurar legibilidad (Negro sobre Blanco)
    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        backgroundColor: '#ffffff', // Fondo blanco forzado
        color: '#000000',           // Texto negro forzado
        marginTop: '5px'
    };

    return (
        /* CONTENEDOR CENTRADO UNIFICADO */
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            
            <h2 style={{ marginBottom: '25px', color: '#1e293b', fontWeight: 'bold' }}>
                Gestión de Clientes
            </h2>
            
            {error && (
                <div style={{ color: 'white', background: '#ef4444', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                marginBottom: '40px' 
            }}>
                <h3 style={{ marginBottom: '20px', color: '#334155', fontSize: '1.1rem' }}>
                    {editingId ? '📝 Editar Cliente' : '👤 Nuevo Cliente'}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Nombre:</label>
                        <input 
                            style={inputStyle} 
                            placeholder="Ej: Juan Pérez" 
                            value={formData.nombre} 
                            onChange={e => setFormData({...formData, nombre: e.target.value})} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Correo Electrónico:</label>
                        <input 
                            style={inputStyle} 
                            type="email" 
                            placeholder="juan@correo.com" 
                            value={formData.correo} 
                            onChange={e => setFormData({...formData, correo: e.target.value})} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Teléfono:</label>
                        <input 
                            style={inputStyle} 
                            placeholder="8888-8888" 
                            value={formData.telefono} 
                            onChange={e => setFormData({...formData, telefono: e.target.value})} 
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
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="submit" style={{ 
                        padding: '12px 25px', 
                        background: '#10b981', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}>
                        {editingId ? '💾 Actualizar' : '➕ Guardar Cliente'}
                    </button>
                    
                    {editingId && (
                        <button 
                            type="button"
                            onClick={() => {setEditingId(null); setFormData({nombre:'', correo:'', telefono:'', estado:'Activo'})}} 
                            style={{ 
                                marginLeft: '10px', 
                                backgroundColor: '#94a3b8', 
                                color: 'white', 
                                border: 'none', 
                                padding: '12px 25px', 
                                borderRadius: '8px', 
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Nombre</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Correo</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Teléfono</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>Estado</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px', fontWeight: '500' }}>{c.nombre}</td>
                                <td style={{ padding: '15px', color: '#64748b' }}>{c.correo}</td>
                                <td style={{ padding: '15px' }}>{c.telefono || '-'}</td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <span style={{ 
                                        padding: '5px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '12px', 
                                        fontWeight: 'bold',
                                        background: c.estado === 'Activo' ? '#dcfce7' : '#fee2e2', 
                                        color: c.estado === 'Activo' ? '#166534' : '#991b1b' 
                                    }}>
                                        {c.estado}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button onClick={() => handleEdit(c)} style={{ marginRight: '15px', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>✏️</button>
                                    <button onClick={() => handleDelete(c._id)} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;