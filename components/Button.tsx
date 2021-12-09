import { Icon } from '@shopify/polaris';
import { CancelSmallMinor, TickMinor } from '@shopify/polaris-icons';
import React from 'react';
import { ISubscription } from 'types';

type ActionType = "cancel" | "accept";

interface IButton {
  item: ISubscription['subscription'],
  type: ActionType,
  onAction(id: string): void,
}

const Button: React.FC<IButton> = ({
  item,
  type,
  onAction,
}) => {

  const buttonType = type.toUpperCase();

  if(buttonType === "ACCEPT") {
    return (
      <button
        onClick={() => onAction(item.id)} 
        className="flex items-center space-x-1 p-2 text-xl font-semibold text-shopify-success border-2 border-shopify-success rounded-lg" >
        { buttonType }
        <Icon
          source={ TickMinor }
          color="success" />
      </button>
    )
  }

  if(buttonType === "CANCEL") {
    return (
      <button
        onClick={() => onAction(item.id)} 
        className="flex items-center space-x-1 p-2 text-xl font-semibold text-red-600 border-2 border-red-600 rounded-lg" >
        { buttonType }
        <Icon
          source={ CancelSmallMinor }
          color="critical" />
      </button>
    )
  }

  return ( <></> )
}

export default Button
