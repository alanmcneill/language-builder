import { Box, VStack, Text } from '@chakra-ui/react'
import SpeechButton from './SpeechButton'

export default function Translation({ children }) {
  return (
    <Box
      bg="teal.900"
      borderRadius="md"
      p={4}
      border="1px solid"
      borderColor="teal.700"
      className="translation-pop"
    >
      <VStack justify="center" align="center" gap={2}>
        <Text fontSize="5xl" color="white" m={0} mb="0.5rem">
          {children}
        </Text>
        <SpeechButton text={children} />
      </VStack>
    </Box>
  )
}
