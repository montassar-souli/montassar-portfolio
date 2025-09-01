'use client'

import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
    const skills = [
        { name: 'Next.js', color: 'from-gray-600 to-black' },
        { name: 'React', color: 'from-blue-400 to-blue-600' },
        { name: 'NestJS', color: 'from-red-500 to-red-600' },
        { name: 'TailwindCSS', color: 'from-cyan-400 to-cyan-600' },
        { name: 'Angular', color: 'from-red-600 to-red-700' },
        { name: 'Node.js', color: 'from-green-500 to-green-600' },
        { name: 'MongoDB', color: 'from-green-600 to-green-700' },
        { name: 'MySQL', color: 'from-blue-500 to-blue-700' },
        { name: 'Express.js', color: 'from-yellow-500 to-orange-500' },
        { name: 'PHP', color: 'from-purple-500 to-purple-600' },
        { name: 'JEE', color: 'from-indigo-500 to-indigo-600' },
    ]

    const experiences = [
        {
            company: 'Rooly',
            role: 'Full Stack Developer',
            period: 'Current',
            projects: ['Ad Eyes - Seafood Company Website', 'Numenza - Jewelry Company Website'],
            icon: '💼'
        },
        {
            company: 'Daleelteq',
            role: 'Frontend Developer Intern',
            period: 'Internship',
            projects: ['React & Tailwind Development'],
            icon: '🚀'
        },
        {
            company: 'GOMYCODE',
            role: 'React JS Certification',
            period: 'Certified',
            projects: ['Advanced React Development'],
            icon: '🎓'
        }
    ]

    const education = [
        { degree: 'Computer Engineering', school: 'ESPRIT', status: 'Current Studies', icon: '🎯' },
        { degree: 'Bachelor in Computer Science & Multimedia', school: 'ISIMS', status: 'Completed', icon: '💻' },
        { degree: 'Bachelor in Electronics', school: 'University', status: 'Completed', icon: '⚡' }
    ]

    const hobbies = [
        { name: 'Judo', icon: '🥋', description: 'Discipline & Focus' },
        { name: 'Jujitsu', icon: '🥊', description: 'Problem Solving' },
        { name: 'Reading', icon: '📚', description: 'Continuous Learning' },
        { name: 'Gaming', icon: '🎮', description: 'Strategic Thinking' }
    ]

    return (
        <section className='relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 overflow-hidden'>
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50"
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
                    className="absolute bottom-40 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50"
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
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-4 block'>
                        Get to Know Me
                    </span>
                    <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                        About <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Montassar</span>
                    </h2>
                    <div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full'></div>
                </motion.div>

                <div className='grid lg:grid-cols-2 gap-16 items-start'>
                    {/* Left Column - Personal Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='space-y-8'
                    >
                        {/* Introduction */}
                        <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-4'>Full Stack Developer</h3>
                            <p className='text-gray-600 leading-relaxed mb-6'>
                                Hi! I&apos;m <span className='text-blue-600 font-semibold'>Montassar Souli</span>, a passionate Full Stack Developer with 1 year of professional experience.
                                I specialize in building modern, scalable web applications using cutting-edge technologies like Next.js, React, and NestJS.
                            </p>
                            <p className='text-gray-600 leading-relaxed mb-6'>
                                My journey in tech has been driven by curiosity and a love for problem-solving. From frontend magic with React and TailwindCSS
                                to robust backend solutions with Node.js and databases, I enjoy the full spectrum of web development.
                            </p>

                            {/* Current Project Highlight */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white'
                            >
                                <div className='flex items-center mb-3'>
                                    <span className='text-2xl mr-3'>🤖</span>
                                    <h4 className='text-lg font-semibold'>Current Project</h4>
                                </div>
                                <h5 className='text-xl font-bold mb-2'>AcademyExpert</h5>
                                <p className='text-blue-100'>
                                    An AI-powered bootcamp SaaS platform that revolutionizes online learning experiences.
                                </p>
                            </motion.div>
                        </div>

                        {/* Skills */}
                        <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Technical Skills</h3>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`bg-gradient-to-r ${skill.color} text-white rounded-xl p-4 text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                                    >
                                        {skill.name}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Experience & Education */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className='space-y-8'
                    >
                        {/* Experience */}
                        <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Professional Experience</h3>
                            <div className='space-y-6'>
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.company}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className='border-l-4 border-blue-500 pl-6 relative'
                                    >
                                        <div className='absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs'>
                                            {exp.icon}
                                        </div>
                                        <div className='bg-gray-50 rounded-xl p-4'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <h4 className='font-bold text-gray-900'>{exp.company}</h4>
                                                <span className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <p className='text-blue-600 font-semibold mb-2'>{exp.role}</p>
                                            <ul className='text-sm text-gray-600 space-y-1'>
                                                {exp.projects.map((project, i) => (
                                                    <li key={i} className='flex items-center'>
                                                        <span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
                                                        {project}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Education</h3>
                            <div className='space-y-4'>
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={edu.degree}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className='bg-gray-50 rounded-xl p-4 flex items-center space-x-4'
                                    >
                                        <div className='text-2xl'>{edu.icon}</div>
                                        <div className='flex-1'>
                                            <h4 className='font-semibold text-gray-900'>{edu.degree}</h4>
                                            <p className='text-blue-600 text-sm'>{edu.school}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${edu.status === 'Current Studies'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {edu.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Personal Interests */}
                        <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Beyond Code</h3>
                            <p className='text-gray-600 mb-6 leading-relaxed'>
                                My hobbies aren&apos;t just pastimes—they&apos;re integral to my development philosophy. Each one contributes
                                to my growth as a developer and problem-solver.
                            </p>
                            <div className='grid grid-cols-2 gap-4'>
                                {hobbies.map((hobby, index) => (
                                    <motion.div
                                        key={hobby.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center border border-blue-100 hover:border-blue-300 transition-colors'
                                    >
                                        <div className='text-3xl mb-2'>{hobby.icon}</div>
                                        <h4 className='font-semibold text-gray-900 mb-1'>{hobby.name}</h4>
                                        <p className='text-xs text-gray-600'>{hobby.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                viewport={{ once: true }}
                                className='text-gray-600 text-sm mt-6 text-center italic'
                            >
                                &ldquo;The discipline from martial arts, creativity from reading, and strategic thinking from gaming
                                all converge in my approach to coding and problem-solving.&rdquo;
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className='text-center mt-16'
                >
                    <div className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>Let&apos;s Build Something Amazing Together</h3>
                        <p className='text-gray-600 mb-6'>
                            Ready to bring your ideas to life? I&apos;m always excited to work on new projects and challenges.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                        >
                            Contact Me
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About