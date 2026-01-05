'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reset, updateAnswer } = useQuizStore();

  useEffect(() => {
    reset();
    
    // Capturar UTMs da URL
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    const utm_term = searchParams.get('utm_term');
    const utm_content = searchParams.get('utm_content');
    
    // Capturar outras informações de tracking
    const referrer = document.referrer || 'Direto';
    const landingPage = window.location.href;
    const userAgent = navigator.userAgent;
    
    // Salvar no store
    if (utm_source) updateAnswer('utm_source', utm_source);
    if (utm_medium) updateAnswer('utm_medium', utm_medium);
    if (utm_campaign) updateAnswer('utm_campaign', utm_campaign);
    if (utm_term) updateAnswer('utm_term', utm_term);
    if (utm_content) updateAnswer('utm_content', utm_content);
    updateAnswer('referrer', referrer);
    updateAnswer('landingPage', landingPage);
    updateAnswer('userAgent', userAgent);
    
    console.log('📊 Tracking capturado:', {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
      landingPage,
    });
    
    const timer = setTimeout(() => {
      router.push('/quiz/0');
    }, 1200);
    return () => clearTimeout(timer);
  }, [router, reset, updateAnswer, searchParams]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center px-6">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto flex items-center justify-center">
            <img 
              src="/cropped-principal.png" 
              alt="Dieta Calculada" 
              className="w-full h-full object-contain"
            />
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

