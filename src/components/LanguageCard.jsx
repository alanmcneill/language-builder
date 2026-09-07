import { Badge, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'
import Explanation from './Explanation'
import Phrase from './Phrase'
import Translation from './Translation'

export default function LanguageCard({ item, onNext, showHint }) {
  const [showTranslation, setShowTranslation] = useState(false)

  if (!item) return null

  const handleCardClick = () => {
    if (showTranslation) {
      onNext()
      return
    }

    setShowTranslation(true)
  }

  const instruction = showTranslation ? 'Click to continue →' : 'Click to reveal translation'
  const translationWordCount = (item.translation ?? '').trim().split(/\s+/).filter(Boolean).length
  const newLabel = translationWordCount > 1 ? 'new phrase' : 'new word'

  return (
    <Card onClick={handleCardClick} title={instruction}>
      <Stack spacing={5} w="full" align="center">

        {item.new && (
          <Badge alignSelf="center" colorPalette="teal" variant="subtle">
            {newLabel}
          </Badge>
        )}

        <Phrase fontSize={showTranslation ? '2xl' : '5xl'}>{item.english}</Phrase>

        {showTranslation && <Translation>{item.translation}</Translation>}
        
        {showTranslation && item.explanation ? <Explanation>{item.explanation}</Explanation> : null}

        {showHint && (
          <Text fontSize="sm" color="teal.200" fontWeight="bold">
            {instruction}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
