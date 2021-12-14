import { Badge, ResourceItem, TextStyle } from '@shopify/polaris';
import React from 'react';
import { IItem } from 'types';
import Options from './Options';

const Item: React.FC<IItem> = ({
  item,
  onDisconnect,
  onConnect,
  canAcceptConnection,
}) => {

  const {storeURL, id, status} = item;

  const itemProps = {
    onDisconnect: onDisconnect,
  }

  if(canAcceptConnection && status === 'PENDING') {
    itemProps['onConnect'] = onConnect
  }

  const capitalizedStatus = status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <ResourceItem
      id={id}
      accessibilityLabel={`View details for ${storeURL}`}
      onClick={() => {}}>
        <div className="grid grid-cols-9">
          <h3 className="col-span-7 truncate">
            <TextStyle variation="strong">{storeURL}</TextStyle>
          </h3>
          <div className="col-start-8 justify-self-center">
            <Badge 
              status={status === "ACTIVE" ? "success" : "warning"}
              size="small">
                {capitalizedStatus}
            </Badge>
          </div>
          <div className="grid justify-end col-start-9">
            <Options id={id} {...itemProps} />
          </div>
        </div>
    </ResourceItem>
  )
}

export default Item
