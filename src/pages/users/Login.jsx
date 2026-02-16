import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await loginUser(email, password);
            navigate('/customers'); // Si sale bien, vamos a clientes
        } catch (err) {
            setError(err.msg || 'Error al iniciar sesión');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
            <form onSubmit={handleSubmit} style={{ padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>
                
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;