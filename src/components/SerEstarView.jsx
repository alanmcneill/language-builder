import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Group,
} from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'
import TenseSelector from './TenseSelector'

export default function SerEstarView({ verbs }) {
  const [selectedTense, setSelectedTense] = useState('Present')

  const ser = verbs.find((verb) => verb.verb === 'ser')
  const estar = verbs.find((verb) => verb.verb === 'estar')

  if (!ser || !estar) return null

  const serConjugations = ser.tenses[selectedTense] ?? []
  const estarConjugations = estar.tenses[selectedTense] ?? []

  return (
    <Card>
      <Stack gap={6} w="full">
        <Flex
          as="header"
          gap={4}
          justify="space-between"
          align="baseline"
          wrap="wrap"
        >
          <Group>
            <Heading
              as="h2"
              size="2xl"
              color="white"
            >
              Ser / Estar
            </Heading>

            <Text
              as="span"
              fontSize="2xl"
              color="gray.400"
            >
              to be
            </Text>
          </Group>

          <Badge
            colorPalette="teal"
            variant="subtle"
          >
            Irregular verbs
          </Badge>
        </Flex>

        <Stack gap={5} w="full">
          <TenseSelector
            selectedTense={selectedTense}
            onSelect={setSelectedTense}
          />

          <Box
            as="section"
            aria-label={`${selectedTense} conjugations of ser and estar`}
          >
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={3}
            >
              <ConjugationColumn
                title={ser.verb}
                translation={ser.translation}
                description={ser.description}
                conjugations={serConjugations}
              />

              <ConjugationColumn
                title={estar.verb}
                translation={estar.translation}
                description={estar.description}
                conjugations={estarConjugations}
              />
            </SimpleGrid>
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
}

function ConjugationColumn({
  title,
  translation,
  description,
  conjugations,
}) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.700"
      borderRadius="md"
      overflow="hidden"
    >
      <Box
        px={4}
        py={3}
        bg="gray.800"
        borderBottom="1px solid"
        borderColor="gray.700"
      >
        <Heading
          as="h3"
          size="xl"
          color="white"
        >
          {title}
        </Heading>

        <Text
          fontSize="sm"
          color="gray.500"
        >
          {translation} - {description}
        </Text>
      </Box>

      <Stack gap={0}>
        {conjugations.map(
          ([person, personTranslation, form, meaning]) => (
            <Box
              key={person}
              px={4}
              py={3}
              borderBottom="1px solid"
              borderColor="gray.700"
              _last={{ borderBottom: 'none' }}
            >
              <Text
                fontSize="sm"
                color="gray.500"
              >
                {person}
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
          ),
        )}
      </Stack>
    </Box>
  )
}
  