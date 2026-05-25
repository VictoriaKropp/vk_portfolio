import '../admin/admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h1 className="admin-logo">VK Admin</h1>
        <nav className="admin-nav">
          <a href="/admin">Dashboard</a>
          <a href="/admin/projects">Proyectos</a>
          <a href="/admin/testimonials">Testimonios</a>
          <a href="/admin/about">About</a>
          <a href="/admin/process">Process</a>
          <a href="/admin/contact">Contact</a>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}