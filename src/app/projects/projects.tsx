'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Bootcamp Formation Center',
            description: 'A comprehensive SaaS platform revolutionizing online education with AI-powered features, role-based dashboards, and integrated payment systems. Streamlines the entire learning journey from enrollment to certification.',
            impact: 'Automated 80% of administrative tasks and improved student engagement through AI-driven personalization',
            technologies: ['Express.js', 'Angular', 'MongoDB', 'Socket.IO', 'Tailwind CSS', 'AI APIs'],
            type: 'public',
            github: 'https://github.com/bootcamp-formation-center',
            category: 'SaaS Platform',
            features: ['Role-based dashboards', 'AI resume/certificate generation', 'Quiz creation system', 'GitHub & LinkedIn APIs', 'Stripe & PayPal integration'],
            status: 'Live'
        },
        {
            id: 2,
            title: 'Nutrition Store',
            description: 'Modern e-commerce platform specialized in protein and nutrition products. Features advanced filtering, seamless checkout experience, and responsive design optimized for health-conscious consumers.',
            impact: 'Increased conversion rates by 35% through optimized UX and streamlined checkout process',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
            type: 'public',
            github: 'https://github.com/montassar-souli/nutrition-store-next.js',
            category: 'E-commerce',
            features: ['Product filtering system', 'Stripe checkout integration', 'Responsive design', 'Performance optimization'],
            status: 'Live'
        },
        {
            id: 3,
            title: 'Food Store',
            description: 'Intuitive food ordering platform with modern UI design, smart category filtering, and seamless cart functionality. Built to enhance the digital dining experience with fast, responsive interactions.',
            impact: 'Reduced order processing time by 50% with streamlined UI and optimized performance',
            technologies: ['Next.js', 'Tailwind CSS', 'React'],
            type: 'public',
            github: 'https://github.com/montassar-souli/food-store',
            category: 'Food Tech',
            features: ['Category filtering', 'Cart management', 'Modern UI/UX', 'Mobile-first design'],
            status: 'Live'
        },
        {
            id: 4,
            title: 'Ad Eyes',
            description: 'Corporate vitrine website for Aqua Development, a leading Korean seafood company. Delivered a sophisticated brand presentation with optimized performance and clean, professional design that reflects industry leadership.',
            impact: 'Enhanced brand credibility and improved lead generation by 40% through strategic design and SEO optimization',
            technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
            type: 'private',
            client: 'Aqua Development (Korean Seafood Company)',
            category: 'Corporate Website',
            features: ['Brand-focused design', 'Performance optimization', 'SEO implementation', 'Multilingual support'],
            status: 'Delivered'
        },
        {
            id: 5,
            title: 'Numenza',
            description: 'Luxury jewelry e-commerce platform emphasizing premium branding and sophisticated user experience. Crafted tailored shopping flows and seamless navigation to match the high-end nature of the products.',
            impact: 'Elevated brand perception and increased average order value by 60% through premium UX design',
            technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
            type: 'private',
            client: 'Luxury Jewelry Brand',
            category: 'Luxury E-commerce',
            features: ['Premium branding', 'Tailored shopping flows', 'Advanced product showcase', 'Luxury UX patterns'],
            status: 'Delivered'
        }
    ]

    const categories = ['All', 'SaaS Platform', 'E-commerce', 'Corporate Website', 'Food Tech', 'Luxury E-commerce']
    const [activeCategory, setActiveCategory] = React.useState('All')

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory)

    return (
        <section className='relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 overflow-hidden'>
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-40 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-4 block'>
                        My Work
                    </span>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                        Featured{' '}
                        <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            Projects
                        </span>
                    </h1>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                        A showcase of solutions I've built for clients and personal projects, focusing on real business impact and user experience.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className='flex flex-wrap justify-center gap-3 mb-12'
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className='grid lg:grid-cols-2 gap-8'>
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300'
                        >
                            {/* Project Header */}
                            <div className='flex items-start justify-between mb-6'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <h3 className='text-2xl font-bold text-gray-900'>{project.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Live'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <span className='text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                                        {project.category}
                                    </span>
                                </div>
                                {project.type === 'private' && (
                                    <div className='flex items-center space-x-2 text-purple-600'>
                                        <span className='text-sm'>🔒</span>
                                        <span className='text-xs font-medium'>Private Client</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className='text-gray-600 leading-relaxed mb-4'>
                                {project.description}
                            </p>

                            {/* Impact */}
                            <div className='bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6'>
                                <div className='flex items-start space-x-2'>
                                    <span className='text-green-600 text-sm'>📈</span>
                                    <div>
                                        <h4 className='text-sm font-semibold text-green-800 mb-1'>Business Impact</h4>
                                        <p className='text-green-700 text-sm'>{project.impact}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className='mb-6'>
                                <h4 className='text-sm font-semibold text-gray-700 mb-3'>Key Features</h4>
                                <div className='flex flex-wrap gap-2'>
                                    {project.features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className='text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200'
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className='mb-6'>
                                <h4 className='text-sm font-semibold text-gray-700 mb-3'>Technologies Used</h4>
                                <div className='flex flex-wrap gap-2'>
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className='text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-medium'
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Client Info for Private Projects */}
                            {project.client && (
                                <div className='mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl'>
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-purple-600'>🏢</span>
                                        <span className='text-sm font-semibold text-purple-800'>Client: {project.client}</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className='flex gap-3'>
                                {project.type === 'public' ? (
                                    <motion.a
                                        href={project.github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='flex-1 bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2'
                                    >
                                        <span>🐙</span>
                                        <span>View on GitHub</span>
                                    </motion.a>
                                ) : (
                                    <div className='flex-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-6 py-3 rounded-xl font-semibold text-center border border-purple-300 flex items-center justify-center space-x-2'>
                                        <span>📋</span>
                                        <span>Case study available on request</span>
                                    </div>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors border border-blue-200'
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='text-center mt-16'
                >
                    <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>Have a Project in Mind?</h3>
                        <p className='text-gray-600 mb-6'>
                            I'm always excited to work on new challenges and help bring innovative ideas to life.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                        >
                            Let's Discuss Your Project
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Projects