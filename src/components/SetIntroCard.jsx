import { Heading, Stack, Text } from '@chakra-ui/react'
import Card from './Card'

export default function SetIntroCard({ item, onNext }) {
  return (
    <Card onClick={onNext} title="Click to start">
      <Stack gap={5} align="center">
        <Heading as="h2" size="2xl" color="white">
          {item.title}
        </Heading>

        <Text color="gray.300" maxW="32rem">
          {item.subtitle}
        </Text>

        <Text color="gray.300" maxW="32rem">
          {item.intro}
        </Text>

        <Text fontSize="sm" color="teal.200" fontWeight="bold">
          {item.instruction}
        </Text>
      </Stack>
    </Card>
  )
}
