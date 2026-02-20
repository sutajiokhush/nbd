'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface LetterModalProps {
    isOpen: boolean;
    letterNumber: number;
    content: string;
    onClose: () => void;
}

export default function LetterModal({ isOpen, letterNumber, content, onClose }: LetterModalProps) {
    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="relative max-w-2xl w-full flex"
                            style={{ perspective: "1500px" }}
                        >
                            {/* Left Half */}
                            <motion.div
                                className="flex-1 bg-soft-yellow paper-texture rounded-l-lg shadow-inner overflow-hidden border-y-4 border-l-4 border-double border-beach-glow"
                                initial={{ rotateY: 90 }}
                                animate={{ rotateY: 0 }}
                                exit={{ rotateY: 90 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                style={{ transformOrigin: "right", backfaceVisibility: "hidden" }}
                            >
                                <div className="w-[200%] h-full p-8 md:p-12">
                                    <LetterBody letterNumber={letterNumber} content={content} />
                                </div>
                            </motion.div>

                            {/* Right Half */}
                            <motion.div
                                className="flex-1 bg-soft-yellow paper-texture rounded-r-lg shadow-inner overflow-hidden border-y-4 border-r-4 border-double border-beach-glow"
                                initial={{ rotateY: -90 }}
                                animate={{ rotateY: 0 }}
                                exit={{ rotateY: -90 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                style={{ transformOrigin: "left", backfaceVisibility: "hidden" }}
                            >
                                <div className="w-[200%] h-full p-8 md:p-12 -ml-[100%]">
                                    <LetterBody letterNumber={letterNumber} content={content} />
                                </div>
                            </motion.div>

                            {/* Close Button */}
                            <motion.button
                                onClick={onClose}
                                className="absolute -top-12 -right-4 md:-right-12 bg-deep-pink text-soft-yellow w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform z-[60] text-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                aria-label="Close"
                            >
                                ×
                            </motion.button>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

// Sub-component to keep content DRY while splitting
function LetterBody({ letterNumber, content }: { letterNumber: number, content: string }) {
    return (
        <>
            <div className="text-center mb-8">
                <div className="font-script text-deep-pink/60 text-2xl mb-2">
                    Letter
                </div>
                <div className="font-script text-deep-pink text-6xl text-shadow-sm">
                    {letterNumber}
                </div>
            </div>

            <div className="font-retro-floral text-xl text-deep-pink/90 whitespace-pre-line leading-relaxed text-center"
                style={{ fontFamily: "'RetroFloral', cursive" }}>
                {content}
            </div>

            <div className="flex justify-center gap-2 mt-8 text-peach-glow text-2xl">
                {[0, 0.3, 0.6].map((delay, i) => (
                    <motion.span
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay }}
                    >
                        ♥
                    </motion.span>
                ))}
            </div>
        </>
    );
}
