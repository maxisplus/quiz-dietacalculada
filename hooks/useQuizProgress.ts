'use client';

import { useEffect, useRef } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { generateLeadId } from '@/lib/utils';
import { saveQuizProgress } from '@/lib/quizProgress';

/**
 * Hook para gerenciar salvamento progressivo do quiz
 * Com debounce para evitar exceder quota do Google Sheets
 */
export function useQuizProgress() {
  const { leadId, setLeadId, answers, currentStep } = useQuizStore();
  const hasInitialized = useRef(false);
  const lastSavedStep = useRef<number>(-1);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);
  const answersRef = useRef(answers);

  // Atualizar ref dos answers sempre que mudarem
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Inicializar leadId quando o hook é montado
  useEffect(() => {
    if (!leadId && !hasInitialized.current) {
      const newLeadId = generateLeadId();
      setLeadId(newLeadId);
      hasInitialized.current = true;
      console.log('🆔 Lead ID gerado:', newLeadId);
    }
  }, [leadId, setLeadId]);

  // Salvar progresso APENAS quando step muda (não quando answers mudam)
  useEffect(() => {
    if (!leadId) {
      console.log('⏳ Aguardando leadId...');
      return;
    }

    // Só salvar se o step mudou E não é o mesmo step já salvo
    if (currentStep === lastSavedStep.current) {
      return;
    }

    // Limpar timeout anterior se existir
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Se já está salvando, não fazer nada
    if (isSavingRef.current) {
      console.log('⏳ Salvamento em andamento, aguardando...');
      return;
    }

    // Aguardar 800ms antes de salvar (debounce maior para evitar duplicações)
    saveTimeoutRef.current = setTimeout(async () => {
      // Verificar novamente se ainda precisa salvar (pode ter mudado durante o debounce)
      if (currentStep === lastSavedStep.current) {
        console.log('⏭️ Step já foi salvo, pulando...');
        return;
      }

      isSavingRef.current = true;

      // Usar ref para pegar os valores mais recentes dos answers
      const currentAnswers = answersRef.current;

      // Preparar dados de tracking
      const trackingData = {
        utm_source: currentAnswers.utm_source,
        utm_medium: currentAnswers.utm_medium,
        utm_campaign: currentAnswers.utm_campaign,
        utm_term: currentAnswers.utm_term,
        utm_content: currentAnswers.utm_content,
        referrer: currentAnswers.referrer,
        landingPage: currentAnswers.landingPage,
        userAgent: currentAnswers.userAgent,
      };

      console.log('💾 Salvando progresso:', { 
        leadId, 
        step: currentStep, 
        lastSavedStep: lastSavedStep.current,
        answersCount: Object.keys(currentAnswers).length 
      });
      
      try {
        const result = await saveQuizProgress(leadId, currentAnswers, currentStep, trackingData);
        
        if (result.success) {
          lastSavedStep.current = currentStep;
          console.log('✅ Progresso salvo com sucesso no step', currentStep);
        } else {
          console.error('❌ Falha ao salvar progresso:', result);
        }
      } catch (error) {
        console.error('❌ Erro ao salvar progresso:', error);
      } finally {
        isSavingRef.current = false;
      }
    }, 800); // Debounce aumentado para 800ms

    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [leadId, currentStep]); // REMOVIDO 'answers' das dependências - só salva quando step muda

  return { leadId };
}
