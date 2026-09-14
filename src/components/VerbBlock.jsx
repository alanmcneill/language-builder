import { useState } from 'react'
import {
  Badge,
  Box,
  Heading,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import TenseSelector from './TenseSelector'
import Card from './Card'

export default function VerbBlock({ verb }) {
  const [selectedTense, setSelectedTense] = useState('Present')
  const conjugations = verb.tenses[selectedTense] ?? []

  return (
    <Card>
      <Stack gap={6} w="full">
        <Flex gap="4" justify="space-between">
          <Group>
            <Heading size="2xl" color="white" >
              {verb.verb}
            </Heading>
            <Text fontSize="2xl" color="gray.400" >
              {verb.translation}
            </Text>
          </Group>
          <Group>
            <Badge colorPalette="teal" variant="subtle">
              {verb.type} verb
            </Badge>
            <Badge colorPalette="gray" variant="outline">
              {verb.ending}
            </Badge>
          </Group>
        </Flex>

        <TenseSelector
          selectedTense={selectedTense}
          onSelect={setSelectedTense}
        />

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={2}
        >
          {conjugations.map(([person, translation, form, meaning]) => (
            <Box
              key={person}
              p={4}
              border="1px solid"
              borderColor="gray.700"
              borderRadius="md"
              bg="gray.800"
            >
              <Text
                fontSize="sm"
                color="gray.500"
              >
                {person} · {translation}
              </Text>

              <Text
                mt={1}
                fontSize="xl"
                fontWeight="bold"
                color="white"
              >
                {form}
              </Text>

              <Text
                mt={1}
                fontSize="sm"
                color="gray.400"
              >
                {meaning}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  )
}
