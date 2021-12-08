import React from 'react';
import { ISubscription, ISubscriptions } from 'types';
import SubscriptionItem from './SubscriptionItem';

interface ISubscriptionList {
  list: ISubscriptions['subscriptions'],
  ListUpdateHandler: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
    URL: string;
  }[]>>,
  linkedList?: ISubscriptions['subscriptions'],
  LinkedListUpdateHandler?: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
    URL: string;
  }[]>>,
  emptyListMessage: string,
  listTitle: string,
}

const SubscriptionList: React.FC<ISubscriptionList> = ({
  list,
  ListUpdateHandler,
  linkedList,
  LinkedListUpdateHandler,
  emptyListMessage,
  listTitle,
}) => {
 
  const onRemove = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    console.log(newList)
    ListUpdateHandler(newList);
  }

  const onAddToLinkedList = (item: ISubscription['subscription']) => {
    LinkedListUpdateHandler([...linkedList, item]);
    onRemove(item.id);
  }

  const isLinked = linkedList && LinkedListUpdateHandler;

  let eventProps = {
    onRemove: onRemove,
  }

  if(isLinked) {
    eventProps["onAddToLinkedList"] = onAddToLinkedList
  }


  return (
    <div className="p-5">
      <h3 className="mb-6 font-bold" >{ listTitle }</h3>
      <ul>
        { list.length > 0
          ? list.map((item) => 
            <SubscriptionItem 
              key={ item.id } 
              item={ item } 
              {...eventProps} />
          )
          : <li>{ emptyListMessage }</li>
        }
      </ul>
    </div>
  )
}

export default SubscriptionList
