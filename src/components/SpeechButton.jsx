import { IconButton } from '@chakra-ui/react'
import { Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SpeechButton({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])
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
    utterance.lang = 'es-ES'
    utterance.rate = 0.85
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith('es')) ?? null
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
      aria-label="Play Spanish pronunciation"
      title={isSupported ? 'Play Spanish pronunciation' : 'Speech synthesis is not supported'}
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
