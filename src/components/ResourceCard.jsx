import { Badge, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'
import Phrase from './Phrase'
import Translation from './Translation'

export default function ResourceCard({ item, onNext, showHint }) {
  const [showTranslation, setShowTranslation] = useState(false)

  if (!item) return null

  const handleCardClick = () => {
    if (showTranslation) {
      onNext()
      return
    }

    setShowTranslation(true)
  }

  const instruction = showTranslation ? 'Tap to continue →' : 'Tap to reveal translation'

  return (
    <Card onClick={handleCardClick} title={instruction}>
      <Stack spacing={5} w="full" align="center">

        {item.type && (
          <Badge alignSelf="center" colorPalette="teal" variant="subtle">
            {item.type}
          </Badge>
        )}

        <Phrase fontSize={showTranslation ? '2xl' : '5xl'}>{item.english}</Phrase>

        {showTranslation && <Translation>{item.translation}</Translation>}

        {showHint && (
          <Text fontSize="sm" color="teal.200" fontWeight="bold">
            {instruction}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
