import { useState } from 'react'
import { Button, HStack, Stack } from '@chakra-ui/react'
import VerbBlock from './VerbBlock'

const endings = ['-ar', '-er', '-ir']

export default function RegularVerbView({ verbs }) {
  const [selectedEnding, setSelectedEnding] = useState('-ar')

  const filteredVerbs = verbs.filter(
    (verb) => verb.ending === selectedEnding,
  )

  return (
    <Stack gap={6} w="full">
      <HStack
        gap={1}
        justify="center"
        flexWrap="wrap"
      >
        {endings.map((ending) => (
          <Button
            key={ending}
            size="sm"
            variant={selectedEnding === ending ? 'solid' : 'ghost'}
            colorPalette="teal"
            onClick={() => setSelectedEnding(ending)}
          >
            {ending}
          </Button>
        ))}
      </HStack>

      <Stack gap={6} w="full">
        {filteredVerbs.map((verb) => (
          <VerbBlock
            key={verb.verb}
            verb={verb}
          />
        ))}
      </Stack>
    </Stack>
  )
}
