// Logo 尺寸配置
export const logoSize = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
} as const;

// 获取 logo 路径的函数
export const getLogoPath = (category: string, name: string): string => {
  return `/src/assets/logos/${category}/${name}.svg`;
};

// 根据主题获取logo
export const getThemeLogo = (theme: 'light' | 'dark' = 'dark'): string => {
  return theme === 'light' ? logoPaths.main.logoBlack : logoPaths.main.logoWhite;
};

// 预定义的 logo 路径
export const logoPaths = {
  social: {
    github: '/src/assets/logos/social/github.svg',
    linkedin: '/src/assets/logos/social/linkedin.svg',
    twitter: '/src/assets/logos/social/twitter.svg',
    instagram: '/src/assets/logos/social/instagram.svg',
  },
  main: {
    logoWhite: '/src/assets/logos/main/logo-white.svg',
    logoBlack: '/src/assets/logos/main/logo-black.svg',
  },
  brands: {
    react: '/src/assets/logos/brands/react.svg',
    nextjs: '/src/assets/logos/brands/nextjs.svg',
    typescript: '/src/assets/logos/brands/typescript.svg',
    tailwind: '/src/assets/logos/brands/tailwind.svg',
  }
} as const;
