'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/lib/projectsData'
import {
    FaGithub,
    FaExternalLinkAlt,
    FaLock,
    FaCheckCircle,
    FaLightbulb,
    FaChartLine,
    FaTools,
    FaArrowLeft,
    FaBuilding,
    FaCode,
    FaStar,
    FaAward
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectDetailProps {
    project: Project
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100'>
            {/* Hero Section */}
            <section className='relative py-12 md:py-20 overflow-hidden'>
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                </div>

                <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {/* Back Button */}
                    <Link href='/projects'>
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: -5 }}
                            className='mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg'
                        >
                            <FaArrowLeft />
                            <span className='font-medium'>Back to Projects</span>
                        </motion.button>
                    </Link>

                    {/* Project Header Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl border border-white/50'
                    >
                        <div className='flex flex-col lg:flex-row gap-8'>
                            {/* Left side - Logo and badges */}
                            <div className='flex flex-col items-center lg:items-start gap-4'>
                                {project.logoSrc && (
                                    <motion.div
                                        className='w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-3 flex items-center justify-center shadow-lg'
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Image
                                            src={project.logoSrc}
                                            alt={`${project.title} logo`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-contain"
                                        />
                                    </motion.div>
                                )}

                                {/* Status badges */}
                                <div className='flex flex-col gap-2 w-full'>
                                    <motion.div
                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md ${project.type === 'public'
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                            : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {project.type === 'public' ? <FaGithub /> : <FaLock />}
                                        <span>{project.type === 'public' ? 'Open Source' : 'Client Work'}</span>
                                    </motion.div>

                                    <motion.div
                                        className='flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-md'
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <FaAward />
                                        <span>{project.category}</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Right side - Project info */}
                            <div className='flex-1'>
                                <div className='mb-6'>
                                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                        {project.title}
                                    </h1>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'Live'
                                            ? 'bg-green-100 text-green-800 border border-green-300'
                                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                                            }`}>
                                            <FaCheckCircle className="text-xs" />
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                <p className='text-lg md:text-xl text-gray-700 leading-relaxed mb-6'>
                                    {project.longDescription || project.description}
                                </p>

                                {project.client && (
                                    <motion.div
                                        className='bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4 mb-6'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className='flex items-center gap-3'>
                                            <FaBuilding className='text-purple-600 text-xl' />
                                            <div>
                                                <p className='text-xs text-purple-600 font-semibold uppercase tracking-wide'>Client</p>
                                                <p className='text-purple-900 font-bold'>{project.client}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Impact Badge - Enhanced */}
                                <motion.div
                                    className='bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300 rounded-2xl p-5 shadow-lg'
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className='bg-green-500 p-3 rounded-xl'>
                                            <FaChartLine className='text-white text-2xl' />
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-sm text-green-700 font-bold uppercase tracking-wide mb-1'>Business Impact</p>
                                            <p className='text-green-900 font-bold text-lg'>{project.impact}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Action Buttons */}
                                <div className='flex flex-wrap gap-3 mt-6'>
                                    {project.github && (
                                        <motion.a
                                            href={project.github}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className='flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-shadow'
                                        >
                                            <FaGithub className='text-lg' />
                                            <span>View Code</span>
                                        </motion.a>
                                    )}
                                    {project.liveDemo && (
                                        <motion.a
                                            href={project.liveDemo}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-shadow'
                                        >
                                            <FaExternalLinkAlt />
                                            <span>Live Demo</span>
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technologies Section - Enhanced */}
            <section className='py-12'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50'
                    >
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl'>
                                <FaCode className='text-white text-2xl' />
                            </div>
                            <h2 className='text-3xl font-bold text-gray-900'>Tech Stack</h2>
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                            {project.technologies.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className='bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 text-gray-800 px-4 py-3 rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all'
                                >
                                    {tech}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section - Enhanced */}
            <section className='py-12'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50'
                    >
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl'>
                                <FaStar className='text-white text-2xl' />
                            </div>
                            <h2 className='text-3xl font-bold text-gray-900'>Key Features</h2>
                        </div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            {project.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    whileHover={{ x: 5 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className='flex items-start gap-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md'
                                >
                                    <FaCheckCircle className='text-green-600 text-xl mt-0.5 flex-shrink-0' />
                                    <span className='text-gray-700 font-medium'>{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Challenges, Solutions, Results - Enhanced */}
            {(project.challenges || project.solutions || project.results) && (
                <section className='py-12'>
                    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='grid md:grid-cols-3 gap-6'>
                            {/* Challenges */}
                            {project.challenges && project.challenges.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow'
                                >
                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className='bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl'>
                                            <FaLightbulb className='text-white text-xl' />
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900'>Challenges</h3>
                                    </div>
                                    <ul className='space-y-3'>
                                        {project.challenges.map((challenge, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className='text-gray-600 text-sm leading-relaxed pl-4 border-l-2 border-yellow-400'
                                            >
                                                {challenge}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Solutions */}
                            {project.solutions && project.solutions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow'
                                >
                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className='bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl'>
                                            <FaTools className='text-white text-xl' />
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900'>Solutions</h3>
                                    </div>
                                    <ul className='space-y-3'>
                                        {project.solutions.map((solution, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className='text-gray-600 text-sm leading-relaxed pl-4 border-l-2 border-blue-400'
                                            >
                                                {solution}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Results */}
                            {project.results && project.results.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow'
                                >
                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className='bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl'>
                                            <FaChartLine className='text-white text-xl' />
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900'>Results</h3>
                                    </div>
                                    <ul className='space-y-3'>
                                        {project.results.map((result, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className='text-gray-600 text-sm leading-relaxed pl-4 border-l-2 border-green-400'
                                            >
                                                {result}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section - Enhanced */}
            <section className='py-20'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl overflow-hidden'
                    >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }} />
                        </div>

                        <div className='relative z-10'>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className='inline-block mb-4'
                            >
                                <FaAward className='text-6xl' />
                            </motion.div>
                            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Interested in Similar Work?</h2>
                            <p className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
                                Let&apos;s discuss how I can help bring your project to life with the same level of quality and attention to detail
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                <Link href='/contact'>
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-shadow text-lg'
                                    >
                                        Get in Touch
                                    </motion.button>
                                </Link>
                                <Link href='/projects'>
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all text-lg'
                                    >
                                        View More Projects
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default ProjectDetail