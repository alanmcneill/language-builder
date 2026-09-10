import { Badge, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'
import Explanation from './Explanation'
import Phrase from './Phrase'
import Translation from './Translation'

export default function LearningCard({
  language,
  item,
  direction = 'source-first',
  onNext,
  showHint,
}) {
  const [showTranslation, setShowTranslation] = useState(false)

  if (!item) return null

  const handleCardClick = () => {
    if (showTranslation) {
      onNext()
      return
    }

    setShowTranslation(true)
  }

  const instruction = showTranslation
    ? 'Tap to continue →'
    : 'Tap to reveal translation'

  const translationWordCount = (item.translation ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length

  const newLabel = translationWordCount > 1
    ? 'new phrase'
    : 'new word'

  const showTargetFirst = direction === 'target-first'

  const firstContent = showTargetFirst ? (
    <Translation language={language}>
      {item.translation}
    </Translation>
  ) : (
    <Phrase fontSize={showTranslation ? '2xl' : '5xl'}>
      {item.phrase}
    </Phrase>
  )

  const revealedContent = showTargetFirst ? (
    <Phrase fontSize="2xl">
      {item.phrase}
    </Phrase>
  ) : (
    <Translation language={language}>
      {item.translation}
    </Translation>
  )

  return (
    <Card onClick={handleCardClick} title={instruction}>
      <Stack spacing={5} w="full" align="center">
        {item.new && (
          <Badge colorPalette="teal" variant="subtle">
            {newLabel}
          </Badge>
        )}

        {item.type && (
          <Badge colorPalette="teal" variant="subtle">
            {item.type}
          </Badge>
        )}

        {firstContent}

        {showTranslation && revealedContent}

        {showTranslation && item.explanation ? (
          <Explanation>{item.explanation}</Explanation>
        ) : null}

        {showHint && (
          <Text fontSize="sm" color="teal.200" fontWeight="bold">
            {instruction}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
