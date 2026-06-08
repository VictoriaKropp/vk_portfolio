'use client';

import { useState } from 'react';
import '../admin/admin.css';

const navLinks = [
  { label: 'Proyectos', href: '/admin/projects' },
  { label: 'Testimonios', href: '/admin/testimonials' },
  { label: 'About', href: '/admin/about' },
  { label: 'Process', href: '/admin/process' },
  { label: 'Contacto', href: '/admin/contact' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const close = () => setSidebarOpen(false);

  return (
    <div className="admin-wrapper">

      {/* Topbar — solo mobile */}
      <div className="admin-topbar">
        <span className="admin-logo">VK Admin</span>
        <button
          className="admin-hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`admin-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <h1 className="admin-logo">VK Admin</h1>
        <nav className="admin-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Contenido */}
      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}
