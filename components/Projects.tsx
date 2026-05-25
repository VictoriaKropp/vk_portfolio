import ProjectCard from '@/components/ProjectCard';
import { supabase } from '@/lib/supabase';
export const revalidate = 0;

type Module = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  order: number;
};

type Project = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link: string;
  image_url: string;
  project_modules: Module[];
};

export default async function Projects() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*, project_modules(*)')
    .eq('visible', true)
    .order('order')
    .order('order', { referencedTable: 'project_modules' });

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="section projects">
      <div className="section-accent" />
      <h2 className="section-title">Projects</h2>

      {projects.map((project: Project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <p className="projects-more">More projects coming soon.</p>
    </section>
  );
}