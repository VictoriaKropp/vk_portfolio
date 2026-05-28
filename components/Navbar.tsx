'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dracurberg, setDracurberg] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setDracurberg(false);

  return (
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>

      <a href="#" className="navbar-logo">
        <Image
          src="https://dskvxhmiblqasfthrdjp.supabase.co/storage/v1/object/public/images/logo.png"
          alt="Victoria Kropp"
          width={92}
          height={58}
        />
      </a>

      <div className="navbar-links">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="navbar-link">
            {link.label}
          </a>
        ))}
      </div>

      <button
        className={dracurberg ? 'dracurberg open' : 'dracurberg'}
        onClick={() => setDracurberg(!dracurberg)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      {dracurberg && (
        <div className="navbar-dropdown">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-dropdown-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
}