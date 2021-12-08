import React, { Dispatch, SetStateAction } from 'react';
import { ISubscription } from 'types';
import Item from './Item';

interface IList {
  list: ISubscription['subscription'][],
  listUpdateHandler: Dispatch<SetStateAction<IList['list']>>,
  listTitle: string,
  listType?: string,
  emptyListMessage?: string,
}

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listTitle,
  listType="active",
  emptyListMessage,
}) => {

  const filteredList = list.filter(item => item.status === listType);

  const isEmpty = (filteredList.length <= 0 && !emptyListMessage);
  
  if(isEmpty) return(<></>)

  return (
    <div className="p-5">
      <h3 className="mb-6 font-bold" >{ listTitle }</h3>
      <ul>
        { filteredList.length > 0
          ? filteredList
            .map((item) => 
              <Item 
                key={ item.id }
                item={ item } />
            )
          : <li>{ emptyListMessage || "" }</li>
        }
      </ul>
    </div>
  )
}

export default List
