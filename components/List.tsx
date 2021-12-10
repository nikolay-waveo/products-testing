import { Button, Icon } from '@shopify/polaris';
import { MobilePlusMajor } from '@shopify/polaris-icons';
import React from 'react';
import { IList } from 'types';
import Item from './Item';

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listTitle,
  emptyListMessage,
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

  const itemProps = {
    onDisconnect: onDisconnect,
    onConnect: onConnect,
  }

  const sortedList = list
    .map((item) => { 
      return {...item, status: item.status.toUpperCase()}
    })
    .sort((item) => {
      if(item.status === "PENDING") return -1
      return 1
    })

    const canAddToList = true;

  return (
    <div>
      <div className="flex justify-between items-center p-5 bg-indigo-500">
        <h3 className="text-2xl font-semibold text-white tracking-wide" >{ listTitle }</h3>
        { canAddToList &&
          <div className="text-white">
            <Button 
              monochrome
              outline
              size="medium" 
              icon={
                <Icon
                  source={ MobilePlusMajor }
                  color="interactive" /> }
              onClick={() => {
                alert('click')
              }} >
              New Subscriptioin
            </Button>
          </div>
        }
      </div>
      <ul className="space-y-1">
        { sortedList.length > 0
          ? sortedList
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
