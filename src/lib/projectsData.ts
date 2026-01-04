import { ReactNode } from 'react'

export interface Project {
    id: number
    title: string
    slug: string
    description: string
    longDescription?: string
    impact: string
    technologies: string[]
    type: 'public' | 'private'
    github?: string
    liveDemo?: string
    client?: string
    category: string
    features: string[]
    status: string
    logoSrc?: string
    images?: string[]
    challenges?: string[]
    solutions?: string[]
    results?: string[]
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'Academy Expert',
        slug: 'academy-expert',
        description: 'AI-powered SaaS platform with role-based dashboards and payment integration',
        longDescription: 'A comprehensive SaaS platform revolutionizing online education with AI-powered features, role-based dashboards, and integrated payment systems. Streamlines the entire learning journey from enrollment to certification.',
        impact: 'Automated 80% of administrative tasks',
        technologies: ['Express.js', 'Angular', 'MongoDB', 'Socket.IO', 'Tailwind CSS', 'AI APIs'],
        type: 'public',
        github: 'https://github.com/bootcamp-formation-center',
        liveDemo: 'https://bootcamp-formation-center.vercel.app',
        category: 'SaaS Platform',
        features: [
            'Role-based dashboards for students, teachers, and administrators',
            'AI-powered resume and certificate generation',
            'Interactive quiz creation system',
            'GitHub & LinkedIn API integration',
            'Stripe & PayPal payment integration',
            'Real-time chat with Socket.IO',
            'Comprehensive course management'
        ],
        status: 'Live',
        logoSrc: '/images/logo-academy-expert.jpg',
        challenges: [
            'Integrating multiple AI services while maintaining performance',
            'Building secure role-based access control',
            'Handling real-time communication at scale',
            'Creating a seamless payment experience'
        ],
        solutions: [
            'Implemented efficient AI API caching and rate limiting',
            'Developed custom middleware for role-based permissions',
            'Optimized Socket.IO with room-based architecture',
            'Integrated multiple payment gateways with fallback options'
        ],
        results: [
            '80% reduction in administrative tasks',
            'Improved student engagement by 65%',
            'Successfully processed 1000+ transactions',
            'Zero security breaches since launch'
        ]
    },
    {
        id: 2,
        title: 'Nutrition Store',
        slug: 'nutrition-store',
        description: 'Modern e-commerce platform specialized in protein and nutrition products',
        longDescription: 'Modern e-commerce platform specialized in protein and nutrition products. Features advanced filtering, seamless checkout experience, and responsive design optimized for health-conscious consumers.',
        impact: 'Increased conversion rates by 35%',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
        type: 'public',
        github: 'https://github.com/montassar-souli/nutrition-store-next.js',
        liveDemo: 'https://nutrition-store-nextjs.vercel.app',
        category: 'E-commerce',
        features: [
            'Advanced product filtering by category, price, and brand',
            'Stripe checkout integration',
            'Responsive design optimized for mobile',
            'Performance optimization with Next.js',
            'SEO-friendly product pages',
            'Shopping cart with persistence'
        ],
        status: 'Live',
        logoSrc: '/images/no-image.jpg',
        challenges: [
            'Optimizing product images for fast loading',
            'Creating intuitive filtering system',
            'Ensuring smooth checkout flow',
            'Managing complex product variants'
        ],
        solutions: [
            'Implemented Next.js Image optimization',
            'Built custom filter component with URL state',
            'Streamlined checkout to 3 simple steps',
            'Created flexible product variant system'
        ],
        results: [
            '35% increase in conversion rates',
            '50% faster page load times',
            '90+ Lighthouse performance score',
            'Zero abandoned carts due to technical issues'
        ]
    },
    {
        id: 3,
        title: 'Food Store',
        slug: 'food-store',
        description: 'Intuitive food ordering platform with modern UI design',
        longDescription: 'Intuitive food ordering platform with modern UI design, smart category filtering, and seamless cart functionality. Built to enhance the digital dining experience with fast, responsive interactions.',
        impact: 'Reduced order processing time by 50%',
        technologies: ['Next.js', 'Tailwind CSS', 'React'],
        type: 'public',
        github: 'https://github.com/montassar-souli/food-store',
        liveDemo: 'https://food-store-demo.vercel.app',
        category: 'Food Tech',
        features: [
            'Category-based food filtering',
            'Real-time cart management',
            'Modern, appetizing UI design',
            'Mobile-first responsive layout',
            'Quick order placement',
            'Order history tracking'
        ],
        status: 'Live',
        logoSrc: '/images/no-image.jpg',
        challenges: [
            'Creating an appetizing visual design',
            'Implementing real-time cart updates',
            'Optimizing for mobile ordering',
            'Managing menu categories efficiently'
        ],
        solutions: [
            'Designed with food photography best practices',
            'Used React context for cart state management',
            'Implemented touch-friendly mobile UI',
            'Created dynamic category system'
        ],
        results: [
            '50% reduction in order processing time',
            '70% of orders placed on mobile',
            'Average order value increased by 25%',
            'Positive user feedback on UI/UX'
        ]
    },
    {
        id: 4,
        title: 'Ad Eyes',
        slug: 'ad-eyes',
        description: 'Corporate website for Korean seafood company with premium branding',
        longDescription: 'Corporate vitrine website for Aqua Development, a leading Korean seafood company. Delivered a sophisticated brand presentation with optimized performance and clean, professional design that reflects industry leadership.',
        impact: 'Improved lead generation by 40%',
        technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'MongoDB', 'NestJS'],
        type: 'private',
        client: 'Aqua Development (Korean Seafood Company)',
        category: 'Corporate Website',
        features: [
            'Brand-focused professional design',
            'Performance optimization',
            'SEO implementation',
            'Multilingual support (Korean/English)',
            'Contact form with backend integration',
            'Company showcase sections'
        ],
        status: 'Delivered',
        logoSrc: '/images/logo-ad.svg',
        challenges: [
            'Balancing premium aesthetics with fast performance',
            'Implementing multilingual content',
            'Creating professional corporate image',
            'SEO optimization for international audience'
        ],
        solutions: [
            'Optimized all assets and implemented lazy loading',
            'Built custom i18n solution with Next.js',
            'Developed clean, professional design system',
            'Implemented comprehensive SEO strategy'
        ],
        results: [
            '40% increase in lead generation',
            'Improved brand credibility',
            'First page Google ranking for target keywords',
            '95+ Lighthouse scores across all metrics'
        ]
    },
    {
        id: 5,
        title: 'Numenza',
        slug: 'numenza',
        description: 'Luxury jewelry e-commerce with sophisticated shopping experience',
        longDescription: 'Luxury jewelry e-commerce platform emphasizing premium branding and sophisticated user experience. Crafted tailored shopping flows and seamless navigation to match the high-end nature of the products.',
        impact: 'Increased average order value by 60%',
        technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
        type: 'private',
        client: 'Luxury Jewelry Brand',
        category: 'Luxury E-commerce',
        features: [
            'Premium brand-focused design',
            'Tailored luxury shopping flows',
            'Advanced product showcase with zoom',
            'Luxury UX patterns and animations',
            'Personalized product recommendations',
            'White-glove customer service integration'
        ],
        status: 'Delivered',
        logoSrc: '/images/logo-numenza.svg',
        challenges: [
            'Conveying luxury through digital design',
            'High-resolution product photography',
            'Creating exclusive shopping experience',
            'Building trust for high-value transactions'
        ],
        solutions: [
            'Implemented premium design system with elegant animations',
            'Optimized high-res images with progressive loading',
            'Created exclusive member features',
            'Added trust badges and secure checkout'
        ],
        results: [
            '60% increase in average order value',
            'Elevated brand perception',
            '45% increase in repeat purchases',
            'Customer satisfaction rating of 4.9/5'
        ]
    }
]

export const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find(project => project.slug === slug)
}

export const getProjectsByCategory = (category: string): Project[] => {
    if (category === 'All') return projects
    return projects.filter(project => project.category === category)
}

export const getFeaturedProjects = (limit: number = 3): Project[] => {
    return projects.slice(0, limit)
}
