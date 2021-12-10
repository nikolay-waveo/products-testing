import { ActionList, Icon, Popover } from '@shopify/polaris';
import {
  CancelSmallMinor,
  MobileVerticalDotsMajor,
  TickMinor
} from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

interface IOptions {
  id: string,
  onConnect(id: string): void,
  onDisconnect(id: string): void,
}

const Options: React.FC<IOptions> = ({
  id,
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

  const connectAction = {
    content: 'Connect',
    icon: TickMinor,
    active: true,
    helpText: "Accept subscription to your store",
    onAction: () => onConnect(id),
  }

  const disconnectAction = {
    content: 'Disconnect',
    icon: CancelSmallMinor,
    helpText: "Deny subscription to your store",
    onAction: () => onDisconnect(id),
    destructive: true,
  }

  const actionListItems = [connectAction, disconnectAction]

  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
      <ActionList 
        items={actionListItems} 
        onActionAnyItem={() => {
          setPopoverActive(false)
        }}/>
    </Popover>
  )
}

export default Options
