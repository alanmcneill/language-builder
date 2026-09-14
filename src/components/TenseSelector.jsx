import { Button, HStack } from '@chakra-ui/react'

const tenses = [
  'Present',
  'Preterite',
  'Imperfect',
  'Conditional',
  'Future',
]

export default function TenseSelector({
  selectedTense,
  onSelect,
}) {
  return (
    <HStack
      gap={1}
      flexWrap="wrap"
      justify="center"
    >
      {tenses.map((tense) => (
        <Button
          key={tense}
          size="sm"
          variant={selectedTense === tense ? 'solid' : 'ghost'}
          colorPalette="teal"
          onClick={() => onSelect(tense)}
        >
          {tense}
        </Button>
      ))}
    </HStack>
  )
}
