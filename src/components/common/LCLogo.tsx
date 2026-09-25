import React from 'react';
import { Link } from 'react-router-dom';

interface LCLogoProps {
  className?: string;
  darkBg?: boolean;
  heightClass?: string;
  to?: string;
}

export const LCLogo: React.FC<LCLogoProps> = ({
  className = '',
  darkBg = false,
  heightClass = 'h-11 sm:h-14',
  to = '/',
}) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center group transition-all duration-200 hover:opacity-95 ${className}`}
    >
      {darkBg ? (
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-white/20 flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Luminous Civic — From Problems to Progress"
            className={`${heightClass} w-auto object-contain min-h-[38px]`}
          />
        </div>
      ) : (
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Luminous Civic — From Problems to Progress"
            className={`${heightClass} w-auto object-contain min-h-[40px]`}
          />
        </div>
      )}
    </Link>
  );
};

export default LCLogo;
