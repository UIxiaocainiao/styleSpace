import React from 'react';
import { getThemeLogo, logoSize } from '@/assets/logos';

interface LogoProps {
  theme?: 'light' | 'dark';
  size?: keyof typeof logoSize;
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  theme = 'dark', 
  size = 'medium', 
  className = '',
  alt = 'Logo'
}) => {
  const logoSrc = getThemeLogo(theme);
  const sizeValue = logoSize[size];

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      style={{
        width: sizeValue,
        height: 'auto',
      }}
    />
  );
};

export default Logo;
