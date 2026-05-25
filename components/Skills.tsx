export default function Skills() {
    return (
        <section id="skills" className="section skills">
            <div className="section-accent" />
            <h2 className="section-title">Skills</h2>

            <svg width="100%" viewBox="0 0 600 380" role="img" aria-label="Skills as Capricorn constellation" className="skills-svg">
                <defs>
                    <pattern id="st" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="#111" />
                        <line x1="0" y1="0" x2="40" y2="40" stroke="#1a1a1a" strokeWidth="0.5" />
                        <line x1="40" y1="0" x2="0" y2="40" stroke="#181818" strokeWidth="0.3" />
                    </pattern>
                    <pattern id="cr" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
                        <path d="M20 15 L38 55 L28 90" stroke="#222" strokeWidth="0.8" fill="none" />
                        <path d="M130 40 L155 80 L140 120 L162 148" stroke="#1e1e1e" strokeWidth="0.6" fill="none" />
                        <path d="M15 130 L35 158 L22 190" stroke="#222" strokeWidth="0.7" fill="none" />
                    </pattern>
                </defs>

                <rect width="600" height="400" fill="url(#st)" rx="12" />
                <rect width="600" height="400" fill="url(#cr)" rx="12" opacity="0.8" />

                {/* Líneas — borde superior */}
                <line x1="36" y1="46" x2="86" y2="51" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="86" y1="51" x2="205" y2="65" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="205" y1="65" x2="280" y2="85" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="280" y1="85" x2="455" y2="65" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="455" y1="65" x2="485" y2="35" stroke="#3a2535" strokeWidth="0.8" />

                {/* Líneas — lado derecho bajando al pico */}
                <line x1="455" y1="65" x2="380" y2="195" stroke="#3a2535" strokeWidth="0.6" />

                {/* Líneas — base */}
                <line x1="380" y1="195" x2="305" y2="325" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="305" y1="325" x2="155" y2="245" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="155" y1="245" x2="105" y2="155" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="105" y1="155" x2="45" y2="105" stroke="#3a2535" strokeWidth="0.8" />
                <line x1="45" y1="105" x2="36" y2="46" stroke="#3a2535" strokeWidth="0.8" />

                {/* star-1 — PHP — Algedi α */}
                <circle cx="36" cy="46" r="7" fill="#8b1a2e" opacity="0.9" style={{ animationDelay: '1.1s' }} />
                <circle cx="36" cy="46" r="3" fill="#cc3344" />
                <text x="36" y="30" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">PHP</text>

                {/* star-2 — MySQL */}
                <circle cx="86" cy="51" r="5" fill="#6b1020" opacity="0.9" />
                <circle cx="86" cy="51" r="2.5" fill="#cc3344" />
                <text x="86" y="35" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">MySQL</text>

                {/* star-3 — JavaScript */}
                <circle cx="205" cy="65" r="6" fill="#6b1020" opacity="0.9" />
                <circle cx="205" cy="65" r="2.5" fill="#cc3344" />
                <text x="205" y="49" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">JavaScript</text>

                {/* star-4 — TypeScript */}
                <circle cx="280" cy="85" r="5" fill="#6b1020" opacity="0.9" />
                <circle cx="280" cy="85" r="2.5" fill="#cc3344" />
                <text x="280" y="69" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">TypeScript</text>

                {/* star-5 — React — Dabih β */}
                <circle cx="455" cy="65" r="7" fill="#8b1a2e" opacity="0.9" style={{ animationDelay: '0.3s' }} />
                <circle cx="455" cy="65" r="3" fill="#cc3344" />
                <text x="455" y="49" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">React</text>

                {/* star-6 — Next.js */}
                <circle cx="485" cy="35" r="9" fill="#8b1a2e" opacity="0.9" style={{ animationDelay: '0.7s' }} />
                <circle cx="485" cy="35" r="4" fill="#dd4455" />
                <text x="485" y="18" textAnchor="middle" fill="#d4b0b8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">Next.js</text>

                {/* star-7 — PostgreSQL — Deneb Algedi δ */}
                <circle cx="380" cy="195" r="8" fill="#8b1a2e" opacity="0.9" style={{ animationDelay: '1.4s' }} />
                <circle cx="380" cy="195" r="3.5" fill="#dd4455" />
                <text x="430" y="195" textAnchor="middle" fill="#d4b0b8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">PostgreSQL</text>

                {/* star-8 — CSS */}
                <circle cx="305" cy="325" r="5" fill="#6b1020" opacity="0.9" />
                <circle cx="305" cy="325" r="2.5" fill="#cc3344" />
                <text x="305" y="345" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">CSS</text>

                {/* star-9 — HTML */}
                <circle cx="155" cy="245" r="6" fill="#6b1020" opacity="0.9" />
                <circle cx="155" cy="245" r="2.5" fill="#cc3344" />
                <text x="155" y="265" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">HTML</text>

                {/* star-10 — Tailwind */}
                <circle cx="105" cy="155" r="5" fill="#6b1020" opacity="0.9" />
                <circle cx="105" cy="155" r="2.5" fill="#cc3344" />
                <text x="60" y="155" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">Tailwind</text>

                {/* star-11 — Git */}
                <circle cx="45" cy="105" r="5" fill="#6b1020" opacity="0.9" />
                <circle cx="45" cy="105" r="2.5" fill="#cc3344" />
                <text x="45" y="89" textAnchor="middle" fill="#c8a0a8" fontSize="10" fontFamily="Georgia, serif" letterSpacing="1">Git</text>

            </svg>

            <p className="skills-subtitle">
                Beyond the tools: database design, interconnected systems, user experience, business logic.
            </p>

        </section>
    );
}