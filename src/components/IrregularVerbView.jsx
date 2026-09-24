import { useState } from 'react'
import { Button, HStack, Stack } from '@chakra-ui/react'
import VerbBlock from './VerbBlock'

export default function IrregularVerbView({ verbs }) {
  const [selectedVerb, setSelectedVerb] = useState(verbs[0]?.verb)

  const selected = verbs.find(
    (verb) => verb.verb === selectedVerb,
  )

  return (
    <Stack gap={6} w="full">
      <HStack
        gap={1}
        justify="center"
        flexWrap="wrap"
      >
        {verbs.map((verb) => (
          <Button
            key={verb.verb}
            size="sm"
            variant={
              selectedVerb === verb.verb
                ? 'solid'
                : 'ghost'
            }
            colorPalette="teal"
            onClick={() => setSelectedVerb(verb.verb)}
          >
            {verb.verb}
          </Button>
        ))}
      </HStack>

      {selected && (
        <VerbBlock
          verb={selected}
        />
      )}
    </Stack>
  )
}
