import { Box, Text } from '@chakra-ui/react'

export default function EmptyState({ message }) {
  return (
    <Box
      minH="500px"
      bg="gray.900"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="md"
      display="grid"
      placeItems="center"
      p={6}
    >
      <Text color="gray.400">{message}</Text>
    </Box>
  )
}
