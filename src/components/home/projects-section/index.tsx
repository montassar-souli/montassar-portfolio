'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
    FaGraduationCap,
    FaFish,
    FaGem,
    FaChartLine,
    FaLock,
    FaExternalLinkAlt
} from 'react-icons/fa'

const ProjectsRecap = () => {
    const featuredProjects = [
        {
            title: 'Academy Expert',
            description: 'AI-powered SaaS platform with role-based dashboards and payment integration',
            category: 'SaaS Platform',
            technologies: ['Express.js', 'Angular', 'MongoDB', 'AI APIs'],
            type: 'public',
            impact: '80% task automation',
            icon: <FaGraduationCap className="text-blue-600" />,
            logoSrc: '/images/logo-academy-expert.jpg'
        },
        {
            title: 'Ad Eyes',
            description: 'Corporate website for Korean seafood company with premium branding',
            category: 'Corporate',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'NestJS'],
            type: 'private',
            impact: '40% lead increase',
            icon: <FaFish className="text-blue-600" />,
            logoSrc: '/images/logo-ad.svg'
        },
        {
            title: 'Numenza',
            description: 'Luxury jewelry e-commerce with sophisticated shopping experience',
            category: 'E-commerce',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
            type: 'private',
            impact: '60% AOV increase',
            icon: <FaGem className="text-blue-600" />,
            logoSrc: '/images/logo-numenza.svg'
        }
    ]

    const stats = [
        { number: '5+', label: 'Projects Delivered' },
        { number: '3', label: 'Private Clients' },
        { number: '1', label: 'SaaS Platform' },
        { number: '100%', label: 'Client Satisfaction' }
    ]

    return (
        <section className='py-16 bg-white relative overflow-hidden h-full'>
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-center mb-12'
                >
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-3 block'>
                        Recent Work
                    </span>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Projects That{' '}
                        <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            Drive Results
                        </span>
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        From AI-powered SaaS platforms to luxury e-commerce, I build solutions that solve real business problems.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            viewport={{ once: true }}
                            className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center border border-blue-100 hover:border-blue-200 transition-all duration-300'
                        >
                            <div className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1'>
                                {stat.number}
                            </div>
                            <p className='text-gray-600 text-sm font-medium'>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Projects */}
                <div className='grid md:grid-cols-3 gap-8 mb-12'>
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300'
                        >
                            {/* Project Header */}
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center justify-center w-10 h-10 bg-white rounded-lg border border-gray-200 p-1'>
                                    {project.logoSrc ? (
                                        <Image
                                            src={project.logoSrc}
                                            alt={`${project.title} logo`}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className='text-2xl text-blue-600'>
                                            {project.icon}
                                        </div>
                                    )}
                                </div>
                                <div className='flex items-center space-x-2'>
                                    {project.type === 'private' && (
                                        <FaLock className='text-purple-600 text-xs' />
                                    )}
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.type === 'public'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-purple-100 text-purple-700'
                                        }`}>
                                        {project.type === 'public' ? 'Open Source' : 'Client Work'}
                                    </span>
                                </div>
                            </div>

                            {/* Project Info */}
                            <h3 className='text-lg font-bold text-gray-900 mb-2'>{project.title}</h3>
                            <p className='text-gray-600 text-sm mb-4 leading-relaxed'>{project.description}</p>

                            {/* Impact */}
                            <div className='bg-green-50 border border-green-200 rounded-lg p-3 mb-4'>
                                <div className='flex items-center space-x-2'>
                                    <FaChartLine className='text-green-600 text-sm' />
                                    <span className='text-green-800 text-sm font-semibold'>{project.impact}</span>
                                </div>
                            </div>

                            {/* Category */}
                            <div className='mb-4'>
                                <span className='text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200'>
                                    {project.category}
                                </span>
                            </div>

                            {/* Technologies */}
                            <div className='flex flex-wrap gap-1 mb-4'>
                                {project.technologies.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full'
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.technologies.length > 3 && (
                                    <span className='text-xs text-gray-500 px-2 py-1'>
                                        +{project.technologies.length - 3} more
                                    </span>
                                )}
                            </div>

                            {/* Action */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='w-full flex items-center justify-center cursor-pointer gap-2 text-blue-600 font-semibold text-sm py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors'
                            >
                                {project.type === 'public' ? 'View Project' : 'Learn More'}
                                <FaExternalLinkAlt className="text-xs" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='text-center'
                >
                    <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100'>
                        <h3 className='text-xl font-bold text-gray-900 mb-3'>Interested in My Work?</h3>
                        <p className='text-gray-600 mb-6 max-w-xl mx-auto'>
                            Explore my complete portfolio to see detailed case studies, technical implementations, and the business impact of each project.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <motion.button
                                className='group cursor-pointer relative border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'                            >
                                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 delay-200">View All Projects</span>
                            </motion.button>
                            <motion.a
                                href="/resume/Montassar-Souli-Resume.pdf"
                                download="Montassar-Souli-Resume.pdf"
                                className='group cursor-pointer relative border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 overflow-hidden inline-flex items-center justify-center'
                            >
                                <div className="absolute inset-0 bg-gray-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300 delay-200">Download Resume</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsRecap