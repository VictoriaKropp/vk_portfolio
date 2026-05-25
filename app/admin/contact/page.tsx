'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ContactInfo = {
  id: string;
  email: string;
  linkedin: string;
  github: string;
  intro: string;
};

export default function AdminContact() {
  const [data, setData] = useState<ContactInfo | null>(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data } = await supabase.from('contact').select('*').single();
    if (data) setData(data);
  }

  async function handleSave() {
    if (!data) return;
    await supabase.from('contact').upsert(data);
  }

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="admin-form">
      <h2>Contact</h2>
      <textarea placeholder="Intro" value={data.intro} onChange={e => setData({ ...data, intro: e.target.value })} />
      <input placeholder="Email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
      <input placeholder="LinkedIn URL" value={data.linkedin} onChange={e => setData({ ...data, linkedin: e.target.value })} />
      <input placeholder="GitHub URL" value={data.github} onChange={e => setData({ ...data, github: e.target.value })} />
      <div className="admin-form-actions">
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
}