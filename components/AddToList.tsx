import { Icon } from '@shopify/polaris';
import { MobilePlusMajor } from '@shopify/polaris-icons';
import React from 'react';

interface IAddToList {
  addToListHandler: React.Dispatch<React.SetStateAction<{
    name: string;
    URL: string;
  }[]>>,
  label: string, 
  labelName: string,
  showLabel?: boolean,
  placeholder: string,
}

const AddToList: React.FC<IAddToList> = ({
  addToListHandler,
  label,
  labelName,
  showLabel,
  placeholder,
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit")
    // addToListHandler()
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col">
      <label 
        htmlFor={ labelName } 
        className={ showLabel ? "" : "sr-only" } >
        { label }
      </label>
      <div className="flex justify-between">
        <input 
          type="text"
          value=""
          id={ labelName }
          placeholder={ placeholder }
          onChange={(e) => {}} />
        
        <button type="submit">
          <Icon
            source={ MobilePlusMajor }
            color="base" />
        </button>
      </div>
    </form>
  )
}

export default AddToList
