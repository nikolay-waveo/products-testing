import { Icon } from '@shopify/polaris'
import { CancelSmallMinor } from '@shopify/polaris-icons'
import React from 'react'

interface IItem {
  item: {
    name: string,
    id: string, 
    URL?: string,
  },
  onRemove(id: string): void
}

const Item: React.FC<IItem> = ({
  item, 
  onRemove,
}) => {

  return (
    <li
      className="flex justify-between my-3" >
        { item.URL 
          ? <>
            <a href={ item.URL }
               className="overflow-hidden">
               { item.name }
            </a>
            <button
              onClick={ () => onRemove(item.id) } >
              <Icon
                source={ CancelSmallMinor }
                color="base" />
            </button>
          </>
          : item.name
        }
    </li>
  )
}

export default Item
