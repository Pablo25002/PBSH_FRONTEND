import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [formData, setFormData] = useState({ 
        nombre: '', codigoSKU: '', categoria: '', precioVenta: 0, stock: 0, descripcion: '', estado: 'Disponible' 
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { 
        loadProducts(); 
        loadCategories(); 
    }, []);

    const loadProducts = async () => {
        try { const data = await getProducts(); setProducts(data); } 
        catch (err) { setError('Error al cargar productos'); }
    };

    const loadCategories = async () => {
        try { 
            const data = await getCategories(); 
            setCategories(data.filter(c => c.estado === 'Activo')); 
        } catch (err) { console.error("Error cargando categorías"); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) { await updateProduct(editingId, formData); } 
            else { await createProduct(formData); }
            resetForm();
            loadProducts();
        } catch (err) { setError(err.msg || 'Error al guardar'); }
    };

    const resetForm = () => {
        setFormData({ nombre: '', codigoSKU: '', categoria: '', precioVenta: 0, stock: 0, descripcion: '', estado: 'Disponible' });
        setEditingId(null);
    };

    const handleEdit = (p) => {
        setEditingId(p._id);
        setFormData({ 
            nombre: p.nombre, codigoSKU: p.codigoSKU, 
            categoria: p.categoria?._id || p.categoria, 
            precioVenta: p.precioVenta, stock: p.stock, 
            descripcion: p.descripcion, estado: p.estado 
        });
    };

    // Estilo base para asegurar que el texto se vea (negro sobre blanco)
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
        /* ESTE CONTENEDOR CENTRA TODO IGUAL QUE EN CLIENTES */
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            
            <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'left', fontWeight: 'bold' }}>
                Gestión de Inventario
            </h2>

            {error && <p style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ 
                backgroundColor: '#fff', 
                padding: '30px', 
                borderRadius: '12px', 
                marginBottom: '40px', 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '20px', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            }}>
                <div>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Nombre del Producto:</label>
                    <input style={inputStyle} value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                </div>
                <div>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Código SKU:</label>
                    <input style={inputStyle} value={formData.codigoSKU} onChange={e => setFormData({...formData, codigoSKU: e.target.value})} required />
                </div>
                
                <div>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Categoría:</label>
                    <select 
                        style={inputStyle} 
                        value={formData.categoria} 
                        onChange={e => setFormData({...formData, categoria: e.target.value})} 
                        required
                    >
                        <option value="">-- Selecciona --</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Estado:</label>
                    <select style={inputStyle} value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                        <option value="Disponible">Disponible</option>
                        <option value="Agotado">Agotado</option>
                    </select>
                </div>

                <div>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Precio Venta:</label>
                    <input type="number" style={inputStyle} value={formData.precioVenta} onChange={e => setFormData({...formData, precioVenta: e.target.value})} required />
                </div>
                <div>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Stock Inicial:</label>
                    <input type="number" style={inputStyle} value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ color: '#475569', fontWeight: '600' }}>Descripción:</label>
                    <textarea style={{ ...inputStyle, height: '80px' }} value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
                </div>
                
                <button type="submit" style={{ 
                    gridColumn: 'span 2', 
                    padding: '14px', 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    fontSize: '16px',
                    transition: 'background 0.3s'
                }}>
                    {editingId ? '💾 Actualizar Producto' : '➕ Guardar Producto'}
                </button>
            </form>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '15px', color: '#64748b' }}>SKU</th>
                            <th style={{ color: '#64748b' }}>Nombre</th>
                            <th style={{ color: '#64748b' }}>Categoría</th>
                            <th style={{ color: '#64748b' }}>Precio</th>
                            <th style={{ color: '#64748b' }}>Stock</th>
                            <th style={{ color: '#64748b' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id} style={{ borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                                <td style={{ padding: '15px', fontWeight: '600' }}>{p.codigoSKU}</td>
                                <td>{p.nombre}</td>
                                <td><span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{p.categoria?.nombre || 'S/N'}</span></td>
                                <td>${p.precioVenta}</td>
                                <td style={{ color: p.stock < 5 ? '#ef4444' : '#1e293b', fontWeight: 'bold' }}>{p.stock}</td>
                                <td>
                                    <button onClick={() => handleEdit(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>✏️</button>
                                    <button onClick={async () => { if(window.confirm('¿Eliminar?')) { await deleteProduct(p._id); loadProducts(); } }} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;