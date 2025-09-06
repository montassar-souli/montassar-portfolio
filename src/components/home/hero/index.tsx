'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const Hero = () => {
    
    return (
        <div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden'>
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-16 lg:top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
                <div className='grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='text-center lg:text-left'
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-block"
                        >
                            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-4 block'>
                                Full Stack Developer
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6'
                        >
                            Welcome to My{' '}
                            <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'>
                                Portfolio
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className='text-xl text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0'
                        >
                            I am a passionate developer with experience in building
                            <span className='text-blue-600 font-medium'> modern web applications </span>
                            that deliver exceptional user experiences.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
                        >
                            <motion.button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTimeout(() => {
                                        window.location.href = '/projects';
                                    }, 300);
                                }}
                                className='group cursor-pointer relative border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'
                            >
                                <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 delay-200">View My Work</span>
                            </motion.button>
                            <motion.button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTimeout(() => {
                                        window.location.href = '/contact';
                                    }, 300);
                                }}
                                className='group cursor-pointer relative border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'
                            >
                                <div className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300 delay-200">Get In Touch</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='relative flex justify-center lg:justify-end'
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-4 -left-4 w-24 h-24 border-4 border-blue-300 rounded-full opacity-30"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-purple-300 rounded-full opacity-30"
                            />

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-80 h-96 lg:w-96 lg:h-[500px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl rotate-6 opacity-20"></div>
                                <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
                                    <Image
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                        src="/images/profile-image.jpeg"
                                        alt="Hero Image"
                                        fill
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Hero