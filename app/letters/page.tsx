'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import LettersGrid from '@/components/LettersGrid';
import LetterModal from '@/components/LetterModal';
import FinalMessage from '@/components/FinalMessage';
import PaintTransition from '@/components/PaintTransition';
import { letters } from '@/data/letters';

export default function LettersPage() {
    const router = useRouter();
    const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
    const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
    const [showReveal, setShowReveal] = useState(true);
    const hasCheckedRedirect = useRef(false);

    useEffect(() => {
        if (hasCheckedRedirect.current) return;
        hasCheckedRedirect.current = true;

        const journeyStarted = sessionStorage.getItem('journeyStarted');
        if (!journeyStarted) {
            router.replace('/');
        } else {
            // Remove the flag so that a refresh will trigger a redirect next time
            sessionStorage.removeItem('journeyStarted');
        }
    }, [router]);

    const handleLetterClick = (letterNumber: number) => {
        setSelectedLetter(letterNumber);
        setOpenedLetters(prev => new Set(prev).add(letterNumber));
    };

    const handleCloseModal = () => {
        setSelectedLetter(null);
    };

    const allLettersOpened = openedLetters.size === 20;
    const currentLetter = selectedLetter
        ? letters.find(l => l.number === selectedLetter)
        : null;

    return (
        <main className="relative min-h-screen">
            <LettersGrid
                openedLetters={openedLetters}
                onLetterClick={handleLetterClick}
            />

            {selectedLetter && currentLetter && (
                <LetterModal
                    isOpen={true}
                    letterNumber={currentLetter.number}
                    content={currentLetter.content}
                    onClose={handleCloseModal}
                />
            )}

            <FinalMessage isVisible={allLettersOpened} />

            <AnimatePresence>
                {showReveal && (
                    <PaintTransition key="reveal-transition" mode="out" onComplete={() => setShowReveal(false)} />
                )}
            </AnimatePresence>
        </main>
    );
}
