import { Box } from '@chakra-ui/react'

export default function Card({ children, onClick, title }) {
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Box
      role="group"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      title={title}
      aria-label={title}
      bg="gray.900"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="md"
      minH="500px"
      p={6}
      boxShadow="lg"
      w="full"
      maxW="720px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      cursor="pointer"
      _hover={{ borderColor: 'teal.400' }}
      transition="all 0.2s ease"
      className="card-pop"
    >
      {children}
    </Box>
  )
}
