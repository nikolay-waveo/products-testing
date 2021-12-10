import { ActionList, Icon, Popover } from '@shopify/polaris';
import {
  CancelSmallMinor,
  MobileVerticalDotsMajor,
  TickMinor
} from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

interface IOptions {
  
}

const Options: React.FC<IOptions> = () => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => setPopoverActive(popoverActive => !popoverActive), []);

  const activator = <button onClick={togglePopoverActive}> 
      <Icon
        source={MobileVerticalDotsMajor}
        color="interactive" />
    </button>;

  const acceptAction = {
    content: 'Accept',
    icon: TickMinor,
    active: true,
    helpText: "Accept subscription to your store"
  }

  const cancelAction = {
    content: 'Deny',
    icon: CancelSmallMinor,
    helpText: "Deny subscription to your store"
  }

  const actionListItems = [acceptAction, cancelAction]

  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
      <ActionList items={actionListItems} />
    </Popover>
  )
}

export default Options
