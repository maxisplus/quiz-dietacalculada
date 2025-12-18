'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

export default function Home() {
  const router = useRouter();
  const { reset } = useQuizStore();

  useEffect(() => {
    reset();
    const timer = setTimeout(() => {
      router.push('/quiz/0');
    }, 1200);
    return () => clearTimeout(timer);
  }, [router, reset]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center px-6">
        {/* Logo/Icon */}
        <div className="mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-[#1a1a1a] rounded-3xl mx-auto flex items-center justify-center">
            <span className="text-3xl md:text-5xl">🥗</span>
          </div>
        </div>
        
        {/* Brand name */}
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-900">
          Dieta Calculada
        </h1>
        <p className="text-gray-500 text-sm md:text-lg mb-6 md:mb-8">
          Seu plano de nutrição personalizado
        </p>
        
        {/* Loading spinner */}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

