import React from 'react';
import { IList } from 'types';
import Item from './Item';
import ListTitle from './ListTitle';

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listTitle,
  canAddToList,
  emptyListMessage,
  canAcceptConnection,
}) => {

  const onDisconnect = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    listUpdateHandler(newList);
  }

  const onConnect = (id: string) => {
    // Set store to active
    // Update list
    const newList = list.map((item) => item.id === id ? {...item, status: "active"} : item )
    listUpdateHandler(newList);
  }

  const sortedList = list
    .map((item) => { 
      return {...item, status: item.status.toUpperCase()}
    })
    .sort((item) => {
      if(item.status === "PENDING") return -1
      return 1
    })

  return (
    <div>
      <ListTitle 
        list={list}
        listUpdateHandler={listUpdateHandler}
        listTitle={listTitle}
        canAddToList={canAddToList} />
      <ul className="space-y-1">
        { sortedList.length > 0
          ? sortedList
            .map((item) => {
              const itemProps = {
                onDisconnect: onDisconnect,
              }
              if(canAcceptConnection && item.status === 'PENDING') {
                itemProps['onConnect'] = onConnect
              }
              return (
                <Item 
                  key={ item.id }
                  item={ item } 
                  {...itemProps} />
              )
            })
          : <li 
              className="text-2xl p-5 font-normal bg-white" >{ emptyListMessage || "" }</li>
        }
      </ul>
    </div>
  )
}

export default List
