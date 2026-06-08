import Link from 'next/link';

const sections = [
  {
    href: '/admin/projects',
    icon: '◈',
    title: 'Proyectos',
    desc: 'Editar proyectos y módulos',
  },
  {
    href: '/admin/testimonials',
    icon: '▶',
    title: 'Testimonios',
    desc: 'Videos y reseñas',
  },
  {
    href: '/admin/about',
    icon: '∷',
    title: 'About',
    desc: 'Texto de presentación',
  },
  {
    href: '/admin/process',
    icon: '⊹',
    title: 'Process',
    desc: 'Pasos de trabajo',
  },
  {
    href: '/admin/contact',
    icon: '⌁',
    title: 'Contacto',
    desc: 'Links y datos de contacto',
  },
];

export default function AdminPage() {
  return (
    <div className="admin-dashboard">
      <h1>Panel de administración</h1>
      <p>¿Qué querés editar hoy?</p>
      <div className="admin-dashboard-grid">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="admin-dashboard-card">
            <div className="admin-dashboard-card-icon">{s.icon}</div>
            <div className="admin-dashboard-card-title">{s.title}</div>
            <div className="admin-dashboard-card-desc">{s.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
