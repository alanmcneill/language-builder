import { Button, HStack, Progress } from '@chakra-ui/react'

export default function ProgressControls({
  currentPosition,
  total,
  onPrevious,
  onNext,
  onStart,
}) {
  const lastPosition = total + 1

  const progressValue = Math.min(
    Math.max((currentPosition / lastPosition) * 100, 0),
    100,
  )

  const progressLabel = currentPosition === 0
    ? 'Introduction'
    : currentPosition === lastPosition
      ? 'Complete'
      : `Phrase ${currentPosition} of ${total}`

  return (
    <HStack gap={4} mt={2} w="full">
      <Progress.Root
        value={progressValue}
        colorPalette="teal"
        size="sm"
        flex="1"
        minW={0}
        aria-label={progressLabel}
      >
        <Progress.Track bg="gray.700">
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <HStack gap={1} flexShrink={0}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          color="gray.400"
          aria-label="Start from beginning"
          title="Start from beginning"
          onClick={onStart}
          disabled={currentPosition === 0}
          _hover={{ color: 'teal.300', bg: 'whiteAlpha.100' }}
        >
          <span aria-hidden="true">↺</span>
        </Button>

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
