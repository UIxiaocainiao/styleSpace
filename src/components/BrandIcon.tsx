import React from 'react';
import { getLogoPath, logoSize } from '@/assets/logos';

interface BrandIconProps {
  brand: 'react' | 'nextjs' | 'typescript' | 'tailwind';
  size?: keyof typeof logoSize;
  className?: string;
  alt?: string;
}

const BrandIcon: React.FC<BrandIconProps> = ({ 
  brand, 
  size = 'medium', 
  className = '',
  alt
}) => {
  const iconSrc = getLogoPath('brands', brand);
  const sizeValue = logoSize[size];
  const defaultAlt = `${brand.charAt(0).toUpperCase() + brand.slice(1)} logo`;

  return (
    <img
      src={iconSrc}
      alt={alt || defaultAlt}
      className={className}
      style={{
        width: sizeValue,
        height: sizeValue,
      }}
    />
  );
};

export default BrandIcon;
