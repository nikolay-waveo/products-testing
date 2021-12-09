import React, { useState } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { ISection } from 'types'


const Section: React.FC<ISection> = ({
  sectionTitle,
  toggle,
  children
}) => {

  const [toggleOn, setToggleOn] = useState(true)

  return (
    <section className="max-h-full border border-gray-100">

      <div className="flex justify-between content-center p-5 pt-6 bg-white">
        <h2 className="h-10 text-3xl font-bold text-gray-800">{ sectionTitle }</h2>

        { toggle && 
          <Toggle 
            defaultChecked={toggleOn}
            icons={false}
            onChange={() => setToggleOn(!toggleOn)} /> }
      </div>

      { toggleOn && <div className="bg-indigo-50" > { children } </div> }

    </section>
  )
}

export default Section
