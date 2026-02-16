import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../../services/noteService';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({ titulo: '', contenido: '', prioridad: 'Media' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => { loadNotes(); }, []);

    const loadNotes = async () => {
        try { const data = await getNotes(); setNotes(data); } 
        catch (err) { setError('Error al cargar notas'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) { await updateNote(editingId, formData); } 
            else { await createNote(formData); }
            setFormData({ titulo: '', contenido: '', prioridad: 'Media' });
            setEditingId(null);
            loadNotes();
        } catch (err) { setError('Error al guardar la nota'); }
    };

    const handleEdit = (n) => {
        setEditingId(n._id);
        setFormData({ titulo: n.titulo, contenido: n.contenido, prioridad: n.prioridad });
    };

    const inputStyle = {
        width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px',
        backgroundColor: '#ffffff', color: '#000000', marginTop: '5px'
    };

    // Función para definir el color de la nota según prioridad
    const getPriorityColor = (p) => {
        if (p === 'Alta') return '#ef4444';
        if (p === 'Media') return '#f59e0b';
        return '#10b981';
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ marginBottom: '25px', color: '#1e293b', fontWeight: 'bold' }}>Notas y Recordatorios</h2>

            <form onSubmit={handleSubmit} style={{ 
                background: 'white', padding: '30px', borderRadius: '12px', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '40px' 
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Título:</label>
                        <input style={inputStyle} value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                    </div>
                    <div>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Prioridad:</label>
                        <select style={inputStyle} value={formData.prioridad} onChange={e => setFormData({...formData, prioridad: e.target.value})}>
                            <option value="Baja">Baja (Verde)</option>
                            <option value="Media">Media (Amarillo)</option>
                            <option value="Alta">Alta (Rojo)</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ color: '#475569', fontWeight: '600' }}>Contenido:</label>
                        <textarea style={{ ...inputStyle, height: '80px' }} value={formData.contenido} onChange={e => setFormData({...formData, contenido: e.target.value})} required />
                    </div>
                </div>
                <button type="submit" style={{ marginTop: '20px', padding: '12px 25px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {editingId ? '💾 Actualizar Nota' : '📌 Guardar Nota'}
                </button>
            </form>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '20px' 
            }}>
                {notes.map(n => (
                    <div key={n._id} style={{ 
                        background: 'white', padding: '20px', borderRadius: '12px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
                        borderTop: `6px solid ${getPriorityColor(n.prioridad)}`,
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                        <div>
                            <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>{n.titulo}</h4>
                            <p style={{ fontSize: '14px', color: '#475569', whiteSpace: 'pre-wrap' }}>{n.contenido}</p>
                        </div>
                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button onClick={() => handleEdit(n)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
                            <button onClick={async () => { if(window.confirm('¿Eliminar?')) { await deleteNote(n._id); loadNotes(); } }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;