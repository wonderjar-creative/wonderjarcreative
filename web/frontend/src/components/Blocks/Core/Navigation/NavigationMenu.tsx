'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavigationLink {
  id?: string;
  label: string;
  url: string;
  path?: string;
  target?: string;
  cssClasses?: string[];
}

interface NavigationMenuProps {
  links: NavigationLink[];
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function NavigationMenu({ links, title, className, style }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navClasses = `${className || ''}`;
  const listClasses = isOpen ? ' block' : ' hidden md:flex md:items-center md:space-x-4';

  return (
    <nav className={`${className || ''}`} style={style} aria-label={title}>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          // Close icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-soft-cream shadow-md md:hidden">
          <button
            className="absolute top-4 right-4 text-deep-black"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="border-b border-gray-200 py-4">
            <ul className="flex flex-col p-4">
              {links.map((link, index) => (
                <li key={link.id || index} className="py-2">
                  <Link href={link.url} target={link.target}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <ul className="hidden md:flex md:items-center md:space-x-4">
        {links.map((link, index) => (
          <li key={link.id || index} className={link.cssClasses?.join(' ')}>
            <Link 
              href={link.path || link.url} 
              target={link.target || '_self'}
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
