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
    <section className="divide-y-2 divide-gray-300 divide-solid">

      <div className="flex justify-between content-center my-5">
        <h2 className="text-2xl font-semibold">{ sectionTitle }</h2>

        { toggle && 
          <Toggle 
            defaultChecked={toggleOn}
            icons={false}
            onChange={() => setToggleOn(!toggleOn)} /> }
      </div>

      { toggleOn && <div className="grid gap-y-3 divide-y" > { children } </div> }

    </section>
  )
}

export default Section
