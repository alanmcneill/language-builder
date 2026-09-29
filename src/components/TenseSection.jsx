import {
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import CommandTable from './CommandTable'
import EndingsTable from './EndingsTable'
import PerfectExamples from './PerfectExamples'
import VerbExamples from './VerbExamples'

export default function TenseSection({ section }) {
  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <Heading
          as="h3"
          size="md"
          color="white"
        >
          {section.title}
        </Heading>

        {section.description && (
          <Text color="gray.400">
            {section.description}
          </Text>
        )}
      </Stack>

      {section.type === 'endings' && (
        <EndingsTable
          columns={section.columns}
        />
      )}

      {(section.type === 'verbs' ||
        section.type === 'examples') && (
        <VerbExamples
          verbs={section.verbs}
        />
      )}

      {section.type === 'commands' && (
        <CommandTable
          columns={section.columns}
        />
      )}

      {section.type === 'perfect' && (
        <PerfectExamples
          verbs={section.verbs}
        />
      )}
    </Stack>
  )
}
