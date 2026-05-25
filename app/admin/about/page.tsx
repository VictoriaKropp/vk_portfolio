'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type AboutItem = {
  id: string;
  text: string;
  order: number;
};

export default function AdminAbout() {
  const [items, setItems] = useState<AboutItem[]>([]);
  const [editing, setEditing] = useState<AboutItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const empty: AboutItem = { id: '', text: '', order: 0 };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const { data } = await supabase.from('about').select('*').order('order');
    if (data) setItems(data);
  }

  async function handleSave() {
    if (isNew) {
      await supabase.from('about').insert({ ...editing, id: undefined });
    } else {
      await supabase.from('about').update(editing!).eq('id', editing!.id);
    }
    setEditing(null);
    setIsNew(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    await supabase.from('about').delete().eq('id', id);
    fetchItems();
  }

  if (editing) return (
    <div className="admin-form">
      <h2>{isNew ? 'Nuevo párrafo' : 'Editar párrafo'}</h2>
      <textarea placeholder="Texto" value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} />
      <input placeholder="Orden" type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: Number(e.target.value) })} />
      <div className="admin-form-actions">
        <button onClick={handleSave}>Guardar</button>
        <button onClick={() => { setEditing(null); setIsNew(false); }}>Cancelar</button>
      </div>
    </div>
  );

  return (
    <div className="admin-section">
      <h2>About</h2>
      <button onClick={() => { setEditing(empty); setIsNew(true); }}>+ Nuevo párrafo</button>
      <div className="admin-list">
        {items.map(item => (
          <div key={item.id} className="admin-list-item">
            <span>{item.text.substring(0, 60)}...</span>
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