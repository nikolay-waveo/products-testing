import { Badge, TextStyle } from '@shopify/polaris';
import React from 'react';
import { IItem } from 'types';
import Options from './Options';

declare type Status = 'success' | 'info' | 'critical' | 'warning' | 'new'

const Item: React.FC<IItem> = ({
  item,
  onDisconnect,
  onConnect,
  listType,
}) => {
  console.log(listType === "publishTo")

  const {storeURL, status} = item;

  const itemProps = {
    onDisconnect: onDisconnect,
  }

  if(listType === "publishTo" && status === "pending") {
    itemProps['onConnect'] = onConnect
  }

  let badgeStatus = {}

  switch (status) {
    case 'active':
      badgeStatus = { 
        status: "success"
      }
      break;
    case 'stopped': 
      badgeStatus = { 
        status: "critical"
      }
      break;
    case 'declined':
      badgeStatus = { 
        status: "warning"
      }
      break;
    case 'pending':
    default:    
      badgeStatus = { 
        status: "new"
      }
      break;
  }

  // const capitalizedStatus = status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <div className="grid grid-cols-9">
      <h3 className="col-span-7 truncate">
        <TextStyle variation="strong">{storeURL}</TextStyle>
      </h3>
      <div className="col-start-8 justify-self-center">
        <Badge 
          {...badgeStatus}
          size="small">
            {status}
        </Badge>
      </div>
      <div className="grid justify-end col-start-9">
        <Options store={storeURL} status={status} {...itemProps} />
      </div>
    </div>
  )
}

export default Item
