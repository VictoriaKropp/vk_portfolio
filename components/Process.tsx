import { supabase } from '@/lib/supabase';

export default async function Process() {
  const { data } = await supabase
    .from('process_steps')
    .select('*')
    .order('order');

  if (!data || data.length === 0) return null;

  return (
    <section id="process" className="section process">
      <div className="section-accent" />
      <h2 className="section-title">How I work</h2>

      <div className="process-list">
        {data.map((step) => (
          <div key={step.id} className="process-item">
            <span className="process-number">{step.number}</span>
            <div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}