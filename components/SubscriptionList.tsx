import React, { useState } from 'react';

interface ISubscriptionList {
  emptyListMessage: string
}

const SubscriptionList: React.FC<ISubscriptionList> = ({
  emptyListMessage,
}) => {

  const [subscriptions, setSubscriptions] = useState([])

  return (
    <ul>
      { subscriptions.length > 0
        ? subscriptions.map((sub, key) => {
          return (
            <li key={ key }>
              <a href={ sub.url }>{ sub.url }</a>
            </li>
          )
        })
        : <li>{ emptyListMessage }</li>
      }
    </ul>
  )
}

export default SubscriptionList
