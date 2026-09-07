import { Text } from '@chakra-ui/react'

export default function Phrase({ children, fontSize = '5xl' }) {
  return (
    <Text fontSize={fontSize} fontWeight="semibold" color="white" m={0} mb="0.5rem">
      {children}
    </Text>
  )
}
