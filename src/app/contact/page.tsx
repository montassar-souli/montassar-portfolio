'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaCheckCircle, FaEnvelope, FaFileAlt, FaGithub, FaGlobe, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTimesCircle } from 'react-icons/fa'

const contactSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: z.string()
        .email('Please enter a valid email address'),
    subject: z.string()
        .min(5, 'Subject must be at least 5 characters')
        .max(100, 'Subject must be less than 100 characters'),
    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),
    company: z.string().optional(),
    phone: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const statusRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (submitStatus === 'success' || submitStatus === 'error') {
            statusRef.current?.focus()
        }
    }, [submitStatus])

    const dismissStatus = () => setSubmitStatus('idle')
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setSubmitStatus('success')
                reset()
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error) {
            console.error('Contact form error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo: Array<{
        title: string
        value: string
        description: string
        href: string
        external?: boolean
        icon: React.ReactNode
        iconColor: string
    }> = [
            {
                title: 'Email',
                value: 'elsoulimontassar@gmail.com',
                description: 'Send me an email anytime',
                href: 'mailto:elsoulimontassar@gmail.com',
                icon: <FaEnvelope />,
                iconColor: 'text-blue-600'
            },
            {
                title: 'Phone',
                value: '+216 94 266 854',
                description: 'Call me for urgent matters',
                href: 'tel:+21694266854',
                icon: <FaPhone />,
                iconColor: 'text-emerald-600'
            },
            {
                title: 'Location',
                value: 'Tunisia, Ariana, Soukra',
                description: 'Available for remote work',
                href: 'https://maps.google.com/maps?q=Soukra,+Ariana,+Tunisia',
                external: true,
                icon: <FaMapMarkerAlt />,
                iconColor: 'text-purple-600'
            },
            {
                title: 'LinkedIn',
                value: 'linkedin.com/in/montassar-souli',
                description: 'Connect with me professionally',
                href: 'https://linkedin.com/in/montassar-souli',
                external: true,
                icon: <FaLinkedin />,
                iconColor: 'text-sky-600'
            }
        ]

    return (
        <section className='relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 overflow-hidden min-h-screen'>
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
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
                    className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 25,
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
                        Get In Touch
                    </span>
                    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                        Let&apos;s Build Something{' '}
                        <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            Amazing
                        </span>
                    </h1>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                        Have a project in mind? I&apos;m always excited to discuss new opportunities and collaborate on innovative solutions.
                    </p>
                </motion.div>

                <div className='grid lg:grid-cols-2 gap-16'>
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20'
                    >
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Send me a message</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                            {/* Name and Email Row */}
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Name *
                                    </label>
                                    <input
                                        {...register('name')}
                                        type='text'
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent transition-all duration-200'
                                        placeholder='Your full name'
                                    />
                                    {errors.name && (
                                        <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Email *
                                    </label>
                                    <input
                                        {...register('email')}
                                        type='email'
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent transition-all duration-200'
                                        placeholder='your.email@example.com'
                                    />
                                    {errors.email && (
                                        <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Company and Phone Row */}
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Company
                                    </label>
                                    <input
                                        {...register('company')}
                                        type='text'
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent transition-all duration-200'
                                        placeholder='Your company (optional)'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        Phone
                                    </label>
                                    <input
                                        {...register('phone')}
                                        type='tel'
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent transition-all duration-200'
                                        placeholder='Your phone (optional)'
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Subject *
                                </label>
                                <input
                                    {...register('subject')}
                                    type='text'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent transition-all duration-200'
                                    placeholder='What is this about?'
                                />
                                {errors.subject && (
                                    <p className='text-red-500 text-sm mt-1'>{errors.subject.message}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Message *
                                </label>
                                <textarea
                                    {...register('message')}
                                    rows={6}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent transition-all duration-200 resize-none'
                                    placeholder='Tell me about your project or inquiry...'
                                />
                                {errors.message && (
                                    <p className='text-red-500 text-sm mt-1'>{errors.message.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type='submit'
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                className={`relative w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 overflow-hidden ${isSubmitting
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 cursor-wait'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:cursor-pointer'
                                    }`}
                            >
                                {isSubmitting && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                                        animate={{
                                            x: ['-100%', '100%']
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        style={{
                                            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                                        }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center justify-center">
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Sending Message...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </span>
                            </motion.button>

                            {/* Success/Error Messages (below button) */}
                            {(submitStatus === 'success' || submitStatus === 'error') && (
                                <motion.div
                                    ref={statusRef}
                                    tabIndex={-1}
                                    role={submitStatus === 'error' ? 'alert' : 'status'}
                                    aria-live={submitStatus === 'error' ? 'assertive' : 'polite'}
                                    aria-atomic="true"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`relative px-4 py-3 rounded-xl border focus:outline-none ${submitStatus === 'success'
                                        ? 'bg-green-50 border-green-200 text-green-800 focus:ring-2 focus:ring-green-400'
                                        : 'bg-red-50 border-red-200 text-red-800 focus:ring-2 focus:ring-red-400'
                                        }`}
                                >
                                    <button
                                        type='button'
                                        onClick={dismissStatus}
                                        className='absolute right-3 top-3 text-gray-500 hover:text-gray-900 transition-colors'
                                        aria-label='Dismiss message'
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>

                                    <div className='flex items-start pr-8'>
                                        {submitStatus === 'success' ? (
                                            <FaCheckCircle className='text-xl mr-2 mt-0.5' aria-hidden="true" />
                                        ) : (
                                            <FaTimesCircle className='text-xl mr-2 mt-0.5' aria-hidden="true" />
                                        )}
                                        <div className='text-sm font-medium leading-relaxed'>
                                            {submitStatus === 'success'
                                                ? "Message sent successfully! I'll get back to you soon."
                                                : "Failed to send message. Please try again or contact me directly."}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className='space-y-8'
                    >
                        {/* Contact Info Cards */}
                        <div className='space-y-6'>
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300'
                                >
                                    <div className='flex items-start space-x-4'>
                                        <span
                                            className={`text-2xl ${info.iconColor} w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center`}
                                            aria-hidden="true"
                                        >
                                            {info.icon}
                                        </span>
                                        <div className='flex-1'>
                                            <h3 className='font-bold text-gray-900 mb-1'>{info.title}</h3>
                                            <a
                                                href={info.href}
                                                target={info.external ? '_blank' : undefined}
                                                rel={info.external ? 'noreferrer noopener' : undefined}
                                                className='text-blue-700 font-semibold mb-1 inline-block hover:underline underline-offset-4'
                                            >
                                                {info.value}
                                            </a>
                                            <p className='text-gray-600 text-sm'>{info.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Availability Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                            className='bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center'
                        >
                            <div className='flex items-center justify-center mb-3'>
                                <div className='w-3 h-3 bg-white rounded-full animate-pulse mr-2'></div>
                                <span className='font-semibold'>Currently Available</span>
                            </div>
                            <p className='text-green-100 text-sm'>
                                Open for new projects and collaborations.
                                Average response time: 24 hours
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact