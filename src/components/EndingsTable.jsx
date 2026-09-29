import {
  Box,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'

const subjects = [
  ['yo', 'I'],
  ['tú', 'you'],
  ['él / ella / usted', 'he / she / you (formal)'],
  ['nosotros / nosotras', 'we'],
  ['vosotros / vosotras', 'you (plural)'],
  ['ellos / ellas / ustedes', 'they / you (formal plural)'],
]

export default function EndingsTable({ columns }) {
  return (
    <Stack gap={3}>
      <SimpleGrid
        columns={columns.length + 1}
        gap={0}
        border="1px solid"
        borderColor="gray.700"
        borderRadius="md"
        overflow="hidden"
      >
        <HeaderCell>
          subject
        </HeaderCell>

        {columns.map((column) => (
          <HeaderCell key={column.label}>
            {column.label}
          </HeaderCell>
        ))}

        {subjects.map(([subject, translation], index) => (
          <Box
            key={subject}
            display="contents"
          >
            <Cell>
              <Text fontWeight="medium">
                {subject}
              </Text>

              <Text
                fontSize="xs"
                color="gray.500"
              >
                {translation}
              </Text>
            </Cell>

            {columns.map((column) => (
              <Cell
                key={`${ column.label } -${ subject } `}
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="teal.200"
                >
                  {column.endings[index]}
                </Text>
              </Cell>
            ))}
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

function HeaderCell({ children }) {
  return (
    <Box
      px={3}
      py={2}
      bg="gray.800"
      borderRight="1px solid"
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.300"
      >
        {children}
      </Text>
    </Box>
  )
}

function Cell({ children }) {
  return (
    <Box
      px={3}
      py={3}
      borderRight="1px solid"
      borderBottom="1px solid"
      borderColor="gray.700"
      _last={{
        borderRight: 'none',
      }}
    >
      {children}
    </Box>
  )
}
