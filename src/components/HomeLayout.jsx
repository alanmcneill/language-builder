import {
  Box,
  Heading,
  HStack,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import homeData from '../data/home.json'
import Buttons from './Buttons'

export default function HomeLayout({ onSelect }) {
  return (
    <Box
      bg="gray.900"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="lg"
      p={{ base: 6, md: 8 }}
      w="full"
    >
      <Stack spacing={8}>
        <HomeSectionHeading
          title="Courses"
          description="Choose a language learning course to get started."
        />

        <Buttons
          items={homeData.courses}
          onSelect={onSelect}
        />

        <Separator margin="1rem 0" />

        <HomeSectionHeading
          title="Spanish Resources"
          description="Vocabulary, verbs, sentences and grammar reference material."
        />

        <Buttons
          items={homeData.resources}
          onSelect={onSelect}
        />
      </Stack>
    </Box>
  )
}

function HomeSectionHeading({ title, description }) {
  return (
    <HStack spacing={2}>
      <Heading size="lg" color="white">
        {title}
      </Heading>

      <Text color="gray.400">
        {description}
      </Text>
    </HStack>
  )
}
