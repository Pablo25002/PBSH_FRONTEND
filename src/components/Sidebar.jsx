import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login'; // Salida total
    };

    // Actualizamos la lista para incluir Notas y Pagos
    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Clientes', path: '/customers', icon: '👥' },
        { name: 'Productos', path: '/products', icon: '📦' },
        { name: 'Categorías', path: '/categories', icon: '📁' },
        { name: 'Proveedores', path: '/suppliers', icon: '🚚' },
        { name: 'Pagos', path: '/payments', icon: '💳' }, // Nuevo
        { name: 'Notas', path: '/notes', icon: '📝' },     // Nuevo
    ];

    return (
        <div style={{
            width: '240px',
            height: '100vh',
            backgroundColor: '#1e293b',
            color: 'white',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            zIndex: 1000
        }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>AdminPanel</h2>
            <hr style={{ borderColor: '#334155', marginBottom: '20px' }} />
            
            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'white',
                            textDecoration: 'none',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '8px',
                            // Detecta si la ruta actual coincide para resaltar el botón
                            backgroundColor: location.pathname === item.path ? '#334155' : 'transparent',
                            transition: '0.3s'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span> {item.name}
                    </Link>
                ))}
            </nav>

            {/* BOTÓN CERRAR SESIÓN SIEMPRE VISIBLE ABAJO */}
            <button 
                onClick={handleLogout}
                style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: 'auto',       
                    marginBottom: '20px',    
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}
            >
                🚪 Cerrar Sesión
            </button>
        </div>
    );
};

export default Sidebar;