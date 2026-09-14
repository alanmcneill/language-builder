import { HStack, Menu, Portal } from '@chakra-ui/react'

const languages = [
  {
    label: 'Spanish',
    value: 'Spanish',
    flag: '🇪🇸',
  },
  {
    label: 'French',
    value: 'French',
    flag: '🇫🇷',
  },
  {
    label: 'Italian',
    value: 'Italian',
    flag: '🇮🇹',
  },
]

export default function LanguageSelector({
  language,
  onSelect,
}) {
  const selectedLanguage = languages.find(
    (item) => item.value === language,
  )

  return (
    <Menu.Root
      onSelect={({ value }) => onSelect(value)}
    >
      <Menu.Trigger
        px={0}
        color="gray.300"
        fontSize="sm"
        fontWeight="medium"
        _hover={{
          color: 'teal.300',
        }}
      >
        <HStack gap={2}>
          <span>{selectedLanguage?.flag}</span>
          <span>{language}</span>
          <span>▾</span>
        </HStack>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg="gray.900"
            borderColor="gray.700"
          >
            {languages.map((item) => (
              <Menu.Item
                key={item.value}
                value={item.value}
                color="white"
              >
                <HStack gap={3}>
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </HStack>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
