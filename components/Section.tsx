import React, { useState } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { ISection } from 'types';


const Section: React.FC<ISection> = ({
  sectionTitle,
  toggle,
  children
}) => {

  const [toggleOn, setToggleOn] = useState(true)

  const sectionDescription = "Subscriber to a published store and check on pending subscriptions."

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <div className="flex justify-between content-center md:p-5 md:pt-6">
        <div>
          <h2 className="h-10 mb-5 text-3xl font-semibold text-gray-800">{ sectionTitle }</h2>

          <span className="text-xl text-gray-500" >{ sectionDescription }</span>
        </div>
        

        { toggle && 
          <Toggle 
            defaultChecked={toggleOn}
            icons={false}
            onChange={() => setToggleOn(!toggleOn)} /> }
      </div>

      { toggleOn 
        ? <div className="col-span-2 bg-indigo-50 rounded-md overflow-hidden custom-drop-shadow" > { children } </div> 
        : <div className="flex flex-col space-y-5 justify-center content-center p-10 col-span-2 bg-gray-50 rounded-md overflow-hidden custom-drop-shadow" > 
            <h3
              className="text-4xl text-gray-700 text-center">
              Your store is hiding.
            </h3>
            <span 
              className="text-lg text-gray-500 text-center"> Toggle ON to publish your store. </span>
          </div> 
      }

    </section>
  )
}

export default Section
