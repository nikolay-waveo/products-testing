import React from 'react';
import Item from './Item';

interface IList {
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

const List: React.FC<IList> = ({
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
          <Item key={item.id} item={item} onRemove={ onRemove }/>
        )
        : <li>{ emptyListMessage }</li>
      }
    </ul>
  )
}

export default List
