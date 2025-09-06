import Image from 'next/image'
import React from 'react'

const TestPage = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <Image
                src="/images/portfolio-logo.png"
                alt="Montassar Portfolio Logo"
                className="object-cover"
                fill
            /></div>
    )
}

export default TestPage