'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    FaLaptopCode,
    FaReact,
    FaRobot,
    FaPuzzlePiece,
    FaNodeJs
} from 'react-icons/fa'
import {
    SiNextdotjs,
    SiNestjs,
    SiTailwindcss,
    SiMongodb
} from 'react-icons/si'

const AboutRecap = () => {
    const highlights = [
        { text: 'Full Stack Developer', icon: <FaLaptopCode /> },
        { text: 'React & Next.js Expert', icon: <FaReact /> },
        { text: 'AI SaaS Builder', icon: <FaRobot /> },
        { text: 'Problem Solver', icon: <FaPuzzlePiece /> }
    ]

    const technologies = [
        { name: 'React', icon: <FaReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'NestJS', icon: <SiNestjs /> },
        { name: 'TailwindCSS', icon: <SiTailwindcss /> },
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'MongoDB', icon: <SiMongodb /> }
    ]

    return (
        <section className='py-16 bg-white relative overflow-hidden h-full'>
            <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Main content - now centered */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='max-w-4xl mx-auto text-center space-y-8'
                >
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'
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
                        className='text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto'
                    >
                        A dedicated Full Stack Developer specializing in modern web technologies.
                        Currently building <span className='text-blue-600 font-semibold'>AcademyExpert</span>,
                        an AI-powered bootcamp SaaS platform, while contributing to innovative projects
                        at Rooly including seafood and jewelry company websites.
                    </motion.p>

                    {/* Key highlights - now in a single row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className='flex flex-wrap justify-center gap-4'
                    >
                        {highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.text}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                                viewport={{ once: true }}
                                className='flex items-center space-x-3 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-colors'
                            >
                                <span className={`text-2xl ${highlight.text === 'Full Stack Developer' ? 'text-blue-600' :
                                    highlight.text === 'React & Next.js Expert' ? 'text-cyan-400' :
                                        highlight.text === 'AI SaaS Builder' ? 'text-purple-600' :
                                            highlight.text === 'Problem Solver' ? 'text-green-600' :
                                                'text-black'
                                    }`}>{highlight.icon}</span>
                                <span className='font-medium text-gray-700'>{highlight.text}</span>
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTimeout(() => {
                                        window.location.href = '/about';
                                    }, 300);
                                }}
                                className='group cursor-pointer relative border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'
                            >
                                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                                <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                                <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 delay-300">Learn More About Me</span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Technologies section - enhanced */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className='mt-20 text-center'
                >
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>Specialized Technologies</h3>
                    <p className='text-gray-500 text-lg mb-8'>Building with the latest and most powerful tools</p>
                    <div className='flex flex-wrap justify-center gap-4'>
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                                viewport={{ once: true }}
                                className='flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full font-medium border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300'
                            >
                                <span className={`text-2xl ${tech.name === 'React' ? 'text-cyan-400' :
                                    tech.name === 'Next.js' ? 'text-black' :
                                        tech.name === 'NestJS' ? 'text-red-600' :
                                            tech.name === 'TailwindCSS' ? 'text-teal-500' :
                                                tech.name === 'Node.js' ? 'text-green-600' :
                                                    tech.name === 'MongoDB' ? 'text-green-500' :
                                                        'text-black'
                                    }`}>{tech.icon}</span>
                                <span className='text-lg'>{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutRecap