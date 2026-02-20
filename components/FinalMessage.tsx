'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FinalMessageProps {
    isVisible: boolean;
}

// Consistent sparkle positions to avoid hydration mismatch
const sparklePositions = [
    { left: 15, top: 10, fontSize: 12, delay: 0 },
    { left: 85, top: 15, fontSize: 18, delay: 0.4 },
    { left: 25, top: 85, fontSize: 15, delay: 0.8 },
    { left: 75, top: 80, fontSize: 20, delay: 1.2 },
    { left: 50, top: 5, fontSize: 14, delay: 1.6 },
    { left: 10, top: 50, fontSize: 22, delay: 0.2 },
    { left: 90, top: 55, fontSize: 16, delay: 0.6 },
    { left: 30, top: 30, fontSize: 19, delay: 1.0 },
    { left: 70, top: 35, fontSize: 13, delay: 1.4 },
    { left: 45, top: 90, fontSize: 17, delay: 1.8 },
    { left: 20, top: 65, fontSize: 21, delay: 0.3 },
    { left: 80, top: 70, fontSize: 11, delay: 0.7 },
    { left: 35, top: 20, fontSize: 24, delay: 1.1 },
    { left: 65, top: 25, fontSize: 14, delay: 1.5 },
    { left: 55, top: 75, fontSize: 18, delay: 1.9 },
    { left: 12, top: 40, fontSize: 16, delay: 0.5 },
    { left: 88, top: 45, fontSize: 20, delay: 0.9 },
    { left: 40, top: 60, fontSize: 15, delay: 1.3 },
    { left: 60, top: 12, fontSize: 23, delay: 1.7 },
    { left: 50, top: 50, fontSize: 13, delay: 0.1 },
];

export default function FinalMessage({ isVisible }: FinalMessageProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-pale-pink/90 backdrop-blur-md z-30 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="bg-soft-yellow paper-texture rounded-2xl letter-shadow p-8 md:p-12 max-w-2xl text-center relative overflow-hidden border-4 border-double border-peach-glow"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: 0.3
                }}
            >

                {/* Content */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="font-retro-floral text-6xl md:text-7xl text-deep-pink mb-6 text-shadow-sm"
                        style={{ fontFamily: "'RetroFloral', cursive" }}>
                        You Did It!
                    </h2>

                    <p className="font-retro-floral text-xl md:text-2xl text-deep-pink/80 mb-6 leading-relaxed italic"
                        style={{ fontFamily: "'RetroFloral', cursive" }}>
                        You've opened all 20 letters, and I hope each one reminded you of how truly special you are.
                    </p>

                    <p className="font-retro-floral text-lg md:text-xl text-deep-pink/70 mb-8"
                        style={{ fontFamily: "'RetroFloral', cursive" }}>
                        Happy 20th, Nena. 20 will bring you kind of stuff you don't have to question, laughter that's loud and real, and moments that feel steady.
                    </p>

                    <div className="flex justify-center gap-3 text-peach-glow text-4xl">
                        {[...Array(5)].map((_, i) => (
                            <motion.span
                                key={i}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            >
                                ♥
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
