import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../services/customerService';
import { getProducts } from '../../services/productService';
import { getPayments } from '../../services/paymentService';
import { getNotes } from '../../services/noteService';

const Dashboard = () => {
    const [stats, setStats] = useState({
        clientes: 0,
        productos: 0,
        ingresos: 0,
        notas: 0,
        stockBajo: []
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [c, p, pay, n] = await Promise.all([
                getCustomers(),
                getProducts(),
                getPayments(),
                getNotes()
            ]);

            const totalIngresos = pay.reduce((acc, curr) => acc + curr.monto, 0);
            const productosBajoStock = p.filter(prod => prod.stock <= 5);

            setStats({
                clientes: c.length,
                productos: p.length,
                ingresos: totalIngresos,
                notas: n.length,
                stockBajo: productosBajoStock
            });
        } catch (err) {
            console.error("Error cargando dashboard", err);
        }
    };

    const cardStyle = {
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ marginBottom: '25px', color: '#1e293b', fontWeight: 'bold' }}>Panel General (Dashboard)</h2>

            {/* Fila de Tarjetas de Resumen */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div style={cardStyle}>
                    <span style={{ fontSize: '30px' }}>👥</span>
                    <h3 style={{ margin: '10px 0 5px 0', color: '#64748b', fontSize: '14px' }}>Clientes</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{stats.clientes}</p>
                </div>
                <div style={cardStyle}>
                    <span style={{ fontSize: '30px' }}>📦</span>
                    <h3 style={{ margin: '10px 0 5px 0', color: '#64748b', fontSize: '14px' }}>Productos</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{stats.productos}</p>
                </div>
                <div style={cardStyle}>
                    <span style={{ fontSize: '30px' }}>💰</span>
                    <h3 style={{ margin: '10px 0 5px 0', color: '#64748b', fontSize: '14px' }}>Ingresos Totales</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>${stats.ingresos.toLocaleString()}</p>
                </div>
                <div style={cardStyle}>
                    <span style={{ fontSize: '30px' }}>📝</span>
                    <h3 style={{ margin: '10px 0 5px 0', color: '#64748b', fontSize: '14px' }}>Notas Activas</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.notas}</p>
                </div>
            </div>

            {/* Alertas de Inventario */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: '20px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    ⚠️ Alertas de Stock Bajo (5 unidades o menos)
                </h3>
                {stats.stockBajo.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '10px' }}>Producto</th>
                                <th style={{ padding: '10px' }}>Stock Actual</th>
                                <th style={{ padding: '10px' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.stockBajo.map(prod => (
                                <tr key={prod._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '10px', fontWeight: '500' }}>{prod.nombre}</td>
                                    <td style={{ padding: '10px', color: '#ef4444', fontWeight: 'bold' }}>{prod.stock}</td>
                                    <td style={{ padding: '10px' }}>
                                        <span style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                            Reponer Urgente
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: '#059669', fontWeight: '500' }}>✅ Todo el inventario está en niveles óptimos.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;