'use client';

import Envelope from './Envelope';

interface LettersGridProps {
    openedLetters: Set<number>;
    onLetterClick: (number: number) => void;
}

export default function LettersGrid({ openedLetters, onLetterClick }: LettersGridProps) {
    return (
        <section id="letters" className="min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-mileast text-5xl md:text-6xl text-deep-pink text-center mb-12 text-shadow-sm"
                    style={{ fontFamily: "'Mileast', cursive" }}>
                    LETTERS
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {[...Array(20)].map((_, index) => {
                        const letterNumber = index + 1;
                        return (
                            <Envelope
                                key={letterNumber}
                                number={letterNumber}
                                isOpened={openedLetters.has(letterNumber)}
                                onClick={() => onLetterClick(letterNumber)}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
