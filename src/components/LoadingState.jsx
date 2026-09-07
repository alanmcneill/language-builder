import { Box, Spinner } from '@chakra-ui/react'

export default function LoadingState() {
  return (
    <Box minH="100vh" bg="gray.800" color="whiteAlpha.900" display="grid" placeItems="center">
      <Spinner color="teal.300" />
    </Box>
  )
}
