import { Heading, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'
import TenseSection from './TenseSection'
import TenseSelector from './TenseSelector'

export default function TenseReferenceView({ tenses }) {
  const tenseNames = tenses.map((item) => item.tense)

  const [selectedTense, setSelectedTense] = useState(
    tenseNames[0],
  )

  const tense = tenses.find(
    (item) => item.tense === selectedTense,
  )

  if (!tense) return null

  return (
    <Card>
      <Stack gap={6} w="full">
        <Stack
          as="header"
          gap={2}
          align="center"
        >
          <Heading
            as="h2"
            size="2xl"
            color="white"
            textAlign="center"
          >
            Spanish Tenses & Verb Forms
          </Heading>

          <Text
            color="gray.400"
            textAlign="center"
          >
            How Spanish verbs are formed and used
          </Text>
        </Stack>

        <TenseSelector
          selectedTense={selectedTense}
          onSelect={setSelectedTense}
          tenses={tenseNames}
        />

        <Stack
          as="section"
          gap={8}
          aria-label={`${ tense.tense } tense`}
        >
          <Stack gap={2}>
            <Heading
              as="h3"
              size="xl"
              color="white"
            >
              {tense.tense}
            </Heading>

            <Text color="gray.300">
              {tense.description}
            </Text>
          </Stack>

          {tense.sections.map((section) => (
            <TenseSection
              key={section.title}
              section={section}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}
