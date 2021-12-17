import { Badge, TextStyle } from '@shopify/polaris';
import React from 'react';
import { IItem } from 'types';
import Options from './Options';

const Item: React.FC<IItem> = ({
  item,
  onDisconnect,
  onConnect,
  canAcceptConnection,
}) => {

  const {storeURL, status} = item;

  const itemProps = {
    onDisconnect: onDisconnect,
  }

  if(canAcceptConnection && status === 'PENDING') {
    itemProps['onConnect'] = onConnect
  }

  // const capitalizedStatus = status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <div className="grid grid-cols-9">
      <h3 className="col-span-7 truncate">
        <TextStyle variation="strong">{storeURL}</TextStyle>
      </h3>
      <div className="col-start-8 justify-self-center">
        <Badge 
          status={status === "active" ? "success" : "warning"}
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
