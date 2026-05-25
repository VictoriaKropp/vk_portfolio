import { supabase } from '@/lib/supabase';

export default async function About() {
  const { data } = await supabase
    .from('about')
    .select('*')
    .order('order');

  if (!data || data.length === 0) return null;

  return (
    <section id="about" className="section about">
      <div className="section-accent" />
      {data.map((item) => (
        <p key={item.id} className="about-text">{item.text}</p>
      ))}
    </section>
  );
}