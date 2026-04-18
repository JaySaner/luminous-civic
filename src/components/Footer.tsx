import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full rounded-t-[2rem] mt-12 bg-slate-50 border-t border-slate-200/50">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-screen-2xl mx-auto">
        <div className="mb-8 md:mb-0">
          <p className="text-sm font-medium text-on-surface-variant">
            © 2024 Luminous Civic Authority. All rights reserved.
          </p>
        </div>
        <div className="flex gap-10">
          {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Contact'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
