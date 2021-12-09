import React from 'react'
import { ISubscription } from 'types'
import Button from './Button'

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
          <Button type="accept" item={item} onAction={onAccept} />
        }
        { onCancel && 
          <Button type="cancel" item={item} onAction={onCancel} />
        }
      </div>
    </li>
  )
}

export default Item
