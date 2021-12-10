import React from 'react';
import { IItem } from 'types';
import Options from './Options';

const Item: React.FC<IItem> = ({
  item,
  onDisconnect,
  onConnect,
}) => {

  const actions = [];

  if(onDisconnect) {
    actions.push({
      action: "disconnect",
      actionHandler: onDisconnect(item.id)
    })
  }

  if(onConnect) {
    actions.push({
      action: "disconnect",
      actionHandler: onConnect(item.id)
    })
  }

  return (
    <li
      className="grid grid-flow-col grid-cols-9 justify-between items-center p-5 bg-white" >
      <a href={ item.URL }
         className="col-span-2 text-xl font-semibold overflow-hidden">
         { item.name }
      </a>
      <span
        className="col-span-1 text-lg text-left">
        { item.status }
      </span>
      <span className="col-span-5"></span>
      <div className="col-span-1 ml-auto">
        <Options />
      </div>
    </li>
  )
}

export default Item
