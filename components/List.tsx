import React, { Dispatch, SetStateAction } from 'react';
import { ISubscription } from 'types';
import Item from './Item';

type ActionType = "cancel" | "accept";


interface IList {
  list: ISubscription['subscription'][],
  listUpdateHandler: Dispatch<SetStateAction<IList['list']>>,
  listTitle: string,
  listType?: string,
  emptyListMessage?: string,
  action?: ActionType[],
}

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
    alert(id)
  }

  const itemProps = {}

  if(action.includes("cancel")) itemProps["onCancel"] = onCancel;

  if(action.includes("accept")) itemProps["onAccept"] = onAccept;

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
                item={ item } 
                {...itemProps} />
            )
          : <li>{ emptyListMessage || "" }</li>
        }
      </ul>
    </div>
  )
}

export default List
