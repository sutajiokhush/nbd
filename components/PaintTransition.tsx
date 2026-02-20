'use client';

import { motion } from 'framer-motion';

interface PaintTransitionProps {
    mode: 'in' | 'out'; // 'in' to cover the screen, 'out' to reveal it
    onComplete?: () => void;
}

export default function PaintTransition({ mode, onComplete }: PaintTransitionProps) {
    const strokeCount = 12;
    const strokes = Array.from({ length: strokeCount });
    const palette = ['#FDB5CE', '#132440', '#16476A', '#3B9797']; // New palette colors

    return (
        <div
            className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden"
        >
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350vw] h-[350vh] rotate-[-45deg] flex flex-col"
            >
                {strokes.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={mode === 'in' ? { x: '-110%' } : { x: '0%' }}
                        animate={mode === 'in' ? { x: '0%' } : { x: '110%' }}
                        onAnimationComplete={i === (mode === 'in' ? strokeCount - 1 : 0) ? onComplete : undefined}
                        transition={{
                            duration: 1.5, // Faster, more responsive movement
                            delay: mode === 'in' ? i * 0.1 : (strokeCount - i) * 0.05, // Quicker sequencing
                            ease: [0.43, 0.13, 0.23, 0.96]
                        }}
                        className="relative flex-1"
                        style={{
                            backgroundColor: palette[i % palette.length],
                        }}
                    >
                        {/* Aesthetic Jagged Brush Head */}
                        <div
                            className="absolute top-0 bottom-0 right-[-100px] w-[110px]"
                            style={{
                                backgroundColor: palette[i % palette.length],
                                clipPath: 'polygon(0% 0%, 100% 12%, 85% 25%, 100% 38%, 90% 50%, 100% 62%, 85% 75%, 100% 88%, 0% 100%)',
                                filter: 'blur(1.5px)'
                            }}
                        />
                        {/* Bristle/Paper Texture */}
                        <div className="absolute inset-0 opacity-10 paper-texture mix-blend-overlay pointer-events-none" />

                        {/* Subtle stroke internal shadow/line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/5" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
