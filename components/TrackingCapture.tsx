'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

export default function TrackingCapture() {
  const searchParams = useSearchParams();
  const { updateAnswer } = useQuizStore();

  useEffect(() => {
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
  }, [searchParams, updateAnswer]);

  return null;
}

