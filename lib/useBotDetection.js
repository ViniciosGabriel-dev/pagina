/**
 * React Hook para Bot Detection
 * Gerencia estado de detecção de bot e fornece helper functions
 *
 * Uso:
 * const { isBot, score, confidence, loading, error, reDetect } = useBotDetection();
 */

import { useState, useEffect, useCallback } from 'react';

const defaultState = {
  isBot: null,
  score: 0,
  scoreBreakdown: {},
  confidence: 'low',
  cached: false,
  recommendation: 'oferta',
  loading: true,
  error: null,
  timestamp: null
};

export function useBotDetection(options = {}) {
  const {
    autoDetect = true,
    onDetect = null,
    retryOnError = true,
    retryDelay = 2000,
    maxRetries = 2
  } = options;

  const [state, setState] = useState(defaultState);
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Executa detecção chamando a API local do frontend
   * A API local chama o backend PASCHA
   */
  const detect = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      console.log('[HOOK] Iniciando detecção de bot...');

      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Dados podem ser enviados opcionalmente
          // behaviorData, canvasFingerprint já são coletados no cliente-side
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success && result.error) {
        throw new Error(result.error);
      }

      const newState = {
        isBot: result.isBot,
        score: result.score || 0,
        scoreBreakdown: result.scoreBreakdown || {},
        confidence: result.confidence || 'low',
        cached: result.cached || false,
        recommendation: result.recommendation || 'oferta',
        loading: false,
        error: null,
        timestamp: new Date().toISOString()
      };

      setState(newState);

      console.log('[HOOK] ✅ Detecção concluída:', {
        isBot: newState.isBot,
        score: newState.score,
        confidence: newState.confidence,
        cached: newState.cached
      });

      // Callback opcional
      if (onDetect) {
        onDetect(newState);
      }

      // Reset retry count on success
      setRetryCount(0);

      return newState;
    } catch (error) {
      console.error('[HOOK] ❌ Erro na detecção:', error.message);

      const errorState = {
        ...defaultState,
        isBot: false, // Fallback seguro
        loading: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };

      setState(errorState);

      // Retry logic
      if (retryOnError && retryCount < maxRetries) {
        console.log(`[HOOK] Tentando novamente em ${retryDelay}ms... (${retryCount + 1}/${maxRetries})`);
        setRetryCount(prev => prev + 1);

        setTimeout(() => {
          detect();
        }, retryDelay);
      }

      return errorState;
    }
  }, [onDetect, retryOnError, retryDelay, maxRetries, retryCount]);

  /**
   * Executa detecção automaticamente ao montar o componente
   */
  useEffect(() => {
    if (autoDetect) {
      detect();
    }
  }, [autoDetect, detect]);

  /**
   * Permite re-detecção manual
   */
  const reDetect = useCallback(() => {
    setRetryCount(0);
    return detect();
  }, [detect]);

  /**
   * Verifica se é um bot com confiança mínima
   */
  const isBotWithConfidence = useCallback((minConfidence = 'high') => {
    const confidenceLevels = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
    const current = confidenceLevels[state.confidence] || 0;
    const minimum = confidenceLevels[minConfidence] || 0;
    return state.isBot && current >= minimum;
  }, [state.confidence, state.isBot]);

  /**
   * Retorna recomendação em português
   */
  const getRecommendationText = useCallback(() => {
    const recommendations = {
      'oferta': '✅ Conteúdo de vendas (humano detectado)',
      'safe': '🤖 Conteúdo educacional (bot detectado)',
      'educativo': '🤖 Conteúdo educacional (bot detectado)'
    };
    return recommendations[state.recommendation] || 'Status desconhecido';
  }, [state.recommendation]);

  /**
   * Retorna nivel de confiança em português
   */
  const getConfidenceText = useCallback(() => {
    const confidences = {
      'very-high': 'Muito Alta 🎯',
      'high': 'Alta ✅',
      'medium': 'Média ⚠️',
      'low': 'Baixa ❌',
      'very-low': 'Muito Baixa ❌'
    };
    return confidences[state.confidence] || 'Desconhecida';
  }, [state.confidence]);

  /**
   * Retorna informações debug formatadas
   */
  const getDebugInfo = useCallback(() => {
    return {
      ...state,
      isBotWithHighConfidence: isBotWithConfidence('high'),
      isBotWithVeryHighConfidence: isBotWithConfidence('very-high'),
      recommendationText: getRecommendationText(),
      confidenceText: getConfidenceText()
    };
  }, [state, isBotWithConfidence, getRecommendationText, getConfidenceText]);

  return {
    // State
    isBot: state.isBot,
    score: state.score,
    scoreBreakdown: state.scoreBreakdown,
    confidence: state.confidence,
    cached: state.cached,
    recommendation: state.recommendation,
    loading: state.loading,
    error: state.error,
    timestamp: state.timestamp,

    // Methods
    detect,
    reDetect,
    isBotWithConfidence,
    getRecommendationText,
    getConfidenceText,
    getDebugInfo
  };
}

/**
 * Componente de Debug para exibir informações da detecção
 * Apenas renderiza em desenvolvimento
 */
export function BotDetectionDebug() {
  const detection = useBotDetection();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: '#f5f5f5',
        border: '2px solid #333',
        borderRadius: '8px',
        padding: '15px',
        maxWidth: '300px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        🤖 Bot Detection Debug
      </div>

      <div style={{ marginBottom: '5px' }}>
        <strong>Is Bot:</strong> {detection.isBot === null ? '...' : detection.isBot ? '✅ SIM' : '❌ NÃO'}
      </div>

      <div style={{ marginBottom: '5px' }}>
        <strong>Score:</strong> {detection.score}/100
      </div>

      <div style={{ marginBottom: '5px' }}>
        <strong>Confidence:</strong> {detection.getConfidenceText()}
      </div>

      {detection.cached && (
        <div style={{ marginBottom: '5px', color: '#0066cc' }}>
          <strong>Status:</strong> 💾 Cached
        </div>
      )}

      {detection.loading && (
        <div style={{ marginBottom: '5px', color: '#ff6600' }}>
          <strong>Status:</strong> ⏳ Loading...
        </div>
      )}

      {detection.error && (
        <div style={{ marginBottom: '5px', color: '#cc0000' }}>
          <strong>Error:</strong> {detection.error}
        </div>
      )}

      <div style={{ marginBottom: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ccc' }}>
        <strong>Score Breakdown:</strong>
        {Object.entries(detection.scoreBreakdown).map(([key, value]) => (
          <div key={key} style={{ paddingLeft: '10px' }}>
            {key}: {value}
          </div>
        ))}
      </div>

      <button
        onClick={() => detection.reDetect()}
        style={{
          width: '100%',
          padding: '5px 10px',
          background: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Re-detect
      </button>
    </div>
  );
}

export default useBotDetection;
