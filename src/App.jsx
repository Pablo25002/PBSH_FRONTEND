import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/users/Login';
import Customers from './pages/customers/Customers';
import Products from './pages/products/Products';
import Suppliers from './pages/suppliers/Suppliers';
import Notes from './pages/notes/Notes';
import Payments from './pages/payments/Payments';
import Categories from './pages/categories/Categories';
import Dashboard from './pages/dashboard/Dashboard'; // Importante importar el componente

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route 
                    path="/*" 
                    element={
                        <PrivateRoute>
                            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
                                <Sidebar />

                                <main style={{ flex: 1, marginLeft: '240px', padding: '40px 60px' }}>
                                    <Routes>
                                        {/* Redirección inicial al Dashboard */}
                                        <Route path="/" element={<Navigate to="/dashboard" />} />
                                        
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/customers" element={<Customers />} />
                                        <Route path="/products" element={<Products />} />                                        
                                        <Route path="/categories" element={<Categories />} />
                                        <Route path="/suppliers" element={<Suppliers />} />
                                        <Route path="/notes" element={<Notes />} />
                                        <Route path="/payments" element={<Payments />} />

                                        {/* Comodín redirige al Dashboard si la ruta no existe */}
                                        <Route path="*" element={<Navigate to="/dashboard" />} />
                                    </Routes>
                                </main>
                            </div>
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;