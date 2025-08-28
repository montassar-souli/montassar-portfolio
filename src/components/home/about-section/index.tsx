'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';

const AboutRecap = () => {
    const stats = [
        { number: '1+', label: 'Years Experience', icon: '💼' },
        { number: '10+', label: 'Technologies', icon: '⚡' },
        { number: '3+', label: 'Major Projects', icon: '🚀' },
        { number: '3', label: 'Degrees', icon: '🎓' }
    ]

    const highlights = [
        { text: 'Full Stack Developer', icon: '💻' },
        { text: 'React & Next.js Expert', icon: '⚛️' },
        { text: 'AI SaaS Builder', icon: '🤖' },
        { text: 'Problem Solver', icon: '🧩' }
    ]

    return (
        <section className='py-16 bg-white relative overflow-hidden'>
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    {/* Left side - Brief intro */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='space-y-6'
                    >
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                                className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'
                            >
                                Crafting Digital Solutions with{' '}
                                <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                    Precision
                                </span>
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className='text-lg text-gray-600 leading-relaxed'
                        >
                            A dedicated Full Stack Developer specializing in modern web technologies.
                            Currently building <span className='text-blue-600 font-semibold'>AcademyExpert</span>,
                            an AI-powered bootcamp SaaS platform, while contributing to innovative projects
                            at Rooly including seafood and jewelry company websites.
                        </motion.p>

                        {/* Key highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                            className='grid grid-cols-2 gap-3'
                        >
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.text}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className='flex items-center space-x-3 bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-blue-200 transition-colors'
                                >
                                    <span className='text-xl'>{highlight.icon}</span>
                                    <span className='font-medium text-gray-700 text-sm'>{highlight.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <Link href='/about'>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const button = e.currentTarget;
                                        button.style.transform = 'scale(0.95)';
                                        setTimeout(() => {
                                            window.location.href = '/about';
                                        }, 300);
                                    }}
                                    className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'
                                >
                                    Learn More About Me
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='grid grid-cols-2 gap-6'
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300'
                            >
                                <div className='text-3xl mb-3'>{stat.icon}</div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'
                                >
                                    {stat.number}
                                </motion.div>
                                <p className='text-gray-600 font-medium text-sm'>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom section - Tech stack preview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className='mt-16 text-center'
                >
                    <p className='text-gray-500 text-sm mb-4'>Specialized in</p>
                    <div className='flex flex-wrap justify-center gap-3'>
                        {['React', 'Next.js', 'NestJS', 'TailwindCSS', 'Node.js', 'MongoDB'].map((tech, index) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                                viewport={{ once: true }}
                                className='bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:border-blue-300 transition-colors'
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutRecap