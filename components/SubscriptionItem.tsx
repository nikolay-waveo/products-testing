import { Icon } from '@shopify/polaris'
import { CancelSmallMinor } from '@shopify/polaris-icons'
import React from 'react'
import { ISubscription } from 'types'

interface ISubscriptionItem {
  item: ISubscription['subscription'],
  onRemove(id: string): void
}

const SubscriptionItem: React.FC<ISubscriptionItem> = ({
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

export default SubscriptionItem
