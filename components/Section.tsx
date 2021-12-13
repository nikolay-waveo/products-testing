import { Heading, TextContainer } from '@shopify/polaris';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { ISection } from 'types';


const Section: React.FC<ISection> = ({
  sectionTitle,
  sectionDescription,
  toggle,
  children
}) => {

  const [toggleOn, setToggleOn] = useState(true)

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <div className="flex justify-between content-center">
        <TextContainer>
          <Heading>{ sectionTitle }</Heading>
          <p>
            { sectionDescription }
          </p>
        </TextContainer>

        { toggle && 
          <Toggle 
            defaultChecked={toggleOn}
            icons={false}
            onChange={() => setToggleOn(!toggleOn)} /> }
      </div>

      { toggleOn 
        ? <div className="col-span-2 bg-indigo-50 rounded-md overflow-hidden custom-drop-shadow" > { children } </div> 
        : <div className="md:flex hidden flex-col space-y-5 justify-center content-center p-10 col-span-2 bg-gray-50 rounded-md overflow-hidden custom-drop-shadow" > 
            <div className="flex self-center h-40 w-40 bg-gray-200">
              <p
                className="text-center self-center font-semibold text-gray-500">
               Placeholder Graphic
              </p>
            </div>
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
