'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Determine initial theme based on presence of class on documentElement
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const hasDark = document.documentElement.classList.contains('dark');
    setIsDark(hasDark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(html.classList.contains('dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xs px-3 py-1.5 bg-black text-white hover:bg-zinc-800 transition-colors"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
