import React from 'react';
import SubscriptionItem from './SubscriptionItem';

interface ISubscriptionList {
  list: {
    name: string,
    id: string,
    URL: string,
  }[],
  updateListHandler: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
    URL: string;
  }[]>>,
  emptyListMessage: string,
}

const SubscriptionList: React.FC<ISubscriptionList> = ({
  list,
  updateListHandler,
  emptyListMessage,
}) => {
 
  const onRemove = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    console.log(newList)
    updateListHandler(newList);
  }

  return (
    <ul>
      { list.length > 0
        ? list.map((item) => 
          <SubscriptionItem key={item.id} item={item} onRemove={ onRemove }/>
        )
        : <li>{ emptyListMessage }</li>
      }
    </ul>
  )
}

export default SubscriptionList
