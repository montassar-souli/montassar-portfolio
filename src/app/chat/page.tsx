'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Initialize messages on client side to avoid hydration mismatch
    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: 'Hello! How can I help you today?',
                sender: 'bot',
                timestamp: new Date()
            }
        ])
    }, [])

    // Auto-scroll to bottom when new messages arrive
    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }

    // useEffect(() => {
    //     scrollToBottom()
    // }, [messages])

    // API call function - Replace with your actual API endpoint
    // const sendMessageToAPI = async (message: string): Promise<string> => {
    //     try {
    //         // Example API call - Replace with your actual endpoint
    //         const response = await fetch('/api/chat', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ message }),
    //         })

    //         if (!response.ok) {
    //             throw new Error('API request failed')
    //         }

    //         const data = await response.json()
    //         return data.response || 'Sorry, I could not process your request.'
    //     } catch (error) {
    //         console.error('API Error:', error)
    //         return 'Sorry, there was an error processing your request. Please try again.'
    //     }
    // }

    // const handleSendMessage = async () => {
    //     if (!inputValue.trim() || isLoading) return

    //     const userMessage: Message = {
    //         id: Date.now().toString(),
    //         text: inputValue,
    //         sender: 'user',
    //         timestamp: new Date()
    //     }

    //     // Add user message
    //     setMessages(prev => [...prev, userMessage])
    //     setInputValue('')
    //     setIsLoading(true)

    //     // Get bot response from API
    //     const botResponse = await sendMessageToAPI(inputValue)

    //     const botMessage: Message = {
    //         id: (Date.now() + 1).toString(),
    //         text: botResponse,
    //         sender: 'bot',
    //         timestamp: new Date()
    //     }

    //     // Add bot message
    //     setMessages(prev => [...prev, botMessage])
    //     setIsLoading(false)

    //     // Focus back on input
    //     inputRef.current?.focus()
    // }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            //handleSendMessage()
        }
    }

    return (
        <div className='flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100'>
            {/* Messages Container */}
            <div className='flex-1 overflow-y-auto px-4 py-6'>
                <div className='max-w-4xl mx-auto space-y-4'>
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.sender === 'user'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-600'
                                    }`}>
                                    {message.sender === 'user' ? (
                                        <FaUser className='text-white text-sm' />
                                    ) : (
                                        <FaRobot className='text-white text-sm' />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex flex-col max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'
                                    }`}>
                                    <div className={`rounded-2xl px-4 py-3 shadow-md ${message.sender === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                        : 'bg-white text-gray-800'
                                        }`}>
                                        <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                                            {message.text}
                                        </p>
                                    </div>
                                    <span className='text-xs text-gray-500 mt-1 px-2'>
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading Indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='flex gap-3'
                        >
                            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center'>
                                <FaRobot className='text-white text-sm' />
                            </div>
                            <div className='bg-white rounded-2xl px-4 py-3 shadow-md'>
                                <div className='flex gap-2'>
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                        className='w-2 h-2 bg-gray-400 rounded-full'
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                        className='w-2 h-2 bg-gray-400 rounded-full'
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                        className='w-2 h-2 bg-gray-400 rounded-full'
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className='bg-white/90 backdrop-blur-sm shadow-lg border-t border-gray-200 px-4 py-4'
            >
                <div className='max-w-4xl mx-auto'>
                    <div className='flex gap-3 items-end'>
                        <div className='flex-1 relative'>
                            <input
                                ref={inputRef}
                                type='text'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder='Type your message...'
                                disabled={isLoading}
                                className='w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all'
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {/*handleSendMessage()*/ }}
                            disabled={!inputValue.trim() || isLoading}
                            className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                        >
                            {isLoading ? (
                                <FaSpinner className='text-xl animate-spin' />
                            ) : (
                                <FaPaperPlane className='text-xl' />
                            )}
                        </motion.button>
                    </div>
                    <p className='text-xs text-gray-500 mt-2 text-center'>
                        Press Enter to send • Shift + Enter for new line
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default ChatBot