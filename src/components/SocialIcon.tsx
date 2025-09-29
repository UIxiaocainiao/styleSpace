import React from 'react';
import { getLogoPath, logoSize } from '../assets/logos';

interface SocialIconProps {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram';
  size?: keyof typeof logoSize;
  className?: string;
  alt?: string;
  href?: string;
  target?: '_blank' | '_self';
}

const SocialIcon: React.FC<SocialIconProps> = ({ 
  platform, 
  size = 'medium', 
  className = '',
  alt,
  href,
  target = '_blank'
}) => {
  const iconSrc = getLogoPath('social', platform);
  const sizeValue = logoSize[size];
  const defaultAlt = `${platform.charAt(0).toUpperCase() + platform.slice(1)} icon`;

  const iconElement = (
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

  if (href) {
    return (
      <a 
        href={href} 
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="inline-block transition-transform hover:scale-110"
      >
        {iconElement}
      </a>
    );
  }

  return iconElement;
};

export default SocialIcon;
