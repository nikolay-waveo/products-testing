import React, { Dispatch, SetStateAction } from 'react'
import { ISubscription } from 'types'

interface IList {
  list: ISubscription['subscription'][],
  listUpdateHandler: Dispatch<SetStateAction<IList['list']>>,
  emptyListMessage: string,
  listTitle: string,
}

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  emptyListMessage,
  listTitle,
}) => {

  
  return (
    <div className="p-5">
      <h3 className="mb-6 font-bold" >{ listTitle }</h3>
      <ul>
        { list.length > 0
          ? list.map((item) => {return(<li key={item.id}>{item.name}</li>)}
            
          )
          : <li>{ emptyListMessage }</li>
        }
      </ul>
    </div>
  )
}

export default List
