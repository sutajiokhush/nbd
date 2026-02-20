'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LandingSectionProps {
    onStartClick: () => void;
}

// Consistent heart positions to avoid hydration mismatch
const heartPositions = [
    { left: 13, top: 7, fontSize: 17, duration: 3, delay: 0 },
    { left: 30, top: 30, fontSize: 24, duration: 4, delay: 0.5 },
    { left: 47, top: 53, fontSize: 14, duration: 5, delay: 1 },
    { left: 64, top: 76, fontSize: 21, duration: 3, delay: 1.5 },
    { left: 81, top: 99, fontSize: 11, duration: 4, delay: 0 },
    { left: 98, top: 22, fontSize: 18, duration: 5, delay: 0.5 },
    { left: 15, top: 45, fontSize: 25, duration: 3, delay: 1 },
    { left: 32, top: 68, fontSize: 12, duration: 4, delay: 1.5 },
    { left: 49, top: 91, fontSize: 19, duration: 5, delay: 0 },
    { left: 66, top: 14, fontSize: 26, duration: 3, delay: 0.5 },
    { left: 83, top: 37, fontSize: 13, duration: 4, delay: 1 },
    { left: 10, top: 60, fontSize: 20, duration: 5, delay: 1.5 },
    { left: 27, top: 83, fontSize: 27, duration: 3, delay: 0 },
    { left: 44, top: 6, fontSize: 15, duration: 4, delay: 0.5 },
    { left: 61, top: 29, fontSize: 22, duration: 5, delay: 1 },
];

export default function LandingSection({ onStartClick }: LandingSectionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Floating Hearts Background */}
            {mounted && (
                <div className="absolute inset-0 pointer-events-none">
                    {heartPositions.map((heart, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-peach-glow opacity-40 mix-blend-multiply"
                            style={{
                                left: `${heart.left}%`,
                                top: `${heart.top}%`,
                                fontSize: `${heart.fontSize}px`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: heart.duration,
                                repeat: Infinity,
                                delay: heart.delay,
                            }}
                        >
                            ♥
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <motion.div
                className="text-center z-10 p-8 glass-panel rounded-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl text-deep-pink mb-4 text-shadow-sm font-retro-floral"
                    style={{ fontFamily: "'RetroFloral', cursive" }}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    20 Letters
                </motion.h1>
                <p className="text-2xl text-peach-glow font-retro-floral mb-6" style={{ fontFamily: "'RetroFloral', cursive" }}>for your 20th birthday</p>

                <motion.button
                    onClick={onStartClick}
                    className="bg-deep-pink hover:bg-deep-pink/90 text-soft-yellow font-retro-floral tracking-widest px-10 py-4 rounded-full text-lg transition-all duration-300 letter-shadow hover:scale-105 border-2 border-soft-yellow/50 cursor-pointer"
                    style={{ fontFamily: "'RetroFloral', cursive" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    BEGIN
                </motion.button>
            </motion.div>


        </section>
    );
}
