import { Button, HStack, Progress } from '@chakra-ui/react'

export default function ProgressControls({ currentPosition, total, onPrevious, onNext }) {
  const lastPosition = total + 1
  const progressValue = Math.min(Math.max((currentPosition / lastPosition) * 100, 0), 100)
  const progressLabel = currentPosition === 0
    ? 'Introduction'
    : currentPosition === lastPosition
      ? 'Complete'
      : `Phrase ${currentPosition} of ${total}`

  return (
    <HStack gap={4} mt={2}>
      <Progress.Root
        value={progressValue}
        colorPalette="teal"
        size="sm"
        flex="1"
        aria-label={progressLabel}
      >
        <Progress.Track bg="gray.700">
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <HStack gap={1}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          color="gray.400"
          aria-label="Previous phrase"
          title="Previous phrase"
          onClick={onPrevious}
          disabled={currentPosition === 0}
          _hover={{ color: 'teal.300', bg: 'whiteAlpha.100' }}
        >
          <span aria-hidden="true">←</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          color="gray.400"
          aria-label="Next phrase"
          title="Next phrase"
          onClick={onNext}
          disabled={currentPosition === lastPosition}
          _hover={{ color: 'teal.300', bg: 'whiteAlpha.100' }}
        >
          <span aria-hidden="true">→</span>
        </Button>
      </HStack>
    </HStack>
  )
}
