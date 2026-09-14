import {
  Badge,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Wrap,
  Text,
} from '@chakra-ui/react'

export default function Buttons({ items, onSelect }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {items.map((item) => (
        <Button
          key={item.key}
          disabled={item.available === false}
          variant="outline"
          borderColor="gray.700"
          h="auto"
          p={5}
          justifyContent="flex-start"
          textAlign="left"
          alignItems="flex-start"
          whiteSpace="normal"
          onClick={() => onSelect(item.key)}
          _hover={{
            borderColor: 'teal.400',
            bg: 'whiteAlpha.100',
          }}
        >
          <Stack spacing={2} align="flex-start" w="full">
            <HStack gap={4} justify="space-between" w="full">
              <Heading size="sm" color="whiteAlpha.700">
                {item.title}
              </Heading>

              <Wrap>
                <Badge colorPalette="teal" variant="subtle">
                  {item.badge}
                </Badge>
                <Badge colorPalette="gray" variant="outline">
                  {item.difficulty}
                </Badge>
              </Wrap>
            </HStack>

            <Text
              fontSize="sm"
              fontWeight="normal"
              color="whiteAlpha.700"
            >
              {item.description}
            </Text>
          </Stack>
        </Button>
      ))}
    </SimpleGrid>
  )
}
