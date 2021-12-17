import { ActionList, Icon, Popover } from '@shopify/polaris';
import {
  CancelSmallMinor,
  MobileVerticalDotsMajor,
  TickMinor
} from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

interface IOptions {
  store: string,
  onConnect?(store: string): void,
  onDisconnect(store: string): void,
}

const Options: React.FC<IOptions> = ({
  store,
  onConnect,
  onDisconnect,
}) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => setPopoverActive(popoverActive => !popoverActive), []);

  const activator = <button onClick={togglePopoverActive}> 
      <Icon
        source={MobileVerticalDotsMajor}
        color="interactive" />
    </button>;

  const disconnectAction = {
    content: 'Disconnect',
    icon: CancelSmallMinor,
    helpText: "Deny subscription to your store",
    onAction: () => onDisconnect(store),
    destructive: true,
  }

  const connectAction = {
    content: 'Connect',
    icon: TickMinor,
    active: true,
    helpText: "Accept subscription to your store",
    onAction: () => onConnect(store),
  }

  const actionListItems = [];
  
  if(onConnect) actionListItems.push(connectAction);

  actionListItems.push(disconnectAction);

  return (
    <Popover 
      active={popoverActive} 
      activator={activator} 
      onClose={togglePopoverActive}>
      <ActionList 
        items={actionListItems} 
        onActionAnyItem={() => {
          setPopoverActive(false)
        }}/>
    </Popover>
  )
}

export default Options
