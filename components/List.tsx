import { Icon } from '@shopify/polaris';
import { CancelSmallMinor } from '@shopify/polaris-icons';
import React from 'react';

interface IList {
  list: {
    listItem: string,
    listItemURL?: string,
  }[],
  emptyListMessage: string,
}

const List: React.FC<IList> = ({
  list,
  emptyListMessage,
}) => {
 
  return (
    <ul className="p-5">
      { list.length > 0
        ? list.map((item, key) => {
          return(
            <li 
              key={key}
              className="flex justify-between my-3" >
              { item.listItemURL 
                ? <> 
                  <a href={ item.listItemURL }
                    className="overflow-hidden">
                    { item.listItem }
                  </a> 
                  <button
//TODO Remove testing script
                    onClick={() => {alert("click")}}>
                    <Icon
                    source={CancelSmallMinor}
                    color="base" />
                  </button> </>
                : item.listItem }
            </li>
          )
        })
        : <li>{ emptyListMessage }</li>
      }
    </ul>
  )
}

export default List
