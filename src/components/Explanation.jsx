import { Stack, Text } from '@chakra-ui/react'

export default function Explanation({ children }) {
  return (
    <>
      <Stack gap={2}>
        <Text color="white" mt="1rem" fontSize="sm" maxW="360px">
          💡 <em>{children}</em>
        </Text>
      </Stack>
    </>
  )
}
