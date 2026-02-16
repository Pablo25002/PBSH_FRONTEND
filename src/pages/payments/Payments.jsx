import React, { useState, useEffect } from 'react';
import { getPayments, createPayment, deletePayment } from '../../services/paymentService';
import { getCustomers } from '../../services/customerService';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ 
        cliente: '', monto: '', metodoPago: 'Efectivo', referencia: '', notas: '' 
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [payData, custData] = await Promise.all([getPayments(), getCustomers()]);
            setPayments(payData);
            setCustomers(custData);
        } catch (err) {
            setError('Error al cargar los datos');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPayment(formData);
            setFormData({ cliente: '', monto: '', metodoPago: 'Efectivo', referencia: '', notas: '' });
            loadData();
        } catch (err) {
            setError('Error al registrar el pago');
        }
    };

    const inputStyle = {
        width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px',
        backgroundColor: '#ffffff', color: '#000000', marginTop: '5px'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ marginBottom: '25px', color: '#1e293b', fontWeight: 'bold' }}>Registro de Pagos</h2>

            {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ 
                background: 'white', padding: '30px', borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '40px' 
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Cliente:</label>
                        <select style={inputStyle} value={formData.cliente} onChange={e => setFormData({...formData, cliente: e.target.value})} required>
                            <option value="">Seleccione un cliente</option>
                            {customers.map(c => (
                                <option key={c._id} value={c._id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Monto:</label>
                        <input type="number" style={inputStyle} value={formData.monto} onChange={e => setFormData({...formData, monto: e.target.value})} required placeholder="0.00" />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Método:</label>
                        <select style={inputStyle} value={formData.metodoPago} onChange={e => setFormData({...formData, metodoPago: e.target.value})}>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: 'span 1' }}>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Referencia:</label>
                        <input style={inputStyle} value={formData.referencia} onChange={e => setFormData({...formData, referencia: e.target.value})} placeholder="N° de comprobante" />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Notas:</label>
                        <input style={inputStyle} value={formData.notas} onChange={e => setFormData({...formData, notas: e.target.value})} placeholder="Detalles adicionales" />
                    </div>
                </div>
                <button type="submit" style={{ marginTop: '20px', padding: '12px 25px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    💰 Registrar Pago
                </button>
            </form>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Fecha</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Cliente</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Monto</th>
                            <th style={{ padding: '15px', textAlign: 'left', color: '#64748b' }}>Método</th>
                            <th style={{ padding: '15px', textAlign: 'center', color: '#64748b' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px' }}>{new Date(p.fecha).toLocaleDateString()}</td>
                                <td style={{ padding: '15px', fontWeight: '600' }}>{p.cliente?.nombre || 'N/A'}</td>
                                <td style={{ padding: '15px', color: '#059669', fontWeight: 'bold' }}>${p.monto.toLocaleString()}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>
                                        {p.metodoPago}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button onClick={async () => { if(window.confirm('¿Eliminar registro?')) { await deletePayment(p._id); loadData(); } }} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;