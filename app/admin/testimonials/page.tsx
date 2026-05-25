'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Testimonial = {
  id: string;
  author: string;
  company: string;
  text: string;
  video_url: string;
  image_url: string;
  visible: boolean;
  order: number;
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const empty: Testimonial = { id: '', author: '', company: '', text: '', video_url: '', image_url: '', visible: true, order: 0 };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const { data } = await supabase.from('testimonials').select('*').order('order');
    if (data) setItems(data);
  }

  async function handleSave() {
    if (isNew) {
      await supabase.from('testimonials').insert({ ...editing, id: undefined });
    } else {
      await supabase.from('testimonials').update(editing!).eq('id', editing!.id);
    }
    setEditing(null);
    setIsNew(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    await supabase.from('testimonials').delete().eq('id', id);
    fetchItems();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileName = `clients/${Date.now()}-${file.name}`;
    const { data } = await supabase.storage.from('images').upload(fileName, file);
    if (data) {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      setEditing(prev => ({ ...prev!, image_url: urlData.publicUrl }));
    }
  }

  if (editing) return (
    <div className="admin-form">
      <h2>{isNew ? 'Nuevo testimonio' : 'Editar testimonio'}</h2>
      <input placeholder="Autor" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} />
      <input placeholder="Empresa / banda" value={editing.company} onChange={e => setEditing({ ...editing, company: e.target.value })} />
      <textarea placeholder="Texto del testimonio" value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} />
      <input placeholder="URL de video (opcional)" value={editing.video_url} onChange={e => setEditing({ ...editing, video_url: e.target.value })} />
      <input placeholder="Orden" type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: Number(e.target.value) })} />
      <label>
        <input type="checkbox" checked={editing.visible} onChange={e => setEditing({ ...editing, visible: e.target.checked })} />
        Visible
      </label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {editing.image_url && <img src={editing.image_url} alt="preview" style={{ maxWidth: '200px' }} />}
      <div className="admin-form-actions">
        <button onClick={handleSave}>Guardar</button>
        <button onClick={() => { setEditing(null); setIsNew(false); }}>Cancelar</button>
      </div>
    </div>
  );

  return (
    <div className="admin-section">
      <h2>Testimonios</h2>
      <button onClick={() => { setEditing(empty); setIsNew(true); }}>+ Nuevo testimonio</button>
      <div className="admin-list">
        {items.map(t => (
          <div key={t.id} className="admin-list-item">
            <span>{t.author} — {t.company}</span>
            <div>
              <button onClick={() => setEditing(t)}>Editar</button>
              <button onClick={() => handleDelete(t.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}