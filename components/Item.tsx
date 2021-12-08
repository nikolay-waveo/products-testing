import React from 'react'
import { ISubscription } from 'types'

interface IItem {
  item: ISubscription['subscription'],
}

const Item: React.FC<IItem> = ({
  item,
}) => {
  return (
    <li
      className="flex justify-between my-3" >
      <a href={ item.URL }
         className="overflow-hidden">
         { item.name }
      </a>
      <div>
        <button
          onClick={() => alert('clicked')} >
          Cancel
        </button>
      </div>
    </li>
  )
}

export default Item
