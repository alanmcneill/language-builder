import { Heading, Stack, Text } from '@chakra-ui/react'
import Card from './Card'

export default function SetIntroCard({ onNext }) {
  return (
    <Card onClick={onNext} title="Click to start">
      <Stack gap={5} align="center">
        <Heading as="h2" size="2xl" color="white">
          How it works
        </Heading>
        <Text color="gray.300" maxW="32rem">
          Read the English phrase, translate it out loud, then tap the card to reveal the correct translation. Tap it again to continue to the next phrase.
        </Text>
        <Text fontSize="sm" color="teal.200" fontWeight="bold">
          Tap to start
        </Text>
      </Stack>
    </Card>
  )
}
