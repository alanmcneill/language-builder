import { Fragment } from 'react'
import { Breadcrumb } from '@chakra-ui/react'

export default function Breadcrumbs({ items }) {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <Breadcrumb.Item>
              {item.href ? (
                <Breadcrumb.Link href={item.href}>
                  {item.label}
                </Breadcrumb.Link>
              ) : (
                <Breadcrumb.CurrentLink>
                  {item.label}
                </Breadcrumb.CurrentLink>
              )}
            </Breadcrumb.Item>

            {index < items.length - 1 && (
              <Breadcrumb.Separator />
            )}
          </Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
