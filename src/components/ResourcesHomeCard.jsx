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
import homeData from '../data/home.json'

export default function ResourcesHomeCard({ onSelect }) {
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
        <HStack spacing={2}>
          <Heading size="lg" color="white">
            Spanish Resources
          </Heading>
          <Text color="gray.400">
            Vocabulary, verbs, sentences and grammar reference material.
          </Text>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {homeData.spanishResources.map((resource) => (
            <Button
              key={resource.key}
              variant="outline"
              borderColor="gray.700"
              h="auto"
              p={5}
              justifyContent="flex-start"
              textAlign="left"
              whiteSpace="normal"
              onClick={() => onSelect(resource.datasetKey)}
              _hover={{
                borderColor: 'teal.400',
                bg: 'whiteAlpha.100',
              }}
            >
              <Stack spacing={2} align="flex-start" w="full">
                <HStack gap={4} justify="space-between" w="full">
                  <Heading size="sm" color="whiteAlpha.700">
                    {resource.title}
                  </Heading>

                  <Badge colorPalette="teal" variant="subtle">
                    {resource.badge}
                  </Badge>
                </HStack>

                <Text
                  fontSize="sm"
                  fontWeight="normal"
                  color="whiteAlpha.700"
                >
                  {resource.description}
                </Text>
              </Stack>
            </Button>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
