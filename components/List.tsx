import React from 'react';
import { IList } from 'types';
import Item from './Item';

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listTitle,
  listType="active",
  emptyListMessage,
  action=[],
}) => {

  const onCancel = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    listUpdateHandler(newList);
  }

  const onAccept = (id: string) => {
    const newList = list.map((item) => item.id === id ? {...item, status: "active"} : item )
    listUpdateHandler(newList);
  }

  const itemProps = {}

  if(action.includes("cancel")) itemProps["onCancel"] = onCancel;

  if(action.includes("accept")) itemProps["onAccept"] = onAccept;

  const filteredList = list.filter(item => item.status === listType);

  const isEmpty = (filteredList.length <= 0 && !emptyListMessage);
  
  if(isEmpty) return(<></>)

  return (
    <div>
      <h3 className="text-xl p-5 font-semibold text-white tracking-wide bg-indigo-500" >{ listTitle }</h3>
      <ul className="space-y-1">
        { filteredList.length > 0
          ? filteredList
            .map((item) => 
              <Item 
                key={ item.id }
                item={ item } 
                {...itemProps} />
            )
          : <li 
              className="text-2xl p-5 font-normal bg-white" >{ emptyListMessage || "" }</li>
        }
      </ul>
    </div>
  )
}

export default List
