import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="admin-dashboard">
      <h1>Panel de administración</h1>
      <nav className="admin-nav">
        <Link href="/admin/projects">Proyectos</Link>
        <Link href="/admin/testimonials">Testimonios</Link>
        <Link href="/admin/about">About</Link>
        <Link href="/admin/process">Proceso</Link>
        <Link href="/admin/contact">Contacto</Link>
      </nav>
    </main>
  );
}