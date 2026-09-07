import { Heading, Stack, Text } from '@chakra-ui/react'
import Card from './Card'

export default function SetCompletionCard({ onPrevious }) {
  return (
    <Card onClick={onPrevious} title="Click to review the last phrase">
      <Stack gap={5} align="center">
        <Heading as="h2" size="xl" color="teal.300">
          Congratulations!
        </Heading>
        <Text color="gray.300" maxW="32rem">
          You have finished this set.
        </Text>
        <Text color="gray.400" maxW="32rem">
          Next steps: review the new words, practise their pronunciation, or choose another set from the menu.
        </Text>
        <Text fontSize="sm" color="teal.200" fontWeight="bold">
          Click to review the last phrase
        </Text>
      </Stack>
    </Card>
  )
}
