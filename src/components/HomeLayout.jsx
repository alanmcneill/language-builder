import {
  Box,
  Heading,
  HStack,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import homeData from '../data/home.json'
import CardGrid from './CardGrid'

export default function HomeLayout({
  language,
  onSelect,
}) {
  const courses = homeData.courses.filter(
    (item) => item.language === language,
  )

  const resources = homeData.resources.filter(
    (item) => item.language === language,
  )

  return (
    <Box
      bg="gray.900"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="lg"
      p={{ base: 6, md: 8 }}
      w="full"
    >
      <Stack spacing={8}>
        <HomeSectionHeading
          title="Courses"
          description={`Learn ${language} block by block`}
        />

        <CardGrid
          items={courses}
          onSelect={onSelect}
        />

        {resources.length > 0 && (
          <>
            <Separator margin="1rem 0" />

            <HomeSectionHeading
              title={`${language} Resources`}
              description="Vocabulary, verbs, sentences and grammar reference material"
            />

            <CardGrid
              items={resources}
              onSelect={onSelect}
            />
          </>
        )}
      </Stack>
    </Box>
  )
}

function HomeSectionHeading({
  title,
  description,
}) {
  return (
    <HStack spacing={2}>
      <Heading
        size="lg"
        color="white"
      >
        {title}
      </Heading>

      <Text color="gray.400">
        {description}
      </Text>
    </HStack>
  )
}
