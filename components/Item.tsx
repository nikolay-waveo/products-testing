import React from 'react'
import { IItem } from 'types'
import Button from './Button'

const Item: React.FC<IItem> = ({
  item,
  onCancel,
  onAccept,
}) => {
  return (
    <li
      className="flex justify-between items-center p-5 bg-white" >
      <a href={ item.URL }
         className="text-xl font-semibold overflow-hidden">
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
