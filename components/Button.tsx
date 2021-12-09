import { Icon } from '@shopify/polaris';
import { CancelSmallMinor, TickMinor } from '@shopify/polaris-icons';
import React from 'react';
import { IButton } from 'types';

const Button: React.FC<IButton> = ({
  item,
  type,
  onAction,
}) => {

  const buttonType = type.toUpperCase();

  let buttonStyle = "flex items-center space-x-1 p-2 text-xl font-semibold border-2 rounded-lg"

  switch(buttonType) {
    case "ACCEPT": 
      buttonStyle += " text-shopify-success border-shopify-success";
      break;
    case "CANCEL":
      buttonStyle += " text-red-600 border-red-600"
      break;
    default:
      break;
  }

  return (
    <button
      onClick={() => onAction(item.id)} 
      className={buttonStyle} >
      { buttonType }
      { buttonType === "ACCEPT" && 
        <Icon
          source={ TickMinor }
          color={"success"} /> }
      { buttonType === "CANCEL" && 
        <Icon
          source={ CancelSmallMinor }
          color={"critical"} /> }
      
    </button>
  )


}

export default Button
