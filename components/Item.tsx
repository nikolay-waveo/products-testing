import React from 'react';
import { IItem } from 'types';
import Options from './Options';

const Item: React.FC<IItem> = ({
  item,
  onDisconnect,
  onConnect,
}) => {

  let statusStyle = " ";

  switch(item.status) {
    case 'PENDING': 
      statusStyle += "text-yellow-600"
      break;
    case 'ACTIVE':
      statusStyle += "text-shopify-success"
      break;
    default:
      break;
  }

  return (
    <li
      className="grid grid-flow-col grid-cols-9 justify-between items-center p-5 bg-white" >
      <a href={ item.URL }
         className="col-span-2 text-xl font-semibold overflow-hidden">
         { item.name }
      </a>
      <span
        className={"col-span-1 text-lg text-left font-semibold" + statusStyle } >
        { item.status }
      </span>
      <span className="col-span-5"></span>
      <div className="col-span-1 ml-auto">
        <Options id={item.id} onConnect={onConnect} onDisconnect={onDisconnect} />
      </div>
    </li>
  )
}

export default Item
