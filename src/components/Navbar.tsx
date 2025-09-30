import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
// import CardNav from '@/components/CardNav' 
// import logo from '@/SVG/logo.svg';
import BubbleMenu from '@/components/BubbleMenu'
import TextType from '@/components/TextType';
// const navLinks = [
//   { to: '/', label: '首页' },
//   { to: '/photography', label: '摄影' },
//   { to: '/blur-text', label: '文字模糊' },
//   { to: '/about', label: '关于' },
// ]

// const demoItems = [
//   { link: '/', text: '首页', image: 'https://picsum.photos/600/400?random=1' },
//   { link: '/photography', text: '摄影', image: 'https://picsum.photos/600/400?random=2' },
//   { link: '/blur-text', text: '文字模糊', image: 'https://picsum.photos/600/400?random=3' },
//   { link: '/about', text: '关于', image: 'https://picsum.photos/600/400?random=4' }
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false)

//   return (
//     <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
//       <div className="mx-auto max-w-6xl px-4">
//         <div className="flex h-[72px] items-center justify-between">
//           <NavLink to="/" className="flex items-center gap-2 select-none">
//             <span className="inline-block size-3 rounded-full bg-brand-500 shadow-[0_0_18px_theme(colors.brand.500)]" />
//             <span className="text-lg font-semibold tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">StyleSpace</span>
//           </NavLink>

//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center gap-6 text-sm">
//             {navLinks.map((l) => (
//               <NavItem key={l.to} to={l.to} onClick={() => setOpen(false)}>
//                 {l.label}
//               </NavItem>
//             ))}
//           </nav>

//           {/* Mobile trigger */}
//           <button
//             className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-neutral-300 hover:text-white hover:bg-white/5 transition"
//             aria-label="Toggle Menu"
//             onClick={() => setOpen((o) => !o)}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {open && (
//           <motion.nav
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ type: 'tween', duration: 0.2 }}
//             className="md:hidden border-t border-white/10"
//           >
//             <div className="px-4 py-3 space-y-1">
//               {navLinks.map((l) => (
//                 <NavItem key={l.to} to={l.to} onClick={() => setOpen(false)}>
//                   {l.label}
//                 </NavItem>
//               ))}
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }

// function NavItem({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={onClick}
//       className={({ isActive }) =>
//         `relative inline-flex items-center gap-2 rounded-md px-3 py-2 transition text-neutral-300 hover:text-white hover:bg-white/5 ${
//           isActive ? 'text-white' : ''
//         }`
//       }
//     >
//       {({ isActive }) => (
//         <>
//           <span>{children}</span>
//           {isActive && (
//             <motion.span layoutId="active-pill" className="absolute inset-0 -z-10 rounded-md bg-white/5" />
//           )}
//         </>
//       )}
//     </NavLink>
//   )
// }


const Navbar = () => {
  const items = [
    {
      label: "Home",
      href: "/home",
      ariaLabel: "首页",
      rotation: -8,
      hoverStyles: { bgColor: "#141414", textColor: "#ffffff" }
    },
    {
      label: "photography",
      href: "/photography",
      ariaLabel: "摄影作品",
      rotation: 8,
      hoverStyles: { bgColor: "#141414", textColor: "#ffffff" }
    },
    {
      label: "About",
      href: "/about",
      ariaLabel: "About",
      rotation: -8,
      hoverStyles: { bgColor: "#141414", textColor: "#ffffff" }
    },
  ];

  return (
    <BubbleMenu
      logo={<a href="/home" style={{ fontWeight: 700, color: '#000000' }}>
      <TextType 
      text={["Mr.peng！", "Welcome!", "Hello!"]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="▎"
      textColors={['#000000']}
      loop={true}
    />
    </a>}
      items={items}
      menuAriaLabel="Toggle navigation"
      menuBg="#ffffff"
      menuContentColor="#111111"
      useFixedPosition={true}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.12}
    />
  );
};

export default Navbar;