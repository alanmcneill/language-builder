import { IconButton } from '@chakra-ui/react'
import { Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const speechLanguages = {
  Spanish: 'es-ES',
  French: 'fr-FR',
}

export default function SpeechButton({ text, language = 'Spanish' }) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])

  const speechLanguage = speechLanguages[language] ?? 'es-ES'

  const isSupported = typeof window !== 'undefined'
    && 'speechSynthesis' in window
    && 'SpeechSynthesisUtterance' in window

  useEffect(() => {
    if (!isSupported) return undefined

    const updateVoices = () => setVoices(window.speechSynthesis.getVoices())

    updateVoices()
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices)
      window.speechSynthesis.cancel()
    }
  }, [isSupported])

  const handlePlay = (event) => {
    event.stopPropagation()

    if (!isSupported) return

    window.speechSynthesis.cancel()

    const utterance = new window.SpeechSynthesisUtterance(text)
    utterance.lang = speechLanguage
    utterance.rate = 0.85
    utterance.voice = voices.find(
      (voice) => voice.lang.toLowerCase().startsWith(speechLanguage.slice(0, 2)),
    ) ?? null

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  return (
    <IconButton
      type="button"
      variant="ghost"
      size="sm"
      color="teal.200"
      aria-label={`Play ${language} pronunciation`}
      title={
        isSupported
          ? `Play ${language} pronunciation`
          : 'Speech synthesis is not supported'
      }
      disabled={!isSupported}
      data-speaking={isSpeaking || undefined}
      onClick={handlePlay}
      onKeyDown={(event) => event.stopPropagation()}
      _hover={{ color: 'teal.100', bg: 'whiteAlpha.200' }}
    >
      <Volume2 size={20} aria-hidden="true" />
    </IconButton>
  )
}
