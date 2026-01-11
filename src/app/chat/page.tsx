'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'

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

    const streamBotIdRef = useRef<string | null>(null)
    const streamTextRef = useRef('')
    const rafRef = useRef<number | null>(null)

    const scheduleBotTextUpdate = () => {
        if (!streamBotIdRef.current) return
        if (rafRef.current != null) return

        rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = null
            const botId = streamBotIdRef.current
            if (!botId) return
            const nextText = streamTextRef.current

            setMessages((prev) => {
                const idx = prev.findIndex((m) => m.id === botId)
                if (idx === -1) return prev
                const next = prev.slice()
                next[idx] = { ...next[idx], text: nextText }
                return next
            })
        })
    }

    const formatSeconds = (s: number) => {
        if (!Number.isFinite(s) || s <= 0) return ''
        if (s < 60) return `${Math.ceil(s)}s`
        const m = Math.ceil(s / 60)
        return `${m}m`
    }

    const getRetryInfoFromHeaders = (res: Response) => {
        const resetRaw = res.headers.get('x-ratelimit-reset')
        if (!resetRaw) return null
        const n = Number(resetRaw)
        if (!Number.isFinite(n)) return null

        const now = Date.now()
        const resetMs = n > 1e12 ? n : n * 1000
        const seconds = Math.max(0, (resetMs - now) / 1000)
        return { seconds }
    }

    const MAX_RESPONSE_LENGTH = 10_000
    const TRUNCATION_NOTICE = '\n\n(Response truncated)'

    const parseErrorMessage = async (res: Response) => {
        try {
            const data = await res.clone().json()
            const err = typeof data?.error === 'string' ? data.error : ''
            return err
        } catch {
            return ''
        }
    }

    const fetchWithRetry = async (url: string, init: RequestInit) => {
        const maxAttempts = 2
        let lastErr: unknown = null
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const res = await fetch(url, init)
                if (res.status >= 500 && res.status < 600 && attempt < maxAttempts) {
                    await new Promise((r) => setTimeout(r, 400))
                    continue
                }
                return res
            } catch (e) {
                lastErr = e
                if (attempt < maxAttempts) {
                    await new Promise((r) => setTimeout(r, 400))
                    continue
                }
            }
        }
        throw lastErr
    }

    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: 'Hello! What do you want to know about me?',
                sender: 'bot',
                timestamp: new Date()
            }
        ])
    }, [])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const text = inputValue

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        }

        const botId = (Date.now() + 1).toString()
        const botMessage: Message = {
            id: botId,
            text: '',
            sender: 'bot',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage, botMessage])
        setInputValue('')
        setIsLoading(true)

        streamBotIdRef.current = botId
        streamTextRef.current = ''

        try {
            const res = await fetchWithRetry('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            })

            if (!res.ok || !res.body) {
                const errText = await parseErrorMessage(res)
                const retryInfo = getRetryInfoFromHeaders(res)

                let msg = 'Sorry, I could not process your request.'

                if (res.status === 429) {
                    if (errText.toLowerCase().includes('daily token quota')) {
                        msg = 'Daily quota exceeded. Please try again tomorrow.'
                    } else {
                        msg = 'You are sending messages too fast. Please wait and try again.'
                    }

                    if (retryInfo?.seconds != null) {
                        msg += ` (Retry in ~${formatSeconds(retryInfo.seconds)})`
                    }
                }

                setMessages(prev =>
                    prev.map(m => (m.id === botId ? { ...m, text: msg } : m))
                )
                return
            }

            const reader = res.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { value, done } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                streamTextRef.current += chunk

                if (streamTextRef.current.length > MAX_RESPONSE_LENGTH) {
                    streamTextRef.current =
                        streamTextRef.current.slice(0, MAX_RESPONSE_LENGTH) + TRUNCATION_NOTICE
                    scheduleBotTextUpdate()
                    try {
                        await reader.cancel()
                    } catch {
                    }
                    break
                }

                scheduleBotTextUpdate()
            }

            scheduleBotTextUpdate()
        } catch {
            setMessages(prev =>
                prev.map(m =>
                    m.id === botId
                        ? { ...m, text: 'Network error. Please try again.' }
                        : m
                )
            )
        } finally {
            setIsLoading(false)
            inputRef.current?.focus()

            if (rafRef.current != null) {
                window.cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
            streamBotIdRef.current = null
            streamTextRef.current = ''
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
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
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center`}>
                                    {message.sender === 'user' ? (
                                        <Image
                                            src='/images/user.png'
                                            alt='User Avatar'
                                            width={20}
                                            height={20}
                                        />
                                    ) : (
                                        <Image
                                            src='/images/ai_bot.png'
                                            alt='Bot Avatar'
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex flex-col max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'
                                    }`}>
                                    <div className={`rounded-2xl px-4 py-1 shadow-md ${message.sender === 'user'
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
                            <div className='bg-white rounded-2xl px-4 py-2 shadow-md'>
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
                                className='w-full text-black px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-all'
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendMessage}
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