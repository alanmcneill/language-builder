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

export default function VerbExamples({ verbs }) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={3}
    >
      {verbs.map((verb) => (
        <Box
          key={verb.verb}
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
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="white"
            >
              {verb.verb}
            </Text>

            <Text
              fontSize="sm"
              color="gray.500"
            >
              {verb.translation}
            </Text>
          </Box>

          <Stack gap={0}>
            {verb.forms.map(([form, translation], index) => {
              const [subject, subjectTranslation] = subjects[index]

              return (
                <Box
                  key={`${ verb.verb } -${ subject } `}
                  px={4}
                  py={3}
                  borderBottom="1px solid"
                  borderColor="gray.700"
                  _last={{
                    borderBottom: 'none',
                  }}
                >
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    {subject} · {subjectTranslation}
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
                    {translation}
                  </Text>
                </Box>
              )
            })}
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  )
}
