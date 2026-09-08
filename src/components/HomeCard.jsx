import {
  Badge,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  HStack,
  Text,
} from '@chakra-ui/react'

const courses = [
  {
    key: 'spanish-basic',
    language: 'Spanish',
    title: 'Basic Spanish',
    description: 'Build your Spanish skills one phrase at a time.',
    badge: 'Course',
  },
  {
    key: 'french-basic',
    language: 'French',
    title: 'Basic French',
    description: 'Build your French skills one phrase at a time.',
    badge: 'Course',
  },
  {
    key: 'spanish-intermediate',
    language: 'Spanish',
    title: 'Intermediate Spanish',
    description: 'Continue your Spanish learning journey with more complex sentences.',
    badge: 'Course',
  },
  {
    key: 'spanish-advanced',
    language: 'Spanish',
    title: 'Advanced Spanish',
    description: 'Build on your Spanish vocabulary and master the language.',
    badge: 'Course',
  },
  {
    key: 'spanish-resources',
    language: 'Spanish',
    title: 'Spanish Resources',
    description: 'Words, verbs, sentences and useful reference material.',
    badge: 'Resources',
  },
  {
    language: 'Italian',
    title: 'Basic Italian',
    description: 'Coming soon.',
    badge: 'Course',
  },
]

export default function HomeCard({ onSelect }) {
  return (
    <Box
      bg="gray.900"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="xl"
      p={{ base: 6, md: 8 }}
      w="full"
    >
      <Stack spacing={8}>
        <Stack spacing={4}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {courses.map((course) => (
              <Button
                key={course.key}
                disabled={!course.key}
                variant="outline"
                borderColor="gray.700"
                h="auto"
                p={5}
                justifyContent="flex-start"
                textAlign="left"
                whiteSpace="normal"
                onClick={() => onSelect(course.key)}
                _hover={{
                  borderColor: 'teal.400',
                  bg: 'whiteAlpha.100',
                }}
              >
                <Stack spacing={2} align="flex-start" w="full">
                  <HStack gap={4} justify="space-between" w="full">
                    <Heading size="sm" color="whiteAlpha.700">
                      {course.title}
                    </Heading>
                    <Badge colorPalette="teal" variant="subtle">
                      {course.badge}
                    </Badge>
                  </HStack>
                  <Text
                    fontSize="sm"
                    fontWeight="normal"
                    color="whiteAlpha.700"
                  >
                    {course.description}
                  </Text>
                </Stack>
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Box>
  )
}
