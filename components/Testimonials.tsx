import { supabase } from '@/lib/supabase';
import Image from 'next/image';
export const revalidate = 0;

export default async function Testimonials() {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('visible', true)
    .order('order');

  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="section testimonials">
      <div className="section-accent" />
      <h2 className="section-title">What they say</h2>

      <div className="testimonial-cards">
        {data.map((item) => (
          <div key={item.id} className="testimonial-card">
            {item.image_url && (
              <Image src={item.image_url} alt={item.author} width={72} height={72} className="testimonial-avatar" />
            )
            }
            {item.video_url && (
              <div className="testimonial-video">
                <iframe
                  src={item.video_url}
                  allowFullScreen
                />
              </div>
            )}
            {item.text && (
              <p className="testimonial-quote">&ldquo;{item.text}&rdquo;</p>
            )}
            <p className="testimonial-author">
              {item.author}{item.company ? ` — ${item.company}` : ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
