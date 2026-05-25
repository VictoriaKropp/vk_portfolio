'use client';

import { useState } from 'react';
import Image from 'next/image';

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

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="project-card">
      <p className="project-tag">{project.tag}</p>
      <h3 className="project-title">{project.title}</h3>
      {project.image_url && (
        <Image src={project.image_url} alt={project.title} width={800} height={450} className="project-image" />
      )}
      <p className="project-description">{project.description}</p>

      <div className="module-list">
        {project.project_modules.map((mod, i) => (
          <div key={mod.id} className="module-item">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={expanded === i ? 'module-button active' : 'module-button'}
            >
              <span className={expanded === i ? 'module-button-title active' : 'module-button-title'}>
                {mod.title}
              </span>
              <span className="module-icon">{expanded === i ? '−' : '+'}</span>
            </button>
            {expanded === i && (
              <div className="module-content">
                <p>{mod.description}</p>
                {mod.image_url && (
                  <Image src={mod.image_url} alt={mod.title} width={800} height={450} className="module-image" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {project.link && (
        <div className="project-link-wrapper">
          <a href={project.link} target="_blank" className="project-link">
            {project.link.replace('https://', '')} →
          </a>
        </div>
      )}
    </div>
  );
}