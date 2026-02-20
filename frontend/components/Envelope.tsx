'use client';

import { motion } from 'framer-motion';

interface EnvelopeProps {
    number: number;
    isOpened: boolean;
    onClick: () => void;
}

export default function Envelope({ number, isOpened, onClick }: EnvelopeProps) {
    return (
        <motion.div
            className="relative cursor-pointer"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <div
                className={`
          paper-texture rounded-lg p-6 
          flex flex-col items-center justify-center
          transition-all duration-300
          envelope-shadow border-2
          ${isOpened ? 'bg-peach-glow border-deep-pink/30' : 'bg-soft-yellow border-peach-glow/50'}
          hover:bg-peach-glow hover:scale-105
          min-h-[120px] md:min-h-[150px]
        `}
            >
                {/* Letter Number */}
                <div className="font-script text-5xl md:text-6xl text-deep-pink mb-2">
                    {number}
                </div>

                {/* Opened Indicator */}
                {isOpened && (
                    <motion.div
                        className="text-deep-pink/50 text-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        ♥
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
