'use client';

import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { useQuizStore } from '@/store/quizStore';
import { useRouter, useParams } from 'next/navigation';

interface QuizLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export default function QuizLayout({
  children,
  showBackButton = true,
}: QuizLayoutProps) {
  const { currentStep, totalSteps, previousStep } = useQuizStore();
  const router = useRouter();
  const params = useParams();
  const stepFromUrl = parseInt(params.step as string, 10);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(stepFromUrl);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Reset animation when step changes
  useEffect(() => {
    // Detectar direção
    if (stepFromUrl > animationKey) {
      setDirection('forward');
    } else if (stepFromUrl < animationKey) {
      setDirection('backward');
    }

    setIsAnimating(false);
    
    // Delay para reset
    const timeout = setTimeout(() => {
      setAnimationKey(stepFromUrl);
      setIsAnimating(true);
    }, 50);
    
    return () => clearTimeout(timeout);
  }, [stepFromUrl, animationKey]);

  const handleBack = () => {
    previousStep();
    router.push(`/quiz/${currentStep - 1}`);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden">
      {/* Header com logo e progress bar */}
      <div className="flex-shrink-0 px-4 md:px-6 pt-3 md:pt-4 pb-3 z-10">
        <div className="max-w-md mx-auto">
          {/* Logo centralizada */}
          <div className="flex justify-center mb-3">
            <img 
              src="/cropped-principal.png" 
              alt="Dieta Calculada" 
              className="w-28 h-28 md:w-32 md:h-32 object-contain"
            />
          </div>
          
          {/* Botão voltar e progress bar */}
          <div className="flex items-center gap-3">
            {showBackButton ? (
              <button
                onClick={handleBack}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 active:scale-95 flex-shrink-0"
                aria-label="Voltar"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            ) : (
              <div className="w-10 md:w-11 flex-shrink-0"></div>
            )}
            
            <div className="flex-1 min-w-0">
              <ProgressBar current={currentStep + 1} total={totalSteps} />
            </div>
          </div>
        </div>
      </div>

      {/* Content with improved animation */}
      <div className="flex-1 overflow-hidden relative">
        <div 
          key={animationKey}
          className="h-full w-full absolute inset-0"
          style={{
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating 
              ? 'translateX(0) scale(1)' 
              : direction === 'forward' 
                ? 'translateX(30px) scale(0.98)' 
                : 'translateX(-30px) scale(0.98)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
