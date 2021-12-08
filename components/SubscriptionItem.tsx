import { Icon } from '@shopify/polaris'
import { CancelSmallMinor, TickMinor } from '@shopify/polaris-icons'
import React from 'react'
import { ISubscription } from 'types'

interface ISubscriptionItem {
  item: ISubscription['subscription'],
  onRemove(id: string): void,
  onAddToLinkedList?(item: ISubscription['subscription']): void,
}

const SubscriptionItem: React.FC<ISubscriptionItem> = ({
  item, 
  onRemove,
  onAddToLinkedList,
}) => {

  return (
    <li
      className="flex justify-between my-3" >
      <a href={ item.URL }
          className="overflow-hidden">
          { item.name }
      </a>
      <div>
        { onAddToLinkedList &&
        <button
          onClick={() => onAddToLinkedList(item)} >
          <Icon
            source={ TickMinor }
            color="base" />
        </button> }
        <button
          onClick={() => onRemove(item.id)} >
          <Icon
            source={ CancelSmallMinor }
            color="base" />
        </button>
      </div>
    </li>
  )
}

export default SubscriptionItem
