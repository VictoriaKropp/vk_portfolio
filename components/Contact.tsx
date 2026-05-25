import { supabase } from '@/lib/supabase';
export const revalidate = 0;

export default async function Contact() {
  const { data } = await supabase
    .from('contact')
    .select('*')
    .single();

  if (!data) return null;

  return (
    <section id="contact" className="section contact">
      <div className="section-accent" />
      <p className="contact-intro">{data.intro}</p>
      <div className="contact-links">
        <a href={`mailto:${data.email}`} className="contact-link">{data.email}</a>
        <a href={data.linkedin} target="_blank" className="contact-link">LinkedIn</a>
        <a href={data.github} target="_blank" className="contact-link">GitHub</a>
      </div>
    </section>
  );
}