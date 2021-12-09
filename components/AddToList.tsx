import { Icon } from '@shopify/polaris';
import { MobilePlusMajor } from '@shopify/polaris-icons';
import React, { FormEvent, useState } from 'react';

interface IAddToList {
  addToListHandler(input: string): void,
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

  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToListHandler(input)
    setInput('')
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col p-5 pt-0 bg-white">
      <label 
        htmlFor={ labelName } 
        className={ "text-xl font-semibold mb-4 " + (showLabel ? "" : "sr-only") } >
        { label }
      </label>
      <div className="flex justify-between gap-x-11">
        <input 
          type="url"
          value={ input }
          id={ labelName }
          placeholder={ placeholder }
          required
          onChange={(e) => setInput(e.target.value)} 
          className="text-xl tracking-wide border-solid border rounded border-gray-200 p-5 flex-grow" />
        
        <button 
          type="submit"
          className="p-5 pl-0 border-indigo-600" >
          <Icon
            source={ MobilePlusMajor }
            color="interactive" />
        </button>
      </div>
    </form>
  )
}

export default AddToList
