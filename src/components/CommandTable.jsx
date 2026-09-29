import {
  Box,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'

export default function CommandTable({ columns }) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: columns.length }}
      gap={3}
    >
      {columns.map((column) => (
        <Box
          key={column.label}
          border="1px solid"
          borderColor="gray.700"
          borderRadius="md"
          overflow="hidden"
        >
          <Box
            px={4}
            py={3}
            bg="gray.800"
            borderBottom="1px solid"
            borderColor="gray.700"
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="white"
            >
              {column.label}
            </Text>

            <Text
              fontSize="sm"
              color="gray.500"
            >
              {column.translation}
            </Text>
          </Box>

          <Stack gap={0}>
            {column.forms.map(
              ([subject, form, meaning]) => (
                <Box
                  key={subject}
                  px={4}
                  py={3}
                  borderBottom="1px solid"
                  borderColor="gray.700"
                  _last={{
                    borderBottom: 'none',
                  }}
                >
                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    {subject}
                  </Text>

                  <Text
                    mt={1}
                    fontSize="xl"
                    fontWeight="bold"
                    color="white"
                  >
                    {form}
                  </Text>

                  <Text
                    mt={1}
                    fontSize="sm"
                    color="gray.400"
                  >
                    {meaning}
                  </Text>
                </Box>
              ),
            )}
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  )
}
