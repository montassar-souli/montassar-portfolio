'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'

// Zod validation schema
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
            // EmailJS configuration
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                company: data.company || 'Not specified',
                phone: data.phone || 'Not provided',
                to_name: 'Montassar Souli'
            }

            // Replace these with your actual EmailJS credentials
            const result = await emailjs.send(
                'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                templateParams,
                'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
            )

            if (result.status === 200) {
                setSubmitStatus('success')
                reset()
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error) {
            console.error('EmailJS error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            value: 'montassar.souli@example.com',
            description: 'Send me an email anytime'
        },
        {
            icon: '📱',
            title: 'Phone',
            value: '+216 XX XXX XXX',
            description: 'Call me for urgent matters'
        },
        {
            icon: '📍',
            title: 'Location',
            value: 'Tunisia',
            description: 'Available for remote work'
        },
        {
            icon: '💼',
            title: 'LinkedIn',
            value: 'linkedin.com/in/montassar-souli',
            description: 'Connect with me professionally'
        }
    ]

    const socialLinks = [
        { name: 'GitHub', icon: '🐙', url: '#', color: 'from-gray-600 to-gray-800' },
        { name: 'LinkedIn', icon: '💼', url: '#', color: 'from-blue-600 to-blue-800' },
        { name: 'Twitter', icon: '🐦', url: '#', color: 'from-blue-400 to-blue-600' },
        { name: 'Portfolio', icon: '🌐', url: '#', color: 'from-purple-600 to-purple-800' }
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

                        {/* Success/Error Messages */}
                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6'
                            >
                                <div className='flex items-center'>
                                    <span className='text-xl mr-2'>✅</span>
                                    <span className='font-medium'>Message sent successfully! I&apos;ll get back to you soon.</span>
                                </div>
                            </motion.div>
                        )}

                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6'
                            >
                                <div className='flex items-center'>
                                    <span className='text-xl mr-2'>❌</span>
                                    <span className='font-medium'>Failed to send message. Please try again or contact me directly.</span>
                                </div>
                            </motion.div>
                        )}

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
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
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
                                className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className='flex items-center justify-center'>
                                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Message'
                                )}
                            </motion.button>
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
                                        <div className='text-3xl'>{info.icon}</div>
                                        <div className='flex-1'>
                                            <h3 className='font-bold text-gray-900 mb-1'>{info.title}</h3>
                                            <p className='text-blue-600 font-semibold mb-1'>{info.value}</p>
                                            <p className='text-gray-600 text-sm'>{info.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Connect with me</h3>
                            <div className='grid grid-cols-2 gap-3'>
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`bg-gradient-to-r ${social.color} text-white rounded-xl p-4 text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 block`}
                                    >
                                        <div className='text-2xl mb-1'>{social.icon}</div>
                                        <div className='text-sm'>{social.name}</div>
                                    </motion.a>
                                ))}
                            </div>
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