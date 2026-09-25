/**
 * Single source of truth for everything on the page.
 * Edit this file to make it yours — no component changes needed.
 */

export const profile = {
  name: 'Tamerlan Babayev',
  initials: 'TB',
  // Cycled one-by-one in the hero
  roles: ['FULL-STACK DEVELOPER', 'FRONT-END ENGINEER', 'UI ENGINEER'],
  tagline:
    'A developer who ships considered, fast interfaces — and the systems that keep them honest.',
  intro:
    "I build web products end to end: React front-ends that feel immediate, APIs that stay predictable under load, and design systems that survive contact with a real roadmap. I care about the unglamorous parts — state that doesn't lie, loading states that don't flicker, builds that stay green.",
  location: 'Azerbaijan',
  email: 'babaevtamerlan3@gmail.com',
  available: true,
  resumeUrl: '#',
  avatar: '/1782583686378.jpg', // e.g. '/avatar.jpg' — falls back to initials when empty
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: 6, suffix: '+', label: 'Years of\nexperience' },
  { value: 40, suffix: '+', label: 'Projects\ncompleted' },
  { value: 18, suffix: '+', label: 'Happy\nclients' },
]

export const marquee = [
  'React',
  'TypeScript',
  'Node.js',
  'Design Systems',
  'Tailwind',
  'Motion Design',
  'Vite',
  'Firebase',
  'REST & GraphQL',
  'Performance',
]

export const services = [
  {
    title: 'FRONT-END',
    subtitle: 'Interfaces that feel instant',
    body: 'Component architecture, motion, and accessibility for products that need to feel fast on a mid-range phone — not just on a demo laptop.',
    skills: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite', 'Accessibility'],
  },
  {
    title: 'FULL-STACK',
    subtitle: 'The systems behind the screen',
    body: 'APIs, auth, data modelling, payments and deploys. I own the boring middle of the stack so the product keeps working after launch week.',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase', 'Stripe'],
  },
]

export const projects = [
  {
    id: '01',
    name: 'Kiln & Clay',
    category: 'WordPress / Booking',
    year: '2026',
    blurb:
      'A ceramics studio site on a custom block theme, with a hand-built plugin for workshop listings and live seat bookings. The live demo runs the real site in your browser.',
    tools: ['WordPress', 'PHP', 'Block Themes', 'Block Bindings', 'JavaScript', 'Playground'],
    href: 'https://programmernumber5571.github.io/kiln-studio-wp/',
    accent: '#D9774C',
  },
  {
    id: '02',
    name: 'Backrooms',
    category: 'E-Commerce / Music',
    year: '2026',
    blurb:
      'A vinyl and merch storefront with a Shopify-backed catalogue, cart, favourites and multi-language UI.',
    tools: ['React', 'Vite', 'Tailwind', 'Shopify', 'Firebase', 'i18next'],
    href: '#',
    accent: '#A855F7',
  },
  {
    id: '03',
    name: 'Atlas Dashboard',
    category: 'SaaS / Data',
    year: '2025',
    blurb:
      'An analytics console for operations teams — live charts, saved views, and role-scoped access.',
    tools: ['React', 'TypeScript', 'Recharts', 'Node.js', 'PostgreSQL'],
    href: '#',
    accent: '#4F9BFF',
  },
  {
    id: '04',
    name: 'Northwind Studio',
    category: 'Marketing Site',
    year: '2025',
    blurb:
      'A motion-heavy studio site built for a 98+ Lighthouse score with scroll-linked storytelling.',
    tools: ['Next.js', 'Framer Motion', 'Sanity', 'Vercel'],
    href: '#',
    accent: '#C6F24E',
  },
  {
    id: '05',
    name: 'Ledgerly',
    category: 'Fintech / Tooling',
    year: '2024',
    blurb:
      'Invoicing and reconciliation for freelancers, with Stripe payouts and automated VAT reports.',
    tools: ['React', 'Express', 'Stripe', 'MongoDB', 'Docker'],
    href: '#',
    accent: '#FF8A4C',
  },
]

export const experience = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance & Product Work',
    period: '2023 — Present',
    body: 'Building web products for founders and small teams: discovery, architecture, implementation and handover. Recent focus on commerce and internal tooling.',
    current: true,
  },
  {
    role: 'Front-End Developer',
    company: 'Agency Projects',
    period: '2021 — 2023',
    body: 'Delivered client sites and app front-ends against tight deadlines. Introduced a shared component library that cut new-page build time roughly in half.',
  },
  {
    role: 'Junior Developer',
    company: 'First Studio Role',
    period: '2020 — 2021',
    body: 'Learned the craft in production — templating, CSS architecture, code review, and the difference between "works" and "shippable".',
  },
]

export const stack = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vite',
  'Node.js',
  'Express',
  'Tailwind',
  'Framer Motion',
  'HTML',
  'CSS',
  'MongoDB',
  'PostgreSQL',
  'Firebase',
  'Redis',
  'Stripe',
  'Docker',
  'Git',
  'GitHub',
  'Vercel',
  'WordPress',
  'PHP',
  'Figma',
  'Postman',
  'Vitest',
  'Linux',
  'Claude Writer'
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/ProgrammerNumber5571', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tamerlan-babayev-378931370/', icon: 'linkedin' },
]

export const budgets = ['< 3k', '3k — 5k', '5k — 10k', '10k +']
