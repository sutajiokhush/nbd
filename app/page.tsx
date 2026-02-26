'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingSection from '@/components/LandingSection';
import PaintTransition from '@/components/PaintTransition';

export default function Home() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track visit when page loads
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);

  const handleStartClick = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    sessionStorage.setItem('journeyStarted', 'true');
    router.push('/letters');
  };

  return (
    <main className="relative overflow-hidden">
      <LandingSection onStartClick={handleStartClick} />
      <AnimatePresence>
        {isTransitioning && (
          <PaintTransition key="paint-transition" mode="in" onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>
    </main>
  );
}
