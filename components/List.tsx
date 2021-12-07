import { Icon } from '@shopify/polaris';
import { CancelSmallMinor } from '@shopify/polaris-icons';
import React from 'react';

interface IList {
  list: {
    name: string,
    URL?: string,
  }[],
  emptyListMessage: string,
}

const List: React.FC<IList> = ({
  list,
  emptyListMessage,
}) => {
 
  return (
    <ul>
      { list.length > 0
        ? list.map((item, key) => {
          return(
            <li 
              key={key}
              className="flex justify-between my-3" >
              { item.URL 
                ? <> 
                  <a href={ item.URL }
                    className="overflow-hidden">
                    { item.name }
                  </a> 
                  <button
//TODO Remove testing script
                    onClick={() => {alert("click")}}>
                    <Icon
                    source={CancelSmallMinor}
                    color="base" />
                  </button> </>
                : item.name }
            </li>
          )
        })
        : <li>{ emptyListMessage }</li>
      }
    </ul>
  )
}

export default List
