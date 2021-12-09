import { Icon } from '@shopify/polaris'
import { CancelSmallMinor, TickMinor } from '@shopify/polaris-icons'
import React from 'react'
import { ISubscription } from 'types'

interface IItem {
  item: ISubscription['subscription'],
  onCancel?(id: string): void, 
  onAccept?(id: string): void,
}

const Item: React.FC<IItem> = ({
  item,
  onCancel,
  onAccept,
}) => {
  return (
    <li
      className="flex justify-between my-3" >
      <a href={ item.URL }
         className="overflow-hidden">
         { item.name }
      </a>
      <div className="flex space-x-2">
        { onAccept && 
          <button
            onClick={() => onAccept(item.id)} 
            className="flex items-center space-x-1 p-2 text-xl font-semibold text-shopify-success border-2 border-shopify-success rounded-lg" >
            ACCEPT
            <Icon
              source={ TickMinor }
              color="success" />
          </button>
        }
        { onCancel && 
          <button
            onClick={() => onCancel(item.id)} 
            className="flex items-center space-x-1 p-2 text-xl font-semibold text-red-600 border-2 border-red-600 rounded-lg" >
            CANCEL
            <Icon
              source={ CancelSmallMinor }
              color="critical" />
          </button>
        }
      </div>
    </li>
  )
}

export default Item
