import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'w-full py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-modern-lg hover:scale-[1.02] shadow-modern',
    secondary: 'bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white shadow-md hover:shadow-lg',
    outline: 'bg-white/50 backdrop-blur-sm border-2 border-white/80 text-gray-800 hover:bg-white/80 hover:border-white shadow-md',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

