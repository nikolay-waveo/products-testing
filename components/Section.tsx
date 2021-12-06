import React from 'react'
import { ISection } from 'types'

const Section: React.FC<ISection> = ({
  sectionTitle,
  children
}) => {
  return (
    <section className="divide-y-2 divide-gray-300 divide-solid">

      <h2 className="text-2xl font-semibold">{ sectionTitle }</h2>

      <div>
        { children }
      </div>

    </section>
  )
}

export default Section
