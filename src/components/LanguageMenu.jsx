import { Menu as MenuIcon } from 'lucide-react'
import { IconButton, Menu, Portal } from '@chakra-ui/react'

const languageGroups = [
  {
    label: 'Spanish',
    links: [
      { label: 'Basic', key: 'spanish-basic' },
      { label: 'Intermediate', key: 'spanish-intermediate' },
      { label: 'Advanced', key: 'spanish-advanced' },
      { label: 'Resources', key: 'spanish-resources' },
    ],
  },
  {
    label: 'French',
    links: [
        { label: 'Basic', key: 'french-basic' },
    ]
  },
]

export default function LanguageMenu({ onSelect }) {
  return (
    <Menu.Root onSelect={({ value }) => onSelect(value)}>
      <Menu.Trigger asChild>
        <IconButton
          type="button"
          size="md"
          color="teal"
          aria-label="Open language menu"
          title="Open language menu"
        >
          <MenuIcon size={24} aria-hidden="true" />
        </IconButton>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content bg="gray.900" color="white" borderColor="gray.700">
            {languageGroups.map((group) => (
              <Menu.ItemGroup key={group.label}>
                <Menu.ItemGroupLabel color="teal.300">{group.label}</Menu.ItemGroupLabel>
                {group.links.map((link) => (
                  <Menu.Item
                    key={`${group.label}-${link.key}`}
                    value={link.key}
                    color="white"
                    textDecoration="none"
                  >
                  {link.label}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
