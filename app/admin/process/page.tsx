'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  order: number;
};

export default function AdminProcess() {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [isNew, setIsNew] = useState(false);

  const empty: ProcessStep = { id: '', number: '', title: '', description: '', order: 0 };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const { data } = await supabase.from('process_steps').select('*').order('order');
    if (data) setItems(data);
  }

  async function handleSave() {
    if (isNew) {
      await supabase.from('process_steps').insert({ ...editing, id: undefined });
    } else {
      await supabase.from('process_steps').update(editing!).eq('id', editing!.id);
    }
    setEditing(null);
    setIsNew(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    await supabase.from('process_steps').delete().eq('id', id);
    fetchItems();
  }

  if (editing) return (
    <div className="admin-form">
      <h2>{isNew ? 'Nuevo paso' : 'Editar paso'}</h2>
      <input placeholder="Número (01, 02...)" value={editing.number} onChange={e => setEditing({ ...editing, number: e.target.value })} />
      <input placeholder="Título" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
      <textarea placeholder="Descripción" value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
      <input placeholder="Orden" type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: Number(e.target.value) })} />
      <div className="admin-form-actions">
        <button onClick={handleSave}>Guardar</button>
        <button onClick={() => { setEditing(null); setIsNew(false); }}>Cancelar</button>
      </div>
    </div>
  );

  return (
    <div className="admin-section">
      <h2>Process</h2>
      <button onClick={() => { setEditing(empty); setIsNew(true); }}>+ Nuevo paso</button>
      <div className="admin-list">
        {items.map(item => (
          <div key={item.id} className="admin-list-item">
            <span>{item.number} — {item.title}</span>
            <div>
              <button onClick={() => setEditing(item)}>Editar</button>
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}